const { test } = require('node:test');
const assert = require('node:assert/strict');
const { once } = require('node:events');
const { randomUUID } = require('node:crypto');
const vm = require('node:vm');
const app = require('../src/server');
const prisma = require('../src/prisma');
const collection = require('../collection-postman.json');

test('Collection: CRUD, sanitizacao, relacionamentos e erros HTTP', async () => {
  const server = app.listen(0, '127.0.0.1');
  await once(server, 'listening');
  const variables = new Map([['baseUrl', `http://127.0.0.1:${server.address().port}`]]);
  const interpolate = value => value.replace(/\{\{([^}]+)\}\}/g, (_, key) => {
    if (key === '$guid') return randomUUID();
    assert.ok(variables.has(key), `Variavel ausente: ${key}`);
    return variables.get(key);
  });
  try {
    for (const item of collection.item) {
      const request = item.request;
      const response = await fetch(interpolate(request.url), {
        method: request.method,
        headers: Object.fromEntries(request.header.map(h => [h.key, h.value])),
        body: request.body ? interpolate(request.body.raw) : undefined
      });
      const text = await response.text();
      const pm = {
        test: (name, fn) => { fn(); console.log(`${item.name}: ${name}`); },
        expect: actual => ({ to: { eql: expected => assert.deepEqual(actual, expected) } }),
        collectionVariables: { set: (key, value) => variables.set(key, value), get: key => variables.get(key) },
        response: {
          json: () => JSON.parse(text), text: () => text,
          to: { have: { status: expected => assert.equal(response.status, expected, `${item.name}: ${text}`) } }
        }
      };
      for (const event of item.event) vm.runInNewContext(event.script.exec.join('\n'), { pm });
    }
  } finally {
    try {
      if (variables.has('jogadorId')) {
        const jogadorId = Number(variables.get('jogadorId'));
        await prisma.avaliacao.deleteMany({ where: { jogadorId } });
        await prisma.jogador.deleteMany({ where: { id: jogadorId } });
      }
    } finally {
      await new Promise(resolve => server.close(resolve));
      await prisma.$disconnect();
    }
  }
});

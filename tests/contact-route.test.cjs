const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
const code = ts.transpileModule(fs.readFileSync('src/app/api/contact/route.ts', 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
const payload = { email: 'visitor@example.com', message: '<b>A project inquiry</b>', requestId: '12345678-1234-4234-8234-123456789abc', website: '' };
function setup({ key = 'test-only', result = 200, throws = false } = {}) {
  const calls = [];
  const sandbox = { exports: {}, Request, Response, TextDecoder, Uint8Array, AbortSignal, URL, process: { env: { RESEND_API_KEY: key } }, fetch: async (...args) => {
    calls.push(args);
    if (throws) throw new Error('Provider failed with sensitive details');
    return Response.json(result === 200 ? { id: 'test' } : { secret: 'provider detail' }, { status: result });
  } };
  vm.runInNewContext(code, sandbox);
  const request = (body = payload, origin = 'https://www.guadatonti.com') => new Request('https://www.guadatonti.com/api/contact', { method: 'POST', headers: { origin, 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  return { post: sandbox.exports.POST, calls, request };
}
test('sends only to the owner, sets visitor reply-to and preserves plain text', async () => {
  const { post, calls, request } = setup();
  const response = await post(request({ ...payload, to: 'other@example.com' }));
  assert.equal(response.status, 200);
  const options = calls[0][1], body = JSON.parse(options.body);
  assert.deepEqual(body.to, ['guada.tonti@gmail.com']);
  assert.equal(body.reply_to, payload.email);
  assert.equal(body.from, 'Guada Tonti Portfolio <contacto@guadatonti.com>');
  assert.ok(body.text.includes(payload.message));
  assert.equal(body.html, undefined);
  assert.equal(options.headers['Idempotency-Key'], `contact/${payload.requestId}`);
});
test('invalid email, empty message, header injection and excessive length never reach provider', async () => {
  for (const change of [{ email: 'invalid' }, { email: 'a@example.com\r\nBcc: x@example.com' }, { message: '   ' }, { message: 'x'.repeat(10001) }, { requestId: 'bad' }]) {
    const { post, calls, request } = setup();
    assert.equal((await post(request({ ...payload, ...change }))).status, 400);
    assert.equal(calls.length, 0);
  }
});
test('blocks cross-origin requests and drops honeypot submissions', async () => {
  const { post, calls, request } = setup();
  assert.equal((await post(request(payload, 'https://other.example'))).status, 403);
  assert.equal((await post(request({ ...payload, website: 'bot' }))).status, 200);
  assert.equal(calls.length, 0);
});
test('caps request bytes before calling Resend', async () => {
  const { post, calls, request } = setup();
  assert.equal((await post(request({ ...payload, message: 'x'.repeat(40000) }))).status, 413);
  assert.equal(calls.length, 0);
});
test('missing configuration, provider rejection and network errors never claim success or leak detail', async () => {
  for (const [options, expected] of [[{ key: '' }, 503], [{ result: 403 }, 502], [{ throws: true }, 502]]) {
    const { post, request } = setup(options);
    const response = await post(request());
    assert.equal(response.status, expected);
    const body = await response.text();
    assert.ok(!body.includes('sensitive') && !body.includes('provider detail'));
  }
});

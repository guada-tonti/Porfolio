// Only the server reads RESEND_API_KEY. Recipients and sender cannot be supplied by visitors.
export async function POST(request: Request) {
  const origin = request.headers.get('origin');
  if (origin !== new URL(request.url).origin) return Response.json({ error: 'Invalid origin' }, { status: 403 });
  if (!request.headers.get('content-type')?.includes('application/json')) {
    return Response.json({ error: 'Invalid format' }, { status: 415 });
  }

  let input: Record<string, unknown>;
  try {
    const reader = request.body?.getReader();
    if (!reader) throw new Error('Empty body');
    const chunks: Uint8Array[] = [];
    let size = 0;
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 32_768) {
        await reader.cancel();
        return Response.json({ error: 'Message too large' }, { status: 413 });
      }
      chunks.push(value);
    }
    const bytes = new Uint8Array(size);
    let offset = 0;
    for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
    const parsed = JSON.parse(new TextDecoder().decode(bytes));
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) throw new Error('Invalid body');
    input = parsed;
  } catch {
    return Response.json({ error: 'Invalid message' }, { status: 400 });
  }
  // Hidden field catches basic automated submissions without sending an email.
  if (typeof input.website === 'string' && input.website) return Response.json({ ok: true });
  const email = typeof input.email === 'string' ? input.email.trim() : '';
  const message = typeof input.message === 'string' ? input.message.trim() : '';
  const requestId = typeof input.requestId === 'string' ? input.requestId : '';
  if (!/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email) || email.length > 254 ||
      !message || message.length > 10_000 || !/^[\da-f]{8}(-[\da-f]{4}){3}-[\da-f]{12}$/i.test(requestId)) {
    return Response.json({ error: 'Invalid message' }, { status: 400 });
  }
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return Response.json({ error: 'Sending unavailable' }, { status: 503 });

  try {
    const result = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json', 'Idempotency-Key': `contact/${requestId}` },
      body: JSON.stringify({
        from: 'Guada Tonti Portfolio <contacto@guadatonti.com>',
        to: ['guada.tonti@gmail.com'],
        reply_to: email,
        subject: 'Nuevo mensaje desde guadatonti.com',
        text: `Email de contacto: ${email}\n\n${message}`,
      }),
      signal: AbortSignal.timeout(15_000),
    });
    if (!result.ok) return Response.json({ error: 'Sending failed' }, { status: 502 });
    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: 'Sending failed' }, { status: 502 });
  }
}

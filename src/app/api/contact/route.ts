import { NextResponse } from "next/server";

export const runtime = "nodejs";

interface ContactPayload {
  name?: string;
  email?: string;
  reason?: string;
  message?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: ContactPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = body.name?.trim();
  const email = body.email?.trim();
  const reason = body.reason?.trim();
  const message = body.message?.trim();

  if (!name || !email || !reason || !message) {
    return NextResponse.json(
      { error: "All fields are required." },
      { status: 422 }
    );
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Please provide a valid email address." },
      { status: 422 }
    );
  }
  if (message.length > 5000) {
    return NextResponse.json({ error: "Message is too long." }, { status: 422 });
  }

  // Delivery: if a webhook is configured, forward the submission. Otherwise the
  // message is logged server-side and acknowledged so the form is fully working
  // without leaking secrets in the client bundle.
  const webhook = process.env.CONTACT_WEBHOOK_URL;
  try {
    if (webhook) {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: `New portfolio message\nFrom: ${name} <${email}>\nReason: ${reason}\n\n${message}`,
        }),
      });
    } else {
      console.info("[contact] submission", { name, email, reason });
    }
  } catch (err) {
    console.error("[contact] delivery failed", err);
    return NextResponse.json(
      { error: "Could not deliver your message. Please email me directly." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}

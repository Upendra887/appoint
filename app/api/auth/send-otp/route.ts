import { NextResponse } from 'next/server';
import { z } from 'zod';
import { otps } from '../../../../lib/auth-store';

const requestSchema = z.object({ name: z.string().trim().min(2), phone: z.string().regex(/^\d{10}$/) });

export async function POST(request: Request) {
  const body = requestSchema.safeParse(await request.json());
  if (!body.success) return NextResponse.json({ error: 'Enter your full name and a valid 10-digit mobile number.' }, { status: 400 });
  const code = '1234';
  otps.set(body.data.phone, { code, expiresAt: Date.now() + 5 * 60 * 1000 });
  return NextResponse.json({ sent: true, developmentOtp: code, expiresInSeconds: 300 });
}


import { NextResponse } from 'next/server';
import { z } from 'zod';
import { otps } from '../../../../lib/auth-store';

const requestSchema = z.object({ name: z.string().trim().min(2), phone: z.string().regex(/^\d{10}$/), otp: z.string().regex(/^\d{4}$/) });
export async function POST(request: Request) {
  const body = requestSchema.safeParse(await request.json());
  if (!body.success) return NextResponse.json({ error: 'Enter the 4-digit OTP.' }, { status: 400 });
  const stored = otps.get(body.data.phone);
  if (!stored || stored.expiresAt < Date.now() || stored.code !== body.data.otp) return NextResponse.json({ error: 'Invalid or expired OTP.' }, { status: 401 });
  otps.delete(body.data.phone);
  return NextResponse.json({ authenticated: true, user: { name: body.data.name, phone: `+91 ${body.data.phone}`, role: 'PATIENT' } });
}

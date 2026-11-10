import { NextResponse } from 'next/server';
import { z } from 'zod';
import { MockPaymentProvider } from '../../../lib/providers';

const paymentSchema = z.object({ bookingReference: z.string().min(5), amount: z.number().int().positive() });
export async function POST(request: Request) {
  const body = paymentSchema.safeParse(await request.json());
  if (!body.success) return NextResponse.json({ error: 'Invalid payment details.' }, { status: 400 });
  const payment = await new MockPaymentProvider().createPayment(body.data.amount, body.data.bookingReference);
  return NextResponse.json({ ...payment, paymentStatus: 'PAID' });
}

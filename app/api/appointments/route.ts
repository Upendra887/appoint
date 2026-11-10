import { NextResponse } from 'next/server';
import { z } from 'zod';

const appointmentSchema = z.object({ doctorId: z.string(), date: z.string(), time: z.string(), mode: z.enum(['Exact appointment', 'Token queue', 'Arrival window']) });
const reservations = new Map<string, { expiresAt: number }>();

export async function POST(request: Request) {
  for (const [key, lock] of reservations) if (lock.expiresAt <= Date.now()) reservations.delete(key);
  const payload = appointmentSchema.safeParse(await request.json());
  if (!payload.success) return NextResponse.json({ error: 'Invalid appointment details', issues: payload.error.flatten() }, { status: 400 });
  const timeMatch = payload.data.time.match(/^(\d{1,2}):(\d{2})\s(AM|PM)$/);
  if (!timeMatch || !['00', '15', '30', '45'].includes(timeMatch[2])) return NextResponse.json({ error: 'Appointments are available in 15-minute intervals only.' }, { status: 400 });
  const key = `${payload.data.doctorId}:${payload.data.date}:${payload.data.time}`;
  const existing = reservations.get(key);
  if (existing && existing.expiresAt > Date.now()) return NextResponse.json({ error: 'This slot is temporarily locked by another patient.' }, { status: 409 });
  reservations.set(key, { expiresAt: Date.now() + 5 * 60 * 1000 });
  return NextResponse.json({ bookingReference: `SHC-${new Date().getFullYear()}-${String(reservations.size).padStart(6, '0')}`, status: 'PENDING_PAYMENT', lockExpiresInSeconds: 300 });
}

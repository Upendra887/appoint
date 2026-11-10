import { NextResponse } from 'next/server';

const queue = [
  { token: 12, status: 'WAITING', estimatedMinutes: 10 },
  { token: 13, status: 'CHECKED_IN', estimatedMinutes: 20 },
  { token: 14, status: 'WAITING', estimatedMinutes: 30 },
  { token: 15, status: 'PRIORITY', estimatedMinutes: 0 },
  { token: 16, status: 'BOOKED', estimatedMinutes: 40 }
];

export async function GET(_request: Request, context: { params: Promise<{ doctorId: string }> }) {
  const { doctorId } = await context.params;
  return NextResponse.json({ doctorId, currentlyServing: 11, patientsAhead: 5, estimatedWaitMinutes: 35, queue, updatedAt: new Date().toISOString() });
}

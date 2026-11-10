import { NextResponse } from 'next/server';
import { z } from 'zod';

const actionSchema = z.object({ action: z.enum(['CHECK_IN', 'SKIP', 'COMPLETE', 'DELAY', 'WALK_IN']), token: z.number().int().positive(), minutes: z.number().int().positive().optional() });
const events: Array<Record<string, string | number>> = [];
export async function POST(request: Request) {
  const body = actionSchema.safeParse(await request.json());
  if (!body.success) return NextResponse.json({ error: 'Invalid queue action.' }, { status: 400 });
  const event = { id: crypto.randomUUID(), ...body.data, createdAt: new Date().toISOString() };
  events.unshift(event);
  return NextResponse.json({ event, queueUpdated: true });
}
export async function GET() { return NextResponse.json({ events }); }

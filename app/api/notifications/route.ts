import { NextResponse } from 'next/server';
import { z } from 'zod';

const notificationSchema = z.object({ title: z.string().min(2), message: z.string().min(2), type: z.string().default('INFO') });
const notifications: Array<Record<string, string>> = [];
export async function GET() { return NextResponse.json({ notifications }); }
export async function POST(request: Request) {
  const body = notificationSchema.safeParse(await request.json());
  if (!body.success) return NextResponse.json({ error: 'Invalid notification.' }, { status: 400 });
  const item = { id: crypto.randomUUID(), ...body.data, createdAt: new Date().toISOString() };
  notifications.unshift(item);
  return NextResponse.json(item, { status: 201 });
}

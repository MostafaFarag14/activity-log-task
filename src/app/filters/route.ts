import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const actions = await prisma.eventAction.findMany({
    select: { id: true, name: true },
  });

  const events = await prisma.event.findMany({
    select: { actor_id: true, target_id: true },
    distinct: ["actor_id", "target_id"],
  });

  return NextResponse.json({ actions, events });
}

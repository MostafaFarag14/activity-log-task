import { events } from "@/utils/constants";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const response = await prisma.event.findMany();

  return NextResponse.json(response);
}

export async function POST(request: Request) {
  const { id, action, metadata, ...newEvent } = events?.[0];
  const result = await prisma.event.create({ data: newEvent });

  return NextResponse.json({ result });
}

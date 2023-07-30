import { events } from "@/utils/constants";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const pageParam = searchParams.get("page");
  const limitParam = searchParams.get("limit");
  const searchTextParam = searchParams.get("search_text") ?? undefined;

  const page = pageParam ? parseInt(pageParam) : undefined;
  const take = limitParam ? parseInt(limitParam) : 2;

  const response = await prisma.event.findMany({
    skip: page && take && page * take,
    take,
    include: { action: true, meta_data: true },
    orderBy: { occurred_at: "desc" },
    where: { actor_name: { contains: searchTextParam, mode: "insensitive" } },
  });

  return NextResponse.json(response);
}

export async function POST(request: Request) {
  const { id, action, meta_data, occurred_at, ...newEvent } = events?.[0];
  const eventActionId = "171edab5-87fc-4d31-9ec5-edc44ccccd7d";

  const result = await prisma.event.create({
    data: {
      ...newEvent,
      action: {
        connectOrCreate: {
          create: {
            id: eventActionId,
            name: action.name,
          },
          where: { id: eventActionId },
        },
      },
      meta_data: { create: meta_data },
    },
    include: { action: true, meta_data: true },
  });

  return NextResponse.json({ result });
}

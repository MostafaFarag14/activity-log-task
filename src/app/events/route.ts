import { events, limit } from "@/utils/constants";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const pageParam = searchParams.get("page");
  const limitParam = searchParams.get("limit");
  const searchTextParam = searchParams.get("search_text") ?? undefined;

  const actorId = searchParams.get("actor_id") ?? undefined;
  const targetId = searchParams.get("target_id") ?? undefined;
  const actionId = searchParams.get("action_id") ?? undefined;
  const actionName = searchParams.get("action_name") ?? undefined;

  const page = pageParam ? parseInt(pageParam) : undefined;
  const take = limitParam ? parseInt(limitParam) : limit;

  const response = await prisma.event.findMany({
    skip: page && take && page * take,
    take,
    include: { action: true, meta_data: true },
    orderBy: { occurred_at: "desc" },
    where: {
      AND: [
        {
          OR: [
            { action: { id: { equals: actionId } } },
            { action: { name: { equals: actionName } } },
          ],
        },
        { actor_id: { equals: actorId } },
        { target_id: { equals: targetId } },
        {
          OR: [
            { actor_name: { contains: searchTextParam, mode: "insensitive" } },
            { target_name: { contains: searchTextParam, mode: "insensitive" } },
            {
              action: {
                name: { contains: searchTextParam, mode: "insensitive" },
              },
            },
          ],
        },
      ],
    },
  });

  return NextResponse.json(response);
}

export async function POST(request: Request) {
  const randomIndex = Math.floor(Math.random() * events.length);
  const { id, action, meta_data, occurred_at, ...newEvent } =
    events?.[randomIndex];

  const eventActionId = action.id;

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

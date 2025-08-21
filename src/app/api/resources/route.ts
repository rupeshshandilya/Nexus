import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import { Prisma } from "@prisma/client";

export async function GET(req: Request) {
  try {
    // Get query parameters
    const { searchParams } = new URL(req.url);
    const tag = searchParams.get("tag");
    const sortBy = searchParams.get("sortBy") || "newest";
    const search = searchParams.get("search");
    const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
    const limit = Math.min(
      100,
      Math.max(1, parseInt(searchParams.get("limit") || "10"))
    );

    // Build the where clause
    const where: Prisma.ResourcesWhereInput = {};
    if (tag && tag !== "all") {
      where.tag = { has: tag };
    }
    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }

    // Build the orderBy clause
    const orderBy: Prisma.ResourcesOrderByWithRelationInput = {};

    switch (sortBy) {
      case "oldest":
        orderBy.createdAt = "asc";
        break;
      case "title-asc":
        orderBy.title = "asc";
        break;
      case "title-desc":
        orderBy.title = "desc";
        break;
      default: // 'newest'
        orderBy.createdAt = "desc";
    }

    const [resources, totalCount] = await Promise.all([
      prisma.resources.findMany({
        where,
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
        include: {
          user: {
            select: {
              userName: true,
            },
          },
        },
      }),
      prisma.resources.count({ where }),
    ]);

      return NextResponse.json({
      resources,
      pagination: {
        page,
        limit,
        total: totalCount,
        pages: Math.ceil(totalCount / limit)
      },
      message: "Resources fetched successfully",
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Failed to fetch resources",
    });
  }
}

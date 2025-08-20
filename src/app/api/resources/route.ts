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
    let useRawSorting = false;

    switch (sortBy) {
      case "oldest":
        orderBy.createdAt = "asc";
        break;
      case "title-asc":
        useRawSorting = true;
        break;
      case "title-desc":
        useRawSorting = true;
        break;
      default: // 'newest'
        orderBy.createdAt = "desc";
    }

    // Fetch resources with user information
    let resources;

    if (useRawSorting) {
      // Fetch all resources and sort case-insensitively on the server
      resources = await prisma.resources.findMany({
        where,
        include: {
          user: {
            select: {
              userName: true,
            },
          },
        },
      });

      // Sort case-insensitively on the server
      resources.sort((a, b) => {
        const titleA = a.title.toLowerCase();
        const titleB = b.title.toLowerCase();

        if (sortBy === "title-asc") {
          return titleA.localeCompare(titleB);
        } else {
          // title-desc
          return titleB.localeCompare(titleA);
        }
      });
    } else {
      // Use database sorting for date-based sorting
      resources = await prisma.resources.findMany({
        where,
        orderBy,
        include: {
          user: {
            select: {
              userName: true,
            },
          },
        },
      });
    }

    return NextResponse.json({
      status: 200,
      resources,
      message: "Resources fetched successfully",
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Failed to fetch resources",
      error: `Something went wrong ${error}`    
    });
  }
}

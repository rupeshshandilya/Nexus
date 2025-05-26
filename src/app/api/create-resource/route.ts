import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({
        status: 401,
        message: "Unauthorized - Please sign in to create a resource",
      });
    }

    const { title, description, imageUrl, link, tag } = await req.json();

    // Validate required fields
    if (!title || !description || !imageUrl || !link || !tag) {
      return NextResponse.json({
        status: 400,
        message:
          "Please provide all required fields: title, description, imageUrl, link, and tag",
      });
    }

    // Validate tag
    const validTags = ["UI", "Tools", "Resources", "Accessibility"];
    if (!validTags.includes(tag)) {
      return NextResponse.json({
        status: 400,
        message:
          "Invalid tag. Must be one of: UI, Tools, Resources, Accessibility",
      });
    }

    // Validate field lengths
    if (title.length > 100) {
      return NextResponse.json({
        status: 400,
        message: "Title must be less than 100 characters",
      });
    }

    if (description.length > 500) {
      return NextResponse.json({
        status: 400,
        message: "Description must be less than 500 characters",
      });
    }

    // Validate URLs
    try {
      new URL(imageUrl);
      new URL(link);
    } catch {
      return NextResponse.json({
        status: 400,
        message: "Please provide valid URLs for imageUrl and link",
      });
    }

    // Check if resource with same title already exists
    const existingResource = await prisma.resources.findFirst({
      where: {
        title: {
          equals: title,
          mode: "insensitive",
        },
      },
    });

    if (existingResource) {
      return NextResponse.json({
        status: 409,
        message: "A resource with this title already exists",
      });
    }

    // Get or create user
    let dbUser = await prisma.user.findUnique({
      where: {
        clerkUserId: userId,
      },
    });

    if (!dbUser) {
      dbUser = await prisma.user.create({
        data: {
          clerkUserId: userId,
          userName: "User", // Default username, can be updated later
        },
      });
    }

    // Create resource in database
    const resource = await prisma.resources.create({
      data: {
        title,
        description,
        imageUrl,
        link,
        userId: dbUser.id,
        tag,
      },
    });

    return NextResponse.json({
      status: 201,
      resource,
      message: "Resource created successfully",
    });
  } catch (error) {
    console.error("Error creating resource:", error);
    return NextResponse.json({
      status: 500,
      message: "Failed to create resource",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

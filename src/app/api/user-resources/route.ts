import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import { auth } from "@clerk/nextjs/server";

export async function GET() {
  try {
    const { userId: clerkUserId } = await auth();

    if (!clerkUserId) {
      return NextResponse.json({
        status: 401,
        message: "Unauthorized - Please sign in to view your resources",
      });
    }

    // Get the user from the database using clerkUserId
    const user = await prisma.user.findUnique({
      where: {
        clerkUserId,
      },
    });

    if (!user) {
      return NextResponse.json({
        status: 404,
        message: "User not found",
      });
    }

    // Fetch resources created by this user
    const resources = await prisma.resources.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        id: "desc", // Most recent first
      },
      include: {
        user: {
          select: {
            userName: true,
          },
        },
      },
    });

    return NextResponse.json({
      status: 200,
      resources,
      message: "User resources fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching user resources:", error);
    return NextResponse.json({
      status: 500,
      message: "Failed to fetch user resources",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

export async function PATCH(req: Request) {
  try {
    const { userId: clerkUserId } = await auth();
    if (!clerkUserId) {
      return NextResponse.json({
        status: 401,
        message: "Unauthorized - Please sign in to update your resource",
      });
    }

    const { id, title, description, imageUrl, link, tag } = await req.json();

    // Validate required fields
    if (!id || !title || !description || !imageUrl || !link || !tag) {
      return NextResponse.json({
        status: 400,
        message:
          "Please provide all required fields: id, title, description, imageUrl, link, and tag",
      });
    }

    // Get the user from the database using clerkUserId
    const user = await prisma.user.findUnique({
      where: { clerkUserId },
    });
    if (!user) {
      return NextResponse.json({
        status: 404,
        message: "User not found",
      });
    }

    // Find the resource and check ownership
    const resource = await prisma.resources.findUnique({
      where: { id },
    });
    if (!resource) {
      return NextResponse.json({
        status: 404,
        message: "Resource not found",
      });
    }
    if (resource.userId !== user.id) {
      return NextResponse.json({
        status: 403,
        message:
          "Forbidden - You do not have permission to update this resource",
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

    // Validate tag (optional: import resourceTags and check)
    // import { resourceTags } from "@/constants/resourceTags";
    // if (!resourceTags.includes(tag)) { ... }

    // Update the resource
    const updatedResource = await prisma.resources.update({
      where: { id },
      data: {
        title,
        description,
        imageUrl,
        link,
        tag,
      },
    });

    return NextResponse.json({
      status: 200,
      resource: updatedResource,
      message: "Resource updated successfully",
    });
  } catch (error) {
    console.error("Error updating resource:", error);
    return NextResponse.json({
      status: 500,
      message: "Failed to update resource",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

export async function DELETE(req: Request) {
  try {
    const { userId: clerkUserId } = await auth();
    if (!clerkUserId) {
      return NextResponse.json({
        status: 401,
        message: "Unauthorized - Please sign in to delete your resource",
      });
    }

    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({
        status: 400,
        message: "Resource id is required",
      });
    }

    // Get the user from the database using clerkUserId
    const user = await prisma.user.findUnique({
      where: { clerkUserId },
    });
    if (!user) {
      return NextResponse.json({
        status: 404,
        message: "User not found",
      });
    }

    // Find the resource and check ownership
    const resource = await prisma.resources.findUnique({
      where: { id },
    });
    if (!resource) {
      return NextResponse.json({
        status: 404,
        message: "Resource not found",
      });
    }
    if (resource.userId !== user.id) {
      return NextResponse.json({
        status: 403,
        message:
          "Forbidden - You do not have permission to delete this resource",
      });
    }

    // Delete the resource
    await prisma.resources.delete({
      where: { id },
    });

    return NextResponse.json({
      status: 200,
      message: "Resource deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting resource:", error);
    return NextResponse.json({
      status: 500,
      message: "Failed to delete resource",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

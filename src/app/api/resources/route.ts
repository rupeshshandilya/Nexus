import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export async function POST(req: Request) {
  
  try {
    const { title, description, tag,userId } = await req.json();

    // if any data not found
    if (!title || !description || !tag) {
      return NextResponse.json({
        status: 404,
        message: "Please Fill All Details",
      });
    }

    // Check if data is unique or not
    const isDataUnique = await prisma.resources.findFirst({
      where: {
        title: {
          equals: title,
          mode: "insensitive",
        },
      },
    });

    if (isDataUnique) {
      return NextResponse.json({
        status: 409,
        message: "Data with this title already exist!",
      });
    }

    // create resource in db
    const resource = await prisma.resources.create({
      data: {
        title: title,
        description: description,
        userId: userId,
        tag: tag,
      },
    });

    return NextResponse.json({
      status: 200,
      resource: resource,
      message: "Resource Created",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 500,
      message: "Something went wrong",
      error: error,
    });
  }
}

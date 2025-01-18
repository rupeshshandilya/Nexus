import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export async function POST(req: Request) {
  try {
    const { title, description, userId, tag } = await req.json();

    // if any data not found
    if (!title || !description || !userId || !tag) {
      return NextResponse.json({
        status: 404,
        message: "Please Fill All Details",
      });
    }

    // TODO: Field Length Need to set

    // Check if data is unique or not
    const isDataUnique = await prisma.resources.findFirst({
      where: {
        title: {
          equals: title,
          mode: 'insensitive'
        }
      },
    });

    if (isDataUnique) {
      return NextResponse.json({
        status: 409,
        message: "Data with this title already exist!",
      });
    }
    console.log("title: ", title);

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
    return NextResponse.json({
      status: 500,
      message: "Something went wrong",
      error: error
    });
  }
}

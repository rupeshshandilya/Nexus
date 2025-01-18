import prisma from "@/libs/prismadb";

export default async function getResource() {

  try {
    const allResources = await prisma.resources.findMany({});

    const resource = allResources.map((data) => ({
      ...data,
    }))
    return resource;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error);
  }
}

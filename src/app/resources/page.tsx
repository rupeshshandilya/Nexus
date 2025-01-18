import { Badge } from "@/components/ui/badge";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { cn } from "@/libs/utils";
import { Card } from "@radix-ui/themes";
import { ArrowUpRightFromSquare } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import getResource from "../actions/getResources";

const ResourcePage = async () => {
  const resources = await getResource();
  if (resources.length === 0) {
    return <>No Resource Found</>;
  }
  return (
    <>
      <Card className={cn("max-w-md max-h-[30rem]")}>
        {resources.map((data, index) => (
          <CardHeader key={index}  className="space-y-2 p-4 justify-between h-full">
            <div className="space-y-4">
              <CardTitle className="grid auto-cols-min grid-cols-1 grid-flow-col justify-between items-center">
                <Link
                  href="https://next-auth.js.org"
                  target="_blank"
                  className="flex items-center group"
                >
                  {data.title}
                  <ArrowUpRightFromSquare className="ml-2 inline h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                </Link>
                {/* <Bookmark */}
              </CardTitle>
              <div>
                <Link href="https://next-auth.js.org" target="_blank">
                  <div className="w-full relative aspect-video bg-muted rounded-lg hover:opacity-90 transition-opacity">
                    <Image
                      unoptimized
                      loading="eager"
                      placeholder="empty"
                      src="https://res.cloudinary.com/doopql2iw/image/upload/v1710038150/nextauth.jpg"
                      alt="Nextjs-logo"
                      fill
                      sizes="100% 100%"
                      className="rounded-lg object-cover"
                    />
                  </div>
                </Link>
              </div>
              <CardDescription>{data.description}</CardDescription>
            </div>

            <div>
              <div className="grid grid-flow-col justify-between items-end flex-wrap w-full">
                <div className="flex flex-wrap gap-2">
                  <Badge
                    className="font-medium opacity-75"
                    variant={"secondary"}
                  >
                    {/* Category */}
                    {data.tag}
                  </Badge>
                </div>
              </div>
            </div>
          </CardHeader>
        ))}
      </Card>
    </>
  );
};

export default ResourcePage;

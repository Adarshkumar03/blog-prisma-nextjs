"use server";

import { revalidatePath } from "next/cache";
import prisma from "../lib/db";
import { Prisma } from "@prisma/client";

export async function createPost(formdata: FormData) {
  try {
    await prisma.post.create({
      data: {
        title: formdata.get("title") as string,
        slug: (formdata.get("title") as string)
          .replace(/\s+/g, "-")
          .toLowerCase(),
        content: formdata.get("content") as string,
        author: {
          connect: {
            email: "john@email.com",
          },
        },
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        console.log(
          "This is a unique constraint violation, a new user cannot be treated with this email"
        );
      }
    }
  }

  revalidatePath("/posts");
}

export async function editPost(formdata: FormData, id: string) {
  await prisma.post.update({
    where: { id },
    data: {
      title: formdata.get("title") as string,
      slug: (formdata.get("title") as string)
        .replace(/\s+/g, "-")
        .toLowerCase(),
      content: formdata.get("content") as string,
    },
  });
}

export async function deletePost(id: string) {
  await prisma.post.delete({ where: { id } });
}

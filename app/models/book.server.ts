import { prisma } from "~/db.server";

export type { Book } from "@prisma/client";

export async function getBooks() {
  return prisma.book.findMany();
}

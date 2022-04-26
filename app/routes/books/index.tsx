import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getBooks } from "~/models/book.server";

type LoaderData = {
  books: Awaited<ReturnType<typeof getBooks>>;
};

export const loader: LoaderFunction = async () => {
  const books = await getBooks();
  return json<LoaderData>({ books });
};

export default function BooksRoute() {
  const { books } = useLoaderData() as LoaderData;
  return (
    <ul>
      {books.map((book) => (
        <li>{book.title}</li>
      ))}
    </ul>
  );
}

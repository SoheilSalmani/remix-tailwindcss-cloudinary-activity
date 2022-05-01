import type {
  LoaderFunction,
  ActionFunction,
  UploadHandler,
} from "@remix-run/node";
import { json, unstable_parseMultipartFormData } from "@remix-run/node";
import { Form, useLoaderData, useActionData } from "@remix-run/react";
import invariant from "tiny-invariant";

import { getBooks } from "~/models/book.server";
import { uploadImage } from "~/utils/utils.server";

type LoaderData = {
  books: Awaited<ReturnType<typeof getBooks>>;
};

type ActionData = {
  errorMsg?: string;
  imgSrc?: string;
  imgDesc?: string;
};

export const loader: LoaderFunction = async () => {
  const books = await getBooks();
  return json<LoaderData>({ books });
};

export const action: ActionFunction = async ({ request }) => {
  const uploadHandler: UploadHandler = async ({ name, stream }) => {
    if (name !== "img") {
      stream.resume();
      return;
    }
    const uploadedImage = await uploadImage(stream);
    invariant(uploadedImage, `image was not uploaded`);
    return uploadedImage.secure_url;
  };

  const formData = await unstable_parseMultipartFormData(
    request,
    uploadHandler
  );
  const imgSrc = formData.get("img");
  const imgDesc = formData.get("desc");
  if (!imgSrc) {
    return json({
      error: "something wrong",
    });
  }
  return json({
    imgSrc,
    imgDesc,
  });
};

export default function BooksRoute() {
  const { books } = useLoaderData() as LoaderData;
  const data = useActionData<ActionData>();
  return (
    <>
      <ul>
        {books.map((book) => (
          <li>{book.title}</li>
        ))}
      </ul>
      <Form method="post" encType="multipart/form-data">
        <label htmlFor="img-field">Image to upload</label>
        <input id="img-field" type="file" name="img" accept="image/*" />
        <label htmlFor="img-desc">Image description</label>
        <input id="img-desc" type="text" name="desc" />
        <button type="submit">upload to cloudinary</button>
      </Form>
      {data?.errorMsg && <h2>{data.errorMsg}</h2>}
      {data?.imgSrc && (
        <>
          <h2>uploaded image</h2>
          <img src={data.imgSrc} alt={data.imgDesc || "Upload result"} />
        </>
      )}
    </>
  );
}

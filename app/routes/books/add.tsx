import type {
  LoaderFunction,
  ActionFunction,
  UploadHandler,
} from "@remix-run/node";
import { json, unstable_parseMultipartFormData } from "@remix-run/node";
import { Form, useLoaderData, useActionData } from "@remix-run/react";
import invariant from "tiny-invariant";

import { uploadImage } from "~/utils/utils.server";

type ActionData = {
  errorMsg?: string;
  imgSrc?: string;
  imgDesc?: string;
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

const inputClass =
  "outline-none w-full text-base rounded focus:ring-2 focus:ring-indigo-500 mt-1 px-2 py-1";

export default function BooksRoute() {
  const data = useActionData<ActionData>();
  return (
    <div className="space-y-4">
      <h1 className="text-4xl font-extrabold">Add a Book</h1>
      <hr />
      <Form
        method="post"
        encType="multipart/form-data"
        className="grid grid-cols-2 gap-4"
      >
        <div className="flex flex-col">
          <h2 className="mb-4 text-2xl font-bold">Book Info</h2>
          <div className="space-y-3">
            <p>
              <label className="font-light">
                Title <input className={inputClass} type="text" name="title" />
              </label>
            </p>
            <p>
              <label className="font-light">
                Subtitle{" "}
                <input className={inputClass} type="text" name="desc" />
              </label>
            </p>
            <p>
              <label className="font-light">
                Edition <input className={inputClass} type="text" name="desc" />
              </label>
            </p>
            <p>
              <label className="font-light">
                ISBN <input className={inputClass} type="text" name="desc" />
              </label>
            </p>
            <p>
              <label className="font-light">
                Source <input className={inputClass} type="text" name="desc" />
              </label>
            </p>
            <p>
              <label className="font-light">
                Link <input className={inputClass} type="text" name="desc" />
              </label>
            </p>
          </div>
          <button
            className="focus:ring-offset-bg-100 mt-auto rounded bg-indigo-500 px-2 py-1 text-white outline-none hover:bg-indigo-600 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            type="submit"
          >
            Add Book
          </button>
        </div>
        <div className="space-y-4">
          <h2 className="mb-4 text-2xl font-bold">Cover</h2>
          <p>
            <label>
              <input
                className="focus:ring-offset-bg-100 w-full cursor-pointer rounded bg-white outline-none file:mr-4 file:cursor-pointer file:border-0 file:bg-indigo-500 file:px-2 file:py-1 file:text-white hover:file:bg-indigo-600 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                type="file"
                name="img"
                accept="image/*"
              />
            </label>
          </p>
          <p className="flex aspect-square w-full items-center justify-center bg-gray-200">
            No image
          </p>
        </div>
      </Form>
      {data?.errorMsg && <h2>{data.errorMsg}</h2>}
      {data?.imgSrc && (
        <>
          <h2>uploaded image</h2>
          <img src={data.imgSrc} alt={data.imgDesc || "Upload result"} />
        </>
      )}
    </div>
  );
}

"use client";

// You need to import our styles for the button to look right. Best to import in the root /layout.tsx but this is fine
import "@uploadthing/react/styles.css";
import { UploadButton } from "@uploadthing/react";
import { OurFileRouter } from "../api/uploadthing/core";
import { useState } from "react";
import { useFormikContext } from "formik";

export default function ImageUploadButton() {
  const { setFieldValue } = useFormikContext();
  const [success, setSuccess] = useState(false);

  return (
    <main className="flex flex-col items-center justify-between mt-3">
      Upload Profile Picture
      <UploadButton<OurFileRouter>
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          if (!res) {
            throw new Error("Upload Failed");
          }
          console.log("Files: ", res);
          setFieldValue("picture", res[0].fileUrl);
          setSuccess(true);
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
      {success && <p>Profile Picture Successfully Uploaded</p>}
    </main>
  );
}

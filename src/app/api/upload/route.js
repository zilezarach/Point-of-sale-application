import { NextResponse } from "next/server";
import multer from "multer";
import path from "path";
import fs from "fs";

const upload = multer({
  storage: multer.diskStorage({
    destination: "./public/uploads",
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  }),
});

export async function POST(request) {
  return new Promise((resolve, reject) => {
    const form = new FormData();
    form.append("image", request.body);

    upload.single("image")(request, {}, (err) => {
      if (err) {
        return reject(
          NextResponse.json({ error: "Upload failed" }, { status: 400 }),
        );
      }
      const imageUrl = `/uploads/${request.file.filename}`;
      resolve(NextResponse.json({ imageUrl }));
    });
  });
}

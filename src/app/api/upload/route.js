import formidable from "formidable";
import fs from "fs";
import path from "path";

// Disable the default body parser
export const config = {
  api: {
    bodyParser: false,
  },
};

// Named export for handling POST requests
export default async function handler(req, res) {
  if (req.method === "POST") {
    const form = new formidable.IncomingForm();
    form.uploadDir = path.join(process.cwd(), "public/uploads");
    form.keepExtensions = true;

    form.parse(req, (err, fields, files) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      if (!files.image) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const file = files.image[0];
      const filePath = `/uploads/${path.basename(file.filepath)}`;

      res.status(200).json({ imageUrl: filePath });
    });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

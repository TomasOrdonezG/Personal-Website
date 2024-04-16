import express from "express";
import fs from "fs";
import path from "path";

const photographyRoute = express.Router();

photographyRoute.get("/:collection", (req, res) => {
  const collection = req.params.collection;
  const imageDirectory = `${__dirname}/photos/${collection}`;
  fs.readdir(imageDirectory, (err, files) => {
    if (err) {
      console.log(`Error: ${err}`);
      return res.json({ message: "That collection does not exist!" });
    }

    // Create an array to hold image file names and base64-encoded data
    const imageList: string[] = [];

    // Loop through each image file
    files.forEach((imageName) => {
      const imagePath = path.join(imageDirectory, imageName);

      // Read the image file as base64-encoded data
      const imageBase64 = fs.readFileSync(imagePath, { encoding: "base64" });

      // Push the image file name and data to the array
      imageList.push(imageBase64);
    });

    // Send the image list as a response
    res.json({ images: imageList });
  });
});

export default photographyRoute;

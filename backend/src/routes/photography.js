"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const photographyRoute = express_1.default.Router();
photographyRoute.get("/:collection", (req, res) => {
    const collection = req.params.collection;
    const imageDirectory = `${__dirname}/photos/${collection}`;
    fs_1.default.readdir(imageDirectory, (err, files) => {
        if (err) {
            console.log(`Error: ${err}`);
            return res.json({ message: "That collection does not exist!" });
        }
        // Create an array to hold image file names and base64-encoded data
        const imageList = [];
        // Loop through each image file
        files.forEach((imageName) => {
            const imagePath = path_1.default.join(imageDirectory, imageName);
            // Read the image file as base64-encoded data
            const imageBase64 = fs_1.default.readFileSync(imagePath, { encoding: "base64" });
            // Push the image file name and data to the array
            imageList.push(imageBase64);
        });
        // Send the image list as a response
        res.json({ images: imageList });
    });
});
exports.default = photographyRoute;

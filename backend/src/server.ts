import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import photographyRoute from "./routes/photography";

import { PORT } from "../config";
import contactRoute from "./routes/contact";

// App init
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

// Routes
app.use("/photography", photographyRoute);
app.use("/contact", contactRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

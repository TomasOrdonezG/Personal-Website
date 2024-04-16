"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const photography_1 = __importDefault(require("./routes/photography"));
const config_1 = require("../config");
const contact_1 = __importDefault(require("./routes/contact"));
// App init
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use(express_1.default.static("public"));
// Routes
app.use("/photography", photography_1.default);
app.use("/contact", contact_1.default);
app.listen(config_1.PORT, () => {
    console.log(`Server running on port ${config_1.PORT}`);
});

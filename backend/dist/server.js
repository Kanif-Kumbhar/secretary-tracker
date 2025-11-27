"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const admin_route_1 = __importDefault(require("./api/admin-route"));
const user_route_1 = __importDefault(require("./api/user-route"));
const teacher_route_1 = __importDefault(require("./api/teacher-route"));
const port = 9000;
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: process.env.FRONT_END_URL,
    },
});
exports.io = io;
io.on("connection", (socket) => {
    console.log("a user connected", socket.id);
});
io.on("disconnect", (socket) => {
    console.log("user disconnected", socket.id);
});
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get("/", async (req, res) => {
    res.json({
        message: "Backend for todo list application",
    });
});
app.use("/api/user", user_route_1.default);
app.use("/api/admin", admin_route_1.default);
app.use("/api/teacher", teacher_route_1.default);
server.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});

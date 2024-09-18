"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const messageSchema = new mongoose_1.Schema({
    senderId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    receiverId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
}, { timestamps: true });
const Message = (0, mongoose_1.model)("Message", messageSchema);
exports.default = Message;

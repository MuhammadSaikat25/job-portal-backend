import { RequestHandler } from "express";
import Conversation from "./conversation.model";
import Message from "./message.model";
import { TRequest } from "../../middlewares/auth";

export const sendMessage: RequestHandler = async (req: TRequest, res, next) => {
  try {
    const { message } = req.body;

    const { id: receiverId } = req.params;
    const senderId = req?.user?._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    await Promise.all([conversation.save(), newMessage.save()]);

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getMessages: RequestHandler = async (req: TRequest, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req?.user?._id;
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages");
    if (!conversation) return res.status(200).json([]);

    const messages = conversation.messages;

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error });
  }
};
export const messageController = {
  sendMessage,
  getMessages,
};

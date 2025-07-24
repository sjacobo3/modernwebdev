import Parse from "parse";
import { getCurrentUser } from "./AuthService";

// READ - get all conversations for a user
export const getConversations = async () => {

    const currentUser = Parse.User.current();
    if (!currentUser) return [];

    const Conversation = Parse.Object.extend("Conversation");
    const query = new Parse.Query(Conversation);

    query.equalTo("participants", currentUser); 
    query.include("participants");
    query.ascending("createdAt");

    try {
        return await query.find();
    } catch (error) {
        console.error(error);
        return [];
    }
};

// CREATE - create a new conversation
export const createConversation = async (receiverId, title) => {
    const Conversation = Parse.Object.extend("Conversation");
    const conversation = new Conversation();

    const sender = Parse.User.current();
    const receiver = new Parse.User();
    receiver.set("objectId", receiverId);

    const participants = [sender, receiver];
    conversation.set("participants", participants);
    conversation.set("title", title);
    
    return conversation.save().then(
        (savedConversation) => {
            return savedConversation;
        }
    );
};

// READ - get all messages for a conversation
export const getMessages = async (conversationId) => {
    const Message = Parse.Object.extend("Message");
    const query = new Parse.Query(Message);

    const conversation = new Parse.Object("Conversation");
    conversation.set("objectId", conversationId);

    query.equalTo("conversation", conversation);
    query.include(["sender", "receiver"]);
    query.ascending("createdAt");


    return query.find().then(
        (messages) => {
            return messages.map(msg => ({
                id: msg.id,
                sender: msg.get("sender"),
                receiver: msg.get("receiver"),
                content: msg.get("content"),
                createdAt: msg.get("createdAt")
            }));
        }
    ).catch(
        (error) => {
            console.error(error);
            return [];
        }
    );
};

// CREATE - send a new message in a conversation
export const createMessage = async (conversationId, content, receiverId) => {
    const currUser = getCurrentUser();

    const conversation = Parse.Object.extend("Conversation");
    conversation.set("objectId", conversationId);

    const receiver = new Parse.User();
    receiver.set("objectId", receiverId);

    const Message = Parse.Object.extend("Message");
    const message = new Message();

    message.set("conversation", conversation);
    message.set("content", content);
    message.set("sender", currUser);
    message.set("receiver", receiver);

    try {
        const savedMessage = await message.save();

        const messageQuery = new Parse.Query(Message);
        messageQuery.include(["sender", "receiver"]);
        const fullMessage = await messageQuery.get(savedMessage.id);

        return fullMessage;
    } catch (error) {
        console.error(error);
        return null;
    }
};
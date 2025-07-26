import { useEffect, useState, useCallback } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box, TextField } from "@mui/material";
import { getCurrentUser } from "../../Services/AuthService";
import { getMessages, createMessage } from "../../Services/MessageService";
import Message from "./Message";

// shows all messages for a conversation in a dialog
const ConversationDialog = ({ open, onClose, conversation }) => {
    const [messages, setMessages] = useState([]);
    const [messageContent, setMessageContent] = useState("");   

    // wrapping fetchMessages in useCallback to avoid unnecessary re-creations and fix react-hooks/exhaustive-deps warning
    const fetchMessages = useCallback(async () => {
        const msgs = await getMessages(conversation.id);
        setMessages(msgs);
    }, [conversation.id]);

    // Fetch messages when dialog opens or conversation changes
    useEffect(() => {
        if (open && conversation) {
            fetchMessages();
        }
    }, [open, conversation, fetchMessages]);   

    // Refresh messages after sending a new one
    const handleMessageSent = async () => {
        if (!messageContent.trim()) return;
        const participants = conversation.get("participants") || [];
        const receiverId = participants.find(p => p.id !== getCurrentUser().id)?.id;
        if (!receiverId) return;
        await createMessage(conversation.id, messageContent, receiverId);
        setMessageContent("");
        await fetchMessages();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
            <DialogTitle>{conversation?.get("title") || "New Conversation"}</DialogTitle>

            <DialogContent>
                {/* render conversation messages */}
                <Box sx={{ minHeight: 200, mb: 2 }}>
                    {messages.length > 0 ? (
                        messages.map((msg) => (
                            <Message key={msg.id} message={msg} />
                        ))
                    ) : (
                        <Typography variant="body2">No messages yet.</Typography>
                    )}
                </Box>

                {/* send a new message */}
                <Box sx={{ display: "flex", flexDirection: "column", mt: 2, gap: 1 }}>
                    <TextField
                        fullWidth
                        multiline
                        rows={2}
                        placeholder="Type your message here..."
                        value={messageContent}
                        onChange={(e) => setMessageContent(e.target.value)}
                    />
                    <Button variant="contained" onClick={handleMessageSent} disabled={!messageContent.trim()}>Send</Button>
                </Box>

            </DialogContent>
            
            <DialogActions>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConversationDialog; 
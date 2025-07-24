import { useState, useEffect } from "react";
import { TextField, 
    Button, 
    Dialog, DialogActions, DialogContent, DialogTitle, 
    Select, MenuItem, 
    FormControl, InputLabel 
} from "@mui/material";

import { getAllUsers } from "../../Services/AuthService";
import { createConversation, createMessage } from "../../Services/MessageService";

const ConversationForm = ({ onClose, conversations = [], onRedirectToConversation, fetchConversations }) => {
    const [messageContent, setMessageContent] = useState("");
    const [receiverId, setReceiverId] = useState("");
    const [title, setTitle] = useState("");

    const [users, setUsers] = useState([]);

    useEffect(() => {
        getAllUsers().then((u) => {
            setUsers(u);
        });
    }, []);

    // Check for existing conversation when receiverId changes
    useEffect(() => {
        if (!receiverId) return;
        // Find a conversation with the selected user as a participant
        const existing = conversations.find(conv => {
            const participants = conv.get("participants");
            return participants.some(p => p.id === receiverId);
        });
        if (existing && onRedirectToConversation) {
            onClose();
            onRedirectToConversation(existing);
        }
    }, [receiverId, conversations, onClose, onRedirectToConversation]);

    // create conversation and message, close form, and fetch all conversations to show new one
    const handleSendMessage = () => {
        createConversation(receiverId, title).then((conversation) => {
            createMessage(conversation.id, messageContent, receiverId);
        });
        onClose();
        fetchConversations();
    };

    return (
        <Dialog open={true} onClose={onClose}>
            <DialogTitle>New Conversation</DialogTitle>
            <DialogContent>
                <FormControl fullWidth sx={{ my: 2 }}>
                    <InputLabel>Sending To</InputLabel>
                    <Select
                        fullWidth
                        value={receiverId}
                        onChange={(e) => setReceiverId(e.target.value)}
                        label="Receiver ID"
                    >
                        {users.map((user) => (
                            <MenuItem key={user.id} value={user.id}>
                                {user.get("firstName")} {user.get("lastName")}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <TextField
                    fullWidth
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    label="Title"
                    sx={{ mb: 2 }}
                />

                <TextField
                    fullWidth
                    multiline
                    rows={4}
                    value={messageContent}
                    onChange={(e) => setMessageContent(e.target.value)}
                    label="Type your message"
                />
            </DialogContent>

            <DialogActions sx={{ justifyContent: "center", mb: 2 }}>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSendMessage} variant="contained">Send</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConversationForm;

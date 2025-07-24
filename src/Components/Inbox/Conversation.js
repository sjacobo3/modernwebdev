import { Box, Typography, Avatar } from "@mui/material";
import { getCurrentUser } from "../../Services/AuthService";

// Conversation component is now only for listing or previewing a conversation.
// All dialog/message logic is handled by ConversationDialog.js.
const Conversation = ({ conversation, onClick }) => {
    // display conversation title
    const title = conversation.get("title");

    // get receiver initials
    const participants = conversation.get("participants");
    const currUser = getCurrentUser();
    const receiver = participants.find(p => p.id !== currUser?.id);
    let receiverInitials = "?";
    if (receiver) {
        const firstName = receiver.get("firstName");
        const lastName = receiver.get("lastName");
        receiverInitials = (firstName.charAt(0) + lastName.charAt(0)).toUpperCase();
    }

    return (
        <Box 
            onClick={onClick} 
            sx={{ 
                display: "flex", 
                alignItems: "center", 
                gap: 2, 
                cursor: "pointer", 
                p: 2,
                "&:hover": { backgroundColor: "#f0f0f0" },
                borderRadius: "10px",
            }}
        >
            <Avatar sx={{ width: 40, height: 40 }}>{receiverInitials}</Avatar>
            <Typography variant="subtitle1">{title}</Typography>
        </Box>
    );
};

export default Conversation;
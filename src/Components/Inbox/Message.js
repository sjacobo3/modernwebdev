import { Box, Typography } from "@mui/material";
import { getCurrentUser } from "../../Services/AuthService";

const Message = ({ message }) => {

    const currUserId = getCurrentUser()?.id;
    const sender = message.sender;
    const isSender = sender?.id === currUserId;

    const name = isSender ? "You" : sender?.get("firstName") + " " + sender?.get("lastName");
    const content = message.content;

    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: isSender ? "flex-end" : "flex-start", my:2, px:2 }}>

            <Typography variant="subtitle2">
                {name}
            </Typography>

            <Typography 
                variant="body1"
                sx={{
                    backgroundColor: isSender ? "#8db8e2" : "#F1F0F0",
                    borderRadius: "10px",
                    p: 1,
                    maxWidth: "80%",
                    alignSelf: isSender ? "flex-end" : "flex-start",
                }}
            >
                {content}
            </Typography>

        </Box>
    );
}   

export default Message;
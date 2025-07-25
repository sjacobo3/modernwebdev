import { useEffect, useState } from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { getConversations } from "../../Services/MessageService";
import Conversation from "./Conversation";
import ConversationDialog from "./ConversationDialog";
import ConversationForm from "./ConversationForm";

// Inbox shows all conversations. Clicking one opens a dialog with its messages.
const Inbox = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newConversationFormOpen, setNewConversationFormOpen] = useState(false);
  const [fetchConversations, setFetchConversations] = useState(false);

  // get all conversations for the current user
  useEffect(() => {
    const loadConversations = async () => {
      const convs = await getConversations();
      setConversations(convs);
      setFetchConversations(false);
    };
    loadConversations();
  }, [fetchConversations]);

  // open dialog for a selected conversation
  const handleOpenDialog = (conversation) => {
    setSelectedConversation(conversation);
    setDialogOpen(true);
  };

  // close the dialog
  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedConversation(null);
  };

  // open new conversation form
  const handleNewConversation = () => {
    setNewConversationFormOpen(true);
  };

  // close new conversation form
  const handleCloseNewConversation = () => {
    setNewConversationFormOpen(false);
  };

  return (
    <Container maxWidth="lg" sx={{ my: 8 }}>
      <Box align="center">
        <Typography variant="h1" sx={{ mb: 4 }}>
          Inbox
        </Typography>

        <Button
          variant="contained"
          onClick={handleNewConversation}
          sx={{ mb: 2 }}
        >
          New Conversation
        </Button>
      </Box>

      {/* new conversation form */}
      {newConversationFormOpen && (
        <ConversationForm
          open={newConversationFormOpen}
          onClose={handleCloseNewConversation}
          conversations={conversations}
          onRedirectToConversation={handleOpenDialog}
          fetchConversations={() => setFetchConversations(true)}
        />
      )}

      {/* list all conversations */}
      {conversations.length > 0 ? (
        conversations.map((conversation) => (
          <Conversation
            key={conversation.id}
            conversation={conversation}
            onClick={() => handleOpenDialog(conversation)}
          />
        ))
      ) : (
        <Typography variant="h6" align="center">
          No conversations yet.
        </Typography>
      )}

      {/* dialog for viewing messages in a conversation */}
      {selectedConversation && (
        <ConversationDialog
          open={dialogOpen}
          onClose={handleCloseDialog}
          conversation={selectedConversation}
        />
      )}
    </Container>
  );
};

export default Inbox;

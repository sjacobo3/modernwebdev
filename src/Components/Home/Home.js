import { Container, Typography, Paper } from "@mui/material";

function Home() {
  return (
    <Container maxWidth="md" sx={{ my: 8 }}>
      <Paper sx={{ padding: 4, backgroundColor: "white" }}>
        <Typography variant="h2" mb={4}>
          Help fellow students choose their courses wisely!
        </Typography>

        <Typography variant="body1">
          Inspired by popular tools like Rate My Professors, we created a single
          platform where you can plan your academic journey in one convenient
          place. Explore valuable insights from other Notre Dame students and
          even connect with alumni. Join our community and share your
          experiences to help others succeed!
        </Typography>
      </Paper>
    </Container>
  );
}

export default Home;

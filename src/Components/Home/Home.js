import { Container, Typography, Paper, Box} from "@mui/material";
import NDImage from "../../assets/NotreDame.jpg";


function Home() {
  return (
    //add ND banner 
    <Container maxWidth="md" sx={{ my: 8 }}> 
      <Paper sx={{ padding: 4, backgroundColor: "white" }}>
        <Box mb={4}>
        <img
        src={NDImage}
        alt="Notre Dame"
        style={{ width: "100%", height: "250px", objectFit: "cover", borderRadius: "12px" }}
        />
      </Box>
        <Typography variant="h1" mb={4}>
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

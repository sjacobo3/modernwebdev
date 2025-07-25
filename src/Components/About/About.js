import {
  Container,
  Box,
  Paper,
  Typography,
  Stack,
  Divider,
} from "@mui/material";

function About() {
  return (
    <Container maxWidth="md" sx={{ my: 8 }}>
      <Paper sx={{ padding: 4, backgroundColor: "white" }}>
        <Typography variant="h4">About Pick My Professor</Typography>

        <Divider sx={{ my: 2 }} />

        <Typography variant="body1" sx={{ mb: 3 }}>
          This app was created to help students manage the classes they'll take
          as a student at Notre Dame. It's an essential tool for navigating your
          academic journey, exploring course reviews and curate a personalized
          academic plan by saving classes that align with your goals. You can
          actively participate by creating, updating, and deleting your own
          course reviews, and easily find specific insights by filtering reviews
          by department, professor, requirement status, and the semester other
          students took the course.
        </Typography>

        <Typography variant="body2" sx={{ fontStyle: "italic" }}>
          This project was created for CSE40695 Modern Web Development.
        </Typography>

        <Stack spacing={1} sx={{ mt: 3 }}>
          <Typography variant="h6">Contributors</Typography>
          <Box>
            <Typography variant="subtitle1">Margaret Aiyenero</Typography>
            <Typography variant="body2">maiyenero@nd.edu</Typography>
          </Box>
          <Box>
            <Typography variant="subtitle1">Samara Jacobo</Typography>
            <Typography variant="body2">sjacobo3@nd.edu</Typography>
          </Box>
        </Stack>
      </Paper>
    </Container>
  );
}

export default About;

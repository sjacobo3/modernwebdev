import { useEffect, useState } from "react";
import { getAllReviews } from "../../Services/ReviewService";
import ReviewList from "./ReviewList";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [searchBar, setSearchBar] = useState("");

  const [loading, setLoading] = useState(true);
  const [showUser, setShowUser] = useState(true);
  const [searchType, setSearchType] = useState("courseCode"); //default
  const [sortType, setSortType] = useState("likes"); //default

  // get all reviews
  const fetchReviews = () => {
    setLoading(true);
    getAllReviews()
      .then((results) => {
        setReviews(results);
        setShowUser(true);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // filter reviews by selected search type, then by search bar
  const filteredReviews = reviews.filter((review) => {
    const searchValue = searchBar.toLowerCase();
    let matches = true;
    if (searchType === "code") {
      matches = review
        .get("course")
        ?.get("code")
        .toLowerCase()
        .includes(searchValue);
    } else if (searchType === "professor") {
      matches = review
        .get("professor")
        ?.get("name")
        ?.toLowerCase()
        .includes(searchValue);
    } else if (searchType === "semester") {
      matches = review
        .get("semesterTaken")
        ?.toLowerCase()
        .includes(searchValue);
    }

    return matches;
  });

  const sortedReviews = filteredReviews.sort((a, b) => {
    if (sortType === "likes") {
      const likesA = a.get("likes")?.length || 0;
      const likesB = b.get("likes")?.length || 0;
      return likesB - likesA; // Sort by likes in descending order
    } else if (sortType === "code") {
      const codeA = a.get("course")?.get("code") || "";
      const codeB = b.get("course")?.get("code") || "";
      return codeA.localeCompare(codeB); // Sort by course code alphabetically
    } else {
      return 0;
    }
  });

  return (
    <Container maxWidth="lg" sx={{ my: 8 }}>
      <Typography variant="h1" align="center" sx={{ mb: 4 }}>
        Reviews
      </Typography>

      {/* Search Controls */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap={2}
        mb={4}
        flexWrap="wrap"
      >
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel id="search-type-label">Filter By</InputLabel>
          <Select
            label="Filter By"
            labelId="search-type-label"
            id="searchType"
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
          >
            <MenuItem value="code">Course Code</MenuItem>
            <MenuItem value="professor">Professor</MenuItem>
            <MenuItem value="semester">Semester</MenuItem>
          </Select>
        </FormControl>

        <TextField
          size="small"
          label={`Search bar`}
          variant="outlined"
          value={searchBar}
          onChange={(e) => setSearchBar(e.target.value)}
        />

        <Button
          variant="outlined"
          onClick={() => {
            setSearchBar("");
          }}
        >
          Clear
        </Button>

        {/* sort controls by most liked */}
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel id="sort-type-label">Sort By</InputLabel>
          <Select
            label="Sort By"
            labelId="sort-type-label"
            id="sortType"
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
          >
            <MenuItem value="likes">Most Liked</MenuItem>
            <MenuItem value="code">Course Code</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <ReviewList
        reviews={sortedReviews}
        loading={loading}
        showUser={showUser}
        seeReplyButton={true}
      />
    </Container>
  );
};

export default Reviews;

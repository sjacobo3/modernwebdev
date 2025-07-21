import React, { useEffect, useState } from "react";
import { getAllReviews } from "../../Services/ReviewService";
import ReviewList from "./ReviewList";

import { Box, Button, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";

const ReviewMain = () => {
  const [reviews, setReviews] = useState([]);
  const [searchBar, setSearchBar] = useState("");
  const [searchType, setSearchType] = useState("courseCode");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllReviews()
    .then((results) => {
      console.log("Fetched reviews:", results);
      setReviews(results);
      setLoading(false);
      })
    .catch((error) => {
      console.error("Error fetching reviews:", error);
      setLoading(false);
      })
    }, []);

  const filteredReviews = reviews.filter((review) => {
    const searchValue = searchBar.toLowerCase();    // filter by search
    // can include more to searchType later
    const courseCode = review.get("courseCode").toLowerCase();

    // filtering by course code
    if (searchType === "courseCode") {
      return courseCode.includes(searchValue);
    }
    return true;
  });

  return (
    <Container maxWidth="xl" sx={{ mb:4 }}>
      <Typography variant="h1" align="center" gutterBottom>
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
            onChange={ (e) => setSearchType(e.target.value) } 
          >
            <MenuItem value="courseCode">Course Code</MenuItem>
          </Select>
        </FormControl>

        <TextField
          size="small"
          label="Search"
          variant="outlined"
          value={searchBar}
          onChange={(e) => setSearchBar(e.target.value)}
        />

        <Button 
          variant="outlined"
          onClick={() => setSearchBar("")}
        >
          Clear
        </Button>

      </Box>
      
      {/* (Filtered) Results */}
      <ReviewList reviews={filteredReviews} loading={loading} />

    </Container>
  );
};

export default ReviewMain;
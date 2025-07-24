import React, { useEffect, useState } from "react";
import { getAllReviews } from "../../Services/ReviewService";
import ReviewList from "./ReviewList";
import { Box, Button, Container, TextField, Typography, Select, MenuItem, FormControl, InputLabel } from "@mui/material";

const ReviewMain = () => {
  const [reviews, setReviews] = useState([]);
  const [searchBar, setSearchBar] = useState("");
  
  const [loading, setLoading] = useState(true);
  const [showUser, setShowUser] = useState(true);
  const [majorRequirement, setMajorRequirement] = useState('');
  const [semester, setSemester] = useState('');
  const [searchType, setSearchType] = useState("courseCode"); //default

  
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
    if (searchType === "courseCode") {
      matches = review.get("courseCode")?.toLowerCase().includes(searchValue);
    } else if (searchType === "professor") {
      matches = review.get("professor")?.get("name")?.toLowerCase().includes(searchValue);
    } else if (searchType === "department") {
      matches = review.get("department")?.get("abbreviation")?.toLowerCase().includes(searchValue);
    } else if (searchType === "majorRequirement") {
      matches = (review.get("majorRequirement") ? "true" : "false") === searchBar.toLowerCase();
    } else if (searchType === "semester") {
      matches = review.get("semester")?.toLowerCase().includes(searchValue);
    }
    if (majorRequirement && (review.get("majorRequirement") ? "true" : "false") !== majorRequirement) {
      return false;
    }
    if (semester && review.get("semester") !== semester) {
      return false;
    }
    
    return matches;
  })
  .sort((a, b) => {
    if (searchType === "likes") {
      const likesA = a.get("likes")?.length || 0; 
      const likesB = b.get("likes")?.length || 0;
      return likesB - likesA; // Sort by likes in descending order
    } else {
      return 0
    }
    });

  return (
    <Container maxWidth="xl" sx={{ mb:4 }}>
      <Typography variant="h1" align="center"  >
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
            <MenuItem value="professor">Professor</MenuItem>
            <MenuItem value="department">Department</MenuItem>
            <MenuItem value="majorRequirement">Major Requirement</MenuItem>
            <MenuItem value="semester">Semester</MenuItem>
            <MenuItem value="likes">Most Liked</MenuItem>
          </Select>
        </FormControl>

        <TextField
          size="small"
          label={`Search by ${searchType.charAt(0).toUpperCase() + searchType.slice(1)}`}
          variant="outlined"
          value={searchBar}
          onChange={(e) => setSearchBar(e.target.value)}
        />
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel id="major-req-filter-label">Major Req?</InputLabel>
          <Select
            labelId="major-req-filter-label"
            value={majorRequirement}
            onChange={e => setMajorRequirement(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="true">Yes</MenuItem>
            <MenuItem value="false">No</MenuItem>
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel id="semester-filter-label">Semester</InputLabel>
          <Select
            labelId="semester-filter-label"
            value={semester}
            onChange={e => setSemester(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Fall 2023">Fall 2023</MenuItem>
            <MenuItem value="Spring 2023">Spring 2023</MenuItem>
            <MenuItem value="Summer 2023">Summer 2023</MenuItem>
            <MenuItem value="Fall 2022">Fall 2022</MenuItem>
            <MenuItem value="Spring 2022">Spring 2022</MenuItem>
            <MenuItem value="Summer 2022">Summer 2022</MenuItem>
          </Select>
        </FormControl>
        <Button variant="outlined" onClick={() => { setSearchBar(""); setMajorRequirement(""); setSemester(""); }}>Clear</Button>
      </Box>

      <ReviewList reviews={filteredReviews} loading={loading} showUser={showUser} />
    </Container>
  );
};

export default ReviewMain;
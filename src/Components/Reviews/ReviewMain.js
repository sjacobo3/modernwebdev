import React, { useEffect, useState } from "react";
import { getAllReviews } from "../../Services/ReviewService";
import ReviewList from "./ReviewList";

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
        <div className="main">
            <h1>Reviews</h1>
            <div className="search">
                <label htmlFor="searchType"><b>Select Filter:</b></label>
                <select
                id="searchType"
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
                >
                <option value="courseCode">Course Code</option>
                </select>

                <input
                type="text"
                placeholder="Search..."
                value={searchBar}
                onChange={(e) => setSearchBar(e.target.value)}
                />
                <button onClick={() => setSearchBar("")}>Clear</button>
            </div>

            {!loading && filteredReviews.length === 0 && <p>No reviews found.</p>}
            <ReviewList reviews={filteredReviews} loading={loading} />
        </div>
    );
};

export default ReviewMain;
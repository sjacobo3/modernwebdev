function ReviewItem({ review }) {
  return (
  <li>
    <b>{review.get("courseCode")}</b> <br />
    Rating: {review.get("rating")} <br />
    Difficulty: {review.get("difficulty")}<br />
    Comments: {review.get("comment")} <br />
    Grade Received: {review.get("gradeReceived")} <br />
    Date: {review.createdAt.toLocaleDateString()} <br />
    Would take again: {review.get("takeAgain") ? "Yes" : "No"} <br />
    Attendance: {review.get("attendance") ? "Yes" : "No"}<br />
  </li>
  );
};

export default ReviewItem;
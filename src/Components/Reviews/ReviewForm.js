const ReviewForm = ({ onChange, onClick, value }) => {
  return (
    <div>
      <hr />
      Add a review:
      <form onSubmit={onClick}>
        <input
          text="text"
          onChange={onChange}
          placeholder="Add Review..."
          value={value}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ReviewForm;
const ReviewForm = ({ onChange, onClick, value }) => {
  return (
    <div>
      <hr />
      This is the review form child component.
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
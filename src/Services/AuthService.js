import Parse from "parse";

// create a new user on Parse database
export const createUser = (newUser) => {
  const user = new Parse.User();

  user.set("username", newUser.email);
  user.set("firstName", newUser.firstName);
  user.set("lastName", newUser.lastName);
  user.set("password", newUser.password);
  user.set("email", newUser.email);

  console.log("User: ", user);

  return user
    .signUp()
    .then((newUserSaved) => {
      return newUserSaved;
    })
    .catch((error) => {
      alert(`Error: ${error.message}`);
    });
};

// log user in if found on Parse database
export const loginUser = (currUser) => {
  const user = new Parse.User();

  user.set("username", currUser.email);
  user.set("password", currUser.password);

  console.log("User: ", user);

  return user
    .logIn()
    .then((currUserSaved) => {
      return currUserSaved;
    })
    .catch((error) => {
      alert(`Error: ${error.message}`);
    });
};

// logout the current user
export const logoutUser = () => {
  return Parse.User.logOut()
    .then(() => {
      const currUser = Parse.User.current();
      localStorage.clear();
      console.log("Current user should be null: ", currUser);
    })
    .catch((error) => {
      alert(`Error: ${error.message}`);
    });
};

export const authenticateUser = () => {
  // return true or false, if current user is authenticated
  return Parse.User.current()?.authenticated();
};

export const fetchUserReviews = async () => {
  const currentUser = Parse.User.current();
  if (!currentUser) return [];

  const Review = Parse.Object.extend('Review');
  const query = new Parse.Query(Review);
  query.equalTo('user', currentUser); // Query reviews where user field matches current user
  const results = await query.find();
  return results; // Return Parse objects, not JSON
};
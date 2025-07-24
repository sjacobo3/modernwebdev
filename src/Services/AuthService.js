import Parse from "parse";

// create a new user on Parse database
export const createUser = (newUser) => {
  const user = new Parse.User();

  user.set("username", newUser.email);
  user.set("firstName", newUser.firstName);
  user.set("lastName", newUser.lastName);
  user.set("password", newUser.password);
  user.set("email", newUser.email);

  // all users will have public read access
  const acl = new Parse.ACL();
  acl.setPublicReadAccess(true);
  user.setACL(acl);

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

export const isUserAuthenticated  = () => {
  // return true or false, if current user is logged in
  return Parse.User.current()?.authenticated();
};

export const getCurrentUser = () => {
  return Parse.User.current();
}

export const sendPasswordResetEmail = (email) => {
  return Parse.User.requestPasswordReset(email)
    .then(() => {
      console.log("Password reset email sent.");
    })
    .catch((error) => {
      alert(`Error: ${error.message}`);
    });
};

// get all users, excluding current user
export const getAllUsers = () => {
  const query = new Parse.Query("User");
  return query.find().then((users) => {
    // exclude current user
    const filteredUsers = users.filter((user) => user.id !== Parse.User.current().id);
    return filteredUsers;
  }).catch((error) => {
    console.error(error);
    return [];
  });
}
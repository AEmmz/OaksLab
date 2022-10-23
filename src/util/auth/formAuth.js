import { child, get, getDatabase, ref } from "firebase/database";

export const loginClientAuth = (email, password) => {
  const errorArray = [];
  const errorField = [];

  //Email Client Auth
  if (email === "") {
    errorArray.push("E-mail cannot be blank.");
    errorField.push("email");
  } else if (!email.includes("@")) {
    errorArray.push("Please enter a valid e-mail.");
    errorField.push("email");
  }

  //Password Client Auth
  if (password === "") {
    errorArray.push("Password cannot be blank.");
    errorField.push("password");
  }
  return { errorArray, errorField };
};


export const registerClientAuth = (username, email, password1, password2) => {
  const errorArray = [];
  const errorField = [];

  //Beta Client Auth
  // if (betaKey === "") {
  //   errorArray.push("Beta Key cannot be blank.");
  //   errorField.push("beta");
  // }

  //Email Client Auth
  if (email === "") {
    errorArray.push("E-mail cannot be blank.");
    errorField.push("email");
  } else if (!email.includes("@") || !email.includes(".")) {
    errorArray.push("Please enter a valid e-mail.");
    errorField.push("email");
  }

  //Password Client Auth
  if (password1 === "" || password2 === "") {
    errorArray.push("Password cannot be blank.");
    errorField.push("password");
  } else if (password1.length < 8) {
    errorArray.push("Password must be at least 8 characters.");
    errorField.push("password");
  } else if (password1 !== password2) {
    errorArray.push("Passwords must match.");
    errorField.push("password");
  }

  //Username Client Auth
  if (username === "") {
    errorArray.push("Username cannot be blank.");
    errorField.push("username");
  } else if (username.length < 5) {
    errorArray.push("Username must be at least 5 characters.");
    errorField.push("username");
  }

  return { errorArray, errorField };
};

export const serverError = (errorMessage) => {
  const errorArray = [];
  const errorField = [];
  const errorList = [
    { error: "(auth/email-already-exists).", message: "Email is already in use by an existing user.", field: "email" },
    { error: "(auth/email-already-in-use).", message: "Email is already in use by an existing user.", field: "email" },
    { error: "(auth/invalid-display-name).", message: "Invalid display name. Please try again.", field: "username" },
    { error: "(auth/invalid-email).", message: "Invalid email or password. Please try again.", field: "email" },
    { error: "(auth/invalid-password).", message: "Invalid email or password. Please try again.", field: "password" },
    { error: "(auth/invalid-uid).", message: "Invalid email or password. Please try again.", field: "username" },
    { error: "(auth/missing-uid).", message: "Invalid email or password. Please try again.", field: "username" },
    { error: "(auth/uid-already-exists).", message: "Server Error. Please try again later", field: "username" },
    { error: "(auth/user-not-found).", message: "Invalid email or password. Please try again.", field: "username" },
    { error: "(auth/wrong-password).", message: "Invalid email or password. Please try again.", field: "password" }
  ];

  errorList.forEach(error => {
    if (errorMessage === error.error) {
      errorArray.push(error.message);
      errorField.push(error.field);
    }
  });

  return { errorArray, errorField };
};

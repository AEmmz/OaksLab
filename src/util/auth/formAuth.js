export const loginClientAuth = (email, password) => {
	const errorArray = [];
	const errorField = [];

	//Email Client Auth
	if (email === '') {
		errorArray.push('E-mail cannot be blank.');
		errorField.push('email');
	} else if (!email.includes('@')) {
		errorArray.push('Please enter a valid e-mail.');
		errorField.push('email');
	}

	//Password Client Auth
	if (password === '') {
		errorArray.push('Password cannot be blank.');
		errorField.push('password');
	} else if (password.length < 8) {
		errorArray.push('Invalid Password.');
		errorField.push('password');
	}
	return { errorArray, errorField };
};

export const registerClientAuth = (username, email, password1, password2) => {
	const errorArray = [];
	const errorField = [];

	//Email Client Auth
	if (email === '') {
		errorArray.push('E-mail cannot be blank.');
		errorField.push('email');
	} else if (!email.includes('@') || !email.includes('.')) {
		errorArray.push('Please enter a valid e-mail.');
		errorField.push('email');
	}

	//Password Client Auth
	if (password1 === '' || password2 === '') {
		errorArray.push('Password cannot be blank.');
		errorField.push('password');
	} else if (password1.length < 8) {
		errorArray.push('Password must be at least 8 characters.');
		errorField.push('password');
	} else if (password1 !== password2) {
		errorArray.push('Passwords must match.');
		errorField.push('password');
	}

	//Username Client Auth
	if (username === '') {
		errorArray.push('Username cannot be blank.');
		errorField.push('username');
	} else if (username.length < 5) {
		errorArray.push('Username must be at least 5 characters.');
		errorField.push('username');
	}

	return { errorArray, errorField };
};

export const serverError = (errorMessage) => {
	switch (errorMessage) {
		case '(auth/email-already-exists).':
			return 'Email is already in use by an existing user.';
		case '(auth/email-already-in-use).':
			return 'Email is already in use by an existing user.';
		case '(auth/invalid-display-name).':
			return 'Invalid display name. Please try again.';
		case '(auth/invalid-email).':
			return 'Invalid email or password. Please try again.';
		case '(auth/invalid-password).':
			return 'Invalid email or password. Please try again.';
		case '(auth/invalid-uid).':
			return 'Invalid email or password. Please try again.';
		case '(auth/missing-uid).':
			return 'Internal';
		case '(auth/uid-already-exists).':
			return 'Server Error. Please try again later';
		case '(auth/user-not-found).':
			return 'Invalid email or password. Please try again.';
		case '(auth/wrong-password).':
			return 'Invalid email or password. Please try again.';
		default:
			return 'Server Error. Please try again later';
	}
};

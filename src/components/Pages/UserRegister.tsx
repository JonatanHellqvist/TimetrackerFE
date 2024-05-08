import { useEffect, useState } from "react";
// import UserLogin from "./UserLogin";

function UserRegister() {

	interface User {
		id: string;
		userName: string;
		password: string;
	}

	const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
	// const [registerForm, setRegisterForm] = useState(false);
	// const [register, setRegister] = useState<User | null >(null);
	const [loginForm, setLoginForm] = useState(false);

	useEffect(() => {
		console.log(loginForm);
	  }, [loginForm]);

	useEffect (() => {
		const userFromLocalStorage = localStorage.getItem("loggedInUser");
		if (userFromLocalStorage) {
			setLoggedInUser(JSON.parse(userFromLocalStorage));
			// setLoginForm(false);
		}
	}, [loggedInUser]);

	// const handleRegisterForm = () => {
	// 	setRegisterForm(true);
	// }
	const handleShowLoginForm = () => {
        setLoginForm(true);
		console.log(loginForm)
    };

	const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		//
		const userName = e.currentTarget.userName.value;
        const password = e.currentTarget.password.value;
		//

		fetch("https://shark-app-fcayz.ondigitalocean.app/user", {
		method: "POST",
		headers: {
			"content-type": "application/json"
		},
		body: JSON.stringify({userName, password})
		})
		.then(res => res.json())
		.then(data => {
			console.log("Registration Sucessfull ", data)
		// setRegister(data);
		window.location.href = ("?page=user"); //ladda om sidan
		setLoginForm(true);
		})
		.catch(error => {
			console.error("Error when registrating User: ", error);
		});
	};	
	return (
		<div>
			{!loggedInUser ? (
				<div>
				 	<h1>Register</h1>
					<form onSubmit={handleRegister}>
						<label htmlFor="userName">Username:</label>
						<input type="text" id="userName" name="userName" required/>
				
						<label htmlFor="password">Password:</label>
						<input type="password" id="password" name="password" required/>
				 		<br />
				 		<button type="submit">Register</button>
						<button type="button" onClick={handleShowLoginForm}>Cancel</button>
					</form>
				</div>
			) : null}	
		</div>
	);
}

export default UserRegister;
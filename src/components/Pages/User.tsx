import React, { useEffect, useState } from "react";

///TODO städa upp logiken för forms
function User() {

	interface User {
		id: string;
		userName: string;
		password: string;
	}
	// const [login, setLogin] = useState<User>();

	const [loginForm, setLoginForm] = useState(true); //för att visa loginformet standard
	//
	const [registerForm, setRegisterForm] = useState(false);
	const [register, setRegister] = useState<User>();
	const [userName, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

	useEffect (() => {
		const userFromLocalStorage = localStorage.getItem("loggedInUser");
		if (userFromLocalStorage) {
			setLoggedInUser(JSON.parse(userFromLocalStorage));
			setLoginForm(false);
		}
	}, []);
	useEffect (() => {
		if(loggedInUser) {
			setRegisterForm(false);
			setLoginForm(false);
			printUser();
		}
	}, [loggedInUser]);

	const handleloginForm = () => {
		setLoginForm(true);
		
		
		// setRegisterForm(false);
	};

	const handleRegisterForm = () => {
		setRegisterForm(true);
		setLoginForm(false);
	}


	//todo
	const printUser = () => {
		if(loggedInUser) {
			return (
			<div id="UserInfo">
					<h2>Logged in as: {loggedInUser.userName}</h2>
					<button onClick={handleLogout}>Logout</button>
				</div>
			);
		} else {
			return <div id="UserInfo"></div>;
		}
	}
	const handleLogin = async (e:React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const res = await fetch ("https://shark-app-fcayz.ondigitalocean.app/user/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body:JSON.stringify({ userName, password})
		});

		if (res.ok) {
			const data = await res.json();
			if(data) {
				setLoggedInUser(data.user)

				//local storage för användarinfo
				localStorage.setItem("loggedInUser", JSON.stringify(data));
				setLoginForm(false);
				setRegisterForm(false);
			
				console.log("Login successfull for User:",(data));
				
			}
			
		} else if (res.status === 401){
			console.log("Invalid username or password")
		} else {
			console.log("Login failed")
		}
		
	} 

	const handleLogout = () => {
		setLoggedInUser(null);
		localStorage.removeItem("loggedInUser");
		setLoginForm(true);
		setRegisterForm(false);
	  };

	const newUser = (e: React.FormEvent<HTMLFormElement>) => {
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
		console.log("Registration Sucessfull")
		setRegister(data);
		// setRegisterForm(false);
		setLoginForm(true);
	})
	.catch(error => {
		console.error("Error when registrating User: ", error);
	});
};	

	

return (
		
	<div>
		{loggedInUser ? (
			<div>
				<h2>Logged in as: {loggedInUser.userName}</h2>
				<button onClick={handleLogout}>Logout</button>
			</div>
			) : (
				<div>
					{loginForm ? (
					<div>
					<h2>Login</h2>

					<form onSubmit={handleLogin}>
					<label htmlFor="userName">Username</label>
					<input type="text" id="userName" value={userName} onChange={(e) => setUsername(e.target.value)} required/>

					<label htmlFor="password">Password</label>
					<input type="text" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
					<br />

					<button type="submit">Logga in</button>
					<button onClick={handleRegisterForm}>Register</button>
				</form>
				</div>	
			) : ( 
				<div>
					<h2>Register</h2>
					<form onSubmit={newUser}>

						<label htmlFor="userName">Username:</label>
						<input type="text" id="userName" name="userName" required/>

						<label htmlFor="password">Password:</label>
						<input type="password" id="password" name="password" required/>
						<br />
						<button type="submit">Register</button><button type="button" onClick={handleloginForm}>Cancel</button>

					</form>
				</div>
		
		
		)}
		{register && (
				<div>
					<h3>Registration sucessfull!</h3>
					<p>Registered User: {register.userName}</p>
					{/*Tar register objektet och formaterar till json format o skriver ut*/}
					{/* <pre>{JSON.stringify(register,null,2)}</pre> */}
				</div>
		)}
	</div>
			)}
			</div>
);
}

export default User;

import { useEffect, useState } from "react";


//test
import UserRegister from "./UserRegister";


function UserLogin() {
	interface User {
		id: string;
		userName: string;
		password: string;
	}

	const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
	// const [loginForm, setLoginForm] = useState(true);
	const [invalidLogin, setInvalidLogin] = useState(false);
	const [userName, setUsername] = useState("");
	const [password, setPassword] = useState("");

	//test
	const [registerForm, setRegisterForm] = useState(false);

	// const handleloginForm = () => {
	// 	setLoginForm(true);
		
	// };

	useEffect(() => {
		console.log(registerForm);
	  }, [registerForm]);
	  
	useEffect (() => {
		const userFromLocalStorage = localStorage.getItem("loggedInUser");
		if (userFromLocalStorage) {
			setLoggedInUser(JSON.parse(userFromLocalStorage));
			// setLoginForm(false);
		}
	}, [loggedInUser]);

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
				localStorage.setItem("loggedInUser", JSON.stringify(data));
				// setLoginForm(false);
				console.log("Login successfull for User:", (data));	
			}		
		} else if (res.status === 401){
			console.log("Invalid username or password")
			setInvalidLogin(true);
			// setLoginForm(true);
		} else {
			console.log("Login failed")
		}
		
	} 

	//test

	const handleShowRegisterForm = () => {
        setRegisterForm(true);
		console.log(registerForm)
    };

	/////////
	const handleLogout = () => {
		setLoggedInUser(null);
		localStorage.removeItem("loggedInUser");
		// setLoginForm(true);
	};
	////////////
	
	return (
		<>
		  <div>
			{!loggedInUser && !registerForm ? (
			  <form onSubmit={handleLogin}>
				<h2>Login</h2>
				<label htmlFor="userName">Username</label>
				<input type="text" id="userName" value={userName} onChange={(e) => setUsername(e.target.value)} required />
				<label htmlFor="password">Password</label>
				<input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
				<br />
				<button type="submit">Logga in</button>
				<button type="button" onClick={handleShowRegisterForm}>Register</button>
				{invalidLogin && <h2>Incorrect login info, try again!</h2>}
			  </form>
			) : null }
				{registerForm && <UserRegister/>}
				
			{loggedInUser && (
			  <>
				<h2>Logged in as: {loggedInUser.userName}</h2>
				<button onClick={handleLogout}>Logout</button>
			  </>
			)}
		  </div>
		</>
	  );
	}
	
	export default UserLogin;





// return (
// 	<>
// 		<div>
// 		{invalidLogin ? (
// 			<>
// 			<h2>Login</h2>
// 			<form onSubmit={handleLogin}>
// 				<label htmlFor="userName">Username</label>
// 				<input type="text" id="userName" value={userName} onChange={(e) => setUsername(e.target.value)} required/>
// 				<label htmlFor="password">Password</label>
// 				<input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
// 				<br />
// 				<button type="submit">Logga in</button>
// 				<button>Register</button>
// 			</form>
// 			<h2>Incorrect login info, try again!</h2>
// 			</>
// 		) : loggedInUser ? (
// 			<>
// 				<h2>Logged in as: {loggedInUser.userName}</h2>
// 				<button onClick={handleLogout}>Logout</button>
// 			</>
// 		) : (
// 			<>
// 				<h2>Login</h2>
// 				<form onSubmit={handleLogin}>
// 					<label htmlFor="userName">Username</label>
// 					<input type="text" id="userName" value={userName} onChange={(e) => setUsername(e.target.value)} required/>
// 					<label htmlFor="password">Password</label>
// 					<input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
// 					<br />
// 					<button type="submit">Logga in</button>
// 					<button>Register</button>
// 				</form>
// 			</>	
// 		)}
// 	</div>
// 	</>			
// );
// }

// export default UserLogin;
import React, { useState } from "react";

function User() {

	interface User {
		id: string;
		userName: string;
		password: string;
	}
	// const [login, setLogin] = useState<User>();

	const [register, setRegister] = useState<User>();

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
		
	})
	.catch(error => {
		console.error("Error when registrating User: ", error);
	});
};	

	

	return (
		
		<div>
			

			<form onSubmit={newUser}>
				<label htmlFor="userName">Username:</label>
				<input type="text" id="userName" name="userName" required/>

				<label htmlFor="password">Password:</label>
				<input type="password" id="password" name="password" required/>
				<button type="submit">Register</button>
			</form>

			

			
				{register && (
					<div>
						<h3>Registration sucessfull!</h3>
						<p>Registered User:</p>
						{/*Tar register objektet och formaterar till json format o skriver ut*/}
						<pre>{JSON.stringify(register,null,2)}</pre>
					</div>
				)}
			
			
		</div>
	);
}

export default User;


{/* <form onSubmit= {saveNewActivity}>
				<input type="text" value={addActivity} onChange={((e) => setAddActivity(e.target.value))}>
				</input>
				<button>Add</button>
			</form> */}


// const saveNewActivity = (e:React.FormEvent<HTMLFormElement>) => {
// 	e.preventDefault();

// 	fetch("https://shark-app-fcayz.ondigitalocean.app/activity", {
// 		method: "POST",
// 		headers: {
// 			"content-type": "application/json"
// 		},
// 		body: JSON.stringify({activityName: addActivity})
// 	})
// 	.then(() => {
// 		setAddActivity("");
// 		fetchActivities();
// 	});
// }	


// const [addActivity, setAddActivity] = useState<string>("")


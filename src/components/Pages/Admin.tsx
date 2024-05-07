import { useEffect, useState } from "react";
// import User from "./User";

function Admin() {

	interface User {
		id: string;
		userName: string;
		password: string;
		admin: boolean | null;
		totalTrackedTime: string | null;
	}

	const [users, setUsers] = useState<User[]>([]);
	const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
	
	useEffect (() => {
		const userFromLocalStorage = localStorage.getItem("loggedInUser");
		if (userFromLocalStorage) {
			setLoggedInUser(JSON.parse(userFromLocalStorage));
		}
	}, []);

	const fetchUsers = () => {
		return fetch ("https://shark-app-fcayz.ondigitalocean.app/users")
		.then (res => res.json()) 
		.then ((data: User[]) => {
			setUsers(data);
		});
	};
		useEffect(() => {
			fetchUsers();
	},[]);


	return (
		<div>
			{loggedInUser && loggedInUser.admin ? (
				<div>
				<h1>Hi admin</h1>
				<h2>User List:</h2>
				<ul>
					{users.map((user) => (
						<li key={user.id}>
							<p>UserName: {user.userName} TrackedTime: {user.totalTrackedTime}</p>
							
						</li>
					))}
				</ul>

				</div>
			) : (
				<h1>Get admin acess to show this page</h1>
			)}
			
		</div>
	);
}

export default Admin;
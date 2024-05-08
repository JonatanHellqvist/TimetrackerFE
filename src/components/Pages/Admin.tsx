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
				<div id="adminMainDiv">
					<div id="adminH1Div">
						<h1 id="adminH1">Admin</h1>
					</div>
						<div id="adminInfoH2Div">
							<h2 id="adminInfoH2">User List & Statistics</h2>
						</div>
						<ul id="adminUl">
							{users.map((user) => (
								<li id="adminLi"key={user.id}>
									<div id="adminLiInfoDiv">
										<div id="adminLiInfoUser">
											<div>
												<p>Username:</p>
											</div>
											<div>
												<p>{user.userName}</p>
											</div>
										</div>
										<div id="adminLiInfoTime">
											<p>Total tracked time for User: {user.totalTrackedTime} min</p>	
										</div>
									</div>
										 
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
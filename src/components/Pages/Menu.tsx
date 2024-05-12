import { useEffect, useState } from "react";
import Admin from "./Admin";
import ActivityHistory from "../Activity/ActivityHistory";
import ActiveActivities from "../Activity/ActiveActivities";
import UserLogin from "./UserLogin";

function Menu() {

	const [page,setPage] = useState<string>("");
	
	useEffect(() => {

		let pageUrl = page;

		if (!pageUrl) {
				const queryParam = new URLSearchParams(window.location.search);
				const getUrl = queryParam.get("page");

			if (getUrl) {
				pageUrl = getUrl;
				setPage(getUrl)
				
			}  else {
				pageUrl = "user"	
			}
		} 
			
		window.history.pushState(
			null,
			"",
			"?page=" + pageUrl
		)
	}, [page])

	return (
		<>
			<div id="MainDiv">
			<div id="headerDiv">
				<h1 id="timeTrackerh1">TimeTracker</h1>
				<p>Track your activites with TimeTracker!</p>
			</div>
			<div id="menuBtnsDiv">
				<button onClick={() => setPage("user")}>User</button>
				<button onClick={() => setPage("activeactivities")}>Active Activities</button>
				<button onClick={() => setPage("activityhistory")}>Activity History/Statistics</button>
				<button onClick={() => setPage("admin")}>Admin</button>
			</div>			
			{
				{
					"user": <UserLogin />,
					"activeactivities": <ActiveActivities/>,
					"activityhistory": <ActivityHistory  />,
					"admin": <Admin/>,
				} [page]
			}
		</div>
		</>	
	);
}

export default Menu;
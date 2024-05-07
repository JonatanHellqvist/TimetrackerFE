import { useEffect, useState } from "react";
import Start from "./Start";
import Admin from "./Admin";
// import ActivityHistory from "./ActivityHistory";
// import ActiveActivities from "./ActiveActivities";
// import User from "./User";
// import PrintActivites from "../PrintActivites";
import ActivityHistory from "./ActivityHistory";
import ActiveActivities from "./ActiveActivities";
import UserLogin from "./UserLogin";

function Menu() {

	// const [admin, setAdmin] = useState<boolean>(false);
	const [page,setPage] = useState<string>("");

	// useEffect(() => {
	// 	setAdmin(true)
	// }, [])

	useEffect(() => {

		let pageUrl = page;

		if (!pageUrl) {
				const queryParam = new URLSearchParams(window.location.search);
				const getUrl = queryParam.get("page");

			if (getUrl) {
				pageUrl = getUrl;
				setPage(getUrl)
			}  else {
				pageUrl = "start"	
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
		
			<h1>TimeTracker:</h1>
			<button onClick={() => setPage("start")}>Start</button>
			<button onClick={() => setPage("user")}>User</button>
			<button onClick={() => setPage("activeactivities")}>Active Activities</button>
			<button onClick={() => setPage("activityhistory")}>Activity History/Statistics</button>
			<button onClick={() => setPage("admin")}>Admin</button>

			<div>Page: {page}</div>

			{
				{
					"start": <Start />,
					"user": <UserLogin />,
					"activeactivities": <ActiveActivities/>,
					"activityhistory": <ActivityHistory  />,
					"admin": <Admin/>,
				} [page]
			}

		</>

// {
// 	{
// 		"start": <Start />,
// 		"user": <User />,
// 		// "activeactivities": <ActiveActivities />,
// 		// "activityhistory": <ActivityHistory  />,
// 		"admin": <Admin/>,
// 	} [page]
// }
		
		
	);
}

export default Menu;
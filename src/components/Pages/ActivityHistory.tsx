import { useEffect, useState } from "react";
// import PrintActivites from "../PrintActivites";


function ActivityHistory() {

	interface Activity {
		id: string;
		activityName: string;
		startTime: string | null;
		endTime: string | null;
		trackedTime: number;
	}
	
	const [historyList, setHistoryList] = useState<Activity[] | null>(null);
	const [startActivityFromHistory, setStartActivityFromHistory] = useState("");
	
	const getUserIdFromLocalStorage = () => {
		const loggedInUserString = localStorage.getItem("loggedInUser");

		if (loggedInUserString) {
			const loggedInUser = JSON.parse(loggedInUserString);
			if (loggedInUser && loggedInUser.id) {
				console.log(loggedInUser.id);
				return loggedInUser.id;
				
			}
		}
		
		return null; 
	  };

	const fetchHistoryList = () => {

		const id = getUserIdFromLocalStorage();

		if (!id) {
			console.error("No userId found in local storage")
			return;
		}

		fetch(`https://shark-app-fcayz.ondigitalocean.app/historylist/${id}`)
		.then (res => res.json())
		.then ((data:Activity[]) => {
			console.log(data);
			setHistoryList(data);

			return historyList;
		})
		
};
		useEffect(() => {
			fetchHistoryList();
	},[]);


	const addStartActivityFromHistory = (activity: Activity) =>(e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
	
		const userId = getUserIdFromLocalStorage();
		

		fetch(`https://shark-app-fcayz.ondigitalocean.app/activity/startactivity/${userId}/${activity.id}`, {
			method: "PUT",
			headers: {
				"content-type": "application/json"
			},
			body: JSON.stringify({ startTime: startActivityFromHistory })
		})
		.then(() => {
			setStartActivityFromHistory("");
			fetchHistoryList();
		})
		.catch(error => {
			console.error("Error",error);
		});
	}

	return (
		<div>
			<h1>Activity History</h1>
			{historyList ? (
			<ul>
			{historyList.map(activity => (
                    <li key={activity.id}>
                        <h3>{activity.activityName}</h3>
                        <p>Start Time: {activity.startTime}</p>
                        <p>End Time: {activity.endTime}</p>
                        <p>Tracked Time: {activity.trackedTime} min</p>
						<button onClick={addStartActivityFromHistory(activity)}>Start</button>
                    </li>
			))}
			</ul>	
			) : (
				<p>The History List is Empty</p>
			)}
		</div>
	);
}

export default ActivityHistory;
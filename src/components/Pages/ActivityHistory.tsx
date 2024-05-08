import { useEffect, useState } from "react";
// import PrintActivites from "../PrintActivites";


function ActivityHistory() {

	interface Activity {
		id: string ;
		activityName: string ;
		startTime: string | null;
		endTime: string | null;
		trackedTime: number;
	}
	
	const [historyList, setHistoryList] = useState<Activity[] | null>(null);
	const [startActivityFromHistory, setStartActivityFromHistory] = useState("");

	// const [deleteActivity, setDeleteActivity] = useState<string| null>(null);
	
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

		if (!id ) {
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

	const DeleteUserActivityFromHistory = (activity : Activity) => (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		console.log("DeleteUserActivity called with activity:", activity.id);
		
		const userId = getUserIdFromLocalStorage();
		console.log(userId, activity.id)
			fetch(`https://shark-app-fcayz.ondigitalocean.app/${userId}/${activity.id}/activityhistory/delete`, {
			method: "PUT",
			headers: {
				"content-type": "application/json"
			},
		})
		.then (() => {
			// setDeleteActivity(activityId);
			fetchHistoryList();
		})
		.catch(error => {
			console.error("Error",error);
		});	
	}

	return (
		<div id="historyMainDiv">
			<div id="historyH1Div">
				<h1 id="historyH1">Activity History</h1>
			</div>
			
			{historyList ? (
			<ul id="historyUl">
			{historyList.map(activity => (
                    <li id="historyLi" key={activity.id}>
						<div id="historyLiH3">
							<h3>{activity.activityName}</h3>
						</div>
                        <div id="historyLiInfoDiv">
							<div className="historyLiInfoP">
								<p>Start Time: {activity.startTime}</p>
							</div>
							<div className="historyLiInfoP">
								<p>End Time: {activity.endTime}</p>
							</div>
							<div className="historyLiInfoP">
								<p>Tracked Time: {activity.trackedTime} min</p>
							</div>	
						</div>
						<div>
							<button onClick={addStartActivityFromHistory(activity)}>Start</button>	
							<button onClick={DeleteUserActivityFromHistory(activity)}>Delete</button>
						</div>	
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
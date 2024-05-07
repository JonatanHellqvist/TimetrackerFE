import { useEffect, useState } from "react";
import ActivityTimer from "./ActivityTimer";


function ActiveActivities() {

	interface Activity {
		id: string;
		activityName: string;
		startTime: string | null;
		endTime: string | null;
		trackedTime: string | null;
	}

	const [activityList, setActivityList] = useState<Activity[] |null>(null);
	const [addActivity, setAddActivity] = useState<string>("")

	const [startActivity, setStartActivity] = useState <string | null> (null);
	const [stopActivity, setStopActivity] = useState <string | null> (null);
	

	// localhost:8080/663941cdba707236dfa1d18c/list/addactivity
	//ny aktivitet
	const saveNewActivity = (e:React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const id = getUserIdFromLocalStorage();

		fetch(`https://shark-app-fcayz.ondigitalocean.app/${id}/list/addactivity`, {
			method: "POST",
			headers: {
				"content-type": "application/json"
			},
			body: JSON.stringify({activityName: addActivity})
		})
		.then(() => {
			setAddActivity("");
			fetchActivities();
			
		});
	}	
	//starta
	const addStartActivity = (activity: Activity) =>(e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
	
		const userId = getUserIdFromLocalStorage();
		fetch(`https://shark-app-fcayz.ondigitalocean.app/activity/start/${userId}/${activity.id}`, {
			method: "PUT",
			headers: {
				"content-type": "application/json"
			},
			body: JSON.stringify({ startTime: startActivity })
		})
		.then(() => {
			setStartActivity(null);
			fetchActivities();
		})
		.catch(error => {
			console.error("Error",error);
		});
	}


	//stoppa
	const addStopActivity = (activity: Activity) =>(e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
	
		const userId = getUserIdFromLocalStorage();
		fetch(`https://shark-app-fcayz.ondigitalocean.app/activity/stop/${userId}/${activity.id}`, {
			method: "PUT",
			headers: {
				"content-type": "application/json"
			},
			body: JSON.stringify({ stopTime: stopActivity })
		})
		.then(() => {
			setStopActivity("");
			fetchActivities();
		})
		.catch(error => {
			console.error("Error",error);
		});
	}

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

	//@GetMapping ("/{userId}/list/")
	const fetchActivities = () => {

		const id = getUserIdFromLocalStorage();

		if (!id) {
			console.error("No userId found in local storage")
			return;
		}

		fetch (`https://shark-app-fcayz.ondigitalocean.app/${id}/list/`)
		.then (res => res.json()) 
		.then ((data: Activity[]) => {
			console.log(data);
			setActivityList(data);

			return activityList;
		});
	};
		useEffect(() => {
			fetchActivities();
	},[]);

	return (
		<div>
			<h1>Active Activites:</h1>
			{activityList ? (
			<ul>
			{activityList.map(activity => (
                    <li key={activity.id}>
                        <h3>{activity.activityName}</h3>
                        <p>Start Time: {activity.startTime}</p>
                        <p>End Time: {activity.endTime}</p>
                        <p>Tracked Time: {activity.trackedTime}</p>
						<ActivityTimer endTime={activity.endTime} startTime={activity.startTime}/>
						{activity.startTime ? (
                <button onClick={addStopActivity(activity)}>Stop</button>
                ) : (
                <button onClick={addStartActivity(activity)}>Start</button>
                )}
			
                    </li>
					
			))}
			</ul>
			) : (
				<p>Activity List is Empty, Add a new activity</p>
			)}
			<div>
			<h3>Add Activity</h3>

			<form onSubmit= {saveNewActivity}>
				<input type="text" value={addActivity} onChange={((e) => setAddActivity(e.target.value))}>
				</input>
				<button>Add</button>
			</form>
		</div>
		</div>
	);
}

export default ActiveActivities;
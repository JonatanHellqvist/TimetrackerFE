import { useEffect, useState } from "react";
import ActivityTimer from "./ActivityTimer";




function ActiveActivities() {

	interface Activity {
		id: string;
		activityName: string;
		startTime: string | null;
		endTime: string | null;
		trackedTime: string | null;
		totalTrackedTime: string | null;
	}

	const [activityList, setActivityList] = useState<Activity[] |null>(null);
	const [addActivity, setAddActivity] = useState<string>("")

	// const [startActivity, setStartActivity] = useState <string | null> (null);
	// const [stopActivity, setStopActivity] = useState <string | null> (null);

	//formatera tid
	const formatStartStopTime = (dateTimeString: string | null) => {
		if (!dateTimeString) return "N/A";

		const date = new Date(dateTimeString);

		date.setHours(date.getHours() +2); //fulfix för att hantera UTC
		
		const hours = date.getHours().toString().padStart(2, "0");
		const minutes = date.getMinutes().toString().padStart(2, "0");
		return `${hours}:${minutes}`
	}
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
		
		if (activity.startTime && activity.endTime) {

			fetch(`https://shark-app-fcayz.ondigitalocean.app/activity/reset/${userId}/${activity.id}`, {
			method: "PUT",
			headers: {
				"content-type": "application/json"
			},
			})
				.then(() => {
					// setStartActivity(null);
					fetchActivities();
				})
				.catch(error => {
					console.error("Error",error);
				});
		} else {
			fetch(`https://shark-app-fcayz.ondigitalocean.app/activity/start/${userId}/${activity.id}`, {
				method: "PUT",
				headers: {
					"content-type": "application/json"
				},
				body: JSON.stringify({ startTime: new Date().toISOString() })
			})
				.then(() => {
					// setStartActivity(null);
					fetchActivities();
				})
				.catch(error => {
					console.error("Error",error);
				});
		}
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
			body: JSON.stringify({ stopTime: new Date().toISOString()})
		})
		.then(() => {
			// setStopActivity("");
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

	//delete
	const deleteUserActivity = (activity: Activity) => {
		console.log("DeleteUserActivity called with activity:", activity);
		
		const userId = getUserIdFromLocalStorage();
		console.log(userId, activity.id)
		if (!userId) {
			console.error("No userId found in local storage")
			return;
		}
		fetch(`https://shark-app-fcayz.ondigitalocean.app/${userId}/${activity.id}/activity/delete`,{
			method: "PUT",
			headers: {
				"content-type": "application/json"
			}
		})
		.then(() => {		
			fetchActivities();
		})
	}

	const moveActivityToHistory = (activity : Activity) => {
		const userId = getUserIdFromLocalStorage();
		console.log(userId, activity.id);
		if (!userId) {
			console.error("No userId found in local storage")
			return;
		}
		fetch(`https://shark-app-fcayz.ondigitalocean.app/${userId}/${activity.id}/activity/movetohistory`,{
			method: "PUT",
			headers: {
				"content-type": "application/json"
			}
		})
		.then(() => {	
			fetchActivities();
		})
	}
	return (
		<div id="activeActivitiesMainDiv">
			<div id="activeActivitiesH1Div">
				<h1 id="activeActivitiesH1">Active Activites</h1>
			</div>
			<div>
				<div id="activeActivtiesFormDiv">
					<div id="activeActivtiesFormDivTitle">
						<h3 id="activeActivtiesFormDivTitleh3">Add Activity</h3>
						</div>
					<div id="activeActivtiesForm">
						<form onSubmit= {saveNewActivity}>
							<div id="activieFormInfoDiv">
								<div id="activieFormInfoDivP">
									<p>Activity Name</p>
								</div>
								<div id="activieFormInfoDivInput">
									<input type="text" placeholder="Type activity name here...." value={addActivity} onChange={((e) => setAddActivity(e.target.value))}>
								</input>
								</div>	
							</div>
							<div id="activeActivtiesFormBtn">
								<button>Add</button>
							</div>
						</form>
					</div>
				</div>	
			</div>

			<div id="activeActivitiesH1Div">
				<h1 id="activeActivitiesH1">Your Current Activites</h1>
			</div>
			
			{activityList ? (
			<ul id="activeActivitiesUl">
			{activityList.map(activity => (
                    <li id="activeActivitiesLi" key={activity.id}>
						<div id="activeActivitiesLiH3">
 							<h3>{activity.activityName}</h3>
						</div>
						<div id="activeActivitiesLiInfoDiv">
							<div id="activeActivitiesLiInfoDivTime">

								<div id="activeActivitesLiInfoDivStartTime">	
										<div id="aStartP">
											<p>Activity Started</p>
										</div>
										<div id="aStartP2">
											<p>{formatStartStopTime(activity.startTime)}</p>
										</div>	
								</div>

								<div id="activeActivitesLiInfoDivStopTime">
									<div>
										<p>Activity Stoped</p>
									</div>
									<div>
										<p>{formatStartStopTime(activity.endTime)}</p>
									</div>
								</div>
							</div>
							
							
							<div className="activeActivitiesLiInfoP">
								<p>Total tracked time for Activity: {activity.totalTrackedTime} minutes</p>
							</div>	
							<div className="activeActivitiesLiInfoP">
								<ActivityTimer endTime={activity.endTime} startTime={activity.startTime}/>
							</div>
						</div>
						<div id="activeActivitiesBtnsDiv">
						{!activity.startTime ? (
							<button onClick={addStartActivity(activity)}>Start</button>
                		) : activity.endTime ? (
							<button onClick={addStartActivity(activity)}>Start</button>
						) : (
							<button onClick={addStopActivity(activity)}>Stop</button>
                		)}
						
							<button onClick={() => deleteUserActivity(activity)}>Delete</button>
							<button onClick={() => moveActivityToHistory(activity)}>Move to History</button>
						</div>
						
                    </li>		
			))}
			</ul>
			) : (
				<p>Activity List is Empty, Add a new activity</p>
			)}
			
		</div>
	

	);
}

export default ActiveActivities;
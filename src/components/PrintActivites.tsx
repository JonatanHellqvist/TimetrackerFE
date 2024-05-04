import React, { useState, useEffect } from 'react';

function PrintActivites() {

	
	interface Activity {
		id: string,
		activityName: string,
		startTime: string | null,
		endTime: string | null;
		trackedTime: string | null;
	}

	//btns interface
	interface Props {
		activityId: string;
	}
	//

	const [addActivity, setAddActivity] = useState<string>("")
	const [activeActivities, setActiveActivities] = useState<Activity[]>([]);
	const [completedActivities, setCompletedActivities] = useState<Activity[]>([]);

	//btns
	const [startActivity, setStartActivity] = useState("");
	const [stopActivity, setStopActivity] = useState("");
	//


	const fetchActivities = () => {
		return fetch ("https://shark-app-fcayz.ondigitalocean.app/activities")
		.then (res => res.json()) 
		.then ((data: Activity[]) => {
			const activeActivity = data.filter(activity => !activity.endTime);
			const completedActivity = data.filter(activity => activity.endTime);
		
			setActiveActivities(activeActivity);
			setCompletedActivities(completedActivity);
		});
	};
		useEffect(() => {
			fetchActivities();
	},[]);

	///-----------
	const saveNewActivity = (e:React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		fetch("https://shark-app-fcayz.ondigitalocean.app/activity", {
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

	// starta
	const addStartActivity = ({activityId}: Props) =>(e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
	
		fetch(`https://shark-app-fcayz.ondigitalocean.app/activity/start/${activityId}`, {
			method: "PUT",
			headers: {
				"content-type": "application/json"
			},
			body: JSON.stringify({ startTime: startActivity })
		})
		.then(() => {
			setStartActivity("");
			fetchActivities();
		})
		.catch(error => {
			console.error("Error",error);
		});
	}

	//stoppa
	const addStopActivity = ({activityId}: Props) =>(e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		fetch(`https://shark-app-fcayz.ondigitalocean.app/activity/stop/${activityId}`, {
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
	return (
		<div>
			<h3>Active Activites:</h3>
			{activeActivities.map((activity : Activity) => (
			
			<div key={activity.id}> 
			<h4>{activity.activityName}</h4>

			{activity.startTime ? (
                <button onClick={addStopActivity({ activityId: activity.id })}>Stop</button>
                ) : (
                <button onClick={addStartActivity({ activityId: activity.id })}>Start</button>
                )}
			
			</div>
			
		))}
		<div><h3>Activity History:</h3></div>
		{completedActivities.map((activity : Activity) => (
			<div key={activity.id}> 
			<h4>{activity.activityName}</h4>
			<p>Incheckade minuter: {activity.trackedTime}</p>
			</div>
		))}
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

export default PrintActivites;

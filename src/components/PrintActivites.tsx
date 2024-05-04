import { useState, useEffect } from 'react';
import ActivityButton from './ActivityButton';

function PrintActivites() {

	interface Activity {
		id: string,
		activityName: string,
		startTime: string | null,
		endTime: string | null;
		trackedTime: string | null;
	}
	const [addActivity, setAddActivity] = useState<string>("")
	const [activeActivities, setActiveActivities] = useState<Activity[]>([]);
	const [completedActivities, setCompletedActivities] = useState<Activity[]>([]);

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
///-----------
	return (
		<div>
			<h3>Active Activites:</h3>
			{activeActivities.map((activity : Activity) => (
			
			<div key={activity.id}> 
			<h4>{activity.activityName}</h4>
			{/* <StartActivity activityId={activity.id}/>
			<StopActivity activityId={activity.id}/> */}
			<ActivityButton activityId={activity.id}/>
			
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

// export { fetchActivities };
export default PrintActivites;

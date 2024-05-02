import { useState, useEffect } from 'react';
// import StartActivity from './StartActivity';
// import StopActivity from './StopActivity';
import ActivityButton from './ActivityButton';



function PrintActivites() {

	interface Activity {
		id: string,
		activityName: string,
		startTime: string | null,
		endTime: string | null;
		trackedTime: string | null;
	}
	const [activeActivities, setActiveActivities] = useState<Activity[]>([]);
	const [completedActivities, setCompletedActivities] = useState<Activity[]>([]);

	useEffect(() => {
		fetch("http://localhost:8080/activities")
		.then(res => res.json())
		.then((data: Activity[]) => {
			const activeActivity = data.filter(activity => !activity.endTime);
			const completedActivity = data.filter(activity => activity.endTime);
		
			setActiveActivities(activeActivity);
			setCompletedActivities(completedActivity);
		
	});
},[]);
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
		</div>
	);
}

export default PrintActivites;
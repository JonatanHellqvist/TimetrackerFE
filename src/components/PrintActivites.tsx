import { useState, useEffect } from 'react';

function PrintActivites() {

	interface Activity {
		id: string,
		activityName: string
	}
	const [activities, setActivities] = useState<Activity[]>([]);

	useEffect(() => {
		fetch("http://localhost:8080/activities")
		.then(res => res.json())
		.then(data => setActivities(data));
	})
	return (
		<div>
			<h3>ACTIVITES:</h3>
			{activities.map((activity : Activity) => (
			<div key={activity.id}> {activity.activityName}</div>
		))}
		</div>
	);
}

export default PrintActivites;
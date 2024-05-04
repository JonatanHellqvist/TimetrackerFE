// import { useEffect, useState } from "react";
// import StartActivity from './StartActivity';
// import StopActivity from './StopActivity';
// import WrapperComponent from "./WrapperComponent";

// interface ActivityData {
//     startTime: string;
//     endTime: string | null;
    
// }

// function ActivityButton({ activityId } : {activityId:string}) {

// 	const [activityData, setActivityData] = useState<ActivityData | null>(null);
// 	// const [activeActivities, setActiveActivities] = useState<Activity[]>([]);

// 	useEffect(() => {
// 		fetch(`https://shark-app-fcayz.ondigitalocean.app/activity/${activityId}`)
// 		.then(res => res.json())
// 		.then((data : ActivityData) => {
// 		//spara objektet i activitydata
// 			setActivityData(data);	
// 		});
// 	}, [activityId]);

// 	// useEffect(() => {
// 	// 	fetch ("https://shark-app-fcayz.ondigitalocean.app/activities")
// 	// 	.then (res => res.json()) 
// 	// 	.then(data => {
// 	// 		setActiveActivities(data.filter(activity => !activity.endTime));
// 	// 	})

// 	// }, [activityId]);

// 	// const onUpdate = (updatedActivityId : string) => {

// 	// 	setActiveActivities((prevActivities : Activity[]) => prevActivities.filter(activity => activity.id !== updatedActivityId));

//     //     fetch(`https://shark-app-fcayz.ondigitalocean.app/activity/${updatedActivityId}`)
//     //     .then(res => res.json())
//     //     .then((data) => {
			
//     //         setActivityData(data);
//     //     });
//     // };

// 	//activityData ? kollar först om activityData är null

// 	const isActivityStarted = activityData ? (activityData.startTime && !activityData.endTime) : false;

// 	return (
// 		<div>
// 			  {isActivityStarted ? (
// 				
// 				<StopActivity activityId={activityId}/>
//                 // <button onClick={addStartActivity}>End Activity</button>
//             ) : (
// 				<StartActivity activityId={activityId}/>
//                 // <button onClick={addStopActivity}>Start Activity</button>
//             )}
            
			
// 		</div>
// 	);
// }

// export default ActivityButton;
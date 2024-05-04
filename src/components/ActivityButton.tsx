import { useEffect, useState } from "react";
import StartActivity from './StartActivity';
import StopActivity from './StopActivity';

// interface Props {
// 	activityId: string;
// }

interface ActivityData {
    startTime: string;
    endTime: string | null;
    
}

function ActivityButton({ activityId } : {activityId:string}) {

	const [activityData, setActivityData] = useState<ActivityData | null>(null);

	useEffect(() => {
		fetch(`https://shark-app-fcayz.ondigitalocean.app/activity/${activityId}`)
		.then(res => res.json())
		.then((data : ActivityData) => {
		//spara objektet i activitydata
			setActivityData(data);	
		});
	}, [activityId ]);

	//activityData ? kollar först om activityData är null

	const isActivityStarted = activityData ? (activityData.startTime && !activityData.endTime) : false;

	return (
		<div>
			  {isActivityStarted ? (
				<StopActivity activityId={activityId}/>
                // <button onClick={addStartActivity}>End Activity</button>
            ) : (
				<StartActivity activityId={activityId}/>
                // <button onClick={addStopActivity}>Start Activity</button>
            )}
            
			
		</div>
	);
}

export default ActivityButton;
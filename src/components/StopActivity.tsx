import { useState } from "react";
import PrintActivites from "./PrintActivites";

interface Props {
	activityId: string;
}
 function StopActivity({ activityId }: Props) {

	const [stopActivity, setStopActivity] = useState("");
	
	const addStopActivity = (e:any) => {
		e.preventDefault();

		
		fetch(`http://localhost:8080/activity/stop/${activityId}`, {
			method: "PUT",
			headers: {
				"content-type": "application/json"
			},
			body: JSON.stringify({ stopTime: stopActivity })
		})
		.then(() => {
			setStopActivity("")
			// PrintActivites()
			
		})
		.catch(error => {
			console.error("Error",error);
		});
}
	
	return (
		<div>
			<button onClick={addStopActivity}>Stop Activity</button>
		</div>
	);
 }
 
 export default StopActivity;
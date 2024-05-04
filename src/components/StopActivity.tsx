// import { useState } from "react";

// interface Props {
// 	activityId: string;
// }
//  function StopActivity({ activityId }: Props) {
	
// 	const [stopActivity, setStopActivity] = useState("");
	
// 	const addStopActivity = (e: React.MouseEvent<HTMLButtonElement>) => {
// 		e.preventDefault();

// 		fetch(`https://shark-app-fcayz.ondigitalocean.app/activity/stop/${activityId}`, {
// 			method: "PUT",
// 			headers: {
// 				"content-type": "application/json"
// 			},
// 			body: JSON.stringify({ stopTime: stopActivity })
// 		})
// 		.then(() => {
// 			setStopActivity("")
// 		})
// 		.catch(error => {
// 			console.error("Error",error);
// 		});
// }
// 	return (
// 		<div>
// 			<button onClick={addStopActivity}>Stop Activity</button>
// 		</div>
// 	);
//  }

//  export default StopActivity;
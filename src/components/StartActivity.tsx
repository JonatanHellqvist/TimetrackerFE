// import { useState } from "react";

// interface Props {
// 	activityId: string;
// }
//  function StartActivity({ activityId } : Props) {

// 	const [startActivity, setStartActivity] = useState("");
	
// 	//@@@@@@@@@@@@@@@@@@@@@@@@@status för aktiviteten @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// 	//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@


// 	const addStartActivity = (e: React.MouseEvent<HTMLButtonElement>) => {
// 		e.preventDefault();
	
// 		fetch(`https://shark-app-fcayz.ondigitalocean.app/activity/start/${activityId}`, {
// 			method: "PUT",
// 			headers: {
// 				"content-type": "application/json"
// 			},
// 			body: JSON.stringify({ startTime: startActivity })
// 		})
// 		.then(() => {
// 			setStartActivity("")
// 		})
// 		.catch(error => {
// 			console.error("Error",error);
// 		});
// }
	
// 	return (
// 		<div>
// 			<button onClick={addStartActivity}>Start Activity</button>
// 		</div>
// 	);
//  }
 
//  export default StartActivity;
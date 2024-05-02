import { useState } from "react";
// import PrintActivites from "./PrintActivites";

interface Props {
	activityId: string;
}
 function StartActivity({ activityId } : Props) {

	const [startActivity, setStartActivity] = useState("");
	// const [active, setActive] = useState("");

	// useEffect(() => {
	// 	fetch(`http://localhost:8080/activity/${activityId}`)
	// 	.then(res => res.json())
	// 	.then(data => {
	// 		if (data.startTime && !data.endTime) {
	// 			setActive("Activity Started")
	// 		} else {
	// 			setActive("Activity not Started")
	// 		}
	// 	})
	// }, [activityId]);
	
	//@@@@@@@@@@@@@@@@@@@@@@@@@status för aktiviteten @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
	//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@


	const addStartActivity = (e:any) => {
		e.preventDefault();
	
		fetch(`http://localhost:8080/activity/start/${activityId}`, {
			method: "PUT",
			headers: {
				"content-type": "application/json"
			},
			body: JSON.stringify({ startTime: startActivity })
		})
		.then(() => {
			setStartActivity("")
			// PrintActivites()
		})
		.catch(error => {
			console.error("Error",error);
		});
}
	
	return (
		<div>
			<button onClick={addStartActivity}>Start Activity</button>
		</div>
	);
 }
 
 export default StartActivity;





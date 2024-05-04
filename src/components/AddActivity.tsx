// import { useEffect, useState } from "react";
// import React from "react";
// // import PrintActivites from "./PrintActivites"

// import { fetchActivities } from './PrintActivites';


// function AddActivity() {


// 	const [addActivity, setAddActivity] = useState("")

// 	const saveNewActivity = (e:React.FormEvent<HTMLFormElement>) => {
// 		e.preventDefault();

// 		fetch("https://shark-app-fcayz.ondigitalocean.app/activity", {
// 			method: "POST",
// 			headers: {
// 				"content-type": "application/json"
// 			},
// 			body: JSON.stringify({activityName: addActivity})
// 		})
// 		.then(() => {
// 			setAddActivity("");
// 			fetchActivities();
// 		});
// 	}	
// 	return (
// 		<div>
// 			<h3>Add Activity</h3>

// 			<form onSubmit= {saveNewActivity}>
// 				<input type="text" value={addActivity} onChange={((e) => setAddActivity(e.target.value))}>
// 				</input>
// 				<button>Add</button>
// 			</form>
// 		</div>
// 	);
// }

// export default AddActivity;



//////-----FLYTTAD TILL PRINTACTIVITES------VARFÖR FUNKAR INTE???////////
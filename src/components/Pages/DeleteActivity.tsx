// import { useState } from "react";

// interface Activity {
// 	activity : Activity
// }
// function DeleteActivity({ activity } : {activity : Activity} ) {

// 	const [deleteActivity, setDeleteActivity] = useState("");

	
	
// 	const getUserIdFromLocalStorage = () => {
// 		const loggedInUserString = localStorage.getItem("loggedInUser");

// 		if (loggedInUserString) {
// 			const loggedInUser = JSON.parse(loggedInUserString);
// 			if (loggedInUser && loggedInUser.id) {
// 				console.log(loggedInUser.id);
// 				return loggedInUser.id;
				
// 			}
// 		}
		
// 		return null; 
// 	  };

// 	//   @DeleteMapping("/{userId}/{activityId}/activity/delete")

// 	const DeleteUserActivity = (activity: Activity) => {
// 		const userId = getUserIdFromLocalStorage();
// 		if (!userId) {
// 			console.error("No userId found in local storage")
// 			return;
// 		}
// 		fetch(`https://shark-app-fcayz.ondigitalocean.app/${userId}/${activity.id}/activity/delete`)
// 		.then (res => res.json())
// 		.then(() => {
// 			setDeleteActivity("");	
// 		})
// 		return null;
// 	}

// 	const DeleteActivityFromHistory = (activity: Activity) => {
// 		const userId = getUserIdFromLocalStorage();
// 		if (!userId) {
// 			console.error("No userId found in local storage")
// 			return;
// 		}
// 		fetch(`https://shark-app-fcayz.ondigitalocean.app/${userId}/${activity.id}/activityhistory/delete`)
// 		.then (res => res.json())
// 		.then(() => {
// 			setDeleteActivity("");	
// 		})
// 		return null;
// 	}





// 	return (
// 		<div>
// 			<button onClick={deleteActivity}>Delete</button>
// 		</div>
// 	);
// }

// export default DeleteActivity;


// function TotalTrackedTime() {

// 	const fetchTrackedTime = () => {

// 		const id = getUserIdFromLocalStorage();

// 		if (!id) {
// 			console.error("No userId found in local storage")
// 			return;
// 		}

// 		fetch(`https://shark-app-fcayz.ondigitalocean.app/historylist/${id}`)
// 		.then (res => res.json())
// 		.then ((data:Activity[]) => {
// 			console.log(data);
// 			setHistoryList(data);

// 			return historyList;
// 		})
		
// };
// 		useEffect(() => {
// 			fetchHistoryList();
// 	},[]);


// 	return (
// 		<div>
			
// 		</div>
// 	);
// }

// export default TotalTrackedTime;
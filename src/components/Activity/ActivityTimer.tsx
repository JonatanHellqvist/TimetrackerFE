import { useEffect, useState } from "react";

function ActivityTimer( { startTime, endTime } : { startTime : string | null; endTime: string | null}) {
	const [timedTime, setTimedTime] = useState<number>(0);

	useEffect(() => {
		let intervalId: number | null = null;
		
		if (startTime && !endTime) {
			const startTimestamp = new Date(startTime).getTime();
			intervalId = setInterval(() => {	
                const currentTime = new Date().getTime();
                const elapsedTimeMs = currentTime - startTimestamp;
                const elapsedMinutes = Math.floor(elapsedTimeMs / 60000 -120); // Beräkna antal minuter //--------> mongolösning för utc -120 TODO formatera tidsformatet <---------
				console.log(elapsedTimeMs / 60000)
                setTimedTime(elapsedMinutes);
            }, 1000);
        }
		return () => {
			if (intervalId) clearInterval(intervalId);
	};
},[startTime,endTime]);
	return (
		<div>
			<p>Elapsed Time: {timedTime} min</p>
		</div>
	);
}
export default ActivityTimer;
<script>
	export let statusObj = { 
		participantAll: 0,
		practitionerAll: 0, 
		expertAll: 0,

	}

	const evaluation = ({practitionerAll, expertAll}) => {
	
		if (practitionerAll + expertAll / 2 >= 0.65 && expertAll >= 0.75) {

			return "Expert";
		} else if (practitionerAll + expertAll / 2 >= 0.65) {
			return "Practitioner";
		} else {
			return "Participant";
		}
	};

	let status = evaluation(statusObj); 

	let score = Object.values(statusObj).reduce((acc, current) => acc + current);  


</script>


<style>

	.user-card {
		width: 150px;
		height: 100%;
		position: relative;
		float: left;
	}

	.user-card::after {
		content: "";
		display: block;
		position: absolute;
		top: 10%;
		right: -2px;
		height: 80%;
		border-left: 2px solid rgba(0, 0, 0, 0.025);
	}

 	.level, .user-card .points {
		top: 15%;
		color: #fff;
		text-transform: uppercase;
		font-size: 0.75em;
		font-weight: bold;
		background: rgba(0, 0, 0, 0.15);
		padding: 0.125rem 0.75rem;
		border-radius: 100px;
		white-space: nowrap;
	}

	.user-card .points {
		top: 85%;
	}


</style>



<div class="user-card mt4">
	<div class="level ma2 w4">{status}</div>
		 <img class="mt3 mb2" src="icons/face.svg" alt="">
	<div class="points ma2 w4 ">{score.toFixed(2)}</div>
</div>

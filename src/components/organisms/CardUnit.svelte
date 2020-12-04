<script>
	import CardButtons from "./../molecules/CardButtons.svelte"; 
	import { dataLevel, dataAxis } from "./../../stores/chartStore.js";
	import CardRightInfo from "./../molecules/CardRightInfo.svelte"; 
	import TableResult from "./../molecules/TableResult.svelte";
	import { moderateStore } from "./../../stores/moderateStore.js";
	import { itemsMaster } from "./../../stores/masterStore.js";
	import {tag} from "../../AxisBBDD.js";
	import Dojo from "../molecules/Dojo.svelte"; 
	export let name;
	export let tribal;
	export let email;
	export let index;
	export let rol;
	export let answers;

	let userObject = {};

	const masterAnswers = $itemsMaster ? $itemsMaster : {};

	let key = Object.keys(answers);

	let sizeQuest = key.length; // number of questions define to use the loop.
	let sizeQuestMaster = Object.keys(masterAnswers).length;

	// Loop Validate Answers
	for (let index = 0; index < sizeQuestMaster; index++) {
		for (let i = 0; i < sizeQuest; i++) {
			let masterAnswersValues = masterAnswers[index][key[i]];

			// get the score points
			let splitMasterAnswer = masterAnswersValues
				? masterAnswersValues.split("&")
				: {};
			let trueAnswer = splitMasterAnswer[0]
				? splitMasterAnswer[0].replaceAll(" ", "")
				: "";
			let scoreSum = Number(
				splitMasterAnswer[1] ? splitMasterAnswer[1].replace(",", ".") : 0
			); // prevent use "," to decimals

			let answerToEvaluate = answers[key[i]]
				? answers[key[i]].replaceAll(" ", "")
				: "";

			// Answers equal to "NO" score 0;
			if (
				answerToEvaluate.toUpperCase() == "NO" ||
				answerToEvaluate.toUpperCase() == "NO."
			) {
				userObject[key[i]] = 0;
			}
			// It's not and else because maybe we need to score some points is the candidate answers with NO
			if (answerToEvaluate == trueAnswer && scoreSum) {
				userObject[key[i]] = scoreSum;
			}
		}
	}

	// Add Object to array with only scores

	$moderateStore.push(userObject);

	// Sum Global Score

	const findAndFilter = (term) => {
		let find = Object.keys($moderateStore[index]).filter((item) => {
			return item.includes(term);
		});

		const filtered = Object.keys($moderateStore[index])
			.filter((key) => find.includes(key))
			.reduce((obj, key) => {
				obj[key] = $moderateStore[index][key];
				return obj;
			}, {});
		return filtered;
	};

	// sum all values in a term

	const sumAll = (object) => {
		let values = Object.values(object);

		let cleanValues = values.length > 0 ? values : [0];

		let result =
			values.length > 0
				? cleanValues.reduce((a, b) => a + b) / values.length
				: 0;

		return result;
	};

	// Cluster in Participant, Practitioner, Expert

	const clusterLevels = (participant, practitioner, expert) => {
		let parti = sumAll(findAndFilter(participant));
		let pract = sumAll(findAndFilter(practitioner));
		let exp = sumAll(findAndFilter(expert));
		let result = {
			participant: [parti],
			practitioner: [pract],
			expert: [exp],
		};
		return result;
	};

	// Product Managment -> "A-"
	let axisA = clusterLevels("A-1", "A-2", "A-3");

	// Customer And Stakeholder Management -> "B-"
	let axisB = clusterLevels("B-1", "B-2", "B-3");

	// Product Delivery -> "C-"
	let axisC = clusterLevels("C-1", "C-2", "C-3");

	// Relationship with the team -> "D-"
	let axisD = clusterLevels("D-1", "D-2", "D-3");

	// change color select unselect



	let participantAll = Number(
		(axisA.participant[0] +
			axisB.participant[0] +
			axisC.participant[0] +
			axisD.participant[0]) /
			tag.length
	);

	let practitionerAll = Number(
		(axisA.practitioner[0] +
			axisB.practitioner[0] +
			axisC.practitioner[0] +
			axisD.practitioner[0]) /
			tag.length
	);

	let expertAll = Number(
		(axisA.expert[0] + axisB.expert[0] + axisC.expert[0] + axisD.expert[0]) /
			tag.length
	);

	let allAxisA = Number(
		(axisA.participant[0] + axisA.practitioner[0] + axisA.expert[0]) / 3
	);

	let allAxisB = Number(
		(axisB.participant[0] + axisB.practitioner[0] + axisB.expert[0]) / 3
	);

	let allAxisC = Number(
		(axisC.participant[0] + axisC.practitioner[0] + axisC.expert[0]) / 3
	);

	let allAxisD = Number(
		(axisD.participant[0] + axisD.practitioner[0] + axisD.expert[0]) / 3
	);




	// Toogle Visibility
	let isUnSelected = false;
	let showChart = true;
	let showDojo = false; 
	let hideModerator = true;

	// send data to charts

	$dataLevel.push({
		participant: participantAll,
		practitioner: practitionerAll,
		expert: expertAll,
	});

	$dataAxis.push({
		axisA: allAxisA,
		axisB: allAxisB,
		axisC: allAxisC,
		axisD: allAxisD,
	});

	let section = ""; 
	const onclick = (id) => section = id (id); 
	let buttons = [
		{ id: "moderar", title: "Moderar las respuestas", icon: "edit", onclick },
		{ id: "recomendar", title: "Recomendar cursos", icon: "dojo", onclick },
		{ id: "metricas", title: "Visualizar métricas", icon: "metricas", onclick }
	]
</script>

<style>
	a {
		text-decoration-color: none;
		color: white;
	}

	@import url("https://fonts.googleapis.com/css?family=Abel");
	.centered {
		margin: auto;
		width: 50%;
		padding: 10px;
	}
	.card {
		width: 450px;
		height: 220px;
		background-color: #fff;
		background: linear-gradient(#f8f8f8, #fff);
		box-shadow: 0 8px 16px -8px rgba(0, 0, 0, 0.4);
		border-radius: 6px;
		overflow: hidden;
		position: relative;

		margin: auto;
	}

	.card h1 {
		text-align: center;
	}

	.card .additional {
		position: absolute;
		width: 150px;
		height: 100%;
		background: linear-gradient(#de685e, #ee786e);

		transition: width 0.4s;
		overflow: hidden;
		z-index: 2;
	}

	.card .unCheck {
		background: linear-gradient(#777777, #747474);
	}

	.card:hover .additional {
		width: 100%;
		border-radius: 0 5px 5px 0;
	}


	.card .additional .more-info {
		width: 300px;
		float: left;
		position: absolute;
		left: 150px;
		height: 100%;
	}

	.card .additional .more-info h1 {
		color: #fff;
		margin-bottom: 0;
	}

	.card .additional .coords span + span {
		float: right;
	}

	.card .additional .stats {
		font-size: 2rem;
		display: flex;
		position: absolute;
		bottom: 1rem;
		left: 1rem;
		right: 1rem;
		top: auto;
		color: #fff;
	}

	.card .additional .stats > div {
		flex: 1;
	}

	.card .general {
		width: 300px;
		height: 100%;
		position: absolute;
		top: 0;
		right: 0;
		z-index: 1;
		box-sizing: border-box;
		padding: 1rem;
		padding-top: 0;
	}

	.invisible {
		display: none;
	}

	.float-btn {
		position: fixed;
		width: 60px;
		height: 60px;
		bottom: 40px;
		right: 40px;
		padding-top: 15px;
		background-color: #53adb2;
		color: #fff;
		border-radius: 50px;
		text-align: center;
		box-shadow: 2px 2px 3px #999;
	}
</style>

<div class="centered ">
	<div
		class="card"
		on:click={() => {
			isUnSelected = !isUnSelected;
		}}>
		<div class="additional " class:unCheck={isUnSelected}>
			<CardRightInfo statusObj={{participantAll, practitionerAll, expertAll}}/>
			
			<div class="more-info">
				<h1 class="f4 ">{name}</h1>

				<CardButtons {buttons} />
				
				<div class="stats">
					<div>
						<div class="tr">
							<span class="f6 mt1 tr">
								<a href={`mailto:${email}`}>{email ? email : ''}</a></span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="general">
			<h1 class="f4 ">{name}</h1>
			<p class="tl">
				Pertenece a la tribu
				<span class="b">{tribal}</span>
				{#if rol}
					con el rol de <span class="b">{rol}.</span>
				{/if}
			</p>
		</div>
	</div>

	<div class:invisible={showDojo}>
		<Dojo/>
	</div>
	<div class:invisible={showChart}>
		<TableResult
			{axisA}
			{axisB}
			{axisC}
			{axisD}
			{participantAll}
			{practitionerAll}
			{expertAll}
			{allAxisA}
			{allAxisB}
			{allAxisC}
			{allAxisD} />
	</div>
	<div class="tl " class:invisible={hideModerator}>
		<slot />

		<div
			on:click={() => {
				hideModerator = !hideModerator;
				window.location.reload();
			}}
			class="float-btn grow ">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="white"
				width="24px"
				height="24px"><path d="M0 0h24v24H0z" fill="none" />
				<path
					d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z" /></svg>
		</div>
	</div>
</div>

<script>
	import CardButtons from "./../molecules/CardButtons.svelte";
	import ButtonFloat from "./../atoms/ButtonFloat.svelte";
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




	const sumLevel = (levelSelected) => Number(
		(
			axisA[levelSelected][0] +
			axisB[levelSelected][0] +
			axisC[levelSelected][0] +
			axisD[levelSelected][0] 
		) / tag.length
	)

	const sumAxis = (axisSelected) => Number((
		axisSelected.participant[0] + axisSelected.practitioner[0] + axisSelected.expert[0]) /3
	);



	let	axisA = clusterLevels("A-1", "A-2", "A-3");
	let	axisB = clusterLevels("B-1", "B-2", "B-3");
	let	axisC = clusterLevels("C-1", "C-2", "C-3");
	let	axisD = clusterLevels("D-1", "D-2", "D-3");
	let allAxisA = sumAxis(axisA);
	let allAxisB = sumAxis(axisB);
	let allAxisC = sumAxis(axisC);
	let allAxisD = sumAxis(axisD);
	let	participantAll = sumLevel("participant");
	let	practitionerAll = sumLevel("practitioner");
	let	expertAll = sumLevel("expert");


	let tableResultData = {
		axisA, axisB, axisC, axisD,
		allAxisA, allAxisB, allAxisC, allAxisD,
		participantAll, practitionerAll, expertAll,

	}



	// Toogle Visibility
	let isUnSelected = false;


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
	let toogle = false;

	const onClick = (id) => {

		section == id ? toogle = false : toogle = true; 
		toogle ? section = id : section = ""; 
		}

	let buttons = [
		{ id: "moderar", title: "Moderar las respuestas", icon: "edit", onClick },
		{ id: "recomendar", title: "Recomendar cursos", icon: "dojo", onClick },
		{ id: "metricas", title: "Visualizar métricas", icon: "metricas", onClick }
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

	<div>
		{#if section == "moderar"}
		<div class="tl">
			<slot />
			<ButtonFloat onClick={() => window.location.reload()}/>
		</div>
	
				{:else if section == "recomendar"}
			<Dojo/>
		{:else if section == "metricas"}
			<TableResult {tableResultData}/>
		{/if}
	</div>


	</div>

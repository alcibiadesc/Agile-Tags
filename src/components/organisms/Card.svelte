<script>
	import ButtonFloat from "./../atoms/ButtonFloat.svelte";
	import { dataLevel, dataAxis } from "./../../stores/chartStore.js";
	import CardInfo from "./../molecules/CardInfo.svelte";
	import TableResult from "./../molecules/TableResult.svelte";
	import { moderateStore } from "./../../stores/moderateStore.js";
	import { itemsMaster } from "./../../stores/masterStore.js";
	import { tag } from "../../AxisBBDD.js";
	import Dojo from "../molecules/Dojo.svelte";
	import Moderar from "./../molecules/Moderar.svelte";
	import {
		recomendatorStore,
		recomendationMatch,
	} from "./../../stores/recomendator.js";

	export let cardData = {};
	export let index = 0;
	export let answers;
	export let arrayColors;

	const deleteThisKeys = [
		"Correo electrónico",
		"Nombre",
		"Tribu",
		"Rol",
		"Hola de finalización",
	];
	const filterCardData = (keys, object) =>
		keys.map((key) => delete object[key]);
	const moderatorData = { ...cardData };

	filterCardData(deleteThisKeys, moderatorData);

	let userObject = {};
	let dojoData = [];
	const masterAnswers = $itemsMaster ? $itemsMaster : [{ a: 0 }, { b: 0 }];

	let key = Object.keys(answers);

	const deleteSpaceString = (string = "") =>
		(string = string.replaceAll(" ", ""));

	const transformToNumber = (string = "0") =>
		(string = Number(string.replace(",", ".")));

	const splitAnswerAndScore = (string = "a&0") => string.split("&");

	const checkScore = (answer, correctAnswer, score = 0) => {
		let answerIsNo = answer.toUpperCase().replaceAll(".", "");
		let scoreObject = null;
		if (answerIsNo == "NO") {
			scoreObject = 0;
		}

		if (answer == correctAnswer) {
			scoreObject = score;
		}
		return scoreObject;
	};

	// Loop Validate Answers
	masterAnswers.forEach((_, index) => {
		key.forEach((_, i) => {
			let masterAnswersValues = masterAnswers[index][key[i]];
			let splitMasterAnswer = splitAnswerAndScore(masterAnswersValues);
			let trueAnswer = deleteSpaceString(splitMasterAnswer[0]);
			let scoreSum = transformToNumber(splitMasterAnswer[1]);
			let answerToEvaluate = deleteSpaceString(answers[key[i]]);

			recomendationMatch(
				$recomendatorStore,
				key[i],
				answerToEvaluate,
				dojoData
			);

			userObject[key[i]] = checkScore(answerToEvaluate, trueAnswer, scoreSum);
		});
	});


		//only push if its undefined or new
	if(!$moderateStore[index]) {
		 $moderateStore[index] = userObject; 
	} 

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
		let values = Object.values(object).filter((score) => score != null);

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

	const sumLevel = (levelSelected) =>
		Number(
			(axisA[levelSelected][0] +
				axisB[levelSelected][0] +
				axisC[levelSelected][0] +
				axisD[levelSelected][0]) /
				tag.length
		);

	const sumAxis = (axisSelected) =>
		Number(
			(axisSelected.participant[0] +
				axisSelected.practitioner[0] +
				axisSelected.expert[0]) /
				3
		);

	let axisA = clusterLevels("A-1", "A-2", "A-3");
	let axisB = clusterLevels("B-1", "B-2", "B-3");
	let axisC = clusterLevels("C-1", "C-2", "C-3");
	let axisD = clusterLevels("D-1", "D-2", "D-3");
	let allAxisA = sumAxis(axisA);
	let allAxisB = sumAxis(axisB);
	let allAxisC = sumAxis(axisC);
	let allAxisD = sumAxis(axisD);
	let participantAll = sumLevel("participant");
	let practitionerAll = sumLevel("practitioner");
	let expertAll = sumLevel("expert");

	let tableResultData = {
		axisA,
		axisB,
		axisC,
		axisD,
		allAxisA,
		allAxisB,
		allAxisC,
		allAxisD,
		participantAll,
		practitionerAll,
		expertAll,
	};

	// Toogle Visibility
	let isSelected = false;
	const toogleSelect = () => (isSelected = !isSelected);

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
		section == id ? (toogle = false) : (toogle = true);
		toogle ? (section = id) : (section = "");
	};

	let buttons = [
		{ id: "moderar", title: "Moderar las respuestas", icon: "edit", onClick },
		{ id: "recomendar", title: "Recomendar cursos", icon: "dojo", onClick },
		{ id: "metricas", title: "Visualizar métricas", icon: "metricas", onClick },
	];

	// Recomendador
</script>

<style>
	@import url("https://fonts.googleapis.com/css?family=Abel");
	.centered {
		margin: auto;
		width: 50%;
		padding: 10px;
	}
</style>

<div class="centered ">
	<CardInfo
		{toogleSelect}
		{isSelected}
		statusObj={{ participantAll, practitionerAll, expertAll }}
		{buttons}
		{cardData} />

	<div>
		{#if section == 'moderar'}
			<div class="tl">
				{#each Object.keys(moderatorData) as key, i}
					<Moderar {key} item={moderatorData} {index} {i} {arrayColors} />
				{/each}
				<ButtonFloat onClick={() => window.location.reload()} />
			</div>
		{:else if section == 'recomendar'}
			<Dojo {dojoData} />
		{:else if section == 'metricas'}
			<TableResult {tableResultData} />
		{/if}
	</div>
</div>

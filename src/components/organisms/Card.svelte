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
		deleteSpaceString,
		transformToNumber,
		filterCardData,
		splitAnswerAndScore,
		checkScore,
		sumAll,
	} from "./Card.js";
	import {
		recomendatorStore,
		recomendationMatch,
	} from "./../../stores/recomendator.js";

	export let cardData = {};
	export let index = 0;
	export let answers;
	export let arrayColors;

	const moderatorData = { ...cardData };

	const deleteThisKeys = [
		"Correo electrónico",
		"Nombre",
		"Tribu",
		"Rol",
		"Hola de finalización",
	];

	filterCardData(deleteThisKeys, moderatorData);

	let userObject = {};
	let dojoData = [];
	const masterAnswers = $itemsMaster ? $itemsMaster : [{ a: 0 }, { b: 0 }];

	let key = Object.keys(answers);

	// Loop Validate Answers
	masterAnswers.forEach((_, index) => {
		key.forEach((_, i) => {
			let masterAnswersValues = masterAnswers[index][key[i]];
			let splitMasterAnswer = splitAnswerAndScore(masterAnswersValues);

			let trueAnswer = deleteSpaceString(splitMasterAnswer[0]);
			let scoreSum = transformToNumber(splitMasterAnswer[1]);
			let answerToEvaluate = deleteSpaceString(answers[key[i]]);

			if (!userObject[key[i]]) {
				userObject[key[i]] = checkScore(answerToEvaluate, trueAnswer, scoreSum);
			}
		});
	});

	// Recomendation dojo
	key.forEach((_, i) => {
		let answerToEvaluate = deleteSpaceString(answers[key[i]]);

		recomendationMatch($recomendatorStore, key[i], answerToEvaluate, dojoData);
	});

	//only push if its undefined or new
	if (!$moderateStore[index]) {
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

	const clusterLevels = (participant, practitioner, expert) => {
		let result = {
			participant: [sumAll(findAndFilter(participant))],
			practitioner: [sumAll(findAndFilter(practitioner))],
			expert: [sumAll(findAndFilter(expert))],
		};
		return result;
	};
	const axisObj = {
		axisA: clusterLevels("A-1", "A-2", "A-3"),
		axisB: clusterLevels("B-1", "B-2", "B-3"),
		axisC: clusterLevels("C-1", "C-2", "C-3"),
		axisD: clusterLevels("D-1", "D-2", "D-3"),
	};
	const { axisA, axisB, axisC, axisD } = axisObj;

	const sumAxis = (axisSelected) => {
		let arrayValues = Object.values(axisSelected);
		let arraySave = [];
		arrayValues.map((x) => arraySave.push(x[0]));

		let result = Number(arraySave.reduce((acc, num) => acc + num) / 3) ;

		console.log(result);

		return result;
	};
	const allAxis = {
		allAxisA: sumAxis(axisA),
		allAxisB: sumAxis(axisB),
		allAxisC: sumAxis(axisC),
		allAxisD: sumAxis(axisD),
	};

	const { allAxisA, allAxisB, allAxisC, allAxisD } = allAxis;

	const sumLevel = (levelSelected) =>
		Number(
			(axisA[levelSelected][0] +
				axisB[levelSelected][0] +
				axisC[levelSelected][0] +
				axisD[levelSelected][0]) /
				tag.length
		);
	let participantAll = sumLevel("participant");
	let practitionerAll = sumLevel("practitioner");
	let expertAll = sumLevel("expert");

	let tableResultData = {
		axisObj,
		allAxis,
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
</script>

<style>
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
			<Dojo {dojoData} {index} />
		{:else if section == 'metricas'}
			<TableResult {tableResultData} />
		{/if}
	</div>
</div>

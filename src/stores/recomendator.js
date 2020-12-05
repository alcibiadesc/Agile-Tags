import { writable } from "svelte/store";

const STORE_PREFIX = "recomendator_";

const itemsData = localStorage.getItem(`${STORE_PREFIX}items`);

export const recomendatorStore = writable(JSON.parse(itemsData) || []);

recomendatorStore.subscribe((value) => {
	if (itemsData !== value) {
		localStorage.setItem(`${STORE_PREFIX}items`, JSON.stringify(value));
	}
});

// Reset Storeage
export const resetRecomendator = () => {
	recomendatorStore.set([]);
};

export const dojoData = writable([]);

export const recomendationMatch = (
	arrayWithRecomendations,
	question,
	userAnswer,
	arrayDojo
) => {
	console.log("check recomendations");
	arrayWithRecomendations.forEach((array) => {
		let dojoQuestion = array["PREGUNTA"];
		let dojoAnswer = array["RESPUESTA ESPERADA"].replaceAll(" ", "");

		if (question.includes(dojoQuestion)) {
			let checkAnswer = dojoAnswer == userAnswer;

			if (checkAnswer) {
				arrayDojo.push({
					pregunta: question,
					curso: array["RECOMENDACIÓN"],
					enlace: array["LINK"],
				});
			}
		}
	});
};

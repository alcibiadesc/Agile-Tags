export const deleteSpaceString = (string = "") =>
	(string = string.replaceAll(" ", ""));

export const transformToNumber = (string = "0") =>
	(string = Number(string.replace(",", ".")));

export const filterCardData = (keys, object) =>
	keys.map((key) => delete object[key]);

export const splitAnswerAndScore = (string = "a&0") => string.split("&");

export const checkScore = (answer, correctAnswer, score = 0) => {
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

export const sumAll = (object) => {
	let values = Object.values(object).filter((score) => score != null);

	let cleanValues = values.length > 0 ? values : [0];

	let result =
		values.length > 0 ? cleanValues.reduce((a, b) => a + b) / values.length : 0;

	return result;
};

<script>
    import { moderateStore } from "./../stores/moderateStore.js";
    import { itemsMaster } from "./../stores/masterStore.js";
    import { afterUpdate } from "svelte";

    export let name;
    export let tribal;
    export let email;
    export let index;
    export let rol;

    let userObject = {};

    let isVisible = "false";

    export let answers; // user answers

    const masterAnswers = $itemsMaster
        ? $itemsMaster
        : { "nothing nada": "1&0" };

    let key = Object.keys(answers);

    let score = 0;

    let sizeQuest = Object.keys(answers).length; // number of questions define to use the loop.
    let sizeQuestMaster = Object.keys(masterAnswers).length;

    // Loop Validate Answers
    for (let index = 0; index < sizeQuestMaster; index++) {
        for (let i = 0; i < sizeQuest; i++) {
            let masterAnswersValues = masterAnswers[index][key[i]];
            let splitMasterAnswer = masterAnswersValues
                ? masterAnswersValues.split("&")
                : {};
            let trueAnswer = splitMasterAnswer[0]
                ? splitMasterAnswer[0].replace(" ", "")
                : "";
            let scoreSum = Number(
                splitMasterAnswer[1]
                    ? splitMasterAnswer[1].replace(",", ".")
                    : "0"
            ); // prevent use "," to decimals

            let answerToEvaluate = answers[key[i]]
                ? answers[key[i]].replace(" ", "")
                : "";

            if (answerToEvaluate == trueAnswer) {
                score += scoreSum;
                scoreSum > 0 ? (userObject[key[i]] = scoreSum) : "";
            } else {
                score += 0;
            }

            // console.log(`${name} suma ${score}`);
        }
    }

    // Add Object to array with only scores
    $moderateStore.push(userObject);

    // Sum Global Score
    $: scoreUser = Object.values($moderateStore[index])
        ? Object.values($moderateStore[index]).reduce((a, b) => a + b)
        : 0;

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

    // Product Managment -> "A-"

    let findScorePM = findAndFilter("A-");

    // Customer and Stakeholder Management -> "C-"

    let findScoreCSM = findAndFilter("B-");

    // Product Delivery -> "D-"

    let findScoreD = findAndFilter("C-");

    // Relationship with the team -> "D-"

    let findScoreRT = findAndFilter("D-");

    // change color select unselect
    let isSelected = false;
</script>

<style>
    a {
        text-decoration-color: none;
        color: white;
    }

    .metricas p {
        text-align: left;
        margin: 0;
        padding: 0;
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

    .card .additional .user-card {
        width: 150px;
        height: 100%;
        position: relative;
        float: left;
    }

    .card .additional .user-card::after {
        content: "";
        display: block;
        position: absolute;
        top: 10%;
        right: -2px;
        height: 80%;
        border-left: 2px solid rgba(0, 0, 0, 0.025);
    }

    .card .additional .user-card .level,
    .card .additional .user-card .points {
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

    .card .additional .user-card .points {
        top: 85%;
    }

    .card .additional .user-card svg {
        top: 50%;
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

    .float {
        position: fixed;
        width: 60px;
        height: 60px;
        bottom: 40px;
        right: 40px;
        padding-top: 15px;
        background-color: #e67066;
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
            isSelected = !isSelected;
        }}>
        <div class="additional " class:unCheck={isSelected}>
            <div class="user-card mt4">
                <div class="level ma2 w4">Practitioner</div>

                <svg
                    class="mv3"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="white"
                    width="60px"
                    height="60px"><path d="M0 0h24v24H0z" fill="none" />
                    <path
                        d="M9 11.75c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zm6 0c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-.29.02-.58.05-.86 2.36-1.05 4.23-2.98 5.21-5.37C11.07 8.33 14.05 10 17.42 10c.78 0 1.53-.09 2.25-.26.21.71.33 1.47.33 2.26 0 4.41-3.59 8-8 8z" /></svg>

                <div class="points ma2 w4 ">{scoreUser}</div>
            </div>
            <div class="more-info">
                <h1 class="f4 ">{name}</h1>

                <div>
                    <button
                        class="grow mt4 br3"
                        on:click={() => {
                            isVisible = !isVisible;
                            isSelected = !isSelected;
                        }}>Moderar su cuestionario</button>
                </div>
                <div class="stats">
                    <div>
                        <div class="tr">
                            <span class="f6 tr">
                                <a
                                    href={`mailto:${email}`}>{email ? email : ''}</a></span>
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
                {#if rol}con el rol de <span class="b">{rol}.</span>{/if}
            </p>

            <h4 class="mb1 pb0">Resultados</h4>
            <div class="f6 metricas tl">
                <p>Product Management:</p>
                <p>Customer and Stakeholder Mgmt:</p>
                <p>Product Delivery:</p>
                <p>Relationship with the team:</p>
            </div>
        </div>
    </div>
    <div class="tl " class:invisible={isVisible}>
        <slot />

        <div
            on:click={() => {
                isVisible = !isVisible;
            }}
            class="float grow ">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
                width="24px"
                height="24px"><path d="M0 0h24v24H0z" fill="none" />
                <path
                    d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" /></svg>
        </div>
    </div>
</div>

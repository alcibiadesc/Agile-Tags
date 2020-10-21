<script>
    import { afterUpdate } from "svelte";
    import { dataLevel, dataAxis } from "./../stores/chartStore.js";
    import TableResult from "./TableResult.svelte";
    import { moderateStore } from "./../stores/moderateStore.js";
    import { itemsMaster } from "./../stores/masterStore.js";
    import { axisStore } from "./../stores/axisStore.js";
    import {
        productOwner,
        scrumMaster,
        rte,
        tribeLead,
        ttl,
    } from "../AxisBBDD.js";

    export let tag = [0, 0, 0, 0];

    $: tag = [0, 0, 0, 0];

    switch ($axisStore) {
        case "productOwner":
            tag = productOwner;
            break;
        case "scrumMaster":
            tag = scrumMaster;
            break;

        case "rte":
            tag = rte;
            break;

        case "tribeLead":
            tag = tribeLead;
            break;

        case "ttl":
            tag = ttl;
            break;

        default:
            break;
    }

    export let name;
    export let tribal;
    export let email;
    export let index;
    export let rol;
    export let answers;

    let userObject = {};

    const masterAnswers = $itemsMaster ? $itemsMaster : {};

    let key = Object.keys(answers);

    let score = 0;

    let sizeQuest = key.length; // number of questions define to use the loop.
    let sizeQuestMaster = Object.keys(masterAnswers).length;

    // Loop Validate Answers
    for (let index = 0; index < sizeQuestMaster; index++) {
        for (let i = 0; i < sizeQuest; i++) {
            let masterAnswersValues = masterAnswers[index][key[i]];
            let splitMasterAnswer = masterAnswersValues
                ? masterAnswersValues.split("&")
                : {};
            let trueAnswer = splitMasterAnswer[0]
                ? splitMasterAnswer[0].replaceAll(" ", "")
                : "";
            let scoreSum = Number(
                splitMasterAnswer[1]
                    ? splitMasterAnswer[1].replace(",", ".")
                    : "0"
            ); // prevent use "," to decimals

            let answerToEvaluate = answers[key[i]]
                ? answers[key[i]].replaceAll(" ", "")
                : "";

            if (answerToEvaluate == trueAnswer) {
                score += scoreSum;
                scoreSum > 0 ? (userObject[key[i]] = scoreSum) : 0;
            } else {
                score += 0;
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
        let result = cleanValues.reduce((a, b) => a + b / values.length);

        return result;
    };

    // Cluster in Participant, Practitioner, Expert

    const clusterLevels = (practitioner, participant, expert) => {
        let pract = sumAll(findAndFilter(practitioner));

        let parti = sumAll(findAndFilter(participant));
        let exp = sumAll(findAndFilter(expert));
        let result = {
            practitioner: [pract],
            participant: [parti],
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

    const evaluation = (practitioner, expert) => {
        if (practitioner + expert / 2 >= 0.65 && expert >= 0.75) {
            return "Expert";
        } else if (practitioner + expert / 2 >= 0.65) {
            return "Practitioner";
        } else {
            return "Participant";
        }
    };

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
        (axisA.expert[0] +
            axisB.expert[0] +
            axisC.expert[0] +
            axisD.expert[0]) /
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

    // Push the level of knowledge in a field

    let sumaAllPoints = () => {
        let result = participantAll + practitionerAll + expertAll;

        return result;
    };

    sumaAllPoints();

    let scoreFinal = sumaAllPoints();

    let status = evaluation(participantAll, practitionerAll, expertAll);

    // Toogle Visibility
    let isUnSelected = false;
    let showChart = true;
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
            <div class="user-card mt4">
                <div class="level ma2 w4">{status}</div>

                <svg
                    class="mv3"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="white"
                    width="60px"
                    height="60px"><path d="M0 0h24v24H0z" fill="none" />
                    <path
                        d="M9 11.75c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zm6 0c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-.29.02-.58.05-.86 2.36-1.05 4.23-2.98 5.21-5.37C11.07 8.33 14.05 10 17.42 10c.78 0 1.53-.09 2.25-.26.21.71.33 1.47.33 2.26 0 4.41-3.59 8-8 8z" /></svg>

                <div class="points ma2 w4 ">{scoreFinal.toFixed(2)}</div>
            </div>
            <div class="more-info">
                <h1 class="f4 ">{name}</h1>

                <div>
                    <button
                        class="grow mt4 br3"
                        on:click={() => {
                            hideModerator = !hideModerator;
                            isUnSelected = !isUnSelected;
                        }}>Moderar su cuestionario</button>
                </div>

                <div>
                    <button
                        class="grow mt4 br3"
                        on:click={() => {
                            isUnSelected = !isUnSelected;
                            showChart = !showChart;
                        }}>Ver detalle</button>
                </div>
                <div class="stats">
                    <div>
                        <div class="tr">
                            <span class="f6 mt1 tr">
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
        </div>
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

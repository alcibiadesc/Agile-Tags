<script>
    import { dataLevel } from "./../../stores/chartStore.js";
    import { onMount } from "svelte";
    import { backgroundColor, borderColor, borderWidth } from "./custom.js";
    import Chart from "chart.js";

    import { axisStore } from "./../../stores/axisStore.js";
    import all from "./../../AxisBBDD.js";
    $: tag = eval($axisStore);

    let participant = [0];
    let practitioner = [0];
    let expert = [0];

    console.log("Prac: " + $dataLevel[0].practitioner);

    for (const value of $dataLevel) {
        participant.push(value.participant);
        practitioner.push(value.practitioner);
        expert.push(value.expert);
    }

    let pract = (
        practitioner.reduce((a, b) => a + b) / practitioner.length
    ).toFixed(2);

    let parti = (
        participant.reduce((a, b) => a + b) / participant.length
    ).toFixed(2);

    let exp = (expert.reduce((a, b) => a + b) / expert.length).toFixed(2);

    let data = [parti, pract, exp];

    function createChart() {
        var ctx = document.getElementById("polar").getContext("2d");
        var polar = new Chart(ctx, {
            data: {
                labels: ["Participant", "Practitioner", "Expert"],
                datasets: [
                    {
                        label: "# of Votes",
                        data: data,
                        backgroundColor: backgroundColor,
                        borderColor: borderColor,
                        borderWidth: borderWidth,
                    },
                ],
            },

            type: "polarArea",
            options: "",
        });
    }

    onMount(createChart);
</script>

<canvas id="polar" width="20px" height="20px" />

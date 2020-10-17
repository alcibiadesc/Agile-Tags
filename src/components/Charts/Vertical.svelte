<script>
    import { dataAxis } from "./../../stores/chartStore.js";
    import { onMount, onDestroy, afterUpdate } from "svelte";
    import Chart from "chart.js";
    import { backgroundColor, borderColor, borderWidth } from "./custom.js";
    import { productOwner, scrumMaster } from "./../../AxisBBDD.js";
    import { axisStore } from "./../../stores/axisStore.js";

    $: tag = productOwner;

    let data = [0, 0, 0];
    let axisA = [0];
    let axisB = [0];
    let axisC = [0];
    let axisD = [0];

    for (const value of $dataAxis) {
        axisA.push(value.axisA);
        axisB.push(value.axisB);
        axisC.push(value.axisC);
        axisD.push(value.axisD);
    }

    let axisAresult = (axisA.reduce((a, b) => a + b) / axisA.length).toFixed(2);

    let axisBresult = (axisB.reduce((a, b) => a + b) / axisB.length).toFixed(2);

    let axisCresult = (axisC.reduce((a, b) => a + b) / axisC.length).toFixed(2);

    let axisDresult = (axisD.reduce((a, b) => a + b) / axisD.length).toFixed(2);

    data = [axisAresult, axisBresult, axisCresult, axisDresult];

    onMount(() => {
        if ($axisStore == "scrumMaster") {
            tag = scrumMaster;
        } else if ($axisStore == "productOwner") {
            tag = productOwner;
        }
    });

    function createChart() {
        var ctx = document.getElementById("myChart").getContext("2d");
        var myChart = new Chart(ctx, {
            type: "bar",
            data: {
                labels: tag,
                datasets: [
                    {
                        label: "",
                        data: data,
                        backgroundColor: backgroundColor,
                        borderColor: borderColor,
                        borderWidth: borderWidth,
                    },
                ],
            },
            options: {
                scales: {
                    yAxes: [
                        {
                            ticks: {
                                beginAtZero: true,
                            },
                        },
                    ],
                },
            },
        });
    }

    onMount(createChart);

    onDestroy(() => {
        dataAxis.set([]);
    });
</script>

<canvas id="myChart" width="20px" height="20px" />

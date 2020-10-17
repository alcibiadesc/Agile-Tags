<script>
    import {} from "./../../stores/chartStore.js";
    import { onMount } from "svelte";
    import Chart from "chart.js";
    import { backgroundColor, borderColor, borderWidth } from "./custom.js";

    import { axisStore } from "./../../stores/axisStore.js";
    import all from "./../../AxisBBDD.js";
    $: tag = eval($axisStore);
    let data = [1, 2, 3, 4];
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
</script>

<canvas id="myChart" width="20px" height="20px" />

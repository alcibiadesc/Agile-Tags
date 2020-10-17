<script>
    import { onMount } from "svelte";
    import Chart from "chart.js";
    import { backgroundColor, borderColor, borderWidth } from "./custom.js";

    function createChart() {
        var ctx = document.getElementById("myChart").getContext("2d");
        var myChart = new Chart(ctx, {
            type: "bar",
            data: {
                labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                datasets: [
                    {
                        label: "# of Votes",
                        data: [12, 19, 3, 5, 2, 3],
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

<div class="w-25"><canvas id="myChart" width="20px" height="20px" /></div>

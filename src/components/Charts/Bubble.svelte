<script>
    import { onMount } from "svelte";
    import Chart from "chart.js";
    import { backgroundColor, borderColor, borderWidth } from "./custom.js";

    function createChart() {
        var ctx = document.getElementById("bubble").getContext("2d");
        var bubble = new Chart(ctx, {
            data: {
                labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                datasets: [
                    {
                        label: "# of Votes",
                        data: [
                            {
                                x: -100,
                                y: Math.random(),
                                r: Math.random() * 100,
                            },
                            {
                                x: Math.random(),
                                y: Math.random(),
                                r: Math.random() * 100,
                            },
                            {
                                x: Math.random(),
                                y: Math.random(),
                                r: Math.random() * 100,
                            },
                            {
                                x: Math.random(),
                                y: Math.random(),
                                r: Math.random() * 100,
                            },
                            {
                                x: Math.random(),
                                y: Math.random(),
                                r: Math.random() * 100,
                            },
                            {
                                x: Math.random(),
                                y: Math.random(),
                                r: Math.random() * 100,
                            },
                            {
                                x: Math.random(),
                                y: Math.random(),
                                r: Math.random() * 100,
                            },
                        ],
                        backgroundColor: backgroundColor,
                        borderColor: borderColor,
                        borderWidth: borderWidth,
                    },
                ],
            },

            type: "bubble",
            options: "",
        });
    }

    onMount(createChart);
</script>

<div class="w-25"><canvas id="bubble" width="20px" height="20px" /></div>

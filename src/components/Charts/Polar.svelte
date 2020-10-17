<script>
    import { onMount } from "svelte";
    import { backgroundColor, borderColor, borderWidth } from "./custom.js";
    import Chart from "chart.js";

    function createChart() {
        var ctx = document.getElementById("polar").getContext("2d");
        var polar = new Chart(ctx, {
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

            type: "polarArea",
            options: "",
        });
    }

    onMount(createChart);
</script>

<div class="w-25"><canvas id="polar" width="20px" height="20px" /></div>

<script>
    import FusionCharts from "fusioncharts";
    import Charts from "fusioncharts/fusioncharts.charts";

    import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
    import SvelteFC, { fcRoot } from "svelte-fusioncharts";

    import dataSource from "./../data.js";

    fcRoot(FusionCharts, Charts, FusionTheme);

    let chartObj,
        chartConfig = {
            id: "column-chart",
            type: "column2d",
            width: "800",
            height: "400",
            renderAt: "chart-container",
            dataSource,
        };

    const changeChartTypeHandler = (arg) => {
        chartObj.chartType(arg);
    };
</script>

<div id="chart-container">
    <SvelteFC {...chartConfig} bind:chart={chartObj} />
</div>
<div class="fr tr ba ma4 pa3">
    <div class="change-type ">
        <div id="radio1">
            <input
                name="theme-selecter"
                id="radioButton1"
                type="radio"
                on:change={() => {
                    changeChartTypeHandler('column2d');
                }}
                checked="checked" />
            <label for="radioButton1">Column 2D Chart</label>
        </div>
        <div id="radio2">
            <input
                name="theme-selecter"
                id="radioButton2"
                type="radio"
                on:change={() => {
                    changeChartTypeHandler('bar2d');
                }} />
            <label for="radioButton2">Bar 2D Chart</label>
        </div>
        <div id="radio3">
            <input
                name="theme-selecter"
                id="radioButton3"
                type="radio"
                on:change={() => {
                    changeChartTypeHandler('pie2d');
                }} />
            <label for="radioButton3">Pie 2D Chart</label>
        </div>
    </div>
</div>

<template>
    <div>
        <h1>Votre tableau de bord</h1>
        <canvas id="planet-chart"></canvas>
    </div>
</template>

<script>
    import Chart from 'chart.js';
    export const planetChartData = {
        type: 'bar',
        data: {
            labels: ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre'],
            datasets: [
                { // one line graph
                    label: 'Nombre de retards',
                    data: [1, 2, 0, 0, 1, 3, 0, 2, 3, 2, 1, 0],
                    backgroundColor: [
                        'rgba(54,73,93,.5)', // Blue
                        'rgba(54,73,93,.5)',
                        'rgba(54,73,93,.5)',
                        'rgba(54,73,93,.5)',
                        'rgba(54,73,93,.5)',
                        'rgba(54,73,93,.5)',
                        'rgba(54,73,93,.5)',
                        'rgba(54,73,93,.5)',
                        'rgba(54,73,93,.5)',
                        'rgba(54,73,93,.5)',
                        'rgba(54,73,93,.5)',
                        'rgba(54,73,93,.5)',
                        'rgba(54,73,93,.5)',
                        'rgba(54,73,93,.5)',

                    ],
                    borderColor: [
                        '#36495d',
                        '#36495d',
                        '#36495d',
                        '#36495d',
                        '#36495d',
                        '#36495d',
                        '#36495d',
                        '#36495d',
                        '#36495d',
                        '#36495d',
                        '#36495d',
                        '#36495d',
                        '#36495d',
                        '#36495d',
                    ],
                    borderWidth: 3
                },
                { // another line graph
                    label: 'Nombre de jours absent',
                    data: [0, 0, 3, 0, 1, 0, 0, 2, 0, 0, 0, 0],
                    backgroundColor: [
                        'rgba(71, 183,132,.5)',
                        'rgba(71, 183,132,.5)',
                        'rgba(71, 183,132,.5)',
                        'rgba(71, 183,132,.5)',
                        'rgba(71, 183,132,.5)',
                        'rgba(71, 183,132,.5)',
                        'rgba(71, 183,132,.5)',
                        'rgba(71, 183,132,.5)',
                        'rgba(71, 183,132,.5)',
                        'rgba(71, 183,132,.5)',// Green
                    ],
                    borderColor: [
                        '#47b784',
                        '#47b784',
                        '#47b784',
                        '#47b784',
                        '#47b784',
                        '#47b784',
                        '#47b784',
                        '#47b784',
                        '#47b784',
                        '#47b784',

                    ],
                    borderWidth: 3
                }
            ]
        },
        options: {
            responsive: true,
            lineTension: 1,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        padding: 25,
                    }
                }]
            }
        }
    }
    export default {
        name: "Eleve",
        data() {
            return {
                planetChartData: planetChartData,
            }
        },
        mounted() {
            this.createChart('planet-chart', this.planetChartData);
        },
        methods: {
            createChart(chartId, chartData) {
                const ctx = document.getElementById(chartId);
                const myChart = new Chart(ctx, {
                    type: chartData.type,
                    data: chartData.data,
                    options: chartData.options,
                });
            }
        }
    }
</script>

<style scoped>

</style>
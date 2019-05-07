<template>
    <div>
        <div>
            <h1>CLASSE A4</h1>
            <h3>DATE : 10/05/2019</h3>
        </div>
        <div>
            <table>
                <thead>
                <tr>
                    <th>Nom</th>
                    <th>Prénom</th>
                    <th>Heure arrivée</th>
                    <th>Heure partie</th>
                </tr>
                </thead>
                <tbody>
                    <tr v-for="entry in entries" :key="entry.id">
                        <td>{{entry.nom}}</td>
                        <td>{{entry.prenom}}</td>
                        <td>{{entry.heure_arrive}}</td>
                        <td>{{entry.heure_depart}}</td>
                    </tr>
                </tbody>
            </table>
            <canvas id="planet-chart"></canvas>
        </div>
    </div>
</template>

<script>
    import Chart from 'chart.js';
    export const planetChartData = {
        type: 'bar',
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    }

    export default {
        name: "Home",
        data () {
            return {
                planetChartData: planetChartData,
                entries: [
                    {
                        id: 1,
                        nom: 'Lemoigne',
                        prenom: 'Clément',
                        heure_arrive: '8H45',
                        heure_depart: "17H01"
                    },
                    {
                        id: 2,
                        nom: 'Guillemette',
                        prenom: 'Florent',
                        heure_arrive: '9H10',
                        heure_depart: "17H04"
                    },
                ],
            }
        },
        created (){
            this.createChart('planet-chart', this.planetChartData)
        },
        methods: {
            createChart(chartId, chartData) {
                const ctx = document.getElementById(chartId);
                new Chart(ctx, {
                    type: chartData.type,
                    data: chartData.data,
                    options: chartData.options,
                })
            }
        }
    }
</script>

<style scoped>

</style>
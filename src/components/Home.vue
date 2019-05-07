<template>
<div style="width: 100%;height: 100%;">
    <Header />
    <Dashboard :entries="entries" />
    <div v-if="false">
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
                        <td>{{ entry.heure_arrive ? getHourFromDate(entry.heure_arrive) : '' }}</td>
                        <td>{{entry.heure_depart}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
</template>

<script>
    import Header from './Header.vue'
    import Dashboard from './Dashboard.vue'

    export default {
        name: "Home",
        components: {
            Header,
            Dashboard
        },
        data () {
            return {
                today: new Date(),
                entries: [
                    {
                        id: 1,
                        nom: 'Lemoigne',
                        prenom: 'Clément',
                        heure_arrive: null,
                        heure_depart: 1557241260000,
                        isArrived: false
                    },
                    {
                        id: 2,
                        nom: 'Guillemette',
                        prenom: 'Florent',
                        heure_arrive: 1557213300000,
                        heure_depart: 1557241140000,
                        isArrived: true
                    },
                    {
                        id: 3,
                        nom: 'Jean',
                        prenom: 'Michel',
                        heure_arrive: null,
                        heure_depart: 1557241260000,
                        isArrived: false
                    },
                    {
                        id: 4,
                        nom: 'Judith',
                        prenom: 'Lapu',
                        heure_arrive: 1557213300000,
                        heure_depart: 1557241140000,
                        isArrived: true
                    }
                ]
            }
        },
        methods: {
            getHourFromDate (date) {
                return `${new Date(date).getHours()}h${new Date(date).getMinutes()}`
            }
        }
    }
</script>

<style scoped>

</style>
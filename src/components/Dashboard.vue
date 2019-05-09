<template>
    <div class="today">
        <div class="today-header" style="font-weight:bold;">Aujourd'hui</div>
        <div>
            <table style="width: 100%;margin-top: 20px;">
                <thead>
                <tr>
                    <th>Nom</th>
                    <th>Prénom</th>
                    <th>Heure d'arrivée</th>
                    <th>Est arrivé ?</th>
                </tr>
                </thead>
                <tbody>
                    <tr v-for="entry in sortedEntries" v-if="!entry.isArrived || entry.heure_arrive > heureLimite" :key="entry.id">
                        <td>{{ entry.nom }}</td>
                        <td>{{ entry.prenom }}</td>
                        <td>{{ entry.heure_arrive ? getHourFromDate(entry.heure_arrive) : '' }}</td>
                        <td :style="entry.isArrived ? 'color: green': 'color: red'"><i class="material-icons">{{entry.isArrived ? 'check_circle' : 'cancel' }}</i></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
export default {
    props: ['entries'],
    computed: {
        heureLimite () {
            return "2019-05-08T09:00"
        },
        sortedEntries () {
            return this.entries.sort(function(x, y) { return x.isArrived - y.isArrived })
        }
    },
    data () {
        return {

        }
    },
    methods: {
        getHourFromDate (date) {
            return `${new Date(date).getHours()}h${new Date(date).getMinutes().toString().padStart(2, '0')}`
        }
    }
}
</script>

<style scoped>
    #dashboard {
        width: 100%;
        height: 80%;
        display: flex;
        align-items: center;
        justify-content: space-around;
    }

    .today {
        background-color: #FFFFFF;
        width: 400px;
        height: 400px;
        border: 1px solid rgba(0, 0, 0, 0.3);
        box-shadow: 0px 2px 4px 0px #00000050;
        border-radius: 15px;
        transform: scale(1.1);
    }

    .today-header {
        font-size: 24px;
        padding-top: 20px;
    }


</style>

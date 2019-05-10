<template>
    <div class="today">
        <div class="today-header" style="font-weight:bold;">Aujourd'hui</div>
        <div>
            <table style="width: 100%;margin-top: 20px;">
                <thead style="padding: 20px;">
                    <tr>
                        <th>Nom</th>
                        <th>Prénom</th>
                        <th>Heure d'arrivée</th>
                        <th>Est arrivé ?</th>
                    </tr>
                </thead>
                <tbody style="padding: 20px;">
                    <tr v-for="entry in sortedEntries" :key="entry.id">
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
            const sortedEntries = this.entries.sort(function(x, y) { return x.isArrived - y.isArrived })
            return sortedEntries.filter((entry) => !entry.isArrived || entry.heure_arrive > this.heureLimite) 
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

    .today {

        background-color: rgba(255, 255, 255, 0.9);
        width: 400px;
        height: 500px;
        border: 1px solid rgba(0, 0, 0, 0.3);
        box-shadow: 0px 2px 4px 0px #00000050;
        border-radius: 5px;
        transform: scale(0.9);
    }

    .today-header {
        font-size: 24px;
        padding-top: 20px;
    }


</style>

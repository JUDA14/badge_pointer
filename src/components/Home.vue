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
                        <td :style="{color: entry.variant_color_arrive}">{{entry.heure_arrive}}H</td>
                        <td :style="{color: entry.variant_color_depart}">{{entry.heure_depart}}H</td>
                        <td>
                            <button v-on:click="openModal(entry)">Modifier</button></td>
                    </tr>
                </tbody>
            </table>
            <modal name="edit-heures">
                <input type="text" v-model=form_modal.heure_arrive />
                <input type="text" v-model=form_modal.heure_depart />
                <button v-on:click="saveEdit(form_modal.id)">Sauvegarder</button>
            </modal>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Home",
        data () {
            return {
                form_modal: {
                    id: '',
                    heure_arrive: '',
                    heure_depart: '',
                },
                entries: [
                    {
                        id: 1,
                        nom: 'Lemoigne',
                        prenom: 'Clément',
                        heure_arrive: 8.45,
                        heure_depart: 17.01,
                        variant_color_arrive: "green",
                        variant_color_depart: "green",
                    },
                    {
                        id: 2,
                        nom: 'Guillemette',
                        prenom: 'Florent',
                        heure_arrive: 9.10,
                        heure_depart: 17.04,
                        variant_color_arrive: "red",
                        variant_color_depart: "green",
                    },
                ],
            }
        },

        created (){

        },
        methods: {
            openModal(entry) {
                this.form_modal.id = entry.id
                this.form_modal.heure_depart = entry.heure_depart
                this.form_modal.heure_arrive = entry.heure_arrive
                this.$modal.show('edit-heures');
            },
            saveEdit(id) {

                for (var i = 0; i < this.entries.length; i++) {
                   if (this.entries[i].id == id ) {

                       this.entries[i].heure_arrive = this.form_modal.heure_arrive
                       this.entries[i].heure_depart = this.form_modal.heure_depart

                       if (this.entries[i].heure_arrive > 9.00) {
                           this.entries[i].variant_color_arrive = "red"
                       }
                       else {
                           this.entries[i].variant_color_arrive = "green"
                       }

                       if (this.entries[i].heure_depart > 17.00) {
                           this.entries[i].variant_color_depart = "green"
                       }
                       else {
                           this.entries[i].variant_color_depart = "red"
                       }

                   }
                }
                this.$modal.hide('edit-heures');
            },
        }
    }
</script>

<style scoped>

</style>
<template>
<div style="width: 100%;height: 100%;">
    <div v-if="is_login == 'admin'">
        <Header />
        <div id="dashboard" v-if="nav == 'home'">
            <Dashboard :entries="entries" />
            <div class="see-list">
                <div class="see-list-header" style="font-weight:bold;">Voir liste</div>
                <div>
                    <table style="width: 100%;margin-top: 20px;">
                        <thead>
                        <tr>
                            <th>Classe</th>
                            <th>Nombre présent</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="classe in classes" :key="classe.id">
                            <td><a @click="nav = 'classe'; label_classe=classe.label">{{classe.label}}</a></td>
                            <td>{{classe.present}}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div v-if="nav == 'classe'">
            <button v-on:click="nav = 'home'">Retour</button>
            <div>
                <h1>CLASSE {{label_classe}}</h1>
                <h3>DATE : 10/05/2019</h3>
            </div>
            <div style="margin-left: auto; margin-right: auto; width: 400px; ">
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
                            <td :style="{color: entry.variant_color_arrive}">{{ entry.heure_arrive ? getHourFromDate(entry.heure_arrive) : '' }}</td>
                            <td :style="{color: entry.variant_color_depart}">{{ entry.heure_depart ? getHourFromDate(entry.heure_depart) : '' }}</td>
                            <td>
                                <button v-on:click="openModal(entry)">Modifier</button></td>
                        </tr>
                    </tbody>
                </table>

                <modal name="edit-heures" >
                    <div style="text-align: center; margin-top: 100px">Heure d'arrivée</div>
                    <div style="text-align: center">
                        <input type="datetime-local" v-model=form_modal.heure_arrive />
                    </div>
                    <div style="text-align: center">Heure de départ</div>
                    <div style="text-align: center">
                        <input type="datetime-local" v-model=form_modal.heure_depart />
                    </div>
                    <div style="text-align: center">
                        <button v-on:click="saveEdit(form_modal.id)">Sauvegarder</button>
                    </div>
                </modal>
            </div>
        </div>
    </div>
    <div v-else>
        <div style="text-align: center; margin-top: 100px">Email</div>
        <div style="text-align: center">
            <input type="text"  />
        </div>
        <div style="text-align: center">Mot de passe</div>
        <div style="text-align: center">
            <input type="text"  />
        </div>
        <div style="text-align: center">Connectez vous en tant que :</div>
        <div style="text-align: center">
            <button v-on:click="is_login = 'admin'">ADMIN</button>
            <button v-on:click="is_login = 'eleve'">ELEVE</button>
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
                is_login: null,
                classes: [
                    {
                        id: 1,
                        label: "A4",
                        present: "20/24"
                    },
                    {
                        id: 2,
                        label: "A3",
                        present: "18/30"
                    },
                    {
                        id: 3,
                        label: "IT-START",
                        present: "5/28"

                    },
                    {
                        id: 4,
                        label: "A5",
                        present: "24/24"
                    },
                ],
                label_classe: '',
                nav: "home",
                form_modal: {
                    id: '',
                    heure_arrive: null,
                    heure_depart: null,
                },
                entries: [
                    {
                        id: 1,
                        nom: 'Lemoigne',
                        prenom: 'Clément',
                        heure_arrive: "2019-05-08T09:02",
                        heure_depart: null,
                        isArrived: true,
                        variant_color_arrive: "red",
                        variant_color_depart: "green"
                    },
                    {
                        id: 2,
                        nom: 'Guillemette',
                        prenom: 'Florent',
                        heure_arrive: "2019-05-08T09:10",
                        heure_depart: "2019-05-08T17:10",
                        isArrived: true,
                        variant_color_arrive: "red",
                        variant_color_depart: "green"
                    },
                    {
                        id: 3,
                        nom: 'Jean',
                        prenom: 'Michel',
                        heure_arrive: "2019-05-08T09:10",
                        heure_depart: "2019-05-08T16:10",
                        isArrived: true,
                        variant_color_arrive: "red",
                        variant_color_depart: "red"
                    },
                    {
                        id: 4,
                        nom: 'DA ROCHA',
                        prenom: 'Alain',
                        heure_arrive: null,
                        heure_depart: null,
                        isArrived: false,
                        variant_color_arrive: "green",
                        variant_color_depart: "green",
                    },
                    {
                        id: 5,
                        nom: 'DE MATOS',
                        prenom: 'Alexandra',
                        heure_arrive: "2019-05-08T09:10",
                        heure_depart: "2019-05-08T17:10",
                        isArrived: true,
                        variant_color_arrive: "red",
                        variant_color_depart: "green",
                    },
                    {
                        id: 6,
                        nom: 'HEROUX',
                        prenom: 'Corentin',
                        heure_arrive: null,
                        heure_depart: null,
                        isArrived: false,
                        variant_color_arrive: "green",
                        variant_color_depart: "green",
                    },
                    {
                        id: 7,
                        nom: 'TURQUETIL',
                        prenom: 'Maxime',
                        heure_arrive: "2019-05-08T08:50",
                        heure_depart: null,
                        isArrived: true,
                        variant_color_arrive: "green",
                        variant_color_depart: "green",
                    },
                    {
                        id: 8,
                        nom: 'Judith',
                        prenom: 'Lapu',
                        heure_arrive: "2019-05-08T09:10",
                        heure_depart: "2019-05-08T17:18",
                        isArrived: true,
                        variant_color_arrive: "red",
                        variant_color_depart: "green"
                    }
                ]
            }
        },
        created (){
        },
        methods: {
            getHourFromDate (date) {
                return `${new Date(date).getHours()}h${new Date(date).getMinutes().toString().padStart(2, '0')}`
            },
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

                       if (this.entries[i].heure_arrive > "2019-05-08T09:00") {
                           this.entries[i].variant_color_arrive = "red"
                       }
                       else {
                           this.entries[i].variant_color_arrive = "green"
                       }

                       if (this.entries[i].heure_depart >= "2019-05-08T17:00") {
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
    .see-list {
        background-color: #FFFFFF;
        width: 400px;
        height: 400px;
        border: 1px solid rgba(0, 0, 0, 0.3);
        box-shadow: 0px 2px 4px 0px #00000050;
        border-radius: 15px;
        transform: scale(0.9);
    }

    .see-list-header {
        font-size: 24px;
        padding-top: 20px;
    }
    #dashboard {
        width: 100%;
        height: 80%;
        display: flex;
        align-items: center;
        justify-content: space-around;
        margin-top: 50px;
    }
</style>
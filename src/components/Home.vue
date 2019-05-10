<template>
<div style="width: 100%;height: 100%; background-color: #110230!important; align-items: center;justify-content: center; display: flex; width: 100%">
    <div style="width: 100%;" v-if="is_login == 'admin'" >
        <Header @back="nav = 'home'" :nav="nav" :login="is_login" @disconnect="is_login = null" :user="user"/>

        <div id="dashboard" v-if="nav == 'home'">
            <Dashboard :entries="entries" />
            <div class="see-list">
                <div class="see-list-header" style="font-weight:bold; font-color: white">Voir liste</div>
                <div>
                    <table style="width: 100%;margin-top: 20px;">
                        <thead>
                            
                        <tr>
                            <th>Classe</th>
                            <th>Nombre présent</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="classe in classes" :key="classe.id" >
                            <td><b-button variant="primary" size="sm" @click="nav = 'classe'; label_classe=classe.label">{{classe.label}}</b-button></td>
                            <td>{{classe.present}}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div v-if="nav == 'classe'" style=" width: 100%">
            <div>
                <h1 class="text">CLASSE {{label_classe}}</h1>
                <h3 class="text">DATE : 10/05/2019</h3>
                <div style="margin: 20px">
                    <b-button variant="success" @click="sendPdf()">Envoyer le PDF</b-button>
                </div>
            </div>
            <div style="display:flex;justify-content:center;border-width: 15px; border-color: red; ">
                <table class="text" style="width: 80%;margin-top: 30px;">
                    <thead>
                    <tr>
                        <th >Nom</th>
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
                                <b-button v-on:click="openModal(entry)" variant="outline-primary">Modifier</b-button></td>
                        </tr>
                    </tbody>
                </table>

                <modal name="edit-heures" >
                    <div style="justify-content: center">
                        <div style="text-align: center; margin-top: 30px; margin-bottom: 15px">Heure d'arrivée</div>
                        <div style="text-align: center; width: 80%; margin-left: 10%">
                            <b-input type="datetime-local" v-model=form_modal.heure_arrive />
                        </div>
                        <div style="text-align: center; margin-top: 30px; margin-bottom: 15px">Heure de départ</div>
                        <div style="text-align: center; width: 80%; margin-left: 10%">
                            <b-input type="datetime-local" v-model=form_modal.heure_depart />
                        </div>
                        <div style="text-align: center; margin-top: 10px">
                            <b-button style="margin-top: 20px; margin-bottom: 50px" v-on:click="saveEdit(form_modal.id)" variant="success">Sauvegarder</b-button>
                        </div>
                    </div>
                </modal>
            </div>
        </div>
    </div>
    <div v-if="is_login == 'eleve'">
        <div style= "width: 100%; justify-content: flex-end; display: flex">
            <b-button variant="danger" @click="is_login = null">
                <span  >Deconnexion</span>
            </b-button>
        </div>
        <Header :user="user"/>
        <div style="background-color: white; padding: 20px; border-radius: 5px">
            <Eleve />
        </div>

    </div>



    <div v-if="is_login == null" style="align-items: center; width : 300px; padding" >
        <div style="padding: 35px; " >
        <Header :user="user" :login='true'/>
        </div>

        <div class="text" style="text-align: center; margin-top: 100px; margin: 15px">Email</div>
        <div style="text-align: center; padding-horizontal: 50px" >
            <b-input type="text" v-model="user"/>
        </div>
        <div class="text" style="text-align: center; margin: 15px">Mot de passe</div>
        <div style="text-align: center">
            <b-input type="text"  />
        </div>
        <div class="text" style="text-align: center; margin-top: 40px; margin-bottom: 15px">Connectez vous en tant que :</div>
        <div style="text-align: center">
            <b-button v-on:click="is_login = 'admin' " variant ='primary' style="margin-right: 10px">ADMIN</b-button>
            <b-button v-on:click="is_login = 'eleve'" variant ='primary' style="margin-left: 10px">ELEVE</b-button>
            
        </div>

    </div>



    <button v-shortkey="[ 'ctrl' ]" @shortkey="addEntry()" hidden></button>
    <button v-shortkey="[ 'alt' ]" @shortkey="addDepart()" hidden></button>
</div>
</template>

<script>
    import Header from './Header.vue'
    import Dashboard from './Dashboard.vue'
    import Eleve from './Eleve'

    export default {
        name: "Home",
        components: {
            Header,
            Dashboard,
            Eleve
        },
        data () {
            return {
                user: '',
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
                        heure_arrive: "2019-05-10T09:02",
                        heure_depart: null,
                        isArrived: true,
                        variant_color_arrive: "red",
                        variant_color_depart: "green"
                    },
                    {
                        id: 2,
                        nom: 'Guillemette',
                        prenom: 'Florent',
                        heure_arrive: "2019-05-10T09:10",
                        heure_depart: "2019-05-10T17:10",
                        isArrived: true,
                        variant_color_arrive: "red",
                        variant_color_depart: "green"
                    },
                    {
                        id: 3,
                        nom: 'Jean',
                        prenom: 'Michel',
                        heure_arrive: "2019-05-10T09:10",
                        heure_depart: "2019-05-10T16:10",
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
                        heure_arrive: "2019-05-10T09:10",
                        heure_depart: "2019-05-10T17:10",
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
                        heure_arrive: "2019-05-10T08:50",
                        heure_depart: null,
                        isArrived: true,
                        variant_color_arrive: "green",
                        variant_color_depart: "green",
                    },
                    {
                        id: 8,
                        nom: 'Judith',
                        prenom: 'Lapu',
                        heure_arrive: "2019-05-10T09:10",
                        heure_depart: "2019-05-10T17:18",
                        isArrived: true,
                        variant_color_arrive: "red",
                        variant_color_depart: "green"
                    }
                ],
                entries_new: [
                    {
                        id: 9,
                        nom: 'Dupont',
                        prenom: 'Corinne',
                        heure_arrive: null,
                        heure_depart: null,
                        isArrived: true,
                        variant_color_arrive: "red",
                        variant_color_depart: "red"
                    },
                    {
                        id: 10,
                        nom: 'Doe',
                        prenom: 'John',
                        heure_arrive: null,
                        heure_depart: null,
                        isArrived: true,
                        variant_color_arrive: "red",
                        variant_color_depart: "red"
                    }

                ]

            }

        },
        created (){
        },
        methods: {
            sendPdf () {
                fetch('http://localhost:3001/registration')
                this.$toasted.success('PDF envoyé!', {position: 'bottom-left', duration: 3000})
            },
            addEntry () {
                if (this.entries_new.length !== 0) {
                    this.entries_new[0].heure_arrive = new Date(Date.now())

                    this.entries.push(this.entries_new[0])

                    this.entries_new.shift()
                }
                this.$toasted.info('Un élève est arrivé.', {position: 'bottom-left', duration: 3000})

            },
            addDepart () {
                if (this.entries.length !== 0) {

                    this.entries[this.entries.length - 1].heure_depart = new Date(Date.now())
                }
                this.$toasted.info('Un élève est parti.', {position: 'bottom-left', duration: 3000})
            },
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

                       if (this.entries[i].heure_arrive > "2019-05-10T09:00") {
                           this.entries[i].variant_color_arrive = "red"
                       }
                       else {
                           this.entries[i].variant_color_arrive = "green"
                       }

                       if (this.entries[i].heure_depart >= "2019-05-10T17:00") {
                           this.entries[i].variant_color_depart = "green"
                       }
                       else {
                           this.entries[i].variant_color_depart = "red"
                       }

                   }
                }
                this.$toasted.success('Modification enregistrée', {position: 'bottom-left', duration: 3000})
                this.$modal.hide('edit-heures');
            },
        }
    }
</script>

<style scoped>

    .see-list {
        background-color: rgba(255, 255, 255, 0.9);
        width: 350px;
        height: 500px;
        border: 1px solid rgba(0, 0, 0, 0.3);
        box-shadow: 0px 2px 4px 0px #00000050;
        border-radius: 5px;
        transform: scale(0.9);
    }

    .see-list-header {
        font-size: 24px;
        padding-top: 20px;
    }
    #dashboard {
        width: 80%;
        height: 80%;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: space-around;
        margin-top: 50px;
    }
    .text {
        font-family: open sans,Arial,sans-serif;
        line-height: 1.7em;
        color: white;
    }
</style>
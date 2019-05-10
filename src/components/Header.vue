<template >
    <div id="header">
        <h1 class="text"><span style="color:#e03049;">U</span><span class="text">BADGE</span></h1>
        <div v-if="login === 'admin'">
            <b-button style="margin-right: 20px" @click="$emit('back')" variant='primary' v-if="nav == 'classe'">
                <span class="text" >Retour</span>
            </b-button>
            <b-button variant="danger" @click="$emit('disconnect')"  >
                <span class="text" >Deconnexion</span>
            </b-button>
        </div>
        <div v-if="login !== true && user && user !== ''" class="menu text">
            <div>{{user}}</div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['user', 'nav', 'login'],


}
</script>

<style scoped>
#header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 80%;
    justify-self: center;
    margin: 0 auto;
}

#header h1 {
    margin: 0;
    padding: 0;
    text-align: initial;
    font-size: 50px;
    margin-left: 10px;
}
#header .menu {
    display: flex;
    margin-right: 30px;
    align-items: center;
}

#header .menu div:not(:first-of-type) {
    margin-left: 30px;
}
.text {
    font-family: open sans,Arial,sans-serif;
    line-height: 1.7em;
    color: white;
}
</style>

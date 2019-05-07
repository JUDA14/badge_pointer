<template>
    <div id="header">
        <h1><span style="color:#e03049;">U</span><span>PLAN</span></h1>
        <div class="menu">
            <div>Connexion</div>
            <div>Inscription</div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
#header {
    display: flex;
    justify-content: space-between;
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
</style>

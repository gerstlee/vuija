<template>
    <div class="navbar">
        <div @click="$router.push('/')">Vue 3</div>
        <div class="navbar-btns">
            <my-button @click="$router.push('/posts')">Посты</my-button>
            <my-button style="margin-left:15px" @click="$router.push('/about')">О сайте</my-button>
            <my-button style="margin-left:15px" @click="$router.push('/store')">Хранилище</my-button>
            <my-button style="margin-left:15px" @click="$router.push('/comp')">api</my-button>
        </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>
.navbar {
    height: 50px;
    background-color: skyblue;
    box-shadow: 2px 2px 4px gray;
    display: flex;
    align-items: center;
    padding: 0 15px;
}

.navbar-btns {
    margin-left: auto;
}
</style>
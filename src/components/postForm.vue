<template>
    <form @submit.prevent class="post-form">
            <h1>Создание поста</h1>
            <my-input 
                v-focus
                v-model="post.title"
                type="text" 
                placeholder="Название"
            ></my-input>
            <my-input
                v-model="post.body"
                type="text" 
                placeholder="Описание"
            ></my-input>
            <my-button
                class="btn"
                @click="createPost"
                style="align-self:flex-end; margin-top: 15px"
                >
                Отправить
            </my-button>
    </form>
</template> 

<script>
    export default {
    data() {
        return {
            post: {
                title: "",
                body: ""
            }
        };
    },
    methods: {
        createPost() {
            this.post.id = Date.now();
            this.$emit("create", this.post);
            this.post = {
                title: "",
                body: ""
            };
        }
    }
}
</script>

<style scoped>
    .post-form {
        display: flex;
        flex-direction: column;
    }
</style>
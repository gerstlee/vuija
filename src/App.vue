<template>
    <div class="app">
        <h1>Страница с постами</h1>
        <my-input v-model="searchQuery" placeholder="Поиск...">
        </my-input>
        <div class="app-btns">
            <my-button @click="showDialog">
                Создать пост
            </my-button>
            <my-select v-model="selectedSort" :options="sortOptions">
                
            </my-select>
        </div>
        <my-dialog v-model:show="dialogVisible">
            <post-form @create="createPost" />
        </my-dialog>
        <post-list :posts="sortedAndSearchPosts" @remove="removePost" v-if="!isPostsLoading" />
        <div v-else>Идет загрузка...</div>
    </div>
</template>

<script>
import postForm from '@/components/postForm.vue';
import postList from '@/components/postList.vue';
import myDialog from './components/UI/myDialog.vue';
import MyButton from './components/UI/myButton.vue';
import mySelect from '@/components/UI/mySelect.vue';
import MyInput from './components/UI/myInput.vue'; 
export default {
    components: {
    postForm,
    postList,
    myDialog,
    MyButton,
    mySelect,
    MyInput
},
    data() {
        return {
            posts: [],
            dialogVisible: false,
            modificatorValue: '',
            isPostsLoading: false,
            selectedSort: '',
            searchQuery: '',
            page: 1,
            limit: 10,
            sortOptions: [
                {value: 'title', name:'По названию'},
                {value: 'body', name:'По содержимому'},
            ]
        }
    },
    methods: {
        createPost(post) {
            this.posts.push(post);
            this.dialogVisible = false;
        },
        removePost(post) {
            this.posts = this.posts.filter(p => p.id !== post.id)
        },
        showDialog() {
            this.dialogVisible = true;
        },
        async fetchPosts() {
            this.isPostsLoading = true;
            const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=10");
            if (!response.ok) {
                const errorMessage = 'Ошибка!';
                throw Error(errorMessage);
                this.isPostsLoading = false;
            }
            const json = await response.json();
            console.log(json);
            this.posts = json;
            this.isPostsLoading = false;
        }
    },
    mounted() {
        this.fetchPosts();
    },
    computed: {
        sortedPosts(){
            return [...this.posts].sort((post1, post2) => {
                return post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]);
            })
        },
        sortedAndSearchPosts() {
            return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
        }
    },
}
</script>

<style scoped>
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    .app {
        padding: 20px;
    }

    .app-btns {
        margin: 15px 0px 0px 0px;
        display: flex;
        justify-content: space-between;
    }
</style>
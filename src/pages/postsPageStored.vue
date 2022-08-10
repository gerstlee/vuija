<template>
    <div>
        <h1>Страница с постами</h1>
        <my-input :model-value="searchQuery" @update:model-value="setSearchQuery" placeholder="Поиск..." v-focus>
        </my-input>
        <div class="app-btns">
            <my-button @click="showDialog">
                Создать пост
            </my-button>
            <my-select :model-value="selectedSort" @update:model-value="setSelectedSort" :options="sortOptions">
            </my-select>
        </div>
        <my-dialog v-model:show="dialogVisible">
            <post-form @create="createPost" />
        </my-dialog>
        <post-list :posts="sortedAndSearchPosts" @remove="removePost" v-if="!isPostsLoading" />
        <div v-else>Идет загрузка...</div>
        <div class="observer" v-intersection="loadMorePosts"></div>
    </div>
</template>

<script>
import postForm from '@/components/postForm.vue';
import postList from '@/components/postList.vue';
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
import myDialog from '@/components/UI/myDialog.vue';
import MyButton from '@/components/UI/myButton.vue';
import mySelect from '@/components/UI/mySelect.vue';
import MyInput from '@/components/UI/myInput.vue'; 
import axios from 'axios';
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
            dialogVisible: false,
            // modificatorValue: '',
        }
    },
    methods: {
        ...mapMutations({
            setPage: 'post/setPage',
            setSearchQuery: 'post/setSearchQuery',
            setSelectedSort:'post/setSelectedSort',
        }),
        ...mapActions({
            loadMorePosts: 'post/loadMorePosts',
            fetchPosts: 'post/fetchPosts'
        }),
        createPost(post) {
            this.posts.push(post);
            this.dialogVisible = false;
        },
        removePost(post) {
            this.posts = this.posts.filter(p => p.id !== post.id)
        },
        showDialog() {
            this.dialogVisible = true;
        }
    },
    mounted() {
        // this.fetchPosts();
        console.log(this.$refs.observer);
    },
    computed: {
        ...mapState({
            posts: state => state.post.posts,
            isPostsLoading: state => state.post.isPostsLoading,
            selectedSort: state => state.post.selectedSort,
            searchQuery: state => state.post.searchQuery,
            page: state => state.post.page,
            limit: state => state.post.limit,
            totalPages: state => state.post.totalPages,
            sortOptions: state => state.post.sortOptions,
            }),
        ...mapGetters({
            sortedPost:'post/sortedPost',
            sortedAndSearchPosts:'post/sortedAndSearchPosts'
        })
    },
    watch: {
        // page() {
        //     this.fetchPosts();
        // }
    }
}
</script>

<style scoped>

    .app-btns {
        margin: 15px 0px 0px 0px;
        display: flex;
        justify-content: space-between;
    }

    .page-wrapper {
        display: flex;
        margin-top: 15px;
    }

    .page {
        border: 1px solid blue;
        padding: 10px;
    }

    .current-page {
        border: 2px solid blue;
    }

    .observer {
        height: 30px;
        background: blue;
    }
</style>
<template>
    <div>
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
        <div class="observer" ref="observer"></div>
        <!-- <div class="page-wrapper">
            <div
            v-for="pageNum in totalPages"
            key="pageNum"
            class="page"
            :class="{
                'current-page':page === pageNum
            }"
            @click="changePage(pageNum)"
            >{{pageNum}}
            </div>
        </div> -->
    </div>
</template>

<script>
import postForm from '@/components/postForm.vue';
import postList from '@/components/postList.vue';
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
            posts: [],
            dialogVisible: false,
            modificatorValue: '',
            isPostsLoading: false,
            selectedSort: '',
            searchQuery: '',
            page: 1,
            limit: 10,
            totalPages: 0,
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
        /*changePage(pageNum) {
            this.page = pageNum;
            this.fetchPosts();

        },*/
        async fetchPosts() {
            try {
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _page:this.page,
                        _limit:this.limit
                    }
                });
                this.totalPages = Math.ceil(response.headers['x-total-count']/this.limit);
                this.posts = response.data;
            } catch (e) {
                alert('Ошибка');
            } finally {
                this.isPostsLoading = false;
            }
        },
        async loadMorePosts() {
            try {
                this.page += 1;
                this.isPostsLoading = true;
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _page:this.page,
                        _limit:this.limit
                    }
                });
                this.totalPages = Math.ceil(response.headers['x-total-count']/this.limit);
                this.posts = [...this.posts,...response.data];
            } catch (e) {
                alert('Ошибка');
            } finally {
                this.isPostsLoading = false;
            }
        }
    },
    mounted() {
        this.fetchPosts();
        console.log(this.$refs.observer);
        const options = { 
            rootMargin: '0px',
            threshold: 1.0
        }
        const callback = (entries, observer) => {
            if(entries[0].isIntersecting && this.page < this.totalPages) {
                this.loadMorePosts();
            }
        };
        const observer = new IntersectionObserver(callback, options);
        observer.observe(this.$refs.observer);
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
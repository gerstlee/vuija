<template>
    <div>
        <h1>Страница с постами</h1>
        <my-input v-model="searchQuery" placeholder="Поиск..." v-focus>
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
        <div class="observer" v-intersection="loadMorePosts"></div>
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
            dialogVisible: false,
            modificatorValue: '',
            sortOptions: [
                {value: 'title', name:'По названию'},
                {value: 'body', name:'По содержимому'},
            ]
        }
    },
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
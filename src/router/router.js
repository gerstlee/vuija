import Main from '@/pages/Main.vue';
import {createRouter, createWebHistory} from 'vue-router';
import postsPage from '@/pages/postsPage';
import about from '@/pages/about';
import postIdPage from '@/pages/postIdPage';


const routes = [
    {
        path: '/',
        component:Main
    },
    {
        path: '/posts',
        component:postsPage
    },
    {
        path: '/about',
        component:about
    },
    {
        path: '/posts/:id',
        component:postIdPage
    },
]

const router = createRouter({
    routes,
    history:createWebHistory(process.env.BASE_URL)
})

export default router;
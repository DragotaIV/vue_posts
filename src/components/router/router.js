import Main from "@/components/pages/Main"
import PostPage from "@/components/pages/PostPage"
import About from "@/components/pages/About"
import { createRouter, createWebHistory } from "vue-router";


const routes = [
  {
    path: '/',
    component: Main
  },
  {
    path: '/posts',
    component:PostPage
  },
  {
    path: '/about',
    component:About
  },

];

const router = createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL)
});

export default router;
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'
import Books from '../views/Books.vue'
import Authors from '../views/Authors.vue'
import Members from '../views/Members.vue'
import BorrowedBooks from '../views/BorrowedBooks.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/books',
      name: 'books',
      component: Books
    },
    {
      path: '/authors',
      name: 'authors',
      component: Authors
    },
    {
      path: '/members',
      name: 'members',
      component: Members
    },
    {
      path: '/borrowed-books',
      name: 'borrowed-books',
      component: BorrowedBooks
    }
  ]
})

export default router 
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
      path:'/main',
      name:'Main',
      component:()=>import('../views/Main'),
      children:[
        {
          path:'home',
          name:'Home',
          component:()=>import('../views/Home')
        },
        {
          path:'sort',
          name:'Sort',
          component:()=>import('../views/Sort'),
          // children:[
          //   {
          //     path:'list',
          //     name:'List',
          //     component:()=>import('../views/List')
          //   },
          // ]
        },
        {
          path:'bookshelf',
          name:'BookShelf',
          component:()=>import('../views/BookShelf')
        },
        {
          path:'ranking',
          name:'Ranking',
          component:()=>import('../views/Ranking')
        },
      ]
    },
    {
      path:'/list',
      name:'List',
      component:()=>import('../views/List')
    },
    {
      path:'/detail',
      name:'Detail',
      component:()=>import('../views/Detail')
    },
    {
      path:'/chapters',
      name:'Chapters',
      component:()=>import('../views/Chapters')
    },
    {
      path:'/chapterContent',
      name:'ChapterContent',
      component:()=>import('../views/ChapterContent')
    },
    {
      path:'/rankingList',
      name:'RankingList',
      component:()=>import('../views/RankingList')
    },
    {
      path:'/search',
      name:'Search',
      component:()=>import('../views/Search')
    },
    {
      path:'*',
      redirect:{
        name:'Home'
      }
    }
]

const router = new VueRouter({
  routes
})

export default router

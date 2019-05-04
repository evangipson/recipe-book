import Vue from 'vue';
import Router from 'vue-router';
import firebase from 'firebase'
import Recipes from './views/Recipes.vue';
import Recipe from './views/Recipe.vue';
import NewRecipe from './views/NewRecipe.vue';
import Login from './views/Login.vue';
import SignUp from './views/Signup.vue';

Vue.use(Router);

/* Main site map */
let router = new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/recipes',
      name: 'Recipes',
      component: Recipes,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/recipe/:recipe',
      name: 'Recipe',
      component: Recipe
    },
    {
      path: '/new-recipe',
      name: 'NewRecipe',
      component: NewRecipe,
      meta: {
        requiresAuth: true
      }
    }
  ],
});

/* Check on user's authentication in between routes */
router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && !currentUser) next('/login')
  else next()
});

export default router;
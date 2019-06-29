import Vue from 'vue';
import Router from 'vue-router';
import firebase from 'firebase';
import store from "./store";
import Recipes from './views/Recipes.vue';
import Recipe from './views/Recipe.vue';
import NewRecipe from './views/NewRecipe.vue';
import EditRecipe from './views/EditRecipe.vue';
import Login from './views/Login.vue';
import SignUp from './views/Signup.vue';

Vue.use(Router);

/* Main site map */
let router = new Router({
  base: '/food/',
  routes: [
    {
      path: '/',
      name: 'Recipes',
      component: Recipes,
      meta: {
        requiresAuth: true
      }
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
    },
    {
      path: '/edit/:recipe',
      name: 'EditRecipe',
      component: EditRecipe,
      meta: {
        requiresAuth: true,
        requiresAuthorMatchup: true,
      }
    }
  ],
});

/* Check on user's authentication in between routes */
router.beforeEach((to, from, next) => {
  let requiresMatchup = to.matched.some(record => record.meta.requiresAuthorMatchup);
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  // page requires authentication but user isn't signed in,
  // so take them to the log in page
  if (requiresAuth && !store.state.currentUser) {
    console.warn("You require authentication, sorry!");
    next('/login');
  // user logged in, but doesn't match the author needed to edit the page
  // (ensures users can't spoof edit URLs), then show the recipes page
  } else if (requiresAuth && requiresMatchup && store.state.currentUser) {
    console.warn("You aren't the right user to be editing this page, sorry!");
    next('/');
  } else {
    next();
  }
});

export default router;
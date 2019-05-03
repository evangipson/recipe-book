<template>
    <div class="recipes">
        <p class="mb-4">Welcome, {{email}}! Here are all the recipes.</p>
        <form class="mb-4">
            <label class="label" for="search">Search recipes</label>
            <input class="input mb-4" type="text" v-model="search" placeholder="Search recipes..." />
        </form>
        <router-link to="/new-recipe"><button class="button mb-4">Create new Recipe</button></router-link>
        <button class="button mb-4 block" @click="logout">Logout</button>
        <div class=" flex flex-row">
            <article class="recipe-covers" v-for="(recipe, idx) in filteredRecipes" :key="idx">
                <div class="recipe-card mr-4">
                    <img :src="recipe.image" />
                    <p><router-link :to="{ path: '/recipe/' + recipe.name.toLowerCase(), params: {recipe: recipe.name}}">{{recipe.name}}</router-link></p>
                </div>
            </article>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase';
import { db } from '../main';

export default {
  name: 'Recipes',
  data () {
    return {
      recipes: [],
      search: '',
      email: firebase.auth().currentUser.email
    };
  },
  firestore () {
    return {
      recipes: db.collection('recipes')
    };
  },
  computed: {
    filteredRecipes: function() {
        var recipes = this.recipes;
        var search = this.search;
        if (!search) {
            return recipes;
        }

        var result = {};
        Object.keys(recipes).map(function(key, index) {
            if (recipes[key].name.toLowerCase().indexOf(search.toLowerCase()) !== -1) {
                result[key] = recipes[key];
            }
        });
      
        return result;
    }
  },
  methods: {
    logout () {
      firebase.auth().signOut().then(() => {
        this.$router.replace('/login');
      })
    }
  }
}
</script>
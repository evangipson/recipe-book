<template>
    <div class="recipes">
        <p class="mb-4">Welcome, {{email}}! Here are all the recipes.</p>
        <router-link to="/new-recipe"><button class="button mb-4">Create new Recipe</button></router-link>
        <button class="button mb-4 block" @click="logout">Logout</button>
        <article class="recipe-covers" v-for="(recipe, idx) in recipes" :key="idx">
            <div class="recipe-card">
                <img :src="recipe.image" />
                <p><router-link :to="{ path: '/recipes/' + recipe.name, params: {recipe: recipe.name}}">{{recipe.name}}</router-link></p>
            </div>
        </article>
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
      email: firebase.auth().currentUser.email
    };
  },
  firestore () {
    return {
      recipes: db.collection('recipes'),
    };
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
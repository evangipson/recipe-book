<template>
    <div class="recipes">
        <p class="mb-4">Welcome, {{email}}!</p>
        <article class="recipe-covers" v-for="(recipe, idx) in recipes" :key="idx">
            <div>
                <img :src="recipe.image" />
                <p>{{recipe.name}}</p>
            </div>
        </article>
        <form @submit="addRecipe(name, image)" class="notecard">
            <h3 class="mb-4">Add a new recipe</h3>
            <div class="mb-4">
                <label class="label" for="Name">Recipe Name</label>
                <input class="input focus:outline-none focus:shadow-outline" v-model="name" type="input" placeholder="Recipe Name" required>
            </div>
            <div class="mb-6">
                <label class="label" for="Image">Recipe Image URL</label>
                <input v-model="image" type="input" class="input" placeholder="Recipe Image URL" required>
            </div>
            <div class="flex items-center justify-between">
                <button type="submit" class="button">Add New Recipe</button>
                <button class="button" @click="logout">Logout</button>
            </div>
        </form>
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
      name: '',
      image: '',
      email: firebase.auth().currentUser.email
    };
  },
  firestore () {
    return {
      recipes: db.collection('recipes').orderBy('createdAt'),
    };
  },
  methods: {
    addRecipe (name, image) {
      const createdAt = new Date();
      db.collection('recipes').add({ name, image, createdAt });
      // Clear values
      this.name = '';
      this.image = '';
    },
    deleteRecipe (id) {
      db.collection('recipes').doc(id).delete();
    },
    logout () {
      firebase.auth().signOut().then(() => {
        this.$router.replace('/login');
      })
    }
  }
}
</script>
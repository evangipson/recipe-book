<template>
    <div class="recipes">
        <article class="recipe-covers" v-for="(recipe, idx) in recipes" :key="idx">
            <div>
                <img :src="recipe.image" />
                <p>{{recipe.name}}</p>
            </div>
        </article>
        <form @submit="addRecipe(name, image)">
            <h2>Add a new recipe</h2>
            <input v-model="name" placeholder="Recipe Name" class="input" required>
            <input v-model="image" placeholder="Recipe Image URL" class="input" required>
            <button type="submit" class="button">Add New Recipe</button>
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
      image: ''
    };
  },
  firestore () {
    return {
      recipes: db.collection('recipes').orderBy('createdAt')
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
        this.$router.replace('login');
      })
    }
  }
}
</script>
<template>
    <div class="recipes">
        <p class="mb-4">Welcome, {{email}}! Here is your {{recipe.name}} recipe.</p>
        <p class="mb-4">Not what you were looking for? Go back to the <router-link to="/recipes">Recipes page</router-link>.</p>
        <h2>{{recipe.name}}</h2>
        <p>{{recipe.description}}</p>
        <img :src="recipe.image" />
        <p>Prep time: {{recipe.prepTime}}</p>
        <p>Cook time: {{recipe.cookTime}}</p>
        <p>Ingredients: {{recipe.ingredients}}</p>
        <p>Instructions: {{recipe.instructions}}</p>
        <p>$route.params.recipe: {{this.$route.params.recipe}}</p>
    </div>
</template>

<script>
import firebase from 'firebase';
import { db } from '../main';

export default {
  name: 'Recipe',
  data () {
    return {
      recipe: '',
      email: firebase.auth().currentUser.email
    };
  },
  firestore() {
    return {
        recipe: db.collection('recipes').doc(this.$route.params.recipe.replace(/-+/g, ' ').toLowerCase())
    }
  }
}
</script>
<template>
    <div class="recipes notecard flex flex-row align-middle justify-between">
        <div class="mr-8">
            <h1>{{recipe.name}}</h1>
            <p class="text-dark-grey italic mb-4">{{recipe.description}}</p>
            <p>Prep time: {{recipe.prepTime}} minutes</p>
            <p>Cook time: {{recipe.cookTime}} minutes</p>
            <p class="mb-4">Total time: {{totalTime}} minutes</p>
            <p>Ingredients:</p>
            <ul class="mb-4">
                <li v-for="(ingredient, idx) in ingredients" :key="idx">{{ingredient}}</li>
            </ul>
            <p>Instructions:</p>
            <ol>
                <li v-for="(instruction, idx) in instructions" :key="idx">{{instruction}}</li>
            </ol>
        </div>
        <img style="width:450px;height:100%" :src="recipe.image" />
    </div>
</template>

<script>
import firebase from 'firebase';
import { db } from '../main';

export default {
  name: 'Recipe',
  data () {
    return {
      recipe: ''
    };
  },
  computed: {
    instructions: function() {
        return this.recipe.instructions.split(/\n/)
    },
    ingredients: function() {
        return this.recipe.ingredients.split(/\n/)
    },
    totalTime: function() {
        return parseInt(this.recipe.prepTime) + parseInt(this.recipe.cookTime)
    }
  },
  firestore() {
    return {
        recipe: db.collection('recipes').doc(this.$route.params.recipe.replace(/-+/g, ' ').toLowerCase())
    }
  }
}
</script>
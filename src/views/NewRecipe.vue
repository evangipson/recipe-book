<template>
    <div>
        <form @submit="addRecipe(name, image)" class="notecard">
            <h3 class="mb-4">Add a new recipe</h3>
            <div class="mb-4">
                <label class="label" for="name">Recipe Name</label>
                <input class="input focus:outline-none focus:shadow-outline" v-model="name" type="input" placeholder="Recipe Name" required>
            </div>
            <div class="mb-4">
                <label class="label" for="description">Recipe Description</label>
                <input class="input focus:outline-none focus:shadow-outline" v-model="description" type="input" placeholder="Recipe Description" required>
            </div>
            <label class="label" for="description">Type of Recipe</label>
            <div class="flex flex-row mb-4 flex-wrap">
                <div class="mr-4">
                    <label class="label" for="description">Breakfast</label>
                    <input v-model="breakfast" type="checkbox">
                </div>
                <div class="mr-4">
                    <label class="label" for="description">Entree</label>
                    <input v-model="entree" type="checkbox">
                </div>
                <div class="mr-4">
                    <label class="label" for="description">Appetizer</label>
                    <input v-model="appetizer" type="checkbox">
                </div>
                <div class="mr-4">
                    <label class="label" for="description">Bread</label>
                    <input v-model="bread" type="checkbox">
                </div>
                <div class="mr-4">
                    <label class="label" for="description">Salad</label>
                    <input v-model="salad" type="checkbox">
                </div>
                <div class="mr-4">
                    <label class="label" for="description">Soup</label>
                    <input v-model="soup" type="checkbox">
                </div>
                <div class="mr-4">
                    <label class="label" for="description">Sauce</label>
                    <input v-model="sauce" type="checkbox">
                </div>
                <div class="mr-4">
                    <label class="label" for="description">Drink</label>
                    <input v-model="drink" type="checkbox">
                </div>
                <div class="mr-4">
                    <label class="label" for="description">Cocktail</label>
                    <input v-model="cocktail" type="checkbox">
                </div>
                <div class="mr-4">
                    <label class="label" for="description">Dessert</label>
                    <input v-model="dessert" type="checkbox">
                </div>
            </div>
            <div class="mb-6">
                <label class="label" for="image">Recipe Image URL</label>
                <input class="input focus:outline-none focus:shadow-outline" v-model="image" type="input" placeholder="Recipe Image URL" required>
            </div>
            <div class="mb-6">
                <label class="label" for="prepTime">Prep Time (in minutes)</label>
                <input v-model="prepTime" type="number" class="input focus:outline-none focus:shadow-outline" placeholder="Prep Time (minutes)" required>
            </div>
            <div class="mb-6">
                <label class="label" for="prepTime">Cook Time (in minutes)</label>
                <input v-model="cookTime" type="number" class="input focus:outline-none focus:shadow-outline" placeholder="Cook Time (minutes)" required>
            </div>
            <div class="mb-6">
                <label class="label" for="ingredients">Ingredients</label>
                <textarea v-model="ingredients" rows="3" type="input" class="input focus:outline-none focus:shadow-outline" placeholder="Ingredients" required></textarea>
            </div>
            <div class="mb-6">
                <label class="label" for="instructions">Instructions</label>
                <textarea v-model="instructions" rows="3" type="input" class="input focus:outline-none focus:shadow-outline" placeholder="Instructions" required></textarea>
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
  name: 'NewRecipe',
  data () {
    return {
        name: '',
        description: '',
        image: '',
        prepTime: 0,
        cookTime: 0,
        ingredients: '',
        instructions: '',
        breakfast: '',
        entree: '',
        appetizer: '',
        dessert: '',
        bread: '',
        salad: '',
        soup: '',
        sauce: '',
        drink: '',
        cocktail: '',
        author: '',
        email: firebase.auth().currentUser.email
    };
  },
  methods: {
    addRecipe (name, image) {
      const createdAt = new Date();
      // Write some data to the database
      db.collection('recipes').doc(this.name.toLowerCase()).set({
        name: this.name,
        description: this.description,
        image: this.image,
        prepTime: this.prepTime,
        cookTime: this.cookTime,
        ingredients: this.ingredients,
        instructions: this.instructions,
        types: {
            breakfast: this.breakfast,
            entree: this.entree,
            appetizer: this.appetizer,
            dessert: this.dessert,
            bread: this.bread,
            salad: this.salad,
            soup: this.soup,
            sauce: this.sauce,
            drink: this.drink,
            cocktail: this.cocktail,
        },
        author: this.email
      });
      // Now reroute the user to the recipes page
      this.$router.replace('/');
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
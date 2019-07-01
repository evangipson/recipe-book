<template>
    <div>
        <form @submit="updateRecipe()" class="notecard">
            <h3 class="mb-4">Update an existing recipe</h3>
            <div class="mb-4">
                <label class="label" for="name">Recipe Name</label>
                <input class="input focus:outline-none focus:shadow-outline" v-model="recipe.name" type="input" placeholder="Recipe Name" required>
            </div>
            <div class="mb-4">
                <label class="label" for="description">Recipe Description</label>
                <input class="input focus:outline-none focus:shadow-outline" v-model="recipe.description" type="input" placeholder="Recipe Description" required>
            </div>
            <label class="label" for="description">Type of Recipe</label>
            <div class="flex flex-row mb-4 flex-wrap">
                <div class="mr-4">
                    <label class="label" for="description">Breakfast</label>
                    <input v-model="recipe.types.breakfast" type="checkbox">
                </div>
                <div class="mr-4">
                    <label class="label" for="description">Entree</label>
                    <input v-model="recipe.types.entree" type="checkbox">
                </div>
                <div class="mr-4">
                    <label class="label" for="description">Appetizer</label>
                    <input v-model="recipe.types.appetizer" type="checkbox">
                </div>
                <div class="mr-4">
                    <label class="label" for="description">Bread</label>
                    <input v-model="recipe.types.bread" type="checkbox">
                </div>
                <div class="mr-4">
                    <label class="label" for="description">Salad</label>
                    <input v-model="recipe.types.salad" type="checkbox">
                </div>
                <div class="mr-4">
                    <label class="label" for="description">Soup</label>
                    <input v-model="recipe.types.soup" type="checkbox">
                </div>
                <div class="mr-4">
                    <label class="label" for="description">Sauce</label>
                    <input v-model="recipe.types.sauce" type="checkbox">
                </div>
                <div class="mr-4">
                    <label class="label" for="description">Drink</label>
                    <input v-model="recipe.types.drink" type="checkbox">
                </div>
                <div class="mr-4">
                    <label class="label" for="description">Cocktail</label>
                    <input v-model="recipe.types.cocktail" type="checkbox">
                </div>
                <div class="mr-4">
                    <label class="label" for="description">Dessert</label>
                    <input v-model="recipe.types.dessert" type="checkbox">
                </div>
            </div>
            <div class="mb-6">
                <label class="label" for="image">Recipe Image URL</label>
                <input class="input focus:outline-none focus:shadow-outline" v-model="recipe.image" type="input" placeholder="Recipe Image URL" required>
            </div>
            <div class="mb-6">
                <label class="label" for="prepTime">Prep Time (in minutes)</label>
                <input v-model="recipe.prepTime" type="number" class="input focus:outline-none focus:shadow-outline" placeholder="Prep Time (minutes)" required>
            </div>
            <div class="mb-6">
                <label class="label" for="prepTime">Cook Time (in minutes)</label>
                <input v-model="recipe.cookTime" type="number" class="input focus:outline-none focus:shadow-outline" placeholder="Cook Time (minutes)" required>
            </div>
            <div class="mb-6">
                <label class="label" for="ingredients">Ingredients</label>
                <textarea v-model="recipe.ingredients" rows="3" type="input" class="input focus:outline-none focus:shadow-outline" placeholder="Ingredients" required></textarea>
            </div>
            <div class="mb-6">
                <label class="label" for="instructions">Instructions</label>
                <textarea v-model="recipe.instructions" rows="3" type="input" class="input focus:outline-none focus:shadow-outline" placeholder="Instructions" required></textarea>
            </div>
            <div class="flex items-center justify-between">
                <button type="submit" class="button">Update Recipe</button>
            </div>
        </form>
    </div>
</template>

<script>
import firebase from 'firebase';
import { db } from '../main';
import { util } from '../utility';

export default {
    name: 'EditRecipe',
    data () {
        return {
            recipe: {
                types: {},
            }
        };
    },
    methods: {
        updateRecipe: function() {
            // First delete the original recipe you came in on to avoid URL conflicts
            const originalRecipeParam = this.$route.params.recipe.replace(/-+/g, ' ').toLowerCase();
            db.collection('recipes').doc(originalRecipeParam).delete().then(function() {
                console.info(recipeParam + " record successfully deleted!");
            }).catch(function(error) {
                console.error("Error removing " + recipeParam + " record: ", error);
            });
            // Now add a new recipe to "update" the old recipe
            const recipeParam = this.recipe.name.replace(/-+/g, ' ').toLowerCase();
            const recipeData = {
                name: this.recipe.name,
                description: this.recipe.description,
                image: this.recipe.image,
                prepTime: this.recipe.prepTime,
                cookTime: this.recipe.cookTime,
                ingredients: this.recipe.ingredients,
                instructions: this.recipe.instructions,
                types: {
                    breakfast: this.recipe.types.breakfast,
                    entree: this.recipe.types.entree,
                    appetizer: this.recipe.types.appetizer,
                    dessert: this.recipe.types.dessert,
                    bread: this.recipe.types.bread,
                    salad: this.recipe.types.salad,
                    soup: this.recipe.types.soup,
                    sauce: this.recipe.types.sauce,
                    drink: this.recipe.types.drink,
                    cocktail: this.recipe.types.cocktail,
                },
                author: firebase.auth().currentUser.email
            }
            db.collection('recipes').doc(recipeParam).set(recipeData);
            console.info("Finished updating recipe.");
            /* after the user updates the recipe, relocate them to the recipe page */
            this.$router.replace('/recipe/' + this.recipe.name.replace(/\s+/g, '-').toLowerCase());
        }
    },
    computed: {
        totalTime: function() {
            return parseInt(this.recipe.prepTime) + parseInt(this.recipe.cookTime);
        },
        recipeTypes: function() {
            let returnArray = [];
            for(let type in this.recipe.types) {
                if(this.recipe.types[type] === true) {
                    returnArray.push(type.charAt(0).toUpperCase() + type.slice(1));
                }
            };
            return returnArray.join(", ");
        }
    },
    updated: function() {
        if(util.stringMatch(this.$store.state.currentUser.email, this.recipe.author)) {
            // we're cool, nothing to see here
        }
        else {
            // what are you doing here if you aren't the author? not cool.
            // return this jabroni to home.
            console.warn("What are you doing here if you didn't make this recipe? Redirecting you to the recipe list.");
            this.$router.replace('/');
        }
    },
    firestore() {
        return {
            recipe: db.collection('recipes').doc(this.$route.params.recipe.replace(/-+/g, ' ').toLowerCase())
        }
    }
}
</script>
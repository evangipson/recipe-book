<template>
    <div class="recipes notecard flex flex-col-reverse align-middle justify-between lg:flex-row">
        <div class="mr-8">
            <h1>{{recipe.name}}</h1>
            <p class="mb-4">{{recipe.description}}</p>
            <p class="mb-4 text-grey-dark italic">{{recipeTypes}}</p>
            <p class="mb-4">Author: {{recipe.author}}</p>
            <p>Prep time: {{recipe.prepTime}} minutes</p>
            <p>Cook time: {{recipe.cookTime}} minutes</p>
            <p class="mb-4">Total time: {{totalTime}} minutes</p>
            <p>Ingredients:</p>
            <ul class="mb-4">
                <li v-for="(ingredient, idx) in recipe.ingredients.split(/\n/)" :key="idx">{{ingredient}}</li>
            </ul>
            <p>Instructions:</p>
            <ol>
                <li v-for="(instruction, idx) in recipe.instructions.split(/\n/)" :key="idx">{{instruction}}</li>
            </ol>
            <div class="mt-8" v-if="userMatchesAuthor">
                <router-link :to="{ path: editPath }"><button class="button mr-8">Edit Recipe</button></router-link>
                <button @click="deleteRecipe" class="button bg-red">Delete Recipe</button>
            </div>
        </div>
        <img style="margin: 0 auto 2rem;width: 450px;object-fit: contain;height: 100%;" :src="recipe.image" />
    </div>
</template>

<script>
import firebase from 'firebase';
import { db } from '../main';
import { util } from '../utility';

export default {
    name: 'Recipe',
    data () {
        return {
            recipe: {
                instructions: "",
                ingredients: ""
            },
        };
    },
    methods: {
        deleteRecipe: function() {
            const recipeParam = this.$route.params.recipe.replace(/-+/g, ' ').toLowerCase();
            db.collection('recipes').doc(recipeParam).delete().then(function() {
                console.info(recipeParam + " record successfully deleted!");
            }).catch(function(error) {
                console.error("Error removing " + recipeParam + " record: ", error);
            });
            /* after the user deletes the recipe, relocate them to the main page */
            this.$router.replace('/');
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
        },
        editPath: function() {
            // this was causing an error to pop up, so make sure name is defined before replacing the path.
            if(this.recipe.name !== undefined) {
                return '/edit/' + this.recipe.name.replace(/\s+/g, '-').toLowerCase()
            }
        },
        userMatchesAuthor: function() {
            return util.stringMatch(this.$store.state.currentUser.email, this.recipe.author);
        }
    },
    firestore() {
        return {
            recipe: db.collection('recipes').doc(this.$route.params.recipe.replace(/-+/g, ' ').toLowerCase())
        }
    }
}
</script>
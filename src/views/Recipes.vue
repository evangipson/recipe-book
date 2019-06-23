<template>
    <div class="recipes">
        <form class="mb-4">
            <label class="label" for="search">Search recipes</label>
            <input class="input mb-4 border-l-0 border-r-0 border-t-0" type="text" v-model="search" placeholder="Search recipes..." />
        </form>
        <div class="flex flex-row flex-wrap">
            <article class="recipe-covers" v-for="(recipe, idx) in filteredRecipes" :key="idx">
                <router-link :to="{ path: '/recipe/' + recipe.name.replace(/\s+/g, '-').toLowerCase()}" class="no-underline text-black">
                    <div class="recipe-card mr-8 mb-8">
                        <img style="width: 100%" :src="recipe.image" />
                        <div class="px-4 pb-4 pt-2">
                            <p style="font-size:24px" class="font-semibold underline">{{recipe.name}}</p>
                            <p class="mb-4">{{limitDescription(recipe.description)}}</p>
                            <p class="text-grey-dark italic">{{recipeTypes(recipe.types)}}</p>
                        </div>
                    </div>
                </router-link>
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
            search: ''
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
        recipeTypes: function(types) {
            var returnArray = [];
            for(var type in types) {
                if(types[type]) {
                    returnArray.push(type.charAt(0).toUpperCase() + type.slice(1));
                }
            };
            return returnArray.join(", ");
        },
        limitDescription: function(description) {
            if (description.length <= 140) { return description; }
            var subString = description.substr(0, 139);
            return (20
                ? subString.substr(0, subString.lastIndexOf(' '))
                : subString) + "...";
        }
    }
}
</script>
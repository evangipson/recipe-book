<template>
    <nav class="flex flex-row flex-wrap justify-between flex-no-shrink border-b-4 mb-8 pb-4 w-full">
        <router-link class="flex items-center mr-4 text-black no-underline" to="/">
            <svg class="fill-current h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z"/></svg>
            <span class="font-semibold text-xl tracking-tight">Recipe Book</span>
        </router-link>
        <div class="flex lg:hidden">
            <button @click="toggleMobileMenu()" class="flex items-center px-3 py-2 border rounded text-purple border-purple-dark text-white">
                <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <title>Menu</title>
                    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
                </svg>
            </button>
        </div>
        <div id="PrimaryLinks" class="hidden w-full flex-grow lg:flex lg:items-center lg:w-auto">
            <router-link to="/" class="button mr-2 no-underline">Recipes</router-link>
            <router-link to="/new-recipe" class="button mr-2 no-underline">Add Recipe</router-link>
            <button v-if="user" v-on:click="logout" class="button">Logout</button>
        </div>
    </nav>
</template>

<script>
import firebase from 'firebase';

export default {
    name: "Navigation",
    data() {
        return {
            user: firebase.auth().currentUser
        }
    },
    methods: {
        logout() {
            firebase.auth().signOut().then(() => {
                this.$router.replace('/login');
            })
        },
        toggleMobileMenu() {
            if(document.getElementById("PrimaryLinks").style.display !== "block") {
                document.getElementById("PrimaryLinks").style.display = "block";
            }
            else {
                document.getElementById("PrimaryLinks").style.display = "none";
            }
        }
    }
};
</script>
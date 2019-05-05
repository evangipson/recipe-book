<template>
    <nav class="flex flex-row flex-wrap justify-between flex-no-shrink border-b-4 mb-8 pb-4 w-full">
        <router-link class="flex items-center mr-4 text-black no-underline" to="/">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="margin-top: -6px;margin-right: 4px" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 6c1.11 0 2-.9 2-2 0-.38-.1-.73-.29-1.03L12 0l-1.71 2.97c-.19.3-.29.65-.29 1.03 0 1.1.9 2 2 2zm4.6 9.99l-1.07-1.07-1.08 1.07c-1.3 1.3-3.58 1.31-4.89 0l-1.07-1.07-1.09 1.07C6.75 16.64 5.88 17 4.96 17c-.73 0-1.4-.23-1.96-.61V21c0 .55.45 1 1 1h16c.55 0 1-.45 1-1v-4.61c-.56.38-1.23.61-1.96.61-.92 0-1.79-.36-2.44-1.01zM18 9h-5V7h-2v2H6c-1.66 0-3 1.34-3 3v1.54c0 1.08.88 1.96 1.96 1.96.52 0 1.02-.2 1.38-.57l2.14-2.13 2.13 2.13c.74.74 2.03.74 2.77 0l2.14-2.13 2.13 2.13c.37.37.86.57 1.38.57 1.08 0 1.96-.88 1.96-1.96V12C21 10.34 19.66 9 18 9z"/></svg>
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
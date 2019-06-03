import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/tailwind.pcss';
import { firestorePlugin } from 'vuefire';
import * as firebase from 'firebase/app';
import 'firebase/firestore'

Vue.config.productionTip = false;
Vue.use(firestorePlugin);

// create variable to store app
let app;

// Initialize Firebase
firebase.initializeApp({
  apiKey: "AIzaSyBVx2JURCDI4urzJMtaXMHedHWgpcsmjQU",
  authDomain: "recipebook-99f2e.firebaseapp.com",
  databaseURL: "https://recipebook-99f2e.firebaseio.com",
  projectId: "recipebook-99f2e",
  storageBucket: "recipebook-99f2e.appspot.com",
  messagingSenderId: "1023982856739"
});

/* Define Firebase for the rest of the application */
export const db = firebase.firestore();

/* Check user's auth state before launching the app,
 * so authenticated users don't get a login screen. */
firebase.auth().onAuthStateChanged(user => {
  if(user) {
    store.commit("setCurrentUser", user);
  }
  else {
    store.commit("setCurrentUser", null);
  }
  /* ensure the app doesn't get re-initialized */
  if(!app) {
      app = new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount('#app');
  }
});
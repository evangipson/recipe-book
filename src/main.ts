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

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBVx2JURCDI4urzJMtaXMHedHWgpcsmjQU",
  authDomain: "recipebook-99f2e.firebaseapp.com",
  databaseURL: "https://recipebook-99f2e.firebaseio.com",
  projectId: "recipebook-99f2e",
  storageBucket: "recipebook-99f2e.appspot.com",
  messagingSenderId: "1023982856739"
};
firebase.initializeApp(config);

/* Define Firebase for the rest of the application */
export const db = firebase.firestore();

/* Ensure the user's authentication is handled before we show the app */
firebase.auth().onAuthStateChanged(function (user) {
  new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount('#app');
});
<template>
  <div class="notecard login">
    <h3 class="mb-4">Recipe Book</h3>
    <div class="mb-4">
      <label class="label" for="Email">Email</label>
      <input class="input focus:outline-none focus:shadow-outline" v-model="email" type="text" placeholder="Email" required>
    </div>
    <div class="mb-6">
      <label class="label" for="Password">Password</label>
      <input v-model="password" type="password" class="input" placeholder="Password" required>
    </div>
    <div class="flex items-center justify-between">
      <button v-on:click="login" class="button">Enter</button>
      <p>
        <router-link to="/signup">New Here? Create a new account</router-link>
      </p>
    </div>
  </div>
</template>

<script>
  import firebase from 'firebase';
  export default {
    name: 'login',
    data: function() {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      login () {
        firebase.auth().signInWithEmailAndPassword(this.email, this.password).then((user) => {
          this.$router.replace('/recipes');
        }).catch((err) => {
          console.error(err.message);
        })
      }
    }
  }
</script>
<template>
  <form class="notecard signup" @submit="signUp">
    <h3 class="mb-4">Create a new account</h3>
      <div class="mb-4">
        <label class="label" for="Email">Email</label>
        <input class="input focus:outline-none focus:shadow-outline" v-model="email" type="email" placeholder="Email" required>
      </div>
      <div class="mb-6">
        <label class="label" for="Password">Password</label>
        <input v-model="password" type="password" class="input" placeholder="Password" required>
      </div>
      <div class="flex items-center justify-between">
        <button v-on:click="signUp" class="button">Sign Up!</button>
        <p>
          <router-link to="/login">Already have an Account? Back to login</router-link>
        </p>
      </div>
  </form>
</template>

<script>
  import firebase from 'firebase';
  export default {
    name: 'signup',
    data () {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      signUp () {
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then((user) => {
          this.$store.commit("setCurrentUser", user);
          this.$router.replace('/login');
        }).catch((err) => {
          console.error(err.message);
        });
      }
    }
  }
</script>
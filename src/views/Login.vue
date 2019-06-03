<template>
  <form class="notecard login" @submit="login()" >
    <h3 class="mb-4">Login</h3>
    <p class="mb-4 text-red" v-if="error">
      {{ error }}
    </p>
    <div class="mb-4">
      <label class="label" for="Email">Email</label>
      <input class="input focus:outline-none focus:shadow-outline" v-model="email" type="email" placeholder="Email" required>
    </div>
    <div class="mb-6">
      <label class="label" for="Password">Password</label>
      <input v-model="password" type="password" class="input" placeholder="Password" required>
    </div>
    <div class="flex items-center justify-between">
      <button type="submit" class="button">Enter</button>
      <p>
        <router-link to="/signup">New Here? Create a new account</router-link>
      </p>
    </div>
    <p>{{this.$store.state.currentUser}}</p>
  </form>
</template>

<script>
  import firebase from 'firebase';
  export default {
    name: 'login',
    data: function() {
      return {
        email: '',
        password: '',
        error: ''
      }
    },
    methods: {
      login () {
        firebase.auth().signInWithEmailAndPassword(this.email, this.password).then((user) => {
          this.$store.commit("setCurrentUser", user);
          this.$router.replace('/');
        }).catch((err) => {
          console.error(err.message);
          /* if we have both fields and they are valid */
          if(this.email.includes("@") && this.email.includes(".") && this.password) {
            /* we can assume if the fields are valid, but we couldn't authenticate
             * with firebase, that the user account doesn't exist. show that assumption
             * to the user. */
            this.error = "User account not found.";
          }
        })
      }
    }
  }
</script>
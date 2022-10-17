<template>
  <div>
    <div class="q-mt-xl column items-center">
      <q-card
        class="my-card q-pa-sm column items-center"
        square>
        <q-card-section class="column items-center">
          <div class="text-h2 form-header">Register</div>
        </q-card-section>
        <q-form
          class="form column q-gutter-y-lg"
          @submit.prevent="submitForm">
          <div
            class="error-container self-center "
            v-if="errors">
            <div
              class="error-message text-center"
              v-for="error in errors.errorArray"
              :key="error">{{ error }}
            </div>
          </div>
          <q-input
            class="input"
            v-model="username"
            :model-value="username"
            type="text"
            label="Username"
            clearable
            rounded
            outlined>
            <template v-slot:prepend>
              <q-icon name="fa-solid fa-user"/>
            </template>
          </q-input>
          <q-input
            class="input"
            v-model="email"
            :model-value="email"
            type="email"
            label="E-Mail"
            clearable
            rounded
            outlined>
            <template v-slot:prepend>
              <q-icon name="fa-solid fa-at"/>
            </template>
          </q-input>
          <q-input
            class="input"
            v-model="password"
            :model-value="password"
            type="password"
            label="Password"
            clearable
            rounded
            outlined>
            <template v-slot:prepend>
              <q-icon name="fa-solid fa-key"/>
            </template>
          </q-input>
          <q-input
            class="input"
            v-model="confirmPassword"
            :model-value="confirmPassword"
            type="password"
            label="Confirm Password"
            clearable
            rounded
            outlined>
            <template v-slot:prepend>
              <q-icon name="fa-solid fa-key"/>
            </template>
          </q-input>

          <!-- Beta Passoword -->
          <q-input
            class="input"
            v-model="betaKey"
            :model-value="betaKey"
            type="password"
            label="Beta Key"
            clearable
            rounded
            outlined>
            <template v-slot:prepend>
              <q-icon name="fa-solid fa-lock"/>
            </template>
          </q-input>

          <q-btn
            class="submit self-center"
            padding="md"
            label="Register"
            type="submit"
            rounded
            size="lg"
            color="secondary"
            unelevated></q-btn>
          <q-btn
            class="to-login self-center"
            padding="md"
            label="To Login"
            to="/login"
            icon="fas fa-arrow-left"
            rounded
            size="md"
            color="primary"
            flat></q-btn>
        </q-form>
      </q-card>
    </div>

  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  mounted() {
    this.pullDb();
  },
  data() {
    return {
      username: "",
      userList: [],
      usernameAvailability: true,
      email: "",
      password: "",
      confirmPassword: "",
      formIsValid: true,
      isLoading: false,
      errors: null,
      usernameError: false,
      emailError: false,
      passwordError: false,
      betaKey: ""
    };
  },

  watch: {
    username() {
      if (this.username) {
        this.usernameAvailability = !this.userList.some((u) => {
          return u[0] === this.username;
        });
      }
      if (this.usernameError) {
        if (this.username.length > 5) {
          this.usernameError = false;
        }
      }
    },
    email() {
      if (this.emailError) {
        if (this.email.includes("@") && this.email.includes(".")) {
          this.emailError = false;
        }
      }
    },
    password() {
      if (this.passwordError) {
        if (this.password.length > 8) {
          this.passwordError = false;
        }
      }
    }
  },

  methods: {
    ...mapActions("authorization", ["getUsernamesList", "clientAuthSignup", "signup"]),
    async pullDb() {
      this.userList = await this.getUsernamesList();
    },

    async submitForm() {
      try {
        this.formIsValid = true;
        this.isLoading = true;
        const userData = {
          username: this.username,
          email: this.email,
          password1: this.password,
          password2: this.confirmPassword,
          betaKey: this.betaKey
        };

        //Local Authentication
        const localAuth = await this.clientAuthSignup(userData);
        if (localAuth) {
          this.errors = localAuth;
          if (localAuth.errorField.includes("email")) this.emailError = true;
          if (localAuth.errorField.includes("username")) this.usernameError = true;
          if (localAuth.errorField.includes("password")) this.passwordError = true;
          this.formIsValid = false;
          this.isLoading = false;
          return;
        }

        //Finalize Signup
        const servAuth = await this.signup(userData);
        if (servAuth) {
          this.formIsValid = false;
          this.errors = servAuth;
          this.isLoading = false;
          return;
        }
        this.isLoading = false;
        const redirect = "/" + (this.$route.query.redirect || "home");
        this.$router.replace(redirect);
      } catch (error) {
        console.log(error);
        this.errors = ["Something went wrong. Please Try Again"];
      }
    }
  }
};
</script>

<style
  scoped
  lang="scss">

.error-container {
  margin: 0;
}

.error-message {
  margin: 0.3rem;
  font-family: Gellix, sans-serif;
  background: #ffa4a4;
  padding: 0.5rem 1rem;
  border-radius: 1rem;
}

.form-header, .submit {
  font-family: Futura, sans-serif;
}

.input {
  font-family: Gellix, sans-serif;
}


body.screen--xs, {
  .my-card {
    width: 95%;
  }

  .to-login {
    width: 70%;
    margin: 0.5rem;
  }
}

body.screen--sm {
  .my-card {
    width: 80%;
  }

  .to-login {
    width: 30%;
    margin: 0.5rem;
  }
}

body.screen--md, {
  .my-card {
    width: 60%;
  }

  .to-login {
    width: 30%;
    margin: 0.5rem;
  }

}

body.screen--lg, body.screen--xl, {
  .my-card {
    width: 40%;
  }

  .to-login {
    width: 30%;
    margin: 0.5rem;
  }
}

.form {
  width: 90%;
}

.container {
  position: relative;
  display: grid;
  width: 30%;
  margin: auto;
  text-align: center;
}

.inner-container {
  position: relative;
  display: grid;
  color: var(--bg-offwhite2);
  overflow: hidden;
}

form {
  position: relative;
  padding: 2rem 1.2rem;
}

h1 {
  margin-bottom: 2rem;
}

input {
  font-size: 2rem;
  border-radius: 1.8rem;
  border: none;
  padding: 1.2rem;
  width: 90%;
}

.form-control {
  margin: 0 0 3rem 0;
  font-size: 3rem;
}

.username-check {
  font-size: 2rem;
  margin: 1rem 5rem;
  text-align: left;
  color: greenyellow;
}

.invalidUsername {
  color: rgb(255, 116, 116);
}

.submit {
  width: 70%;
  transition: 800ms all;
}

.submit:hover,
.submit:active {
  transform: scale(1.1);
  cursor: pointer;
}

.inner-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  height: 100%;
  width: 2%;
  background-color: var(--main-red);
  box-shadow: 4px 0 19px 3px #c33c5571;
}

.inner-container::after {
  content: '';
  position: absolute;
  top: 0;
  left: 98%;
  bottom: 0;
  height: 100%;
  width: 2%;
  background-color: var(--login-color);
  box-shadow: -4px 0px 19px 3px #17a39d8f;
}

.switch {
  padding-top: 2rem;
  font-size: 1.8rem;
}

.error-cont {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 0.5rem;
}

.error-list {
  display: flex;
  justify-content: center;
}

.error {
  background: #ff515167;
  border-radius: 0.7rem;
}

.exclamation {
  height: 32px;
  width: 32px;
  transition: 800ms all;
  color: #ff0000;
  padding-bottom: 0.5rem;
}

.input-error {
  background: #ffc4c4;
  border: 0.3rem solid rgb(182, 0, 0);
  transition: 800ms all;
}

a {
  color: var(--bg-offwhite2);
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.v-enter-active {
  transition: all 1s ease-out;
}

.v-leave-active {
  transition: all 1s ease-in;
}

.v-enter-to,
.v-leave-from {
  opacity: 1;
}

@media (max-width: 77rem) {
}

@media (max-width: 48rem) {
  .container {
    width: 90%;
  }
  .container.card {
    padding: 0;
  }
  .inner-container {
    width: 100%;
  }
}
</style>

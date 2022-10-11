<template>
  <div>
    <div class="q-mt-xl column items-center">
      <q-card
        class="my-card q-pa-sm column items-center"
        square>
        <q-card-section>
          <div class="text-h2 form-header">Login</div>
        </q-card-section>

        <q-form
          class="column q-gutter-lg form"
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
            v-model="email"
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
            type="password"
            label="Password"
            clearable
            rounded
            outlined>
            <template v-slot:prepend>
              <q-icon name="fa-solid fa-key"/>
            </template>
          </q-input>

          <q-btn
            class="submit self-center"
            padding="md"
            label="Login"
            type="submit"
            rounded
            size="lg"
            color="primary"
            unelevated></q-btn>
          <q-btn
            class="to-signup self-center"
            padding="md"
            label="To Signup"
            to="/register"
            icon="fas fa-arrow-left"
            rounded
            size="md"
            color="secondary"
            flat></q-btn>
        </q-form>
      </q-card>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      email: "",
      password: "",
      formIsValid: true,
      isLoading: false,
      errors: null
    };
  },
  methods: {
    ...mapActions("authorization", ["clientAuth", "login"]),
    async submitForm() {
      try {
        this.formIsValid = true;
        this.isLoading = true;
        const userData = {
          email: this.email,
          password: this.password
        };

        //Local Authentication
        const localAuth = await this.clientAuth(userData);
        if (localAuth) {
          this.errors = localAuth;
          this.formIsValid = false;
          this.isLoading = false;
          return;
        }
        //Server Authentication
        const servAuth = await this.login(userData);
        if (servAuth) {
          this.errors = servAuth;
          this.formIsValid = false;
          this.isLoading = false;
          return;
        }

        this.isLoading = false;
        const redirect = "/" + (this.$route.query.redirect || "home");
        this.$router.replace(redirect);
      } catch (error) {
        this.errors = ["Something went wrong. Please Try Again"];
      }
    }
  }
};
</script>

<style
  scoped
  lang="scss">

.form {
  width: 90%;
}

.error-message {
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


form {
  position: relative;
  padding: 2rem 1.2rem;
}

input {
  font-size: 2rem;
  border-radius: 1.8rem;
  border: none;
  padding: 1.2rem;
  width: 90%;
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


body.screen--xs, {
  .my-card {
    width: 95%;
  }

  .to-signup {
    width: 50%;
    margin: 0.5rem;
  }
}

body.screen--sm {
  .my-card {
    width: 80%;
  }

  .to-signup {
    width: 50%;
    margin: 0.5rem;
  }
}

body.screen--md, {
  .my-card {
    width: 60%;
  }

  .to-signup {
    width: 30%;
    margin: 0.5rem;
  }
}

body.screen--lg, body.screen--xl, {
  .my-card {
    width: 40%;
  }

  .to-signup {
    width: 30%;
    margin: 0.5rem;
  }
}

a {
  color: var(--bg-offwhite2);
}

</style>

<template>
  <div>
    <div class="q-mt-xl column items-center">
      <q-card class="my-card q-px-md column items-center bg-primary">
        <q-card
          class="my-card-inner q-pa-sm column items-center"
          square>
          <q-card-section>
            <div class="text-h2">Login</div>
          </q-card-section>
          <q-form
            class="column q-gutter-lg form"
            @submit.prevent="submitForm">
            <q-input
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
              padding="md"
              label="Login"
              type="submit"
              rounded
              size="lg"
              color="primary"
              unelevated></q-btn>
          </q-form>
        </q-card>
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
          this.formIsValid = false;
          this.errors = [servAuth];
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

body.screen--xs, body.screen--sm {
  .my-card {
    width: 95%;
  }
}

body.screen--md, body.screen--lg, body.screen--xl, {
  .my-card {
    width: 30%;
  }
}


.my-card-inner {
  width: 100%;
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

.switch {
  padding-top: 2rem;
  font-size: 1.8rem;
}

a {
  color: var(--bg-offwhite2);
}

.form-control {
  margin: 0 0 3rem 0;
  font-size: 3rem;
}

.submit {
  background-color: var(--login-color);
  padding: 2rem 5rem;
  font-size: 2rem;
  border-radius: 5rem;
  color: var(--bg-offwhite2);
  box-shadow: 0px 0px 20px -1px #00000059;
  transition: 800ms all;
  border: none;
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
  box-shadow: 4px 0px 19px 3px #c33c5571;
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
  width: 100%;
  margin: 0.5rem;
  padding: 1rem;
  background: #ff515167;
  border-radius: 2rem;
  font-size: 1.8rem;
}

.exclamation {
  height: 32px;
  width: 32px;
  transition: 800ms all;
  color: #ff0000;
  padding-bottom: 0.5rem;
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

</style>

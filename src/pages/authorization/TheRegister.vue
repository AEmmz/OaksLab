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
                  :type="hidePassword ? 'password' : 'text'"
                  label="Password"
                  rounded
                  outlined>
                  <template v-slot:prepend>
                     <q-icon name="fa-solid fa-key"/>
                  </template>
                  <template v-slot:append>
                     <q-icon
                        :name="hidePassword ? 'visibility_off' : 'visibility'"
                        class="cursor-pointer"
                        @click="hidePassword = !hidePassword"/>
                  </template>
               </q-input>
               <q-input
                  class="input"
                  v-model="confirmPassword"
                  :model-value="confirmPassword"
                  :type="hidePassword ? 'password' : 'text'"
                  label="Confirm Password"
                  rounded
                  outlined>
                  <template v-slot:prepend>
                     <q-icon name="fa-solid fa-key"/>
                  </template>
                  <template v-slot:append>
                     <q-icon
                        :name="hidePassword ? 'visibility_off' : 'visibility'"
                        class="cursor-pointer"
                        @click="hidePassword = !hidePassword"/>
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

<script lang="ts">
//Imports
import { defineComponent } from "vue";
//Stores
import { useUserStore } from "pages/authorization/_UserStore";
import { useQuasar } from "quasar";
//Types
type TheRegisterState = {
   username: string,
   userList: string[] | undefined,
   usernameAvailability: boolean,
   email: string,
   password: string,
   confirmPassword: string,
   hidePassword: boolean,
   formIsValid: boolean,
   errors: {
      errorField: string[],
      errorArray: string[],
   }
   usernameError: boolean,
   emailError: boolean,
   passwordError: boolean
}

export default defineComponent({
   mounted() {
      this.pullDb().catch(err =>
         console.log(err));
   },
   data(): TheRegisterState {
      return {
         username: "",
         userList: [],
         usernameAvailability: true,
         email: "",
         password: "",
         confirmPassword: "",
         hidePassword: true,
         formIsValid: true,
         errors: {
            errorField: [],
            errorArray: []
         },
         usernameError: false,
         emailError: false,
         passwordError: false
      };
   },
   setup() {
      const UserStore = useUserStore();
      const Quasar = useQuasar();
      return { UserStore, Quasar };
   },
   watch: {
      username() {
         if (this.username && this.userList) {
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
      async pullDb() {
         this.userList = await this.UserStore.getUsernamesList();
      },

      async submitForm() {
         try {
            this.Quasar.loading.show();
            this.formIsValid = true;
            const userData = {
               username: this.username.trim(),
               email: this.email.trim(),
               password1: this.password.trim(),
               password2: this.confirmPassword.trim()
            };
            //Local Authentication
            const localAuth = await this.UserStore.clientAuthSignup(userData);
            if (localAuth) {
               this.errors = localAuth;
               if (localAuth.errorField.includes("email")) this.emailError = true;
               if (localAuth.errorField.includes("username")) this.usernameError = true;
               if (localAuth.errorField.includes("password")) this.passwordError = true;
               this.formIsValid = false;
               this.Quasar.loading.hide();
               return;
            }
            //Finalize Signup
            const servAuth = await this.UserStore.signup(userData);
            if (servAuth) {
               this.formIsValid = false;
               this.errors = servAuth;
               this.Quasar.loading.hide();
               return;
            }
            this.Quasar.loading.hide();
            const redirect = `/${this.$route.query.redirect as string || "home"}`;
            await this.$router.replace(redirect);
         } catch (err) {
            console.log(err);
            this.errors.errorArray = ["Something went wrong. Please Try Again"];
         }
      }
   }
});
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

.submit {
   width: 70%;
   transition: 800ms all;
}

.submit:hover,
.submit:active {
   transform: scale(1.1);
   cursor: pointer;
}

.error {
   background: #ff515167;
   border-radius: 0.7rem;
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
}
</style>

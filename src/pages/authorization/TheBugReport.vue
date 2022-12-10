<template>
   <div
      class="column items-center"
      :class="desktopCheck() ? 'q-ma-xl' : ''">
      <q-card
         class="my-card  column bg-dark"
         :class="desktopCheck() ? 'q-pa-lg' : 'full-width'">
         <q-card-section class="self-center">
            <div
               class="text-light form-header"
               :class="desktopCheck() ? 'text-h3' : 'text-h4'">Bug Report
            </div>
         </q-card-section>
         <q-card-section class="text-light">
            <q-form
               greedy
               @submit.prevent="handleSubmit"
               class="q-gutter-y-md"
               name="Bug Report">
               <div class="bug-report-input">
                  <h6 class="form-header">Feature Type *</h6>
                  <q-select
                     class="input"
                     v-model="form.featureType"
                     :model-value="form.featureType"
                     :options="featureOptions"
                     label="Select A Feature"
                     dark
                     standout
                     rounded
                     :rules="[ val => val && val.length > 0 || 'Please select a feature']">
                     <template v-slot:prepend>
                        <q-icon name="fa-solid fa-user"/>
                     </template>
                  </q-select>
               </div>
               <div class="bug-report-input">
                  <h6 class="form-header">Short Description *</h6>
                  <q-input
                     class="input"
                     v-model="form.shortDescription"
                     :model-value="form.shortDescription"
                     hint="80 Character Limit"
                     type="text"
                     maxlength="80"
                     counter
                     dark
                     clearable
                     standout
                     rounded
                     :rules="[ val => val && val.length > 0 || 'Please enter a short description']">
                     <template v-slot:prepend>
                        <q-icon name="fa-solid fa-user"/>
                     </template>
                  </q-input>
               </div>
               <div class="bug-report-input">
                  <h6 class="form-header">Tell Us More *</h6>
                  <q-input
                     class="input"
                     v-model="form.longDescription"
                     :model-value="form.longDescription"
                     type="textarea"
                     hint="220 Character Limit"
                     maxlength="220"
                     counter
                     dark
                     clearable
                     standout
                     rounded
                     :rules="[ val => val && val.length > 0 ||
                     'Please provide a detailed description']">
                     <template v-slot:prepend>
                        <q-icon name="fa-solid fa-user"/>
                     </template>
                  </q-input>
               </div>
               <div class="full-width column items-center">
                  <div v-if="failedVerification">Please verify that you are not a robot.</div>
                  <vue-recaptcha
                     class="recaptcha-container"
                     theme="dark"
                     sitekey="6Ldh6hkjAAAAADhqf3wV72y6QrQpoNzi1M3nX53D"
                     :load-recaptcha-script="true"
                     @verify="recaptchaSuccess"></vue-recaptcha>
                  <q-btn
                     class="submitButton q-mt-md"
                     padding="md"
                     label="Report A Bug"
                     type="submit"
                     icon="fas fa-pen-to-square"
                     rounded
                     size="md"
                     color="secondary"
                     unelevated></q-btn>
               </div>
            </q-form>
         </q-card-section>
      </q-card>
   </div>
</template>

<script lang="ts">
//Imports
import { defineComponent, defineAsyncComponent } from "vue";
import axios from "axios";
//Components
const { VueRecaptcha } = defineAsyncComponent(() => import("vue-recaptcha"));
//Interfaces
import IUserFeatureRequest from "src/interfaces/user/IUserFeatureRequest";
//Stores
import { useUserStore } from "pages/authorization/_UserStore";
//Types
type TheBugReport = {
   verification: boolean,
   failedVerification: boolean,
   formName: string,
   form: {
      featureType: string,
      shortDescription: string,
      longDescription: string
   },
   featureOptions: string[]
}

export default defineComponent({
   name: "TheBugReport",
   components: { VueRecaptcha },
   data(): TheBugReport {
      return {
         verification: false,
         failedVerification: false,
         formName: "bug-report",
         form: {
            featureType: "",
            shortDescription: "",
            longDescription: ""
         },
         featureOptions: [
            "Tracker", "Collection", "Statistics", "Data / Information", "Admin / Settings", "Other"
         ]

      };
   },
   setup() {
      const UserStore = useUserStore();
      return { UserStore };
   },
   methods: {
      desktopCheck() {
         return this.$q.screen.gt.sm;
      },
      encode(data: IUserFeatureRequest) {
         return Object.keys(data)
            .map(
               key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key as keyof IUserFeatureRequest])}`
            )
            .join("&");
      },
      async handleSubmit() {
         if (this.verification && this.UserStore.username) {
            const encodedData = this.encode(
               {
                  "form-name": "Bug Report",
                  "username": this.UserStore.username,
                  "feature-type": this.form.featureType,
                  "short-description": this.form.shortDescription,
                  "long-description": this.form.longDescription
               }
            );
            await axios.post("/", encodedData);
            await this.$router.push("/tracker");
         } else {
            this.failedVerification = true;
         }
      },
      recaptchaSuccess(response: object) {
         if (response) this.verification = true;
      }
   }
});
</script>

<style
   scoped
   lang="scss">

.recaptcha-container :deep(.rc-anchor-light) {
   background-color: green
}

.form-header, .submitButton {
   font-family: Futura, sans-serif;
}

.input, {
   font-family: Gellix, sans-serif;
}

.q-field--error :deep(.q-field__messages), .q-field--error :deep(.q-field__counter) {
   color: pink;
}

body.screen--sm, body.screen--xs {
   .my-card {
      border-radius: 0;
   }
}

body.screen--md {
   .my-card {
      width: 70%;
      border-radius: 0.7rem;
   }
}

body.screen--lg, body.screen--xl {
   .my-card {
      width: 30%;
      border-radius: 0.7rem;
   }

}

</style>

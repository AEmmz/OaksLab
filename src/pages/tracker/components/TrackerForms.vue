<template>
  <q-card class="bg-dark flex justify-evenly items-center text-h6 q-pa-md forms-container">
    <h5
      class="flex items-center justify-center full-width text-light q-pb-sm gt-sm">
      Forms </h5>
    <h5 class="flex items-center justify-center full-width text-light q-pb-sm lt-md">Select A Form</h5>

    <!--MOBILE -->
    <div class="mobile-form-tabs row justify-between lt-md">
      <div
        class="q-px-md q-py-lg column items-center mobile-form"
        v-for="(form, index) in forms"
        :key="index">
        <span class="mobile-form-name text-light">{{ form.name }}</span>
        <q-img
          width="120px"
          :src="form.image"
          :alt="form.name"
          @click="mobileChangePokemon(form)"></q-img>
      </div>
    </div>

    <!--DESKTOP -->
    <div class="form-tabs gt-sm">
      <q-tabs
        class="bg-dark text-light"
        outside-arrows
        mobile-arrows
        :indicator-color="pkTypeColor()"
        dense>
        <div
          v-for="(form, index) in forms"
          :key="index">
          <q-route-tab
            :to="formRoute(form)"
            :label="form.name"
            no-caps
            exact
            replace
            @click="changePokemon(form)">
            <q-img
              width="150px"
              :src="form.image"
              :alt="form.name"></q-img>
          </q-route-tab>
        </div>
      </q-tabs>
    </div>
  </q-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  props: {
    closeDialog: { type: Function }
  },
  data() {
    return {
      scrollAmount: 0
    };
  },
  computed: {
    ...mapGetters("tracker/forms", ["forms"]),
    ...mapGetters("tracker/counter", ["hunt"]),
    ...mapGetters("tracker", ["pkType1"])
  },
  methods: {
    ...mapActions("tracker/forms", ["fetchForms"]),
    ...mapActions("tracker", ["changeActivePokemon"]),
    ...mapActions("tracker/counter", ["changeCount"]),

    formRoute(form) {
      let route = "/tracker/" + form.name.toLowerCase().replaceAll(" ", "-");
      if (route === "/tracker/unown-?") route = "/tracker/unown-question";
      return route;
    },

    async mobileChangePokemon(form) {
      await this.changePokemon(form);
      this.closeDialog();
    },

    async changePokemon(form) {
      const inputPokemon = {
        apiNo: form.apiNo,
        dexNo: form.dexNo,
        setName: form.name,
        setType: form.types
      };
      await this.changeActivePokemon(inputPokemon);
      const data = this.hunt.split("Count")[0];
      await this.changeCount(data);
      await this.fetchForms();
    }
    ,

    pkTypeColor() {
      return `${this.pkType1}Type`;
    }
  }
};
</script>

<style
  scoped
  lang="scss">

h5 {
  font-family: Futura, sans-serif;
}

body.screen--xs, body.screen--sm {
  .forms-container {
    top: 2rem;
    height: 85%;
  }

  .mobile-form {
    width: 50%;
  }

  .mobile-form-name {
    font-size: 1rem;
    font-family: Gellix, sans-serif;
    text-align: center;
  }


}

body.screen--md, body.screen--lg, body.screen--xl {


  .form-tabs {
    font-family: Gellix, sans-serif;
    max-width: 100%;
  }
}

</style>

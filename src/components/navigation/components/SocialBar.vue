<template>
  <div class="social-icons-container flex items-center">
    <q-btn
      flat
      round
      icon="fab fa-twitter"
      href="https://twitter.com/_DexHunt"
      target="_blank"
      size="md">
      <q-tooltip class="bg-primary text-body2">Twitter</q-tooltip>
    </q-btn>
    <q-btn
      flat
      round
      icon="fab fa-instagram"
      href="https://www.instagram.com/_dexhunt/"
      target="_blank"
      size="md">
      <q-tooltip class="bg-primary text-body2">Instagram</q-tooltip>
    </q-btn>
    <q-btn
      flat
      round
      icon="fas fa-mug-hot"
      href="https://www.buymeacoffee.com/dexhunt"
      target="_blank"
      size="md">
      <q-tooltip class="bg-primary text-body2">Buy Me A Coffee</q-tooltip>
    </q-btn>
    <q-btn
      flat
      round
      icon="fas fa-star"
      size="md"
      @click="whatsNewDialog = true">
      <q-tooltip class="bg-primary text-body2">What's New</q-tooltip>
      <q-badge
        v-if="whatsNew"
        floating
        color="red"
        class="q-pa-sm"
        rounded></q-badge>
    </q-btn>

    <q-dialog
      v-model="whatsNewDialog"
      @hide="viewedWhatsNew">
      <whats-new-dialog @closeWhatsNewDialog="whatsNewDialog=false"></whats-new-dialog>
      <!--      <q-page-sticky-->
      <!--        position="bottom"-->
      <!--        class="floating-button">-->

      <!--      </q-page-sticky>-->
    </q-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import WhatsNewDialog from "components/navigation/components/WhatsNewDialog.vue";

export default {
  name: "SocialMenu",
  components: { WhatsNewDialog },
  data() {
    return {
      whatsNewDialog: false
    };
  },
  computed: {
    ...mapGetters("authorization", ["whatsNew"])
  },
  methods: {
    ...mapActions("authorization", ["toggleWhatsNew"]),
    viewedWhatsNew() {
      this.whatsNewDialog = false;
      this.toggleWhatsNew(this.whatsNewDialog);
    }
  }
};
</script>

<style
  scoped
  lang="scss">

body.screen--xs, body.screen--sm {
  .social-icons-container {
    justify-content: space-around;
    padding-left: 24px;
    padding-right: 24px;
  }
}

body.screen--md, body.screen--lg, body.screen--xl {
  .social-icons-container {
    padding-left: 48px;
    padding-right: 48px;
    gap: 1rem;
  }
}

</style>

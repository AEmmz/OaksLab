<template>
  <div class="progress-cont"></div>
</template>

<script>

export default {

  mounted() {
    this.getIcon(this.iconType);
  },
  props: ["count", "total", "iconType", "name", "color"],
  data() {
    return {
      dexTotal: 375,
      icon: null
    };
  },
  computed: {
    caughtCount() {
      if (this.count && this.total) {
        return Math.floor((this.count / this.total) * 100);
      }
      return 0;
    }
  },

  methods: {
    async getIcon(iconType) {
      const image = await import(
        /*vite-ignore */ `../../../assets/icons/types/${iconType}Icon.svg`
        );
      this.icon = image.default.replace(/^\/@fs/, "");
    }
  }
};
</script>

<style scoped>
.progress-cont {
  position: relative;
  display: flex;
  justify-content: center;
}

.progress {
  z-index: 2;
}

.progress-icon {
  position: absolute;
  height: 130px;
  width: 130px;
  /* height: 170px;
  width: 170px; */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0.05;
}

.progress-caption {
  color: var(--bg-offwhite);
}
</style>

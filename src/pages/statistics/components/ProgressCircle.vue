<template>
  <div class="progress-cont"></div>
</template>

<script>

export default {

  mounted() {
    this.getIcon(this.iconType);
  },
  props: ["count", "total", "iconType", "name"],
  data() {
    return {
      dexTotal: 375,
      icon: null
    };
  },
  computed: {
    size() {
      if (window.innerWidth < 480) {
        return 150;
      } else {
        return 200;
      }
    },
    fontSize() {
      if (window.innerWidth < 480) {
        return "2rem";
      } else {
        return "2.5rem";
      }
    },
    caughtCount() {
      return Math.floor((this.count / this.total) * 100);
    },
    counts() {
      return this.count;
    }
  },

  methods: {
    async getIcon(iconType) {
      const image = await import(
        /*vite-ignore */ `../../../assets/icons/${iconType}Icon.svg`
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
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0.05;
}

.progress-caption {
  color: var(--bg-offwhite);
  font-size: 2rem;
}

@media (max-width: 77rem) {
}

@media (max-width: 48rem) {
  .progress-cont {
    width: 45%;
  }
}
</style>

<template>
  <div class="end-card">
    <h2 class="end-card__text">End of Your Collection</h2>
  </div>
</template>

<script>
export default {
  props: {
    endList: { type: Boolean, default: false }
  }
};
</script>

<style scoped>
.end-card {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 95%;
  height: 20rem;
  background: #3d3c3d;
  border-radius: 2.4rem;
  overflow: hidden;
  border: 0.5rem solid silver;
  outline: 0.2rem solid var(--bg-grey);
  outline-offset: -0.5rem;
}

.end-card__text {
  color: var(--bg-offwhite);
  transition: 0.5s all;
}

.end-card__text:hover {
  transform: scale(1.1);
}
</style>

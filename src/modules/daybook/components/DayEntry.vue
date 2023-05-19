<template>
  <div>
    <div
      class="entry-container mb-3 pointer p-2"
      @click="$router.push({ name: 'entry', params: { id: 10 } })"
    >
      <!-- Titulo -->
      <div class="entry-title d-flex">
        <span class="text-success fs-5 fw-bold">15</span>
        <span class="mx-1 fs-5">Julio</span>
        <span class="mx-2 fw-light">2021, jueves</span>
      </div>

      <!-- Contenido -->
      <div class="entry-description">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse fuga
        minima necessitatibus, praesentium iure maxime perferendis, laudantium
        quaerat accusantium libero magni molestias quia atque repellat iste,
        deserunt maiores corrupti! Aliquam.
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.entry-container {
  border-bottom: 1px solid #2c3e50;
  transition: all 0.3s ease;

  &:hover {
    background-color: #dbdbdb;
    transition: all 0.3s ease;
  }

  .entry-description {
    font-size: 0.9rem;
    color: #646e6e;
  }
}
</style>

<template>
  <div>
    <div class="entry-list-container">
      <div class="px-2 py-2">
        <input type="text" class="form-control" placeholder="Buscar entrada" />
      </div>
      <hr />
      <div class="entry-scrollarea">
        <Entry v-for="item in 100" :key="item" />
      </div>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
export default {
  components: {
    Entry: defineAsyncComponent(() =>
      import("@/modules/daybook/components/DayEntry.vue")
    ),
  },
};
</script>

<style lang="scss" scoped>
hr {
  margin: 0;
}
.entry-list-container {
  background-color: #f3f3f3;
  height: calc(100vh - 56px);
  border-right: 1px solid #2c3e50;
}
.entry-scrollarea {
  height: calc(100vh - 111px);
  overflow: scroll;
}
</style>

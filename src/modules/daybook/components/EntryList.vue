<template>
  <div>
    <div class="entry-list-container">
      <div class="px-2 py-2">
        <input
          type="text"
          class="form-control"
          placeholder="Buscar entrada"
          v-model="term"
        />
      </div>

      <div class="mt-2 d-flex flex-column">
        <button
          class="btn btn-primary mx-2 mb-2"
          @click="$router.push({ name: 'entry', params: { id: 'new' } })"
        >
          <i class="fa fa-plus-circle"></i>
          Nueva entrada
        </button>
      </div>

      <hr />

      <div class="entry-scrollarea">
        <Entry v-for="entry in entriesByTerm" :key="entry.id" :entry="entry" />
      </div>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
import { mapGetters } from "vuex";

export default {
  components: {
    Entry: defineAsyncComponent(() =>
      import("@/modules/daybook/components/DayEntry.vue")
    ),
  },
  computed: {
    ...mapGetters("journal", ["getEntriesByTerm"]),
    entriesByTerm() {
      return this.getEntriesByTerm(this.term);
    },
  },
  data() {
    return {
      term: "",
    };
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
  // height: 100%;
  border-right: 1px solid #2c3e50;
}
.entry-scrollarea {
  height: calc(100vh - 165px);
  overflow: scroll;
}
</style>

<template>
  <div>
    <DaybookNavbar class="sticky-top" />

    <div v-if="isLoading" class="row justify-content-md-center">
      <div class="col-3 alert alert-info text-center mt-5">
        Espere por favor
        <h3 class="mt-2">
          <i class="fa fa-spin fa-sync"></i>
        </h3>
      </div>
    </div>

    <div v-else class="d-flex">
      <div class="col col-sm-3">
        <EntryList />
      </div>
      <div class="col">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
import { mapActions, mapState } from "vuex";

export default {
  components: {
    DaybookNavbar: defineAsyncComponent(() =>
      import("@/modules/daybook/components/DaybookNavbar.vue")
    ),
    EntryList: defineAsyncComponent(() =>
      import("@/modules/daybook/components/EntryList.vue")
    ),
  },
  methods: {
    ...mapActions("journal", ["loadEntries"]),
  },
  created() {
    this.loadEntries();
  },
  computed: {
    ...mapState("journal", ["isLoading"]),
  },
};
</script>

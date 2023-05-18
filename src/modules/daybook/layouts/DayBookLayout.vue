<template>
  <div>
    <DaybookNavbar />
    <div class="d-flex">
      <div class="col-4">
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

export default {
  components: {
    DaybookNavbar: defineAsyncComponent(() =>
      import("@/modules/components/DaybookNavbar.vue")
    ),
    EntryList: defineAsyncComponent(() =>
      import("@/modules/daybook/components/EntryList.vue")
    ),
  },
};
</script>

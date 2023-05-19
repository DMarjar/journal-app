<template>
  <div>
    <DaybookNavbar class="sticky-top" />
    <div class="d-flex">
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

export default {
  components: {
    DaybookNavbar: defineAsyncComponent(() =>
      import("@/modules/daybook/components/DaybookNavbar.vue")
    ),
    EntryList: defineAsyncComponent(() =>
      import("@/modules/daybook/components/EntryList.vue")
    ),
  },
};
</script>

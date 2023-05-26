<template>
  <div v-if="entry" class="h-100">
    <div class="entry-title d-flex justify-content-between p-2">
      <div>
        <span class="text-success fs-3 fw-bold">{{ day }}</span>
        <span class="mx-1 fs-3">{{ month }}</span>
        <span class="mx-2 fs-4 fw-light">{{ yearDay }}</span>
      </div>

      <div>
        <button class="btn btn-primary">
          <i class="fa fa-camera"></i>
        </button>
        <button class="btn btn-danger mx-2">
          <i class="fa fa-trash"></i>
        </button>
      </div>
    </div>

    <hr />

    <div class=" textarea-container d-flex flex-column bg-light shadow-sm mx-3 h-50 mt-3 rounded">
      <textarea
        v-model="entry.text"
        placeholder="¿Qué sucedió hoy?"
        class="flex-grow-1 px-2 pt-1"
      ></textarea>
    </div>

    <Fab icon="fa-save" @on:click="saveEntry" />

    <img
      src="https://via.placeholder.com/200x150"
      alt="entry-picture"
      class="img-thumbnail"
    />
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";

import { mapGetters, mapActions } from "vuex";

import getDayMonthYear from "@/modules/daybook/helpers/getDayMonthYear";

export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },

  components: {
    Fab: defineAsyncComponent(() =>
      import("@/modules/daybook/components/CreateFab.vue")
    ),
  },

  data() {
    return {
      entry: null,
    };
  },

  methods: {
    ...mapActions("journal", ["updateEntry"]),
    loadEntry() {
      let entry;

      if (this.id === "new") {
        this.entry = {
          date: new Date().getTime(),
          text: "",
        };
      } else {
        entry = this.getEntryById(this.id);

        if (!entry) return this.$router.push({ name: "no-entry" });
        this.entry = entry;
      }
    },
    async saveEntry() {
      if (this.entry.id) {
        await this.updateEntry(this.entry);
      } else {
        console.log("create entry");
      }

    },
  },

  computed: {
    ...mapGetters("journal", ["getEntryById"]),
    day() {
      const { day } = getDayMonthYear(this.entry.date);
      return day;
    },
    month() {
      const { month } = getDayMonthYear(this.entry.date);
      return month;
    },
    yearDay() {
      const { yearDay } = getDayMonthYear(this.entry.date);
      return yearDay;
    },
  },

  created() {
    this.loadEntry();
  },

  watch: {
    id() {
      this.loadEntry();
    },
  },
};
</script>

<style lang="scss" scoped>

hr {
  margin: 0;
}

textarea {
  font-size: 20px;
  border: none;
  height: 100%;
  resize: none;
  background: transparent;

  &:focus {
    outline: none;
  }
}

img {
  width: 200px;
  position: fixed;
  bottom: 100px;
  right: 20px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.3);
}

.textarea-container {
  border: 1px solid #ccc;
}
</style>

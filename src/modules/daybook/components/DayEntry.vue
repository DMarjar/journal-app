<template>
  <div>
    <div
      class="entry-container mb-3 pointer p-2"
      @click="$router.push({ name: 'entry', params: { id: entry.id } })"
    >
      <!-- Titulo -->
      <div class="entry-title d-flex">
        <span class="text-success fs-5 fw-bold">{{ day }}</span>
        <span class="mx-1 fs-5">{{ month }}</span>
        <span class="mx-2 fw-light">{{ yearDay }}</span>
      </div>

      <!-- Contenido -->
      <div class="entry-description">
        {{ shortText }}
      </div>
    </div>
  </div>
</template>

<script>
const months = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];
const days = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
];

export default {
  props: {
    entry: {
      type: Object,
      required: true,
    },
  },
  computed: {
    shortText() {
      return this.entry.text.length > 130
        ? `${this.entry.text.substring(0, 100)}...`
        : this.entry.text;
    },
    day() {
      const date = new Date(this.entry.date);
      return date.getDate();
    },
    month() {
      const date = new Date(this.entry.date);
      return months[date.getMonth()];
    },
    yearDay() {
      const date = new Date(this.entry.date);
      return `${date.getFullYear()}, ${days[date.getDay()]}`;
    },
  },
};
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
    -webkit-hyphens: auto;
    hyphens: auto;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }
}
</style>

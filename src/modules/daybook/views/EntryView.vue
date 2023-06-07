<template>
  <div v-if="entry" class="h-100">
    <!-- Sección de título de la entrada -->
    <div class="entry-title d-flex justify-content-between p-2">
      <!-- Fecha de la entrada -->
      <div>
        <span class="text-success fs-3 fw-bold">{{ day }}</span>
        <span class="mx-1 fs-3">{{ month }}</span>
        <span class="mx-2 fs-4 fw-light">{{ yearDay }}</span>
      </div>

      <!-- Botones para seleccionar imagen y eliminar entrada -->
      <div>
        <input
          type="file"
          @change="onSelectedImage"
          ref="imageSelector"
          v-show="false"
          accept="image/png, image/jpeg, image/jpg"
        />

        <button class="btn btn-primary" @click="onSelectImage">
          <i class="fa fa-camera"></i>
        </button>
        <button
          v-if="entry.id"
          class="btn btn-danger mx-2"
          @click="onDeleteEntry"
        >
          <i class="fa fa-trash"></i>
        </button>
      </div>
    </div>

    <hr />

    <!-- Área de texto para ingresar el contenido de la entrada -->
    <div
      class="textarea-container d-flex flex-column bg-light shadow-sm mx-3 h-50 mt-3 rounded"
    >
      <textarea
        v-model="entry.text"
        placeholder="¿Qué sucedió hoy?"
        class="flex-grow-1 px-2 pt-1"
      ></textarea>
    </div>

    <!-- Botón para guardar la entrada -->
    <Fab icon="fa-save" @on:click="saveEntry" />

    <!-- Imagen de la entrada si está definida -->
    <img
      v-if="entry.picture && !localImage"
      :src="entry.picture"
      alt="entry-picture"
      class="img-thumbnail"
    />

    <!-- Imagen seleccionada localmente -->
    <img
      v-if="localImage"
      :src="localImage"
      alt="entry-picture"
      class="img-thumbnail"
    />
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
import { mapGetters, mapActions } from "vuex";
import Swal from "sweetalert2";

import getDayMonthYear from "@/modules/daybook/helpers/getDayMonthYear";
import uploadImage from "@/modules/daybook/helpers/uploadImage";

export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },

  // Importación y configuración de componentes
  components: {
    Fab: defineAsyncComponent(() =>
      import("@/modules/daybook/components/CreateFab.vue")
    ),
  },

  // Datos del componente
  data() {
    return {
      entry: null, // Objeto para almacenar la entrada
      localImage: null, // Imagen seleccionada localmente
      file: null, // Archivo de imagen seleccionado
    };
  },

  // Métodos del componente
  methods: {
    ...mapActions("journal", ["updateEntry", "createEntry", "deleteEntry"]),

    // Cargar la entrada según el ID proporcionado
    loadEntry() {
      let entry;

      if (this.id === "new") {
        // Crear una nueva entrada si el ID es "new"
        this.entry = {
          date: new Date().getTime(),
          text: "",
        };
      } else {
        // Obtener la entrada existente según el ID
        entry = this.getEntryById(this.id);

        // Redireccionar si no se encuentra la entrada
        if (!entry) return this.$router.push({ name: "no-entry" });
        this.entry = entry;
      }
    },

    // Guardar la entrada
    async saveEntry() {
      // Mostrar una ventana de carga mientras se guarda la entrada
      new Swal({
        title: "Espere por favor",
        text: "Guardando entrada",
        allowOutsideClick: false,
        showConfirmButton: false,
        allowEscapeKey: false,
        willOpen: () => {
          Swal.showLoading();
        },
      });

      // Subir la imagen seleccionada y asignarla a la entrada
      const picture = await uploadImage(this.file);
      this.entry.picture = picture;

      // Actualizar la entrada existente
      if (this.entry.id) {
        await this.updateEntry(this.entry);
      }
      // Crear una nueva entrada
      else {
        const id = await this.createEntry(this.entry);

        // Redireccionar a la vista de la nueva entrada
        this.$router.push({
          name: "entry",
          params: { id },
        });
      }

      this.file = null;

      // Mostrar un mensaje de éxito al guardar la entrada
      Swal.fire({
        title: "Listo!",
        text: "Entrada guardada correctamente",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    },

    // Eliminar la entrada actual
    async onDeleteEntry() {
      // Mostrar un cuadro de diálogo de confirmación
      const { isConfirmed } = await Swal.fire({
        title: "¿Está seguro?",
        text: "Una vez eliminada, no se podrá recuperar la entrada",
        icon: "warning",
        showDenyButton: true,
        confirmButtonText: "Si, eliminar",
        denyButtonText: "Cancelar",
      });

      if (isConfirmed) {
        // Mostrar una ventana de carga mientras se elimina la entrada
        new Swal({
          title: "Espere por favor",
          text: "Eliminando entrada",
          allowOutsideClick: false,
          showConfirmButton: false,
          allowEscapeKey: false,
          willOpen: () => {
            Swal.showLoading();
          },
        });

        // Eliminar la entrada y redireccionar a la página principal
        await this.deleteEntry(this.entry.id);
        this.$router.push({ name: "no-entry" });

        // Mostrar un mensaje de éxito al eliminar la entrada
        Swal.fire({
          title: "Listo!",
          text: "Entrada eliminada correctamente",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    },

    // Manejar la selección de imagen
    onSelectedImage(event) {
      const file = event.target.files[0];

      if (!file) {
        // Limpiar la imagen si no se selecciona ningún archivo
        this.localImage = null;
        return;
      }

      this.file = file;

      const reader = new FileReader();
      reader.onload = () => (this.localImage = reader.result);
      reader.readAsDataURL(file);
    },

    // Abrir el selector de imágenes al hacer clic en un botón
    onSelectImage() {
      this.$refs.imageSelector.click();
    },
  },

  // Propiedades computadas del componente
  computed: {
    ...mapGetters("journal", ["getEntryById"]),

    // Obtener el día de la entrada
    day() {
      const { day } = getDayMonthYear(this.entry.date);
      return day;
    },

    // Obtener el mes de la entrada
    month() {
      const { month } = getDayMonthYear(this.entry.date);
      return month;
    },

    // Obtener el número de día del año de la entrada
    yearDay() {
      const { yearDay } = getDayMonthYear(this.entry.date);
      return yearDay;
    },
  },

  // Función que se ejecuta cuando se crea el componente
  created() {
    this.loadEntry();
  },

  // Observadores de cambios en las propiedades del componente
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

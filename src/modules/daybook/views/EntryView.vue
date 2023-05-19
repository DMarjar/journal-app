<template>
  <div>
    <div class="entry-title d-flex justify-content-between p-2">
      
      <div>
        <span class="text-success fs-3 fw-bold">15</span>
        <span class="mx-1 fs-3">Julio</span>
        <span class="mx-2 fs-4 fw-light">2021, jueves</span>
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

    <hr>

    <div class="d-flex flex-column px-3 h-75">
      <textarea placeholder="¿Qué sucedió hoy?">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad voluptates dolores quos laborum repellendus similique temporibus voluptate eaque dolorem! Eaque veritatis consequatur iusto perspiciatis minus sit, adipisci veniam deserunt esse.
      </textarea>
    </div>

    <Fab icon="fa-save" />

    <img src="https://via.placeholder.com/200x150" alt="entry-picture" class="img-thumbnail">

  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";

export default {
  components: {
    Fab: defineAsyncComponent(() =>
      import("@/modules/daybook/components/CreateFab.vue")
    ),
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
  height: 100;

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
</style>

<!-- <div class="d-flex flex-column h-100">
  <div class="entry-title d-flex justify-content-between p-2">
    <div>
      <span class="text-success fs-3 fw-bold">15</span>
      <span class="mx-1 fs-3">Julio</span>
      <span class="mx-2 fs-4 fw-light">2021, jueves</span>
    </div>

    <div>
      <button class="btn btn-primary">
        Subir foto
        <i class="fa fa-upload"></i>
      </button>
      <button class="btn btn-danger mx-2">
        Borrar
        <i class="fa fa-trash"></i>
      </button>
    </div>
  </div>

  <hr />

  <div>
    <div class="d-flex flex-column px-3 flex-grow-1 mt-2">
      <textarea class="h-75" placeholder="¿Qué sucedió hoy?"></textarea>
    </div>

    <Fab icon="fa-save" />

    <img
      src="https://via.placeholder.com/200x150"
      alt="entry-picture"
      class="img-thumbnail"
    />
  </div>
</div> -->
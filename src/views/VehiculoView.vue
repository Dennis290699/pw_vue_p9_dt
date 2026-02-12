<template>
  <div class="view-container">
    <h1>Administración de Vehículos</h1>
    <VehiculoGuardar @vehiculo-guardado="actualizarLista" />
    <VehiculoListar ref="listaVehiculos" />
  </div>
</template>

<script>
import VehiculoGuardar from "../components/VehiculoGuardar.vue";
import VehiculoListar from "../components/VehiculoListar.vue";

export default {
  components: {
    VehiculoGuardar,
    VehiculoListar,
  },
  methods: {
    actualizarLista() {
      // Llamar al método cargarVehiculos del componente hijo usando ref
      this.$refs.listaVehiculos.cargarVehiculos();
    },
  },
};
</script>

<style scoped>
.view-container {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
}
h1 {
  text-align: center;
  color: #333;
}
</style>

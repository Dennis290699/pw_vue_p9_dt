<template>
  <div class="component-container">
    <h1 class="title">VEHICULO</h1>

    <div class="form-group">
      <label class="label">Token</label>
      <input type="text" class="input-field" :value="tokenActual" readonly />
    </div>

    <div class="form-group">
      <label class="label">Marca</label>
      <input v-model="vehiculo.marca" type="text" class="input-field" />
    </div>

    <div class="form-group">
      <label class="label">Modelo</label>
      <input v-model="vehiculo.modelo" type="text" class="input-field" />
    </div>

    <div class="form-group">
      <label class="label">Chasis</label>
      <input v-model="vehiculo.chasis" type="text" class="input-field" />
    </div>
    
    <div class="form-group">
        <label class="label">Fecha de fabricación</label>
        <input v-model="vehiculo.fechaFabricacion" type="date" class="input-field" />
    </div>

    <div class="form-group">
        <label class="label">Fecha de matrícula</label>
        <input v-model="vehiculo.fechaMatricula" type="date" class="input-field" />
    </div>

    <div class="button-container">
      <button @click="guardar" class="btn-guardar">Guardar</button>
    </div>
    
    <div v-if="mensaje" class="mensaje">{{ mensaje }}</div>
  </div>
</template>

<script>
import { guardarVehiculoFachada } from "../components/VehiculoClient";
import { AuthorizationToken } from "../components/AuthorizationToken";

export default {
  data() {
    return {
      vehiculo: {
        marca: "",
        modelo: "",
        chasis: "",
        fechaFabricacion: "",
        fechaMatricula: ""
      },
      tokenActual: "",
      mensaje: "",
    };
  },
  mounted() {
      // Mostrar el token actual en el campo de solo lectura para cumplir con la vista
      this.tokenActual = AuthorizationToken.getToken() || "No hay token";
  },
  methods: {
    async guardar() {
      if (!this.vehiculo.chasis) {
        this.mensaje = "Error: El campo Chasis es obligatorio.";
        return;
      }
      this.mensaje = "Guardando...";
      try {
        await guardarVehiculoFachada(this.vehiculo);
        this.mensaje = "Vehículo guardado exitosamente.";
        this.limpiar();
        this.$emit('vehiculo-guardado');
      } catch (error) {
        this.mensaje = "Error al guardar: " + error.message;
      }
    },
    limpiar() {
      this.vehiculo = { marca: "", modelo: "", chasis: "", fechaFabricacion: "", fechaMatricula: "" };
    }
  },
};
</script>

<style scoped>
.component-container {
  max-width: 400px;
  margin: 0 auto 30px auto;
  padding: 20px;
  background-color: white;
}

.title {
  color: #0f1c3f; /* Azul muy oscuro casi negro según imagen */
  text-transform: uppercase;
  text-align: center;
  font-weight: bold;
  margin-bottom: 20px;
  font-size: 1.8rem;
}

.form-group {
    margin-bottom: 15px;
}

.label {
  display: block;
  margin-bottom: 5px;
  color: #0f1c3f;
  font-weight: bold;
  text-align: left;
}

.input-field {
  width: 100%;
  padding: 10px;
  border: 2px solid #0f1c3f;
  border-radius: 10px;
  font-size: 1rem;
  box-sizing: border-box;
}

.input-field:focus {
  outline: none;
  border-color: #00a0dc;
}

.button-container {
  margin-top: 25px;
  text-align: center;
}

.btn-guardar {
    background-color: #00a0dc; /* Azul claro */
    color: white;
    padding: 10px 40px;
    border: none;
    border-radius: 10px;
    font-size: 1.2rem;
    cursor: pointer;
    font-weight: bold;
    width: 100%;
}

.btn-guardar:hover {
    background-color: #0089bd;
}

.mensaje {
    margin-top: 15px;
    color: #2c3e50;
    text-align: center;
}
</style>

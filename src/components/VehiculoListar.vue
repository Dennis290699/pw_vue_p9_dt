<template>
  <div class="component-container">
    <table v-if="vehiculos.length > 0" class="vehiculo-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Marca</th>
          <th>Chasis</th>
          <th>Fecha de fabricación</th>
          <th>Acción</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="v in vehiculos" :key="v.chasis">
          <td class="id-col">{{ v.id }}</td>
          <td>{{ v.marca }}</td>
          <td>{{ v.chasis }}</td>
          <td>{{ v.fechaFabricacion }}</td>
          <td>
            <button class="btn-delete" @click="eliminar(v.chasis)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else class="empty-msg">No hay vehículos registrados.</p>
    
    <div class="refresh-container">
        <button @click="cargarVehiculos" class="btn-refresh">Refrescar Lista</button>
    </div>
    
    <div v-if="mensaje" class="mensaje">{{ mensaje }}</div>
  </div>
</template>

<script>
import { listarVehiculosFachada, eliminarVehiculoFachada } from "../components/VehiculoClient";

export default {
  data() {
    return {
      vehiculos: [],
      mensaje: ""
    };
  },
  mounted() {
      this.cargarVehiculos();
  },
  methods: {
    async cargarVehiculos() {
      this.mensaje = "Cargando...";
      try {
        const data = await listarVehiculosFachada();
        this.vehiculos = data;
        this.mensaje = "";
      } catch (error) {
        this.mensaje = "Error al cargar: " + error.message;
      }
    },
    async eliminar(chasis) {
        // Se elimina la confirmación nativa para cumplir con la restricción de "no modales".
        // if(!confirm("¿Está seguro de eliminar el vehículo " + chasis + "?")) return;
        
        try {
            console.log("Eliminando vehículo:", chasis);
            await eliminarVehiculoFachada(chasis);
            this.mensaje = "Vehículo eliminado: " + chasis;
            this.cargarVehiculos();
        } catch (error) {
            this.mensaje = "Error al eliminar: " + error.message;
        }
    }
  },
};
</script>

<style scoped>
.component-container {
  padding: 15px;
  max-width: 800px;
  margin: 0 auto;
}

.vehiculo-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
    font-family: sans-serif;
}

th, td {
    border: 1px solid #000;
    padding: 10px;
    text-align: center;
}

th {
    background-color: white;
    color: #0056b3; /* Azul para headers según imagen */
    font-weight: bold;
    font-size: 1.1rem;
}

.id-col {
    color: #0056b3;
    font-weight: bold;
}

.btn-delete {
    background-color: #dc3545; /* Rojo */
    color: white;
    border: none;
    padding: 8px 15px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9rem;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

.btn-delete:hover {
    background-color: #c82333;
}

.btn-refresh {
    margin-top: 15px;
    background-color: #6c757d;
    color: white;
    border: none;
    padding: 8px 15px;
    border-radius: 4px;
    cursor: pointer;
}

.refresh-container {
    text-align: center;
}

.mensaje {
    margin-top: 10px;
    font-size: 0.9em;
    text-align: center;
}

.empty-msg {
    text-align: center;
    color: #666;
}
</style>

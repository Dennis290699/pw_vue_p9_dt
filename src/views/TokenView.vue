<template>
  <div class="container">
    <h1 class="title">TOKEN</h1>
    <div class="form-group">
      <label class="label">Usuario</label>
      <input v-model="usuario" type="text" class="input-field" />
    </div>
    <div class="form-group">
      <label class="label">Password</label>
      <input v-model="password" type="password" class="input-field" />
    </div>
    <div class="form-group">
      <label class="label">Rol</label>
      <input v-model="rol" type="text" class="input-field" />
    </div>

    <div class="form-group">
      <label class="label">Token</label>
      <textarea readonly :value="token" class="input-field token-area"></textarea>
    </div>

    <div class="button-container">
      <button @click="obtenerToken" class="btn-generar">Generar</button>
    </div>

    <div v-if="mensaje" class="mensaje">
      {{ mensaje }}
    </div>
  </div>
</template>

<script>
import { AuthorizationToken } from "../components/AuthorizationToken";

export default {
  data() {
    return {
      usuario: "",
      password: "",
      rol: "",
      token: "",
      mensaje: "",
    };
  },
  methods: {
    async obtenerToken() {
      this.mensaje = "Generando token...";
      this.token = "";
      try {
        const data = await AuthorizationToken.generarToken(
          this.usuario,
          this.password,
          this.rol
        );
        if (data && data.accessToken) {
          this.token = data.accessToken;
          this.mensaje = "Token generado exitosamente.";
        } else {
          this.mensaje = "Credenciales incorrectas o error en el servidor.";
        }
      } catch (error) {
        this.mensaje = "Error: " + error.message;
      }
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 400px;
  margin: 40px auto;
  padding: 30px;
  background-color: white;
  /* border: 1px solid #ddd; opcional si se quiere borde contenedor */
}

.title {
  color: #0056b3; /* Azul oscuro */
  text-transform: uppercase;
  text-align: center;
  font-weight: bold;
  margin-bottom: 30px;
  font-size: 2rem;
}

.form-group {
  margin-bottom: 20px;
}

.label {
  display: block;
  margin-bottom: 8px;
  color: #0056b3;
  font-weight: bold;
  text-align: left;
}

.input-field {
  width: 100%;
  padding: 10px;
  border: 2px solid #2c3e50; /* Azul oscuro/negro borde */
  border-radius: 10px;
  font-size: 1rem;
  box-sizing: border-box;
}

.input-field:focus {
  outline: none;
  border-color: #0056b3;
}

.token-area {
  height: 100px;
  resize: none;
}

.button-container {
  margin-top: 30px;
  text-align: center;
}

.btn-generar {
  background-color: #00a0dc; /* Azul claro estilo botón */
  color: white;
  padding: 10px 40px;
  border: none;
  border-radius: 10px;
  font-size: 1.2rem;
  cursor: pointer;
  width: 100%;
  font-weight: bold;
}

.btn-generar:hover {
  background-color: #0089bd;
}

.mensaje {
  margin-top: 20px;
  text-align: center;
  color: #666;
}
</style>

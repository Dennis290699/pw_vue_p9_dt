<template>
  <div class="login-container">
    <div class="login-wrapper">
      <div class="card login-card">
        <div class="login-header">
          <h2 class="page-title text-center">Iniciar Sesión</h2>
          <p class="subtitle">Bienvenido al sistema de matrículas</p>
        </div>

        <div class="login-form">
          <div class="form-group">
            <label for="username">Usuario</label>
            <input 
              type="text" 
              id="username" 
              v-model="username"
              placeholder="Ingrese su usuario"
              class="form-control"
            >
          </div>

          <div class="form-group">
            <label for="password">Contraseña</label>
            <input 
              type="password" 
              id="password" 
              v-model="password"
              placeholder="Ingrese su contraseña"
              class="form-control"
              @keyup.enter="iniciarSesion"
            >
          </div>

          <button class="btn btn-primary btn-block" @click="iniciarSesion">
            Ingresar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { AuthorizationToken } from '@/client/AuthorizationToken'

export default {
  name: 'LoginView',
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    async iniciarSesion() {
      if (!this.username || !this.password) {
        this.$emit('notify', {
          message: "Por favor ingrese usuario y contraseña",
          type: "error"
        });
        return;
      }

      console.log("Iniciando sesión con:", this.username);
      
      try {
        const token = await AuthorizationToken.generarToken(this.username, this.password);
        
        if (token) {
          localStorage.setItem('token', token);
          this.$emit('notify', {
            message: "Inicio de sesión exitoso",
            type: "success"
          });
          
          const redirectPath = this.$route.query.redirect || '/listar';
          this.$router.push(redirectPath);
        } else {
          this.$emit('notify', {
            message: "Credenciales incorrectas o error en el servidor",
            type: "error"
          });
        }
      } catch (error) {
        console.error(error);
        this.$emit('notify', {
          message: "Ocurrió un error inesperado",
          type: "error"
        });
      }
    }
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 2rem;
}

.login-wrapper {
  width: 100%;
  max-width: 450px;
}

.login-card {
  border-top: 5px solid var(--primary);
  padding: 3rem 2.5rem;
  animation: slideUp 0.5s ease;
}

.login-header {
  text-align: center;
  margin-bottom: 2rem;
}

.page-title {
  border-bottom: none;
  margin-bottom: 0.5rem;
  padding-bottom: 0;
  display: block;
}

.subtitle {
  color: #666;
  font-size: 0.95rem;
}

.btn-block {
  width: 100%;
  margin-top: 1rem;
  padding: 1rem;
  font-size: 1.1rem;
  letter-spacing: 0.5px;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
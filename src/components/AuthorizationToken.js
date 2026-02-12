import axios from "axios";

// Helper para manejar errores de axios (Reutilizable)
const handleAxiosError = (error) => {
    if (error.response) {
        // El servidor respondió con un estado fuera del rango 2xx
        console.error("Error Response:", error.response.data);
        console.error("Status:", error.response.status);

        if (error.response.status === 401) {
            throw new Error("No autorizado (401). El token puede haber expirado.");
        }
        if (error.response.status === 404) {
            throw new Error("Recurso no encontrado (404)");
        }
        if (error.response.status === 400) {
            throw new Error("Solicitud incorrecta. Verifique los datos (400)");
        }
        if (error.response.status === 409) {
            throw new Error("Conflicto: El registro ya existe o hay datos duplicados (409)");
        }
        if (error.response.status === 500) {
            throw new Error("Error interno del servidor (500)");
        }

        throw new Error(`Error del servidor: ${error.response.status}`);
    } else if (error.request) {
        // La solicitud fue hecha pero no se recibió respuesta
        console.error("Error Request:", error.request);
        throw new Error("No se pudo conectar con el servidor. Verifique su conexión.");
    } else {
        // Algo pasó al configurar la solicitud
        console.error("Error Message:", error.message);
        throw new Error(`Error inesperado: ${error.message}`);
    }
}


export const AuthorizationToken = {
    async generarToken(user, password, rol) {
        try {
            // Se asume que el backend Auth corre en el puerto 8082 según application.properties
            // Endpoint: /auth/token?user=...&password=...&rol=...
            const url = `http://localhost:8082/auth/token?user=${user}&password=${password}&rol=${rol}`;
            console.log("Solicitando token a:", url);
            const response = await axios.get(url, { timeout: 5000 });

            if (response.data && response.data.accessToken) {
                // Guardar en localStorage
                localStorage.setItem('token', response.data.accessToken);
                localStorage.setItem('rol', rol); // Guardar el rol solicitado
                return response.data;
            } else {
                return null;
            }

        } catch (error) {
            console.error("Error generando token:", error);
            handleAxiosError(error);
        }
    },

    getToken() {
        return localStorage.getItem('token');
    },

    // Método para limpiar sesión
    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('rol');
    }
};



// Cuando cargo datos vacios esta bien y perfecto el problema se presenta cuando quiero eliminar dichos ya que arroja un error 

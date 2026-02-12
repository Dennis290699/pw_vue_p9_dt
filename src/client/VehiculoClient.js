import axios from "axios";
import { AuthorizationToken } from "../components/AuthorizationToken";

// Configuración base
const apiClient = axios.create({
    baseURL: "http://localhost:8081/concesionario/api/v1.0",
    timeout: 5000, // 5 segundos de timeout
    headers: {
        "Content-Type": "application/json"
    }
});

// Interceptor para adjuntar token
apiClient.interceptors.request.use(
    async config => {
        const token = AuthorizationToken.getToken();
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// Interceptor para manejar errores y refresco de token (simplificado según requerimiento)
apiClient.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            console.log("Detectado 401. Intentando refrescar token...");

            // Lógica de refresco: En este caso, como no hay refresh token explícito en el endpoint,
            // podríamos intentar loguear de nuevo con credenciales guardadas o redirigir a login.
            // Para el examen, simplemente logueamos que falló.
            // Si tuviéramos un endpoint de refresh, lo llamaríamos aquí.

            // IMPORTANTE: El backend Auth solo da un token nuevo con user/pass. 
            // No hay endpoint de "refresh". 
            // Así que solo lanzamos el error para que el usuario se reloguee.
            console.error("Token expirado. Por favor inicie sesión nuevamente.");
        }
        return Promise.reject(error);
    }
);

const handleAxiosError = (error) => {
    if (error.response) {
        console.error("Error Response:", error.response.data);
        console.error("Status:", error.response.status);
        if (error.response.status === 404) throw new Error("Recurso no encontrado (404)");
        if (error.response.status === 400) throw new Error("Datos incorrectos (400)");
        if (error.response.status === 409) throw new Error("Conflicto de datos (409)");
        if (error.response.status === 500) throw new Error("Error del servidor (500)");
        throw new Error(`Error: ${error.response.status}`);
    } else if (error.request) {
        console.error("Error Request:", error.request);
        throw new Error("Sin conexión al servidor.");
    } else {
        console.error("Error Message:", error.message);
        throw new Error(`Error inesperado: ${error.message}`);
    }
}

// Métodos CRUD
const listar = async () => {
    try {
        const response = await apiClient.get("/vehiculos");
        return response.data; // Retorna lista de VehiculoRepresentation
    } catch (error) {
        handleAxiosError(error);
    }
}

const buscarPorChasis = async (chasis) => {
    try {
        const response = await apiClient.get(`/vehiculos/${chasis}`);
        return response.data;
    } catch (error) {
        handleAxiosError(error);
    }
}

const guardar = async (vehiculo) => {
    try {
        const response = await apiClient.post("/vehiculos", vehiculo);
        return response.data;
    } catch (error) {
        handleAxiosError(error);
    }
}

const eliminar = async (chasis) => {
    try {
        await apiClient.delete(`/vehiculos/${chasis}`);
        return true;
    } catch (error) {
        handleAxiosError(error);
    }
}

// Fachadas
export const listarVehiculosFachada = async () => {
    return await listar();
}

export const buscarVehiculoFachada = async (chasis) => {
    return await buscarPorChasis(chasis);
}

export const guardarVehiculoFachada = async (vehiculo) => {
    return await guardar(vehiculo);
}

export const eliminarVehiculoFachada = async (chasis) => {
    return await eliminar(chasis);
}

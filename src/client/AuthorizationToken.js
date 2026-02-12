import axios from "axios";

let currentToken = null;

const generarToken = async (username = "admin", password = "admin") => {
    const body = {
        username: username,
        password: password
    };
    try {
        const response = await axios.get(`/auth/token?user=${username}&password=${password}`);
        const data = response.data;
        if (data) {
            if (typeof data === 'string') {
                currentToken = data;
            } else {
                // Prioritize known token keys
                currentToken = data.accessToken || data.token;
            }

            if (currentToken) {
                console.log("Token generado exitosamente");
                return currentToken;
            }
        }
    } catch (error) {
        console.error("Error al generar token. Usando token por defecto.", error);
        // Mantiene el defaultToken
    }
    return currentToken;
}

const getToken = () => {
    return currentToken;
}

export const AuthorizationToken = {
    generarToken,
    getToken
};

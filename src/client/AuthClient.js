import { AuthorizationToken } from "../components/AuthorizationToken";

export const solicitarTokenFachada = async (user, password, rol) => {
    return await AuthorizationToken.generarToken(user, password, rol);
}

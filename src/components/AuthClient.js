// Este archivo podría no ser estrictamente necesario si usamos AuthorizationToken directamente,
// pero se mantiene por consistencia con la arquitectura solicitada.
import { AuthorizationToken } from "./AuthorizationToken";

export const solicitarTokenFachada = async (user, password, rol) => {
    return await AuthorizationToken.generarToken(user, password, rol);
}

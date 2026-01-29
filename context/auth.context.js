import jwt from "jsonwebtoken";
import { Client } from "../mutation/auth/redis.js";

// fonction d'autorisation pour extraire l'utilisateur depuis le token
export async function authContext({ req }) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return { utilisateur: null };
  }

  const token = authHeader.replace("Bearer ", "");

  try {
    const decoded = jwt.verify(token, process.env.JWT_CODE);

    // Récupérer l'ID utilisateur depuis le payload JWT
    const utilisateurId = decoded.utilisateurId; // stockez l'ID utilisateur dans le token

    // Vérifier si le token est toujours présent dans Redis
    const tokenInRedis = await Client.get(utilisateurId);

    // Si le token dans Redis n'existe pas ou ne correspond pas au token envoyé
    if (!tokenInRedis || tokenInRedis !== token) {
      return { utilisateur: null }; // Token invalide ou expiré manuellement
    }

    return {
      token,
      utilisateur: decoded,
    };
  } catch (err) {
    return { utilisateur: null }; // Erreur de vérification JWT
  }
}
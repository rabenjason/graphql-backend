import jwt from "jsonwebtoken";

// fonction d'autorisation pour extraire l'utilisateur depuis le token
export async function authContext({ req }) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return { utilisateur: null };
  }

  const token = authHeader.replace("Bearer ", "");

  try {
    const decoded = jwt.verify(token, process.env.JWT_CODE);
    return {
      token,
      utilisateur: decoded,
    };
  } catch (err) {
    return { utilisateur: null };
  }
}

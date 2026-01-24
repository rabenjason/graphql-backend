import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import constantes from "../../constantes.js";

dotenv.config();

const SECRET_KEY = process.env.JWT_CODE;

export function formerToken(utilisateurId) {
  try {
    return jwt.sign({ utilisateurId }, SECRET_KEY, { expiresIn: "1d" });
  } catch (err) {
    throw new Error(constantes.ERREUR_CREATION_TOKEN);
  }
}

export function verifierToken(token) {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (err) {
    throw new Error(constantes.VERIFICATION_TOKEN);
  }
}

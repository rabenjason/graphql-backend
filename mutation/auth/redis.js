import redis from "redis";

// Création du client Redis avec l'URL provenant des variables d'environnement
// Si REDIS_URL n'est pas définie, on utilise localhost:6379 par défaut
export const Client = redis.createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379",
});

// Gestionnaire d'événement pour la connexion réussie à Redis
Client.on("connect", () => {
  console.log("Connecté au serveur Redis");
});

// Gestionnaire d'événement pour les erreurs de connexion à Redis
Client.on("error", (err) => {
  console.error("Erreur Redis:", err);
});

// Connexion au serveur Redis sans utiliser await au niveau racine
Client.connect().catch(console.error);
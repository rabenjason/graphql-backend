import redis from "redis";

export const Client = redis.createClient();

Client.on("connect", () => {
  console.log("🎉 Connecté au serveur Redis 🎉");
});

Client.on("error", (err) => {
  console.error("Erreur Redis:", err);
});

await Client.connect();

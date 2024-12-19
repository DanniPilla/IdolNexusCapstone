import admin from "firebase-admin";
import "dotenv/config";

dotenv.config();

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

console.log("Firebase initialized successfully!");

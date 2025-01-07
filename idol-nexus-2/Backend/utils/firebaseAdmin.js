// import admin from "firebase-admin";

// const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

// export const firebaseAuth = admin.auth();
// export default admin;

import admin from "firebase-admin";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const serviceAccount = await import(
  "./idol-nexus-firebase-adminsdk-kom96-5a6bb5e09d.json",
  {
    assert: { type: "json" },
  }
).then((module) => module.default);

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  console.log("Firebase Admin initialized successfully");
} catch (error) {
  console.error("Firebase Admin initialization error:", error);
  throw error;
}

export const firebaseAuth = admin.auth();
export default admin;

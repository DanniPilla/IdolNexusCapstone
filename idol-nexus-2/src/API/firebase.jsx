
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


const firebaseConfig = {
  apiKey: "AIzaSyCRlcNiHJkBLQ-87YWPjOgR2s4jYwMQzO0",
  authDomain: "idol-nexus.firebaseapp.com",
  projectId: "idol-nexus",
  storageBucket: "idol-nexus.firebasestorage.app",
  messagingSenderId: "302554276237",
  appId: "1:302554276237:web:d31b0d5da2381cb33b1dc4",
  measurementId: "G-YZYJ7TY9VQ"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export default app;
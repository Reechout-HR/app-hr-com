/**
 * Firebase configuration using Next.js public environment variables.
 * Fallbacks are provided based on the original Angular environment setup.
 */
export const getFirebaseConfig = () => ({
  vapidKey:
    process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY ||
    "BMZOKaVTlFb08R8U9GT-yeImU55FLF_82_8H27jgPgCK_eSYs59BGtxm8qeZ_LRkls80Y6MJTLzZPUyP-f_D6U0",
  apiKey:
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY ||
    "",
  authDomain:
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ||
    "hr-app-475516.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "hr-app-475516",
  storageBucket:
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ||
    "hr-app-475516.firebasestorage.app",
  messagingSenderId:
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "965791636605",
  appId:
    process.env.NEXT_PUBLIC_FIREBASE_APP_ID ||
    "1:965791636605:web:c14292abf5c1e2d1ea2514",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-VEJXXSRLJ5",
});

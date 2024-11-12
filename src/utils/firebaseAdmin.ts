// firebaseAdmin.ts
import * as admin from "firebase-admin"

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? "",
      clientEmail: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL ?? "",
      privateKey:
        process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY?.replaceAll("\\n", "\n") ??
        "",
    }),
    databaseURL: process.env.DATABASE_URL,
  })
}

export const verifyIdToken = async (token: string) => {
  try {
    const decodedToken = await admin.auth().verifyIdToken(token)
    return decodedToken
  } catch (error) {
    console.log("トークン検証エラー:", error)
    throw new Error("Unauthorized")
  }
}

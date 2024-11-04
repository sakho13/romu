// firebaseAdmin.ts
import * as admin from "firebase-admin"
import serviceAccount from "@/romu-dev-firebase-adminsdk-gd4za-497606e3e5.json"

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: serviceAccount.project_id,
      clientEmail: serviceAccount.client_email,
      privateKey: serviceAccount.private_key,
    }),
    databaseURL: process.env.DATABASE_URL,
  })
}

export const verifyIdToken = async (token: string) => {
  try {
    const decodedToken = await admin.auth().verifyIdToken(token)
    return decodedToken
  } catch (error) {
    console.error("トークンの検証エラー:", error)
    throw new Error("Unauthorized")
  }
}

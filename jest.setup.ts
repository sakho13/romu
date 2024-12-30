import "@testing-library/jest-dom"
import * as admin from "firebase-admin"
;(admin.initializeApp as unknown) = jest.fn()
;(admin.credential.cert as unknown) = jest.fn()

process.env.ADMIN_VERIFY_TOKEN = "romu123"

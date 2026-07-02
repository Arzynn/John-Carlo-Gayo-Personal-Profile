/* =============================================================
   FIREBASE CONFIG
   -------------------------------------------------------------
   This file connects the site to YOUR Firebase project so the
   contact form, guestbook, and visitor counter can read/write
   real data in Firestore.

   HOW TO SET THIS UP (5 minutes):
   1. Go to https://console.firebase.google.com and create a
      free project (e.g. "jcmg-portfolio").
   2. Inside the project, click the "</>" (Web) icon to register
      a new web app. Give it any nickname.
   3. Firebase will show you a firebaseConfig object — copy it
      and paste it below, replacing the placeholder values.
   4. In the left sidebar, go to Build → Firestore Database →
      "Create database" → start in TEST MODE (fine for a school
      project; see the security-rules note at the bottom of this
      file before submitting for real-world use).
   5. Save this file, reload index.html — the contact form,
      guestbook, and visitor counter will now work live.

   Until you fill this in, the site still works: every Firebase
   feature detects the missing config and fails gracefully with
   an on-page message instead of breaking the page.
   ============================================================= */

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};

// Flag so other scripts can tell whether real credentials were provided.
const FIREBASE_IS_CONFIGURED = firebaseConfig.apiKey !== "YOUR_API_KEY";

let db = null;

if (FIREBASE_IS_CONFIGURED) {
  try {
    firebase.initializeApp(firebaseConfig);
    db = firebase.firestore();
  } catch (err) {
    console.error("Firebase failed to initialize:", err);
    db = null;
  }
} else {
  console.info(
    "[firebase-config.js] Firebase is not configured yet — contact form, guestbook, " +
      "and visitor counter will show a setup notice instead of an error. " +
      "See the comment at the top of firebase-config.js to connect your project."
  );
}

// Expose globally for script.js
window.db = db;
window.FIREBASE_IS_CONFIGURED = FIREBASE_IS_CONFIGURED;

/* -------------------------------------------------------------
   SUGGESTED FIRESTORE SECURITY RULES (set in Firebase Console →
   Firestore Database → Rules) before going live publicly:

   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /messages/{docId} {
         allow create: if request.resource.data.message is string
                        && request.resource.data.message.size() < 2000;
         allow read, update, delete: if false; // only you should read messages
       }
       match /guestbook/{docId} {
         allow create: if request.resource.data.message is string
                        && request.resource.data.message.size() < 200;
         allow read: if true;
         allow update, delete: if false;
       }
       match /stats/{docId} {
         allow read: if true;
         allow write: if true; // increments only; fine for a portfolio counter
       }
     }
   }
   ------------------------------------------------------------- */

// Firebase Configuration for KKG FABTEX

const firebaseConfig = {
    apiKey: "AIzaSyD3_Ycz6LJ7U0J6Bi_acNR5BXXX_rNUpZg",
    authDomain: "kkg-fabtex.firebaseapp.com",
    projectId: "kkg-fabtex",
    storageBucket: "kkg-fabtex.firebasestorage.app",
    messagingSenderId: "991629378524",
    appId: "1:991629378524:web:fc6460754f6b1c2892c519"
};

// Initialize Firebase (using compat SDK loaded via <script> tags)
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

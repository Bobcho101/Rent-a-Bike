import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyD6dw4cW8aMx58_zjBB0zt1QaBAsO5Orxw",
    authDomain: "rent-a-bike-try.firebaseapp.com",
    databaseURL: "https://rent-a-bike-try-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "rent-a-bike-try",
    storageBucket: "rent-a-bike-try.firebasestorage.app",
    messagingSenderId: "1091736204113",
    appId: "1:1091736204113:web:c37128408e774576495970"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export default app;
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyAf8c_0zNYYrvncyy0YcXzN0OKSGEPqp08",
    authDomain: "stackoverflow-c6709.firebaseapp.com",
    projectId: "stackoverflow-c6709",
    storageBucket: "stackoverflow-c6709.appspot.com",
    messagingSenderId: "889799689212",
    appId: "1:889799689212:web:08cb269076ea5c434c6879",
    measurementId: "G-PYZKB8EKPZ"
};

const App = initializeApp(firebaseConfig);
// const db = App.firestore();
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

// export { auth, provider };
// export default db;

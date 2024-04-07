import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyAMaw3NHQ71-H4Um6I2hsWOSaHmSkQkEpU",
    authDomain: "heartland-17df1.firebaseapp.com",
    projectId: "heartland-17df1",
    storageBucket: "heartland-17df1.appspot.com",
    messagingSenderId: "126138607029",
    appId: "1:126138607029:web:e8ecdd762449589f1925fc",
    measurementId: "G-D4G6X7YHL2"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;

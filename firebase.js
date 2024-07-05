// firebase.js
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCe7hcwZD4TNAMewLbPsLe6ramGIjcF2i0",
    authDomain: "flash-questions-fc67c.firebaseapp.com",
    projectId: "flash-questions-fc67c",
    storageBucket: "flash-questions-fc67c.appspot.com",
    messagingSenderId: "854612658446",
    appId: "1:854612658446:web:b864429ba3440912b12f5f",
    measurementId: "G-ET9M74NGLV"
  };

// Initialize Firebase
let firebaseApp;
if (!getApps().length) {
  firebaseApp = initializeApp(firebaseConfig);
} else {
  firebaseApp = getApps()[0]; // if already initialized, use that one
}

const db = getFirestore(firebaseApp);

export const fetchQuestions = async (col) => {
  try {
    const querySnapshot = await getDocs(collection(db, col));
    const questionsList = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return questionsList;
  } catch (error) {
    console.error("Error fetching questions: ", error);
    throw new Error("Unable to fetch questions");
  }
};

export default firebaseApp;

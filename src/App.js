import logo from './assets/logo.svg';
import './assets/App.css';
import { useState } from 'react';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { ref } from 'firebase/storage';
import { auth, db } from "../database/firebase-config";
import { storage } from "../database/firebase-config";
function App() {




  

  return (
    <div className="App">
      <h1>Story of my life
      stolen moments
      Fotomates
      picture me now
      my photo stash
      </h1>

    

      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;

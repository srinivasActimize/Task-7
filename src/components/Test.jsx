import React from "react";
import { db } from "../firebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";

function Test() {
  const handleAddTest = async () => {
    try {
      const docRef = await addDoc(collection(db, "testUsers"), {
        name: "Test User",
        createdAt: new Date().toISOString()
      });
      console.log("Data added successfully with ID:", docRef.id);
    } catch (e) {
      console.error(" Error adding document:", e);
    }
  };

  const handleGetTest = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "testUsers"));
      querySnapshot.forEach((doc) => {
        console.log("📄", doc.id, "=>", doc.data());
      });
    } catch (e) {
      console.error("Error getting documents:", e);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Firestore Test</h2>
      <button onClick={handleAddTest}>Add Test Data</button>
      <button onClick={handleGetTest} style={{ marginLeft: 10 }}>
        Get All Test Data
      </button>
    </div>
  );
}

export default Test;

import { db } from "../firebaseConfig";
import { collection, addDoc, getDocs, getDoc, deleteDoc, updateDoc, doc } from "firebase/firestore";

const employeeCollectionRef= collection(db,"users");

class EmpDataService{
    addEmp=(newEmp)=>{
         return addDoc(employeeCollectionRef,newEmp);
    }

    updateEmp=(id,updatedEmp)=>{
        const empDoc=doc(db,"users",id);
        return updateDoc(empDoc,updatedEmp);
    }

    deleteEmp=(id)=>{
        const emp= doc(db,"users",id);
        return deleteDoc(emp);
    }

    getAllEmp=()=>{
        return getDocs(employeeCollectionRef);
    }

    getEmp=(id)=>{
        const emp=doc(db,"users",id);
        return getDoc(emp);
    }

}

export default EmpDataService;


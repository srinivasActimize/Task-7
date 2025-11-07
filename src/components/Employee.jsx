import React, { useEffect, useState } from "react";
import { Audio } from 'react-loader-spinner';

import {
    initializeApp
} from "firebase/app";
import {
    getFirestore,
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc
} from "firebase/firestore";

import { Loader } from "./Loader";


const firebaseConfig = {
    apiKey: "AIzaSyCz0iwuewa7iU2LKlqmQAuUHuR5w68aqDc",
    authDomain: "employee-9b2e1.firebaseapp.com",
    projectId: "employee-9b2e1",
    storageBucket: "employee-9b2e1.firebasestorage.app",
    messagingSenderId: "24858763779",
    appId: "1:24858763779:web:a9451d760c6ba93abe6436",
    measurementId: "G-L4XSNSX5L0"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const empCollectionRef = collection(db, "employees");

function Employee() {
    const [userName, setUserName] = useState("");
    const [userProf, setUserProf] = useState("");
    const [userSalary, setUserSalary] = useState("");
    const [userId, setUserId] = useState("");
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState("");
    const [errorName, setErrorName] = useState("");
    const [errorProf, setErrorProf] = useState("");
    const [errorSal, setErrorSal] = useState("");
    const [flag, setFlag] = useState(false);
    const [loading,setLoading]=useState(true);

    const [displayName, setDisplayName] = useState('');
    const [displaySalary, setDisplaySalary] = useState('');
    const [displayProfession, setDisplayProfession] = useState('');

    const fetchData = async () => {
        try {
            const snapshot = await getDocs(empCollectionRef);
            const docs = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setUsers(docs);
            console.log("Fetched employees:", docs);
        } catch (err) {
            console.error(" Error fetching employees:", err);
        }
    };

    useEffect(() => {
        fetchData();
    }, [flag]);
    useEffect(()=>{
        setTimeout(()=>{
            setLoading(false);
        },2000);
    });

    const validateFields = () => {
        let valid = true;
        if (!userName.trim()) {
            setErrorName("Name cannot be empty");
            valid = false;
        }
        else if(/[^a-zA-Z]/.test(userName)){
            setErrorName("name cannot contains other characters");

        } else setErrorName("");

        if (!userProf.trim()) {
            setErrorProf("Profession cannot be empty");
            valid = false;
        } 
        else if(/[^a-zA-Z]/.test(userProf)){
            setErrorProf("profession cannot contains other characters");
        }
        else setErrorProf("");

        if (!userSalary.trim()) {
            setErrorSal("Salary cannot be empty");
            valid = false;
        } else if (isNaN(userSalary)) {
            setErrorSal("Only enter numbers");
            valid = false;
        } else setErrorSal("");

        return valid;
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        if (!validateFields()) return;

        const newEmp = {
            name: userName,
            profession: userProf,
            salary: userSalary,
        };

        try {
            await addDoc(empCollectionRef, newEmp);
            setMessage("Added successfully!");
            setUserName("");
            setUserProf("");
            setUserSalary("");
            setFlag((p) => !p);
        } catch (err) {
            console.error(" Error adding employee:", err);
            setMessage(err.message);
        }
    };


    const handleEdit = async (emp) => {
        setUserId(emp.id);
        setUserName(emp.name);
        setUserProf(emp.profession);
        setUserSalary(emp.salary);
    };

    const handleUpdate = async () => {
        if (!validateFields()) return;

        try {
            const empDoc = doc(db, "employees", userId);
            await updateDoc(empDoc, {
                name: userName,
                profession: userProf,
                salary: userSalary,
            });
            setMessage(" Updated successfully!");
            setUserId("");
            setUserName("");
            setUserProf("");
            setUserSalary("");
            setFlag((p) => !p);
        } catch (err) {
            console.error("Error updating employee:", err);
        }
    };
    const handleDisplay = (view) => {
        setDisplayName(view.name);
        setDisplayProfession(view.profession);
        setDisplaySalary(view.salary);
    }



    // const [remove, setRemove] = useState('');
    // const deleting=(duser)=>{
    //   setRemove(duser.id);
    // }

    const handleDelete = async (id) => {
        try {
            const a = window.confirm('do you want to delete');
            if(a){
            const empDoc = doc(db, "employees", id);
            await deleteDoc(empDoc);
            setMessage(" Deleted successfully!");
            setFlag((p) => !p);
            }
            
        } catch (err) {
            console.error(" Error deleting employee:", err);
        }
    };


    if(loading){
        return <Loader/>
    }

    return (

        <div>
            <div>
                <div className='justify-content-evenly d-md-flex mt-3'>
                    <h1 className='bg-success text-white p-2 titlee '>Actimize Software Solutions</h1>
                </div>
                <div>
                    <h3 className='mx-5 px-5'>Employee List :</h3>
                    <div className='first d-flex justify-content-end'>
                        <button type="button" className="btn btn-primary " data-bs-toggle="modal" data-bs-target="#fields">
                            Add here
                        </button>
                    </div>
                    <div className='d-sm-block d-md-none'>
                        {/* <Loader/> */}
                        {Array.isArray(users) && users.map((use, index) =>
                            <div className="card mx-auto" style={{ width: '18rem' }} key={use.id || index}>
                                <div className="card-body">
                                    <h3>Name: {use.name}</h3>
                                    <h6>Profession:{use.profession}</h6>
                                    <p>Salary: {use.salary}</p>
                                </div>
                                <div className='justify-content-evenly d-md-flex '>
                                    <a className='btn btn-primary' onClick={() => handleEdit(use)} data-bs-toggle="modal" data-bs-target="#edit">
                                        <i className="mx-2 bi bi-pencil-square"></i>
                                    </a>
                                    <a className='btn btn-primary' onClick={() => handleDisplay(use)} data-bs-toggle="modal" data-bs-target="#view" >
                      <i className="mx-2 bi bi-eye"></i>
                    </a>
                                    <a className='btn btn-primary' onClick={() => handleDelete(use.id)}>
                                        <i className="mx-2 bi bi-trash"></i>
                                    </a>
                                </div>

                            </div>)}
                    </div>

                    <div className='d-none d-md-block'>
                        <table className='border ff mt-4 '>
                            <thead className='bg-success text-white'>
                                <tr className='mx-auto'>
                                    <th className='p-2'>S.No</th>
                                    <th className='p-2'>Name</th>
                                    <th className='p-2'>Profession</th>
                                    <th className='p-2'>Salary</th>
                                    <th className='p-2 text-center'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(users) && users.map((use, index) =>
                                    <tr key={use.id || index}>
                                        <td className='p-2'>{index + 1}</td>
                                        <td className='p-2'>{use.name}</td>
                                        <td className='p-2'>{use.profession}</td>
                                        <td className='p-2'>{use.salary}</td>
                                        <td className='p-2'>
                                            <div className='justify-content-evenly d-md-flex '>
                                                <a className='btn btn-primary' onClick={() => handleEdit(use)} data-bs-toggle="modal" data-bs-target="#edit" >
                                                    <i className="mx-2 bi bi-pencil-square"></i>
                                                </a>
                                                <a className='btn btn-primary' onClick={() => handleDisplay(use)} data-bs-toggle="modal" data-bs-target="#view" >
                                                    <i className="mx-2 bi bi-eye"></i>
                                                </a>
                                                <a className='btn btn-primary' onClick={() => handleDelete(use.id)}  >
                                                    <i className="mx-2 bi bi-trash"></i>
                                                </a>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>

            <div className="modal" tabIndex="-1" id='fields' >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Add employee</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {/* <div className='align-items-center d-md-flex'> */}
                            <div className='fields p-3 border mt-1 '>
                                Name:
                                <input className='form-control ' value={userName} onChange={(e) => setUserName(e.target.value)} placeholder='Enter Employee Name' />
                                <p className='text-danger'>{errorName}</p>
                                Profession:
                                <input className=' form-control' value={userProf} onChange={(e) => setUserProf(e.target.value)} placeholder='Enter Profession' />
                                <p className='text-danger'>{errorProf}</p>
                                Salary:
                                <input className='form-control' value={userSalary} onChange={(e) => setUserSalary(e.target.value)} placeholder='Enter Salary' />
                                <p className='text-danger'>{errorSal}</p>
                            </div>
                            {/* </div> */}
                            <p className='text-success'></p>
                        </div>
                        <div className="modal-footer">
                            <div className='justify-content-evenly d-md-flex '>

                                <button onClick={handleAdd} className='btn btn-success text-white'>Add employee</button>
                            </div>
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal" tabIndex="-1" id='edit'>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Edit</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className='fields p-3 border-dark border  mt-1'>
                                Name:
                                <input className='form-control' value={userName} onChange={(e) => setUserName(e.target.value)} placeholder='Enter Employee Name' />
                                <p className='text-danger'>{errorName}</p>
                                Profession:
                                <input className=' form-control' value={userProf} onChange={(e) => setUserProf(e.target.value)} placeholder='Enter Profession' />
                                <p className='text-danger'>{errorProf}</p>
                                Salary:
                                <input className='form-control' value={userSalary} onChange={(e) => setUserSalary(e.target.value)} placeholder='Enter Salary' />
                                <p className='text-danger'>{errorSal}</p>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleUpdate}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal" tabIndex="-1" id='view'>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Edit</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className='card'>
                                <div className="card-body">
                                    <h3>Name: {displayName}</h3>
                                    <h6>Profession: {displayProfession}</h6>
                                    <p>Salary: {displaySalary}</p>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="confirmDelete" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                            <h3>Are you sure, you want to delete this user?</h3>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleDelete} >Yes</button>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
}

export default Employee;

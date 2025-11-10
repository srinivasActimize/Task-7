import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';


//config firebase
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
    doc,
    query,
    orderBy
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

//initializing firebase

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const empCollectionRef = collection(db, "employees");

function Employee() {

    //states for user details and error handling
    const [userName, setUserName] = useState("");
    const [userProf, setUserProf] = useState("");
    const [userSalary, setUserSalary] = useState("");
    const [userId, setUserId] = useState("");
    const [users, setUsers] = useState([]);

    const [errorName, setErrorName] = useState("");
    const [errorProf, setErrorProf] = useState("");
    const [errorSal, setErrorSal] = useState("");
    const [flag, setFlag] = useState(false);
    const [loading, setLoading] = useState(true);

    const [displayName, setDisplayName] = useState('');
    const [displaySalary, setDisplaySalary] = useState('');
    const [displayProfession, setDisplayProfession] = useState('');

    const [editing, setEditing] = useState(false);

    //fetching data from firebase
    const fetchData = async () => {
        try {
            const q = query(empCollectionRef, orderBy("time", "asc"));
            const snapshot = await getDocs(q);
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

        
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    });

    useEffect(() => {
        setErrorName('');
        setErrorProf('');
        setErrorSal('');
    }, [userName, userProf, userSalary])

    //toast notifications
    const notify = () => toast.success("Employee added succesfully", { autoClose: 3000 });
    const notifyUpdate = () => toast.warning("Employee updated", { autoClose: 3000 });
    const notifydelete = () => toast.info("Employee deleted successfully", { autoClose: 3000 });

    //validation funciton
    const validateFields = () => {
        let valid = true;
        if (!userName.trim()) {
            setErrorName("Name cannot be empty");
            valid = false;
        }
        else if (/[^a-zA-Z]/.test(userName)) {
            setErrorName("name cannot contains other characters");

        } else setErrorName("");

        if (!userProf.trim()) {
            setErrorProf("Profession cannot be empty");
            valid = false;
        }
        else if (/[^a-zA-Z]/.test(userProf)) {
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

    function userEdit(tempuser) {
        handleEdit(tempuser);
        setEditing(true);
    }

    //handling function for add,edit
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateFields()) return;

        if (editing) {
            try {
                const empDoc = doc(db, "employees", userId);
                await updateDoc(empDoc, {
                    name: userName,
                    profession: userProf,
                    salary: userSalary,
                });
                setUserId("");
                setUserName("");
                setUserProf("");
                setUserSalary("");
                setFlag((p) => !p);
                setEditing(false);
                notifyUpdate();

            } catch (err) {
                console.error("Error updating employee:", err);
            }
            return
        }

        const newEmp = {
            time: Date.now(),
            name: userName,
            profession: userProf,
            salary: userSalary,
        };

        try {
            await addDoc(empCollectionRef, newEmp);
            setUserName("");
            setUserProf("");
            setUserSalary("");
            setFlag((p) => !p);
            notify();
        } catch (err) {
            console.error(" Error adding employee:", err);

        }
    };

    
    const handleEdit = async (emp) => {
        setUserId(emp.id);
        setUserName(emp.name);
        setUserProf(emp.profession);
        setUserSalary(emp.salary);
    };

    const handleDisplay = (view) => {
        setDisplayName(view.name);
        setDisplayProfession(view.profession);
        setDisplaySalary(view.salary);
    }
    const clearing = () => {
        setUserName('');
        setUserProf('');
        setUserSalary('');
        setEditing(false);
    }

    //deleting employee
    const handleDelete = async (id) => {
        try {
            const a = window.confirm('do you want to delete');
            if (a) {
                const empDoc = doc(db, "employees", id);
                await deleteDoc(empDoc);

                setFlag((p) => !p);
                notifydelete();
            }

        } catch (err) {
            console.error(" Error deleting employee:", err);
        }
    };


    if (loading) {
        return <Loader />
    }

    return (


        <div>
            <ToastContainer />

            <div>
                <div className='justify-content-evenly d-md-flex mt-3'>
                    <h1 className='bg-success text-white p-2 titlee '>Actimize Software Solutions</h1>
                </div>
                <div> 
                    {/* button added for adding employee */}
                    <h3 className='mx-5 px-5'>Employee List :</h3>
                    <div className='first d-flex justify-content-end'>
                        <button type="button" className="btn btn-primary " onClick={clearing} data-bs-toggle="modal" data-bs-target="#fields">
                            Add Employee here
                        </button>
                    </div>

                    <div className='d-sm-block d-md-none'>
                        {Array.isArray(users) && users.map((use, index) =>
                            <div className="card mx-auto" style={{ width: '18rem' }} key={use.id || index}>
                                <div className="card-body">
                                    <h3>Name: {use.name}</h3>
                                    <h6>Profession:{use.profession}</h6>
                                    <p>Salary: {use.salary}</p>
                                </div>
                                <div className='justify-content-evenly d-md-flex '>
                                    <button className='btn btn-primary' onClick={() => userEdit(use)} data-bs-toggle="modal" data-bs-target="#fields">
                                        <i className="mx-2 bi bi-pencil-square"></i>
                                    </button>
                                    <button className='btn btn-primary' onClick={() => handleDisplay(use)} data-bs-toggle="modal" data-bs-target="#view" >
                                        <i className="mx-2 bi bi-eye"></i>
                                    </button>
                                    <button className='btn btn-primary' onClick={() => handleDelete(use.id)}>
                                        <i className="mx-2 bi bi-trash"></i>
                                    </button>
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
                                                <button className='btn btn-primary' onClick={() => userEdit(use)} data-bs-toggle="modal" data-bs-target="#fields" >
                                                    <i className="mx-2 bi bi-pencil-square"></i>
                                                </button>
                                                <button className='btn btn-primary' onClick={() => handleDisplay(use)} data-bs-toggle="modal" data-bs-target="#view" >
                                                    <i className="mx-2 bi bi-eye"></i>
                                                </button>
                                                <button className='btn btn-primary' onClick={() => handleDelete(use.id)}  >
                                                    <i className="mx-2 bi bi-trash"></i>
                                                </button>
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
                            <h5 className="modal-title">{editing ? 'Edit Employee' : 'Add Employee'}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className='fields border border-success p-3 border mt-1 '>
                                Name:
                                <input className='form-control border' value={userName} onChange={(e) => setUserName(e.target.value)} placeholder='Enter Employee Name' />
                                <p className='text-danger'>{errorName}</p>
                                Profession:
                                <input className=' form-control' value={userProf} onChange={(e) => setUserProf(e.target.value)} placeholder='Enter Profession' />
                                <p className='text-danger'>{errorProf}</p>
                                Salary:
                                <input className='form-control' value={userSalary} onChange={(e) => setUserSalary(e.target.value)} placeholder='Enter Salary' />
                                <p className='text-danger'>{errorSal}</p>
                            </div>
                            <p className='text-success'></p>
                        </div>
                        <div className="modal-footer">
                            <div className='justify-content-evenly d-md-flex '>

                                <button onClick={handleSubmit} className='btn btn-success text-white'>{editing ? 'Edit Employee' : 'Add Employee'}</button>
                            </div>
                            <button type="button" className="btn btn-secondary" onClick={clearing} data-bs-dismiss="modal">Close</button>
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


        </div>
    );
}
export default Employee;

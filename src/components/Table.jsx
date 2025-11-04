import React, { useEffect, useState } from 'react'


function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

function Table() {
  const [userName, setUserName] = useState('');
  const [userProf, setUserProf] = useState('');
  const [userSalary, setUserSalary] = useState('');
  const [userId, setUserId] = useState('');

  const [disName, setDisName] = useState('');
  const [disProf, setDisProf] = useState('');
  const [disSal, setDisSal] = useState('');
  const [del,setDel]= useState('');

  const [flag, setFlag] = useState(false);
  useEffect(() => {
    setUserName('');
    setUserId('');
    setUserProf('');
    setUserSalary('');
  }, [flag]);

  const [errorName, setErrorName] = useState('');
  const [errorProf, setErrorProf] = useState('');
  const [errorSal, setErrorSal] = useState('');
  const [successs, setSucesss] = useState('');

  const [users, setUsers] = useState(() => {
    const temp = localStorage.getItem('users')
    if (!temp) return [];
    try {
      const parsed = JSON.parse(temp);
      if (Array.isArray(parsed)) return parsed;
      if (parsed) return [parsed];
      return [];
    } catch (e) {
      console.warn('Failed to parse users from localStorage, resetting to []', e);
      localStorage.removeItem('users');
      return [];
    }
  })

  useEffect(() => {
    setErrorName('');
    setErrorProf('');
    setErrorSal('');
  }, [userName, userProf, userSalary])

  const handleName = (e) => {
    setUserName(e.target.value);
    setSucesss('');
  }
  const handleProf = (e) => {
    setUserProf(e.target.value);
    setSucesss('');
  }
  const handleSalary = (e) => {
    setUserSalary(e.target.value);
    setSucesss('');
  }


  const editUser = (entry) => {
    setUserId(entry.id);
    setUserName(entry.name);
    setUserProf(entry.profession);
    setUserSalary(entry.salary);

    const updatedd = users.filter((usee) => usee.id !== entry.id);
    setUsers(updatedd);
    localStorage.setItem('users', JSON.stringify(updatedd));
  }

  const viewUser = (view) => {
    setDisName(view.name);
    setDisProf(view.profession);
    setDisSal(view.salary);
  }

  function validateFields() {
    let valid = true;
    
    if (!userName || userName.trim().length === 0) {
      setErrorName('Name cannot be empty');
      valid = false;
    } else {
      setErrorName('');
    }

    if (!userProf || userProf.trim().length === 0) {
      setErrorProf('Profession cannot be empty');
      valid = false;
    } else {
      setErrorProf('');
    }
    if (!userSalary || userSalary.toString().trim().length === 0) {
      setErrorSal('Salary cannot be empty');
      valid = false;
    } else if (isNaN(userSalary)) {
      setErrorSal('Only enter numbers');
      valid = false;
    } else {
      setErrorSal('');
    }

    return valid;
  }

  function handleEdit() {
    if (!validateFields()) return;

    const editedUser = { id: userId || generateId(), name: userName, profession: userProf, salary: userSalary };
    const update = [...users, editedUser];
    setUsers(update);
    localStorage.setItem('users', JSON.stringify(update));

    setSucesss('Successfully updated');
    setFlag(prev => !prev);
  }

  function handleAdd() {
    if (!validateFields()) return;

    const newUser = { id: generateId(), name: userName, profession: userProf, salary: userSalary };
    const update = [...users, newUser];
    setUsers(update);
    localStorage.setItem('users', JSON.stringify(update));

    setSucesss('Successfully added');
    setFlag(prev => !prev);
  }

  const deleting=(duser)=>{
     setDel(duser);
  }

  const deleteUser = () => {
    const updatedd = users.filter((usee) => usee.id !== del.id)
    setUsers(updatedd);
    localStorage.setItem('users', JSON.stringify(updatedd))
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
            {users.map((use, index) =>
              <div className="card mx-auto" style={{ width: '18rem' }} key={use.id || index}>
                <div className="card-body">
                  <h3>Name: {use.name}</h3>
                  <h6>Profession:{use.profession}</h6>
                  <p>Salary: {use.salary}</p>
                </div>
                <div className='justify-content-evenly d-md-flex '>
                  <a className='btn btn-primary' onClick={() => editUser(use)} data-bs-toggle="modal" data-bs-target="#edit">
                    <i className="mx-2 bi bi-pencil-square"></i>
                  </a>
                  <a className='btn btn-primary' onClick={() => viewUser(use)} data-bs-toggle="modal" data-bs-target="#view" >
                    <i className="mx-2 bi bi-eye"></i>
                  </a>
                  <a className='btn btn-primary' onClick={() => deleting(use)} data-bs-toggle="modal" data-bs-target="#confirmDelete">
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
                {users.map((use, index) =>
                  <tr key={use.id || index}>
                    <td className='p-2'>{index + 1}</td>
                    <td className='p-2'>{use.name}</td>
                    <td className='p-2'>{use.profession}</td>
                    <td className='p-2'>{use.salary}</td>
                    <td className='p-2'>
                      <div className='justify-content-evenly d-md-flex '>
                        <a className='btn btn-primary' onClick={() => editUser(use)} data-bs-toggle="modal" data-bs-target="#edit" >
                          <i className="mx-2 bi bi-pencil-square"></i>
                        </a>
                        <a className='btn btn-primary' onClick={() => viewUser(use)} data-bs-toggle="modal" data-bs-target="#view" >
                          <i className="mx-2 bi bi-eye"></i>
                        </a>
                        <a className='btn btn-primary' onClick={() => deleting(use)} data-bs-toggle="modal" data-bs-target="#confirmDelete" >
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
                  <input className='form-control ' value={userName} onChange={handleName} placeholder='Enter Employee Name' />
                  <p className='text-danger'>{errorName}</p>
                  Profession:
                  <input className=' form-control' value={userProf} onChange={handleProf} placeholder='Enter Profession' />
                  <p className='text-danger'>{errorProf}</p>
                  Salary:
                  <input className='form-control' value={userSalary} onChange={handleSalary} placeholder='Enter Salary' />
                  <p className='text-danger'>{errorSal}</p>
                </div>
              {/* </div> */}
              <p className='text-success'>{successs}</p>
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
                <input className='form-control' value={userName} onChange={handleName} placeholder='Enter Employee Name' />
                <p className='text-danger'>{errorName}</p>
                <input className=' form-control' value={userProf} onChange={handleProf} placeholder='Enter Profession' />
                <p className='text-danger'>{errorProf}</p>
                <input className='form-control' value={userSalary} onChange={handleSalary} placeholder='Enter Salary' />
                <p className='text-danger'>{errorSal}</p>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={handleEdit}>Save changes</button>
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
                  <h3>Name: {disName}</h3>
                  <h6>Profession:{disProf}</h6>
                  <p>Salary: {disSal}</p>
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
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={deleteUser} >Yes</button>
            </div>
          </div>
        </div>
      </div>


    </div>
  )
}

export default Table

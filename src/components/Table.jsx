import React, { useEffect, useState } from 'react'


function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}
function Table() {
  let rolll=1;
  const [user, setUser] = useState({
    id: '',
    name: '',
    profession: '',
    salary: ''
  })

  const [tempName, setTempName] = useState('');
  const [tempProf, setTempProf] = useState('');
  const [tempSal, setTempSal] = useState('');
  const [tempId,setTempId]= useState('');

  const [disName,setDisName]=useState('');
  const [disProf,setDisProf]=useState('');
  const [disSal,setDisSal]=useState('');

  const [errorName, setErrorName] = useState('');
  const [errorProf, setErrorProf] = useState('');
  const [errorSal, setErrorSal] = useState('');
  const [successs, setSucesss] = useState('');

  const [users, setUsers] = useState(() => {
    const temp = localStorage.getItem('users')
    return temp ? JSON.parse(temp) : [];
  })

useEffect(()=>{
  setErrorName('');
  setErrorProf('');
  setErrorSal('');
},[user])

  const handleName = (e) => {
    const str = e.target.value;
    setUser({ ...user, name: str })
    setSucesss('');
  }
  const handleProf = (e) => {
    const str = e.target.value;
    setUser({ ...user, profession: str })
    setSucesss('');
  }
  const handleSalary = (e) => {
    const str = e.target.value;
    setUser({ ...user, salary: str })
    setSucesss('');
  }

  const editUser = (entry) => {
    setUser({...user,name:entry.name});
    setUser({...user,profession:entry.profession});
    setUser({...user,salary:entry.salary});
  }
  const viewUser=(view)=>{
    setDisName(view.name);
    setDisProf(view.profession);
    setDisSal(view.salary);
  }
  function handleEdit(){
    let count = 3;
    if (user.salary.length < 1) {
      setErrorSal('sal cannot be empty')
      count++;
    }
    else if (isNaN(user.salary)) {
      setErrorSal('only enter numbers')
      count++;
    }
    else {
      setErrorSal('');
      count--;
    }
    if (user.name.length < 1) {
      setErrorName('name cannot be empty')
      count++;
    }
    else {
      setErrorName('')
      count--;
    }
    if (user.profession.length < 1) {
      setErrorProf('profession cannot be empty')
      count++;
    }
    else {
      setErrorProf('');
      count--;
    }
    if (count === 0) {
      const updatedd = users.filter((usee) => usee.id != tempId)
      setUsers(updatedd);
    //  setUser({ ...user, name:tempName });
    //  setUser({...user,profession:tempProf});
    //  setUser({...user,salary:tempSal});
    //  setUser({...user,id:tempId});

    const update = [...users, user]
    setUsers(update);
    localStorage.setItem('users', JSON.stringify(update));
    setSucesss('Successfully added')
    }


  }

  function handleAdd() {
    let count = 3;
    if (user.salary.length < 1) {
      setErrorSal('sal cannot be empty')
      count++;
    }
    else if (isNaN(user.salary)) {
      setErrorSal('only enter numbers')
      count++;
    }
    else {
      setErrorSal('');
      count--;
    }
    if (user.name.length < 1) {
      setErrorName('name cannot be empty')
      count++;
    }
    else {
      setErrorName('')
      count--;
    }
    if (user.profession.length < 1) {
      setErrorProf('profession cannot be empty')
      count++;
    }
    else {
      setErrorProf('');
      count--;
    }
    if (count === 0) {
      adding();
    }
  }

  function adding() {
    setUser({ ...user, id: Date.now() });
    const update = [...users, user]
    setUsers(update);
    localStorage.setItem('users', JSON.stringify(update));
    setSucesss('Successfully added')

  }


  const deleteUser = (idd) => {
    
    const updatedd = users.filter((usee) => usee.id != idd)
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
            {users.map((use,index) =>
              <div className="card mx-auto" style={{ width: '18rem' }} key={index}>
                <div className="card-body">
                  <h3>Name: {use.name}</h3>
                  <h6>Profession:{use.profession}</h6>
                  <p>Salary: {use.salary}</p>
                </div>
                <div className='justify-content-evenly d-md-flex '>
                  <a className='btn btn-primary' onClick={() => editUser(use)} data-bs-toggle="modal" data-bs-target="#edit">
                    <i className="mx-2 bi bi-pencil-square"></i>
                  </a>
                   <a className='btn btn-primary'onClick={()=>viewUser(use)} data-bs-toggle="modal" data-bs-target="#view" >
                          <i className="mx-2 bi bi-eye"></i>
                        </a>
                  <a className='btn btn-primary' onClick={() => deleteUser(use.id)}>
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
                {users.map((use) =>
                  <tr>
                    <td className='p-2'>{rolll++}</td>
                    <td className='p-2'>{use.name}</td>
                    <td className='p-2'>{use.profession}</td>
                    <td className='p-2'>{use.salary}</td>
                    <td className='p-2'>
                      <div className='justify-content-evenly d-md-flex '>
                        <a className='btn btn-primary' onClick={() => editUser(use)} data-bs-toggle="modal" data-bs-target="#edit" >
                          <i className="mx-2 bi bi-pencil-square"></i>
                        </a>
                        <a className='btn btn-primary'onClick={()=>viewUser(use)} data-bs-toggle="modal" data-bs-target="#view" >
                          <i className="mx-2 bi bi-eye"></i>
                        </a>
                        <a className='btn btn-primary' onClick={() => deleteUser(use.id)}>
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

      <div className="modal" tabindex="-1" id='fields' >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add employee</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className='justify-content-evenly d-md-flex'>
                <div className='fields p-3 border mt-1'>
                  Name:
                  <input className='form-control ' value={user.name} onChange={handleName} placeholder='enter employee name' />
                  <p className='text-danger'>{errorName}</p>
                  Profession:
                  <input className=' form-control' value={user.profession} onChange={handleProf} placeholder='enter profession' />
                  <p className='text-danger'>{errorProf}</p>
                  Salary:
                  <input className='form-control' value={user.salary} onChange={handleSalary} placeholder='enter salary' />
                  <p className='text-danger'>{errorSal}</p>
                </div>
              </div>
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

      <div className="modal" tabindex="-1" id='edit'>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className='fields p-3 border-dark border  mt-1'>
                <input className='form-control' value={user.name} onChange={handleName} placeholder='enter employee name' />
                <p className='text-danger'>{errorName}</p>
                <input className=' form-control' value={user.profession} onChange={handleProf} placeholder='enter profession' />
                <p className='text-danger'>{errorProf}</p>
                <input className='form-control' value={user.salary} onChange={handleSalary} placeholder='enter salary' />
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

      <div className="modal" tabindex="-1" id='view'>
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


    </div>
  )
}

export default Table

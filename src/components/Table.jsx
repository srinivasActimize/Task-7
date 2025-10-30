import React, { useState } from 'react'

function Table() {
  let rolll = 1;
  const [user, setUser] = useState({
    roll: '',
    id: '',
    name: '',
    profession: '',
    salary: ''
  })
  const [errorName, setErrorName] = useState('');
  const [errorProf, setErrorProf] = useState('');
  const [errorSal, setErrorSal] = useState('');

  const [users, setUsers] = useState(() => {
    const temp = localStorage.getItem('users')
    return temp ? JSON.parse(temp) : [];
  })

  const handleName = (e) => {
    const str = e.target.value;
    setUser({ ...user, name: str })
  }
  const handleProf = (e) => {
    const str = e.target.value;
    setUser({ ...user, profession: str })
  }
  const handleSalary = (e) => {
    const str = e.target.value;
    setUser({ ...user, salary: str })
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
    if (count == 0) {
      adding();
    }
  }

  function adding() {
    setUser({ ...user, id: Date.now() })
    const update = [...users, user]
    setUsers(update);
    localStorage.setItem('users', JSON.stringify(update));
  }
  const viewUser = (userr) => {
    alert(userr.profession, userr.salary, userr.name);
  }

  // const editUser = (id) => {
  //   const temp = users.filter(t => t.id == id)
  //   {
  //     <div>
  //     <input value={temp.name} onChange={handleName} />
  //     <input value={temp.profession} onChange={handleProf} />
  //     <input value={temp.salary} onChange={handleSalary} />
  //   </div>
  //   }
  // }


  const deleteUser = (idd) => {
    const updatedd = users.filter((usee) => usee.id != idd)
    setUsers(updatedd);
    localStorage.setItem('users', JSON.stringify(updatedd))
  }

  return (
    <div>
      <div>
        <div className='justify-content-evenly d-md-flex mt-3'>
          <h1 className='bg-dark text-white p-2 '>Actimize Software Solutions</h1>
        </div>
        <p style={{ paddingLeft: '40%' }}>Add your new employee</p>
        <div className='fields p-3 border mt-3'>
          <input className='form-control' onChange={handleName} placeholder='enter employee name' />
          <p className='text-danger'>{errorName}</p>
          <input className=' form-control' onChange={handleProf} placeholder='enter profession' />
          <p className='text-danger'>{errorProf}</p>
          <input className='form-control' onChange={handleSalary} placeholder='enter salary' />
          <p className='text-danger'>{errorSal}</p>

          {/* <div class="d-block d-md-flex d-grid gap-2 " style={{display:'grid',gridTemplateColumns:'50% 50%'}}>
            <div><button className="btn btn-primary" style={{fontSize:"20px"}} type="button">Add employee</button></div>
            
          </div> */}  

            <div className='justify-content-evenly d-md-flex '>

              <button onClick={handleAdd} className='btn btn-success text-white'>Add employee</button>
            </div>
        </div>


        <div className=''>
          <h3 className='mx-5 px-5'>Employee List :</h3>
          <table className='border ff mt-4 '>
            <thead className='bg-success text-white'>
              <tr className='mx-auto'>
                <th className='p-2'>Roll</th>
                <th className='p-2'>Name</th>
                <th className='p-2'>Profession</th>
                <th className='p-2'>Salary</th>
                <th className='p-2'>Action</th>
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
                    <a>
                      <i class="mx-2 bi bi-pencil-square"></i>
                    </a>
                    <a onClick={() => viewUser(use)}>
                      <i className="mx-2 bi bi-eye"></i>
                    </a>
                    <a onClick={() => deleteUser(use.id)}>
                      <i className="mx-2 bi bi-trash"></i>
                    </a>
                  </td>
                </tr>
              )}
            </tbody>
          </table>

        </div>
      </div>

    </div>
  )
}

export default Table

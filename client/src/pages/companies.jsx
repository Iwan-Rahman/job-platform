import React, { useEffect, useState } from 'react'
import axios from 'axios';

const Companies = () => {
  const [companies,setCompanies] = useState([]);

  useEffect(() => {
    const fetchAllCompanies = async () => {
      try {
        const res = await axios.get("http://localhost:8800/companies");
        setCompanies(res.data);
      }catch(err){
        console.log(err);
      }
    }
    fetchAllCompanies();
  },[])

  const [newCompany, setNewCompany] = useState({
    COMPANYID: null,
    COMPANYNAME: '',
    COMPANYLOCATION:'',
    COMPANYLISTINGS: 0
  });

  const [updateCompany,setUpdateCompany] = useState({
    COMPANYID: null,
    COMPANYNAME: '',
    COMPANYLOCATION:'',
    COMPANYLISTINGS: 0
  })

  const handleChange = (e) => {
    setNewCompany((prev) => ({...prev, [e.target.name]:e.target.value}))
  }

  const handleUpdateChange = (e) => {
    setUpdateCompany((prev) => ({...prev, [e.target.name]:e.target.value}));
  }

  const handleClick = async (e) => {
    try {
      await axios.post("http://localhost:8800/companies",newCompany)
      window.location.reload();
    }catch(err){
      console.log(err)
    }
  }

  
  const handleUpdateClick = async (e) => {
    try {
      await axios.put("http://localhost:8800/companies",updateCompany)
    }catch(err){
      console.log(err)
    }
  }

  const handleDelete = async (id) => {
    try{
      await axios.delete("http://localhost:8800/companies/"+id)
      window.location.reload();
    }catch(err){
      console.log(err);
    }
  }

  const enableUpdate = (company) => {
    let inputs = document.querySelectorAll(".companyUpdateForm input");
    for(let input of inputs){
      input.removeAttribute("disabled")
    }
    inputs[0].value = company.COMPANYID;
    inputs[1].value = company.COMPANYNAME;
    inputs[2].value = company.COMPANYLOCATION;
    inputs[0].setAttribute("disabled","");
    setUpdateCompany({
      COMPANYID:inputs[0].value,
      COMPANYNAME:inputs[1].value,
      COMPANYLOCATION:inputs[2].value,
    })
  }

  return (
    <div>
      <h1><a className='btnHome' href='/'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="2rem" height="2rem"><path d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z" /></svg></a>Companies</h1>
      <h2>Table</h2>
      <div className="company">
          <div>CompanyID</div>
          <div>Name</div>
          <div>Address</div>
          <div>No. of Listings</div>
        </div>
        {companies.map(company => (
        <div className="company" key={company.COMPANYID}>
          <div>{company.COMPANYID}</div>
          <div>{company.COMPANYNAME}</div>
          <div>{company.COMPANYLOCATION}</div>
          <div>{company.COMPANYLISTINGS}</div>
          <div>
            <span className='delete' onClick={()=>handleDelete(company.COMPANYID)}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1.5rem" height="1.5rem"><path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" /></svg>
            </span>
            <span className='update' onClick={() => enableUpdate(company)}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1.5rem" height="1.5rem"><path d="M21.04 12.13C21.18 12.13 21.31 12.19 21.42 12.3L22.7 13.58C22.92 13.79 22.92 14.14 22.7 14.35L21.7 15.35L19.65 13.3L20.65 12.3C20.76 12.19 20.9 12.13 21.04 12.13M19.07 13.88L21.12 15.93L15.06 22H13V19.94L19.07 13.88M19 3C20.1 3 21 3.9 21 5V9L11 19V21H5C3.9 21 3 20.1 3 19V5C3 3.9 3.9 3 5 3H9.18C9.6 1.84 10.7 1 12 1C13.3 1 14.4 1.84 14.82 3H19M12 3C11.45 3 11 3.45 11 4C11 4.55 11.45 5 12 5C12.55 5 13 4.55 13 4C13 3.45 12.55 3 12 3Z" /></svg>
            </span>
          </div>
        </div>
      ))}
    <div className="companyForm">
      <h3>Add New Company</h3>
      <input type="number" placeholder='CompanyID' onChange={handleChange} name='COMPANYID'/>
      <input type="text" placeholder='Name' onChange={handleChange} name='COMPANYNAME'/>
      <input type="text" placeholder='Address' onChange={handleChange} name='COMPANYLOCATION'/>
      <button onClick={handleClick}>Add</button>
    </div>
    <div className="companyUpdateForm">
      <h3>Update Company</h3>
      <input type="number" placeholder='CompanyID' disabled onChange={handleUpdateChange} name='COMPANYID'/>
      <input type="text" placeholder='Name' disabled onChange={handleUpdateChange} name='COMPANYNAME'/>
      <input type="text" placeholder='Address' disabled onChange={handleUpdateChange} name='COMPANYLOCATION'/>
      <button onClick={handleUpdateClick}>Update</button>
    </div>
    </div>
  )
}

export default Companies
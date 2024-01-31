import React, { useEffect, useState } from 'react'
import axios from 'axios';

const Jobs = () => {
  const [jobs,setJobs] = useState([]);

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const res = await axios.get("http://localhost:8800/jobs");
        setJobs(res.data);
      }catch(err){
        console.log(err);
      }
    }
    fetchAllJobs();
  },[])

  const [newJob, setNewJob] = useState({
    JOBID: null,
    JOBTITLE: '',
    JOBTYPE: '',
    COMPANYID: null,
    ADDRESS: '',
    SALARY: null,
    DETAILS: '',
    EDUCATION: '',
    EXPERIENCE: '',
    DEADLINEDATE: null
  });

  const [updateJob,setUpdateJob] = useState({
    JOBID: null,
    JOBTITLE: '',
    JOBTYPE: '',
    COMPANYID: null,
    ADDRESS: '',
    SALARY: null,
    DETAILS: '',
    EDUCATION: '',
    EXPERIENCE: '',
    DEADLINEDATE: null
  })

  const handleChange = (e) => {
    setNewJob((prev) => ({...prev, [e.target.name]:e.target.value}))
  }

  const handleUpdateChange = (e) => {
    setUpdateJob((prev) => ({...prev, [e.target.name]:e.target.value}));
  }

  const handleClick = async (e) => {
    try {
      await axios.post("http://localhost:8800/jobs",newJob)
      window.location.reload();
    }catch(err){
      console.log(err)
    }
  }

  
  const handleUpdateClick = async (e) => {
    try {
      await axios.put("http://localhost:8800/jobs",updateJob)
    }catch(err){
      console.log(err)
    }
  }

  const handleDelete = async (id) => {
    try{
      await axios.delete("http://localhost:8800/jobs/"+id)
      window.location.reload();
    }catch(err){
      console.log(err);
    }
  }

  const enableUpdate = (job) => {
    let inputs = document.querySelectorAll(".jobUpdateForm input");
    for(let input of inputs){
      input.removeAttribute("disabled")
    }
    inputs[0].value = job.JOBID;
    inputs[1].value = job.JOBTITLE;
    inputs[2].value = job.JOBTYPE;
    inputs[3].value = job.COMPANYID;
    inputs[4].value = job.ADDRESS;
    inputs[5].value = job.SALARY;
    inputs[6].value = job.DETAILS;
    inputs[7].value = job.EDUCATION;
    inputs[8].value = job.EXPERIENCE;
    inputs[9].value = job.DEADLINEDATE;
    inputs[0].setAttribute("disabled","");
    setUpdateJob({
      JOBID:inputs[0].value,
      JOBTITLE:inputs[1].value,
      JOBTYPE:inputs[2].value,
      COMPANYID:inputs[3].value,
      ADDRESS: inputs[4].value,
      SALARY: inputs[5].value,
      DETAILS:inputs[6].value,
      EDUCATION:inputs[7].value,
      EXPERIENCE:inputs[8].value,
      DEADLINEDATE: inputs[9].value
    })
  }

  return <div>
      <h1><a className='btnHome' href='/'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="2rem" height="2rem"><path d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z" /></svg></a>Jobs</h1>
      <h2>Table</h2>
      <div className="job">
            <div>JobID</div>
            <div>Title</div>
            <div>Type</div>
            <div>CompanyID</div>
            <div>Address</div>
            <div>Salary</div>
            <div>Details</div>
            <div>Education</div>
            <div>Experience</div>
            <div>Post Date</div>
            <div>Deadline</div>
      </div>
        {jobs.map(job => (
          <div className="job" key={job.JOBID}>
            <div>{job.JOBID}</div>
            <div>{job.JOBTITLE}</div>
            <div>{job.JOBTYPE}</div>
            <div>{job.COMPANYID}</div>
            <div>{job.ADDRESS}</div>
            <div>{job.SALARY}</div>
            <div>{job.DETAILS}</div>
            <div>{job.EDUCATION}</div>
            <div>{job.EXPERIENCE}</div>
            <div>{job.POSTDATE}</div>
            <div>{job.DEADLINEDATE}</div>
            <div >
              <span className='delete' onClick={()=>handleDelete(job.JOBID)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1.5rem" height="1.5rem"><path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" /></svg>
              </span>
              <span className='update' onClick={() => enableUpdate(job)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1.5rem" height="1.5rem"><path d="M21.04 12.13C21.18 12.13 21.31 12.19 21.42 12.3L22.7 13.58C22.92 13.79 22.92 14.14 22.7 14.35L21.7 15.35L19.65 13.3L20.65 12.3C20.76 12.19 20.9 12.13 21.04 12.13M19.07 13.88L21.12 15.93L15.06 22H13V19.94L19.07 13.88M19 3C20.1 3 21 3.9 21 5V9L11 19V21H5C3.9 21 3 20.1 3 19V5C3 3.9 3.9 3 5 3H9.18C9.6 1.84 10.7 1 12 1C13.3 1 14.4 1.84 14.82 3H19M12 3C11.45 3 11 3.45 11 4C11 4.55 11.45 5 12 5C12.55 5 13 4.55 13 4C13 3.45 12.55 3 12 3Z" /></svg>
              </span>
            </div>
          </div>
        ))}
      <div className="jobForm">
        <h3>Add New Job</h3>
        <input type="number" placeholder='JobID' onChange={handleChange} name='JOBID'/>
        <input type="text" placeholder='JobTitle' onChange={handleChange} name='JOBTITLE'/>
        <input type="text" placeholder='JobType' onChange={handleChange} name='JOBTYPE'/>
        <input type="number" placeholder='CompanyID' onChange={handleChange} name='COMPANYID'/>
        <input type="text" placeholder='Address' onChange={handleChange} name='ADDRESS'/>
        <input type="number" placeholder='Salary' onChange={handleChange} name='SALARY'/>
        <input type="text" placeholder='Details' onChange={handleChange} name='DETAILS'/>
        <input type="text" placeholder='Education' onChange={handleChange} name='EDUCATION'/>
        <input type="text" placeholder='Experience' onChange={handleChange} name='EXPERIENCE'/>
        <input type="number" placeholder='DEADLINEDATE' onChange={handleChange} name='DEADLINEDATE'/>
        <button onClick={handleClick}>Add</button>
      </div>
      <div className="jobUpdateForm">
        <h3>Update Job</h3>
        <input type="number" placeholder='JobID' disabled onChange={handleUpdateChange} name='JOBID'/>
        <input type="text" placeholder='JobTitle' disabled onChange={handleUpdateChange} name='JOBTITLE'/>
        <input type="text" placeholder='JobType' disabled onChange={handleUpdateChange} name='JOBTYPE'/>
        <input type="number" placeholder='CompanyID' disabled onChange={handleUpdateChange} name='COMPANYID'/>
        <input type="text" placeholder='Address' disabled onChange={handleUpdateChange} name='ADDRESS'/>
        <input type="number" placeholder='Salary' disabled onChange={handleUpdateChange} name='SALARY'/>
        <input type="text" placeholder='Details' disabled onChange={handleUpdateChange} name='DETAILS'/>
        <input type="text" placeholder='Education' disabled onChange={handleUpdateChange} name='EDUCATION'/>
        <input type="text" placeholder='Experience' disabled onChange={handleUpdateChange} name='EXPERIENCE'/>
        <input type="number" placeholder='DEADLINEDATE' disabled onChange={handleUpdateChange} name='DEADLINEDATE'/>
        <button onClick={handleUpdateClick}>Update</button>
      </div>
  </div>;
}
export default Jobs
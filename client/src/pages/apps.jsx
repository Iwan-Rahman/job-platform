import React, { useEffect, useState } from 'react'
import axios from 'axios';

const Apps = () => {
  const [apps,setApps] = useState([]);

  useEffect(() => {
    const fetchAllApps = async () => {
      try {
        const res = await axios.get("http://localhost:8800/apps");
        setApps(res.data);
      }catch(err){
        console.log(err);
      }
    }
    fetchAllApps();
  },[])

  const [newApp, setNewApp] = useState({
    JOBID: null,
    USERID:null,
    CV:'',
    COVERLETTER:'',
  });

  const [updateApp,setUpdateApp] = useState({
    JOBID: null,
    USERID:null,
    CV:'',
    COVERLETTER:'',
    STATUS:'',
  })
  const handleChange = (e) => {
    setNewApp((prev) => ({...prev, [e.target.name]:e.target.value}))
  }

  const handleUpdateChange = (e) => {
    setUpdateApp((prev) => ({...prev, [e.target.name]:e.target.value}));
  }

  const handleClick = async (e) => {
    try {
      await axios.post("http://localhost:8800/apps",newApp);
      window.location.reload();
    }catch(err){
      console.log(err);
    }
  }

  
  const handleUpdateClick = async (e) => {
    try {
      await axios.put("http://localhost:8800/apps",updateApp)
    }catch(err){
      console.log(err)
    }
  }

  const handleDelete = async (jobID,userID) => {
    try{
      await axios.delete("http://localhost:8800/apps/"+jobID+"/"+userID);
      window.location.reload();
    }catch(err){
      console.log(err);
    }
  }

  const enableUpdate = (app) => {
    let inputs = document.querySelectorAll(".appUpdateForm input");
    for(let input of inputs){
      input.removeAttribute("disabled")
    }
    inputs[0].value = app.JOBID;
    inputs[1].value = app.USERID
    inputs[2].value = app.CV;
    inputs[3].value = app.COVERLETTER;
    inputs[4].value = app.STATUS
    inputs[0].setAttribute("disabled","");
    inputs[1].setAttribute("disabled","");
    setUpdateApp({
      JOBID:inputs[0].value,
      USERID:inputs[1].value,
      CV:inputs[2].value,
      COVERLETTER:inputs[3].value,
      STATUS:inputs[4].value
    })
  }

  return <div>
      <h1><a className='btnHome' href='/'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="2rem" height="2rem"><path d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z" /></svg></a>Job Applications</h1>
      <h2>Table</h2>
      <div className="app">
            <div>JobID</div>
            <div>UserID</div>
            <div>CV</div>
            <div>CoverLetter</div>
            <div>Date Submitted</div>
            <div>Status</div>
          </div>
        {apps.map(app => (
          <div className="app" key={[app.JOBID, app.USERID]}>
            <div>{app.JOBID}</div>
            <div>{app.USERID}</div>
            <div>{app.CV}</div>
            <div>{app.COVERLETTER}</div>
            <div>{app.DATESUBMITTED}</div>
            <div>{app.STATUS}</div>
            <div>
              <span className='delete' onClick={()=>handleDelete(app.JOBID,app.USERID)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1.5rem" height="1.5rem"><path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" /></svg>
              </span>
              <span className='update' onClick={() => enableUpdate(app)}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1.5rem" height="1.5rem"><path d="M21.04 12.13C21.18 12.13 21.31 12.19 21.42 12.3L22.7 13.58C22.92 13.79 22.92 14.14 22.7 14.35L21.7 15.35L19.65 13.3L20.65 12.3C20.76 12.19 20.9 12.13 21.04 12.13M19.07 13.88L21.12 15.93L15.06 22H13V19.94L19.07 13.88M19 3C20.1 3 21 3.9 21 5V9L11 19V21H5C3.9 21 3 20.1 3 19V5C3 3.9 3.9 3 5 3H9.18C9.6 1.84 10.7 1 12 1C13.3 1 14.4 1.84 14.82 3H19M12 3C11.45 3 11 3.45 11 4C11 4.55 11.45 5 12 5C12.55 5 13 4.55 13 4C13 3.45 12.55 3 12 3Z" /></svg>
              </span>
            </div>
          </div>
        ))}
      <div className="appForm">
      <h3>Add New Application</h3>
      <input type="number" placeholder='JobID' onChange={handleChange} name='JOBID'/>
      <input type="number" placeholder='UserID' onChange={handleChange} name='USERID'/>
      <input type="text" placeholder='Resume' onChange={handleChange} name='CV'/>
      <input type="text" placeholder='CoverLetter' onChange={handleChange} name='COVERLETTER'/>
      <button onClick={handleClick}>Add</button>
    </div>
    <div className="appUpdateForm">
      <h3>Update Application</h3>
      <input type="number" placeholder='JobID' disabled onChange={handleUpdateChange} name='JOBID'/>
      <input type="number" placeholder='UserID' disabled onChange={handleUpdateChange} name='USERID'/>
      <input type="text" placeholder='Resume' disabled onChange={handleUpdateChange} name='CV'/>
      <input type="text" placeholder='CoverLetter' disabled onChange={handleUpdateChange} name='COVERLETTER'/>
      <input type="text" placeholder='Status' disabled onChange={handleUpdateChange} name='STATUS'/>
      <button onClick={handleUpdateClick}>Update</button>
    </div>
  </div>;
}
export default Apps
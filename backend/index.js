import express from "express"
import mysql from "mysql"
import cors from "cors"

const app = express();
app.use(express.json());
app.use(cors())

const db = mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"password",
  database:"jobsforall"
})

app.get("/",(req,res)=> {
  res.json("Hello this is the backend");
})

app.get("/users",(req,res) => {
  const q = "Select * FROM User"
  db.query(q,(err,data)=>{
    if(err) return res.json("Error!")
    return res.json(data);
  })
})

app.get("/companies",(req,res) => {
  const q = "Select * FROM Company"
  db.query(q,(err,data)=>{
    if(err) return res.json("Error!")
    return res.json(data);
  })
})

app.get("/jobs",(req,res) => {
  const q = "Select * FROM JOBLISTING"
  db.query(q,(err,data)=>{
    if(err) return res.json("Error!")
    return res.json(data);
  })
})

app.get("/apps",(req,res) => {
  const q = "Select * FROM JOBAPPLICATION"
  db.query(q,(err,data)=>{
    if(err) return res.json("Error!")
    return res.json(data);
  })
})

app.post("/users",(req,res) => {
  const q = "Insert into User (`USERID`,`FIRSTNAME`,`LASTNAME`,`EMAIL`,`ADDRESS`,`PHONE`,`USERNAME`,`PASSWORD`) Values(?)";
  const values = [
    req.body.USERID,
    req.body.FIRSTNAME,
    req.body.LASTNAME,
    req.body.EMAIL,
    req.body.ADDRESS,
    req.body.PHONE,
    req.body.USERNAME,
    req.body.PASSWORD,
  ]
  db.query(q,[values],(err,data) => {
    if(err) return res.json("Error!")
    return res.json("User Created");
  })
})

app.post("/companies",(req,res) => {
  const q = "Insert into Company (`COMPANYID`,`COMPANYNAME`,`COMPANYLOCATION`,`COMPANYLISTINGS`) Values(?)";
  const values = [
    req.body.COMPANYID,
    req.body.COMPANYNAME,
    req.body.COMPANYLOCATION,
    req.body.COMPANYLISTINGS,
  ]
  db.query(q,[values],(err,data) => {
    if(err) return res.json("Error!")
    return res.json("Company Created");
  })
})

app.delete("/users/:id",(req,res) => {
  const userID = req.params.id;
  const q = "DELETE FROM USER WHERE USERID = ?"

  db.query(q,[userID],(err,data)=>{
    if(err) return res.json(err);
    return res.json("User has been deleted successfully");
  })
})

app.delete("/companies/:id",(req,res) => {
  const companyID = req.params.id;
  const q = "DELETE FROM COMPANY WHERE COMPANYID = ?"

  db.query(q,[companyID],(err,data)=>{
    if(err) return res.json(err);
    return res.json("Company has been deleted successfully");
  })
})

app.delete("/jobs/:id",(req,res) => {
  const jobID = req.params.id;
  const q = "DELETE FROM JOBLISTING WHERE JOBID = ?"

  db.query(q,[jobID],(err,data)=>{
    if(err) return res.json(err);
    return res.json("Job has been deleted successfully");
  })
})

app.delete("/apps/:jobID/:userID",(req,res) => {
    const jobID = req.params.jobID;
    const userID = req.params.userID;
    const q = "DELETE FROM JOBAPPLICATION WHERE JOBID = ? AND USERID = ?"
  
    db.query(q,[jobID,userID],(err,data)=>{
    if(err) return res.json(err);
    return res.json("Application has been deleted successfully");
  })
})

app.put("/users",(req,res) => {
  const values = [
    req.body.FIRSTNAME,
    req.body.LASTNAME,
    req.body.EMAIL,
    req.body.ADDRESS,
    req.body.PHONE,
    req.body.USERNAME,
    req.body.PASSWORD,
    req.body.USERID,
  ];
  const q = "UPDATE USER SET `FIRSTNAME` = ?, `LASTNAME` = ?, `EMAIL` = ?,`ADDRESS` = ?, `PHONE` = ?, `USERNAME` = ?, `PASSWORD` = ? WHERE USERID = ?"
  db.query(q,[...values],(err,data)=>{
    if(err) return res.json(err);
    return res.json("User has been modified successfully");
  })
})

app.put("/companies",(req,res) => {
  const values = [
    req.body.COMPANYNAME,
    req.body.COMPANYLOCATION,
    req.body.COMPANYID,
  ];
  const q = "UPDATE COMPANY SET `COMPANYNAME` = ?, `COMPANYLOCATION` = ? WHERE COMPANYID = ?"
  db.query(q,[...values],(err,data)=>{
    if(err) return res.json(err);
    return res.json("Company has been modified successfully");
  })
})

app.put("/jobs",(req,res) => {
  const values = [
    req.body.JOBTITLE,
    req.body.JOBTYPE,
    req.body.COMPANYID,
    req.body.ADDRESS,
    req.body.SALARY,
    req.body.DETAILS,
    req.body.EDUCATION,
    req.body.EXPERIENCE,
    req.body.DEADLINEDATE,
    req.body.JOBID
  ];
  const q = "UPDATE JOBLISTING SET `JOBTITLE` = ?, `JOBTYPE` = ?, `COMPANYID` = ?,`ADDRESS` = ?, `SALARY` = ?, `DETAILS` = ?, `EDUCATION` = ?, `EXPERIENCE`= ?, `DEADLINEDATE` = ? WHERE JOBID = ?"
  db.query(q,[...values],(err,data)=>{
    console.log(err);
    console.log(values);
    if(err) return res.json(err);
    return res.json("Job has been modified successfully");
  })
})

app.put("/apps",(req,res) => {
  const values = [
    req.body.CV,
    req.body.COVERLETTER,
    req.body.STATUS,
    req.body.JOBID,
    req.body.USERID,
  ];
  const q = "UPDATE JOBAPPLICATION SET `CV` = ?, `COVERLETTER` = ?, `STATUS` = ? WHERE JOBID = ? AND USERID = ?"
  db.query(q,[...values],(err,data)=>{
    console.log(err);
    console.log(values);
    if(err) return res.json(err);
    return res.json("Application has been modified successfully");
  })
})

app.post("/jobs",(req,res) => {
  const q = "Insert into JOBLISTING (`JOBID`,`JOBTITLE`,`JOBTYPE`,`COMPANYID`,`ADDRESS`,`SALARY`,`DETAILS`,`EDUCATION`,`EXPERIENCE`,`DEADLINEDATE`) Values(?)";
  const values = [
    req.body.JOBID,
    req.body.JOBTITLE,
    req.body.JOBTYPE,
    req.body.COMPANYID,
    req.body.ADDRESS,
    req.body.SALARY,
    req.body.DETAILS,
    req.body.EDUCATION,
    req.body.EXPERIENCE,
    req.body.DEADLINEDATE
  ]
  db.query(q,[values],(err,data) => {
    if(err) return res.json("Error!")
    return res.json("Job Created");
  })
})

app.post("/apps",(req,res) => {
  const q = "Insert into JOBAPPLICATION (`JOBID`,`USERID`,`CV`,`COVERLETTER`) Values(?)";
  const values = [
    req.body.JOBID,
    req.body.USERID,
    req.body.CV,
    req.body.COVERLETTER,
  ]
  db.query(q,[values],(err,data) => {
    if(err) return res.json("Error!")
    return res.json("Application Created");
  })
})
app.listen(8800, () => {
  console.log("Connected to backend!")
})
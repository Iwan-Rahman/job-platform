import {BrowserRouter, Routes, Route,} from "react-router-dom";
import Users from "./pages/users";
import Companies from "./pages/companies";
import Jobs from "./pages/jobs";
import Apps from "./pages/apps";
import Home from "./pages/home";
import './App.css'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/users" element={<Users/>}/>
          <Route path="/companies" element={<Companies/>}/>
          <Route path="/jobs" element={<Jobs/>}/>
          <Route path="/apps" element={<Apps/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

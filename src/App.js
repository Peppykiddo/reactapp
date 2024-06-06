import React,{useState} from "react"; 

import { Route,Routes,Link } from "react-router-dom"; 

import Navbar from "./Navbar";

import { Register } from './Register';
import './Registration.css';
import './App.css';
import { Login } from './Login';
import UpdatematerialReceipt from './Updatematerialreceipts';
import Updateothertable from './Updateothertable';
import Instructions from './Instructions';
import Formtable from './Formtable';

import FormDataResult from "./FormDataResult"; 
import EMD from "./EMD";
function App() {
const [currentForm,setCurrentForm]= useState('login'); 
  const toggleForm = (formName) => {
    setCurrentForm(formName);
   }
  return (

    <><div>
      <Routes>
        <Route path="/updatematerial" element={<UpdatematerialReceipt />} />
        <Route path="/othertables" element={<Updateothertable />} />
        <Route path="/instructions" element={<Instructions />} />
        <Route path="/Formtable" element={<Formtable />} />
        <Route path="/EMD" element={<EMD />} />
        <Route path="/login" element={<Login />} />

      </Routes>

    </div>
    
    {/* <div>
        {currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Formtable onFormSwitch={toggleForm} />}



      </div> */}
      
      </>
      


  );
}

export default App;

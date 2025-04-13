import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AllDepartments from '../components/AllDepartments';
import SingleDepartment from "../components/SingleDepartment";
import AllFaculty from "../components/AllFaculty";
import SingleFaculty from "../components/SingleFaculty" 
import Register from "../components/Register";
import Login from "../components/Login";
import Account from "../components/Account";
import './App.css'
import Navbar from '../components/Navbar';
import { useState } from 'react';
import ErrorBoundary from '../components/ErrorBoundary';
import Home from '../components/Home';
import AddDepartment from '../components/AddDepartment';
import AddFaculty from '../components/AddFaculty';
import EditDepartment from '../components/EditDepartment';
import EditFaculty from '../components/EditFaculty';

function App() {
  const [searchParams, setSearchParams] = useState("");

  return (
    <>


       <div className="logo-container">
          <div className="logo">
          <h1> the Uni of Magical Arts & Sciences </h1>
          </div>
      </div>
      <BrowserRouter>
          <Navbar setSearchParams={setSearchParams} />
          <Routes>
            <Route path="/" element={ <Home searchParams={searchParams}/> } />
            <Route path="/departments" element={ <AllDepartments searchParams={searchParams}/> } />
            <Route path= "/departments/:id" element={ <ErrorBoundary>  <SingleDepartment /> </ErrorBoundary>   } />
            <Route path="/faculty" element={ <AllFaculty searchParams={searchParams} /> } />
            <Route path="/faculty/:id" element= { <SingleFaculty /> } />
            <Route path="/register" element={ <Register />} />
            <Route path="/login" element={ <Login /> } />
            <Route path="/account" element= { <Account />} />
            <Route path="/departments/new" element= { <AddDepartment /> }/> 
            <Route path="/faculty/new" element={<AddFaculty />} />
            <Route path="/faculty/edit/:id" element={<EditFaculty />}/>
            <Route path="/departments/edit/:id" element={<EditDepartment />}/>
          </Routes>
     </BrowserRouter>

    </>
  );
}

export default App

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AllDepartments from '../components/AllDepartments';
import SingleDepartment from "../components/SingleDepartment";
import AllFaculty from "../components/AllFaculty";
import SingleFaculty from "../components/SingleFaculty" 
import './App.css'

function App() {
 

  return (
    <>

      <BrowserRouter>
          <Routes>
            <Route path="/" element={ <AllDepartments /> } />
            <Route path= "/departments/:id" element={ <SingleDepartment /> } />
            <Route path="/faculty" element={ <AllFaculty /> } />
            <Route path="/faculty/:id" element= { <SingleFaculty /> } />
            <Route path="/register" element={ <Register />} />
            <Route path="/login" element={ <Login /> } />
            <Route path="/account" element= { <Account />} />
          </Routes>
     </BrowserRouter>

    </>
  )
}

export default App

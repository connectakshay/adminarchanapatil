
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Admin from './component/Admin';
import AdminDashboard from './component/AdminDashboard';
import ComplaintList from './component/ComplaintList';
import InsertBlogs from './component/InsertBlogs';
import InsertImages from './component/InsertImages';
import PrivateComponent from './component/PrivateComponent';
import RefLetter from './component/RefLetter';
import Update from './component/Update';
import Nav from './component/Nav';

function App() {
  return (
      <BrowserRouter>
        <Nav />
        <Routes>

            <Route element={<PrivateComponent />}>
              <Route path='/admindashboard' element={<AdminDashboard />}></Route>
              <Route path='/complaintlist' element={<ComplaintList />}></Route>
              <Route path='/insertblogs' element={<InsertBlogs />}></Route>
              <Route path='/insertimages' element={<InsertImages />}></Route>
              <Route path='/refletter' element={<RefLetter />}></Route>
              <Route path='/update/:id' element={<Update />}></Route>
              <Route path='/logout' element={<h1>Logout</h1>}></Route>
            </Route>
            <Route path='/' element={<Admin />}></Route>
            
        </Routes>
      </BrowserRouter>
  );
}

export default App;

import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link,  useNavigate } from 'react-router-dom';
import './AdminDashboard.css';


const AdminDashboard = () => {

  const [data, setData] = useState([]);
  const [pending, setPending] = useState();
  const [solved, setSolved] = useState();

  useEffect(() => {
    getCount();
  }, [])

  const getCount = async () => {
    const res = await fetch("http://localhost:5000/complaint",{
      headers: {
        authorization: JSON.parse(localStorage.getItem("token"))
    }
    })
    const result = await res.json();
    setData(result);
    setPending((result.filter((item) => item.status == "Pending")));
    setSolved((result.filter((item) => item.status == "solve")));
  }

  // const navigate = useNavigate();

  // const selectOption = (opt) => {
  //   switch (opt) {
  //     case "data": navigate("/admindashboard")
  //       break;
  //     case "images": navigate("insertimages")
  //       break;
  //     case "blogs": navigate("insertblogs")
  //       break;
  //     default: navigate("admindashboard")
  //       break;
  //   }
  // }

  return (
    <>
      {/* <div className="nav">
        <ul className='menu'>
          <Link to="complaints"><li>Compliant List</li></Link>
          <Link to="refletter"><li>Reference Letter List</li></Link>
          <li>
            <select name="" className='form-select' onChange={(e) => selectOption(e.target.value)}>
              <option value="data" >Insert Data</option>
              <option value="images" >Insert Images</option>
              <option value="blogs" >Insert blogs</option>
            </select>
          </li>
        </ul>
      </div> */}
      <div className='nav-counter'>
        <div>
          <button className='count'>Total Complaints : {data?.length}</button>
          <button className='count'>Total Pending : {pending?.length}</button>
          <button className='count'>Total Solved : {solved?.length}</button>
        </div>
      </div>
      <hr />
    </>
  )
}

export default AdminDashboard
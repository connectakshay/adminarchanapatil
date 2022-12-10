import React, { useState } from 'react'
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Update.css';

const Update = () => {

    const [status, setStatus] = useState("");
    const [remark, setRemark] = useState("");
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const param = useParams();
    const id = param.id;


    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        const res = await fetch(`http://localhost:5000/compliant/${id}`);
        const result = await res.json();
        setData(result);
    }

    const updateData = async () => {
        const res = await fetch(`http://localhost:5000/compliant/${id}`,{
            method:"PUT",
            body: JSON.stringify({ status, remark }),
            headers: {
                'Content-Type': 'application/json',
                'authorization': JSON.parse(localStorage.getItem("token"))
            }
        });
        const result = await res.json();
        if (result) 
        {
            navigate("/admindashboard/complaints");
        }
    }


    return (
        <div className='update-page'>
            <table>
                <thead className='table-head'>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Mobile No.</th>
                        <th>Location</th>
                        <th>Category</th>
                        <th>Complaint</th>
                        <th>Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        data?.map((item) => {
                            return (
                                <tr>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.mobile}</td>
                                    <td>{item.location}</td>
                                    <td>{item.category}</td>
                                    <td>{item.complaints}</td>
                                    <td>{item.date}</td>
                                    <td>{item.status}</td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </table>
            <div className='update-field'>
                <label>Remark :-</label>
                <input type="text" required onChange={ (e) => setRemark(e.target.value) }/>
                <label>Status :-</label>
                <select name="" id="" onChange={(e) => setStatus(e.target.value)}>
                    <option value="pending">Pending</option>
                    <option value="solve">Solve</option>
                </select><br />
            </div>
            <button className='submit' onClick={() => updateData()}>Submit</button>
        </div>
    )
}

export default Update;
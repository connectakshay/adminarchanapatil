import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ComplaintList.css';
import { faMagnifyingGlass, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment/moment';

const ComplaintList = () => {

    const [data, setData] = useState([]);
    const [rotateAero, SetRotateAero] = useState(false);



    useEffect(() => {
        getComplaintData();
    }, [])

    const getComplaintData = async () => {
        const res = await fetch("http://localhost:5000/complaint",{
            headers: {
                authorization: JSON.parse(localStorage.getItem("token"))
            }
        });
        const result = await res.json();
        setData(result);
    }

    const getSearchData = async (key) => {
        if (key) {
            const res = await fetch(`http://localhost:5000/search/${key}`,{
                headers: {
                    authorization: JSON.parse(localStorage.getItem("token"))
                }
            });
            const result = await res.json();
            setData(result);
        }
        else {
            getComplaintData();
        }
    }

    const setOldComplaint = () => 
    {
        SetRotateAero(!rotateAero);

        if (rotateAero) 
        {
            let today = new Date();
            let priorDate = moment(new Date(new Date().setDate(today.getDate() - 3))).format("YYYY-MM-DD  hh:mm:ss");
            const array = data?.filter((item) => {
                return item.date <= priorDate;
            })
            setData(array);
        }
        else
        {
            getComplaintData();
        }
    }


    return (
        <>
            <div className="table-container conatainer-flued">
                <div className='table-header'>
                    <div className='old_compliant' onClick={() => setOldComplaint()}>
                        <div className='inner-box'>
                            <button>3 Days Old </button>
                            <FontAwesomeIcon icon={faAngleRight} color="#ffffff" className={rotateAero ? "right-aero" : "right-aero-rotate"} />
                        </div>
                    </div>
                    <div className='table-heading'>
                        <h1>ComplaintList</h1>
                    </div>
                    <div className='search_box'>
                        <input type="text" placeholder='Search...' onChange={(e) => getSearchData(e.target.value)} />
                        <FontAwesomeIcon icon={faMagnifyingGlass} color="gray" size="2x" />
                    </div>
                </div>
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
                            <th>Action</th>
                            <th>Image</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data?.map((item) => {

                                return (
                                    <>
                                        <tr>
                                            <td>{item.id}</td>
                                            <td>{item.name}</td>
                                            <td>{item.mobile}</td>
                                            <td>{item.location}</td>
                                            <td>{item.category}</td>
                                            <td>{item.complaints}</td>
                                            <td>{moment(item.date).format("YYYY-MM-DD")}</td>
                                            <td>{item.status}</td>
                                            <td>
                                                <Link to={"update/" + item.id}>Update</Link>
                                            </td>
                                            <td><img src={`/uploads/${item.image}`} alt="" width="100px" height="100px" /></td>
                                        </tr>
                                    </>
                                )

                            })
                        }

                    </tbody>
                </table>
            </div>
        </>
    )
}

export default ComplaintList
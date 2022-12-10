import React from 'react';
import { useEffect, useState } from 'react';

const RefLetter = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    getRefLetterData();
  }, [])

  const getRefLetterData = async () => {
    const res = await fetch("http://localhost:5000/refLetter",{
      headers: {
        authorization: JSON.parse(localStorage.getItem("token"))
    }
    });
    const result = await res.json();
    setData(result);
  }

  return (
    <>
      <div className="table-container conatainer-flued">
        <h1>Reference Letter List</h1>
        <table>
          <thead className='table-head'>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile No.</th>
              <th>Date</th>
              <th>Text</th>
            </tr>
          </thead>
          <tbody>
            {
              data?.map((item) => {
                return (
                  <>
                    <tr>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.mobile}</td>
                      <td>{item.dob}</td>
                      <td>{item.pattern}</td>
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

export default RefLetter
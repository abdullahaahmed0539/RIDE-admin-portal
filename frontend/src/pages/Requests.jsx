import { useEffect, useState } from "react";
import { getAllRequests } from "../API calls/requests";

const Requests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    getAllRequests().then(response => setRequests(response.data.data.requests));
  }, []);

  return (
    <div className="container">
      <div className="row mt-3">
        {requests.length !== 0? <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Application ID</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}.</td>
                <td>{item._id}</td>
                <td>
                  <a href={`/requests/${item._id}`}>View</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>: <h2>No applications to process 💤. You are good to go!</h2>}
      </div>
    </div>)
  
};

export default Requests;

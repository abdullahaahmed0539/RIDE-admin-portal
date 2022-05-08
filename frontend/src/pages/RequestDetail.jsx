import { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { useParams, withRouter } from "react-router-dom";
import { getRequest, changeStatus } from "../API calls/requests";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RequestDetail = ({ history }) => {
  const requestId = useParams().id;
  const [loading, setLoading] = useState(true);
  const [request, setRequest] = useState({});
  const [linkOpened, setLinkOpened] = useState(false);

  const notify = message =>
    toast.success(message, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      onClose: ()=> {history.goBack();}
    });
  
  const notifyError = message =>
    toast.error(message, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
    });
  
  
  

  const capitalizeFirstLetter = string =>
    string.charAt(0).toUpperCase() + string.slice(1);

  const changeStatusHandler = decision => {
    changeStatus(requestId, decision)
      .then(response => {
        if (response.status === 201) {
          notify(`Successfully ${decision}. Redirecting`);
          
        } else {
          notifyError(`Unsuccessful`);
        }
      })
      .catch(err => notifyError("Unsuccessful"));
  };
  useEffect(() => {
    getRequest(requestId).then(response => {
      setRequest(response.data.data.request);
      setLoading(false);
    });
  }, []);

  return !loading ? (
    <div className="container">
      <h4 className="mt-4"> Application Id : {requestId}</h4>
      <h6>
        First name:{" "}
        <strong>
          <i>{capitalizeFirstLetter(request.firstName)}</i>
        </strong>
      </h6>
      <h6>
        last name:{" "}
        <strong>
          <i>{capitalizeFirstLetter(request.lastName)}</i>
        </strong>
      </h6>
      <h6>
        CNIC#:{" "}
        <strong>
          <i>{request.cnic}</i>
        </strong>
      </h6>
      <h6>
        Car model:{" "}
        <strong>
          <i>{capitalizeFirstLetter(request.carModel)}</i>
        </strong>
      </h6>
      <h6>
        Color:{" "}
        <strong>
          <i>{capitalizeFirstLetter(request.color)}</i>
        </strong>
      </h6>
      <h6>
        Milage:{" "}
        <strong>
          <i>{request.milage} km/l</i>
        </strong>
      </h6>
      <h6>
        License link:
        <a
          href={request.licenseURL}
          target="_blank"
          rel="noreferrer"
          onClick={() => {
            setLinkOpened(true);
          }}
        >
          {request.licenseURL}
        </a>
      </h6>
      <div className="mt-4">
        <button
          className="btn btn-success me-1"
          disabled={linkOpened ? false : true}
          onClick={() => changeStatusHandler("accepted")}
        >
          Accept
        </button>
        <button
          className="btn btn-danger"
          disabled={linkOpened ? false : true}
          onClick={() => changeStatusHandler("rejected")}
        >
          Reject
        </button>
        {!linkOpened ? (
          <p className="text-danger">*Please view the license first</p>
        ) : (
          <p></p>
        )}
        <ToastContainer />
      </div>
    </div>
  ) : (
    <div className="mt-3">
      <Spinner text="loading" />
    </div>
  );
};

export default withRouter(RequestDetail);

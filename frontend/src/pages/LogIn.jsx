import { useState } from "react";
import { login } from "../API calls/user";
import Error from "./Error";

const clearLocalMemory = () => {
  localStorage.removeItem("user_id");
  localStorage.removeItem("username");
  localStorage.removeItem("token");
  localStorage.removeItem("loggedIn");
};

const saveToLocalMemory = data => {
  localStorage.setItem("user_id", data._id);
  localStorage.setItem("username", data.username);
  localStorage.setItem("token", data.token);
  localStorage.setItem("loggedIn", 'true');
};

const LogIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  clearLocalMemory();

  const submitForm = async e => {
    e.preventDefault();
    const data = {
      username: username,
      password: password,
    };

       try {
      const response = await login(data);
      saveToLocalMemory(response.data.data);
      window.location = "requests";
    } catch (err) {
      if (err.response.status === 401)
        alert("Login unsuccessful. You have entered invalid password.");
      else if (err.response.status === 404)
        alert("Login unsuccessful. No such user found.");
      else setError(true);
    }
  };

  return (
    <div className="container-fluid ">
      {error && (
        <Error
          title="Internal Server Error"
          message="We are sorry for Inconvenience. You can try reloading the page."
        />
      )}
      {!error && (
        <div className="row ">
          <section
            className="offset-lg-1 col-lg-5 d-none d-sm-none d-md-none d-lg-block"
            style={{ height: "100vh" }}
          >
            <img
              src="https://img.icons8.com/nolan/452/car.png"
              className="img-fluid rounded-start "
              alt="..."
            />
          </section>
          <div className="col-12 col-lg-5 mt-5 ">
            <h1>Welcome to Ride Admin Portal.</h1>

            <div className="card">
              <div className="card-body">
                <form onSubmit={submitForm}>
                  <div className="row">
                    <div className="form-group ">
                      <label className="form-label">
                        <strong>Username</strong>
                      </label>
                      <input
                        onChange={e => setUsername(e.target.value)}
                        type="text"
                        className="form-control"
                        placeholder="Enter your username here"
                        autoFocus
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group mt-3">
                      <label className="form-label">
                        <strong>Password</strong>
                      </label>
                      <input
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                        className="form-control"
                        placeholder="Enter your password here"
                      />
                    </div>
                  </div>
                  <div className="row mt-4">
                    <div className="col-md-2">
                      <button
                        type="submit"
                        className="btn btn-primary submitbutton  "
                        disabled={
                          username === "" || password === "" ? true : false
                        }
                      >
                        Login
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LogIn;

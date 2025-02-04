import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../App.css";

const Register = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("Nepal");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("female");

  const navigate = useNavigate();

  const IsValidate = () => {
    let isproceed = true;
    let errormessage = "Please enter the value in ";

    if (!id) {
      isproceed = false;
      errormessage += " Username";
    }
    if (!name) {
      isproceed = false;
      errormessage += " Fullname";
    }
    if (!password) {
      isproceed = false;
      errormessage += " Password";
    }
    if (!email) {
      isproceed = false;
      errormessage += " Email";
    }

    if (!isproceed) {
      toast.warning(errormessage);
    } else {
      if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
        isproceed = false;
        toast.warning("Please enter a valid email");
      }
    }
    return isproceed;
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    let regobj = { id, name, password, email, phone, country, address, gender };

    if (IsValidate()) {
      fetch("http://localhost:8000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(regobj),
      })
      .then((res) => res.json()) 
      .then((data) => {
        toast.success("Registered successfully.");
        navigate("/login");
      })
        .catch((err) => {
          toast.error("Failed: " + err.message);
        });
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handlesubmit}>
        <div className="form-header">
          <h1>User Registration</h1>
        </div>
        <div className="form-body">
          <div className="form-group">
            <label>User Name <span className="errmsg">*</span></label>
            <input
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label>Password <span className="errmsg">*</span></label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label>Full Name <span className="errmsg">*</span></label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label>Email <span className="errmsg">*</span></label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label>Country <span className="errmsg">*</span></label>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="form-control"
            >
              <option value="Nepal">Nepal</option>
              <option value="India">India</option>
              <option value="India">China</option>
            </select>
          </div>

          <div className="form-group">
            <label>Address</label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="form-control"
            />
          </div>

         <br />

          <div className=" checkbox">
            <label>Gender</label>
            <input
              type="radio"
              checked={gender === "male"}
              onChange={(e) => setGender(e.target.value)}
              name="gender"
              value="male"
              className="app-check"
            />
            <label>Male</label>

            <input
              type="radio"
              checked={gender === "female"}
              onChange={(e) => setGender(e.target.value)}
              name="gender"
              value="female"
              className="app-check"
            />
            <label>Female</label>
          </div>
        </div>

        <div className="form-footer">
          <button type="submit" className="btn-primary">Register</button>
          <Link to="/login" className="btn-danger">Close</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;

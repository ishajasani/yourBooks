import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Signup = ({ showAlert }) => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    name: "",
    cpassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, cpassword } = credentials;

    if (password !== cpassword) {
      showAlert("Passwords do not match", "danger");
      return;
    }

    const response = await fetch("http://localhost:8000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRiMTUyMWY5OTliODE4Y2FiZTYwZDRjIn0sImlhdCI6MTY4OTQyMTQyNH0.q6vwEQWqdx29yOR2ThxsU1l3BSfvgfM0C6cmnghFF_c",
      },
      body: JSON.stringify({ name, email, password }),
    });
    const json = await response.json();
    if (json.success) {
      localStorage.setItem("token", json.authtoken);
      navigate("/home");
      showAlert("Account Created Successfully", "success");
    } else {
      showAlert("Please Enter Valid Values", "danger");
    }
  };

  const onChange = (e) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const PasswordStrengthIndicator = ({ password }) => {
    const getStrength = (password) => {
      let strength = 0;
      if (password.length >= 8) strength += 1;
      if (password.match(/[a-z]+/)) strength += 1;
      if (password.match(/[A-Z]+/)) strength += 1;
      if (password.match(/[0-9]+/)) strength += 1;
      if (password.match(/[$@#&!]+/)) strength += 1;

      return strength;
    };

    const getStrengthText = (strength) => {
      switch (strength) {
        case 0:
          return { text: "Very Weak", class: "danger" };
        case 1:
          return { text: "Weak", class: "danger" };
        case 2:
          return { text: "Fair", class: "warning" };
        case 3:
          return { text: "Good", class: "info" };
        case 4:
        case 5:
          return { text: "Strong", class: "success" };
        default:
          return { text: "Very Weak", class: "danger" };
      }
    };

    const strength = getStrength(password);
    const strengthInfo = getStrengthText(strength);
    const percentage = (strength / 5) * 100;

    return (
      <div className="mt-2">
        <div className="progress" style={{ height: "6px" }}>
          <div
            className={`progress-bar bg-${strengthInfo.class}`}
            role="progressbar"
            style={{ width: `${percentage}%` }}
            aria-valuenow={percentage}
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
        <div className="d-flex justify-content-between mt-1">
          <small className={`text-${strengthInfo.class}`}>
            {strengthInfo.text}
          </small>
          <small className="text-muted">Password Requirements:</small>
        </div>
        <div className="mt-1">
          <small className="d-block text-muted">
            <i
              className={`fa-solid fa-${
                password.length >= 8
                  ? "check text-success"
                  : "xmark text-danger"
              } me-2`}
            ></i>
            At least 8 characters
          </small>
          <small className="d-block text-muted">
            <i
              className={`fa-solid fa-${
                password.match(/[a-z]/) && password.match(/[A-Z]/)
                  ? "check text-success"
                  : "xmark text-danger"
              } me-2`}
            ></i>
            Mix of uppercase & lowercase letters
          </small>
          <small className="d-block text-muted">
            <i
              className={`fa-solid fa-${
                password.match(/[0-9]/)
                  ? "check text-success"
                  : "xmark text-danger"
              } me-2`}
            ></i>
            At least one number
          </small>
          <small className="d-block text-muted">
            <i
              className={`fa-solid fa-${
                password.match(/[$@#&!]/)
                  ? "check text-success"
                  : "xmark text-danger"
              } me-2`}
            ></i>
            At least one special character ($@#&!)
          </small>
        </div>
      </div>
    );
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              <div className="text-center mb-4">
                <i
                  className="fa-solid fa-user-plus text-primary"
                  style={{ fontSize: "3rem" }}
                ></i>
                <h2 className="mt-3 mb-1">Create Account</h2>
                <p className="text-muted">Join us to manage your books</p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label fw-semibold">
                    Full Name
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-light">
                      <i className="fa-solid fa-user"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      placeholder="Enter your name"
                      onChange={onChange}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label fw-semibold">
                    Email address
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-light">
                      <i className="fa-solid fa-envelope"></i>
                    </span>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      placeholder="Enter your email"
                      onChange={onChange}
                      required
                    />
                  </div>
                </div>
                  <div className="mb-3">
                    <label
                      htmlFor="password"
                      className="form-label fw-semibold"
                    >
                      Password
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-light">
                        <i className="fa-solid fa-lock"></i>
                      </span>
                      <input
                        type={showPassword ? "text" : "password"}
                        className="form-control"
                        id="password"
                        name="password"
                        placeholder="Create password"
                        onChange={onChange}
                        minLength={5}
                        required
                      />
                      <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <i
                          className={`fa-solid ${
                            showPassword ? "fa-eye-slash" : "fa-eye"
                          }`}
                        ></i>
                      </button>
                    </div>
                    <PasswordStrengthIndicator
                      password={credentials.password}
                    />
                  </div>

                <div className="mb-4">
                  <label htmlFor="cpassword" className="form-label fw-semibold">
                    Confirm Password
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-light">
                      <i className="fa-solid fa-lock"></i>
                    </span>
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control"
                      id="cpassword"
                      name="cpassword"
                      placeholder="Confirm password"
                      onChange={onChange}
                      minLength={5}
                      required
                    />
                  </div>
                </div>

                <div className="d-grid gap-2">
                  <button
                    type="submit"
                    className="btn btn-primary py-2"
                    disabled={
                      !credentials.email ||
                      !credentials.password ||
                      !credentials.name
                    }
                  >
                    <i className="fa-solid fa-user-plus me-2"></i>
                    Create Account
                  </button>
                </div>

                <div className="text-center mt-4">
                  <p className="mb-0">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="text-primary text-decoration-none"
                    >
                      Login
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

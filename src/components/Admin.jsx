import Button from "react-bootstrap/Button";
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import "./../css/Admin.css";

function Admin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = (e) => {
    e.preventDefault();
    navigate("/adminpanel");
  };

  return (
    <div className="adminContainer">
      <div className="formContainer">
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Username or E-mail Address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" onChange={(e) => setUsername(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          </Form.Group>
          <div className="buttonAdminDiv">
            <Button id="buttonAdminText" variant="primary" type="submit" onClick={login}>
              LOGIN
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Admin;

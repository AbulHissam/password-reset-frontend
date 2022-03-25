import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

const baseUrl = process.env.REACT_APP_BASE_URL;

const toastEmitterConfig = {
  position: "top-right",
  autoClose: 2000,
  closeOnClick: true,
  draggable: false,
};

const Login = ({ setKey }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.warning("Email or Password is missing", toastEmitterConfig);
      return;
    }

    try {
      const res = await axios.post(
        `${baseUrl}/api/user/login`,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 200) {
        toast.success("login success", toastEmitterConfig);
        setEmail("");
        setPassword("");
      }
    } catch (err) {
      const message = err.response?.data.message;
      toast.error(
        `${message ? message : "Something went wrong"}`,
        toastEmitterConfig
      );
      console.log(err);
    }
  };

  return (
    <div>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <div className="d-flex gap-2">
          <Button
            variant="danger"
            className="w-50"
            onClick={() => {
              setEmail("abulhissam@test.com");
              setPassword("12345");
            }}
          >
            Get credentials
          </Button>

          <Button
            variant="primary"
            type="submit"
            className="w-50"
            onClick={submitHandler}
          >
            Login
          </Button>
        </div>
      </Form>

      <div
        className="text-center text-primary mt-2"
        style={{
          cursor: "pointer",
          textDecoration: "underline",
        }}
        onClick={(e) => {
          setKey("reset");
          e.stopPropagation();
        }}
      >
        Forgot password?
      </div>
    </div>
  );
};

export default Login;

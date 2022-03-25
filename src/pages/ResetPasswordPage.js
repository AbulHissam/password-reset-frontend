import axios from "axios";
import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const baseUrl = process.env.REACT_APP_BASE_URL;

const toastEmitterConfig = {
  position: "top-right",
  autoClose: 3000,
  closeOnClick: true,
  draggable: false,
};

const ResetPasswordPage = ({ url, setUrl }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword) {
      toast.warning("Please fill all the fields", toastEmitterConfig);
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match", toastEmitterConfig);
      return;
    }

    try {
      const res = await axios.post(
        `${baseUrl}/api/auth/${url.split("auth")[1]}`,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 200) {
        toast.success("Password reset success", toastEmitterConfig);

        setTimeout(() => {
          setUrl("");
          navigate("/");
        }, 2000);
        // navigate("/");
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
    <Container>
      <div
        style={{
          width: "50%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          margin: "40px auto",
          padding: "20px",
          border: "1px solid #dee2e6",
        }}
      >
        <p className="text-center text-primary border-bottom p-1 fs-3 fw-bold">
          Reset Password
        </p>
        {!url && (
          <p
            className="text-center text-warning border-bottom p-1 fs-5"
            style={{ cursor: "pointer", textDecoration: "underline" }}
            onClick={() => {
              navigate("/");
            }}
          >
            Request reset url to continue!
          </p>
        )}
        {url && (
          <Form>
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
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>

            <div className="d-flex">
              <Button
                variant="primary"
                type="submit"
                className="mx-auto mb-2"
                onClick={submitHandler}
              >
                Submit
              </Button>
            </div>
          </Form>
        )}
      </div>
    </Container>
  );
};

export default ResetPasswordPage;

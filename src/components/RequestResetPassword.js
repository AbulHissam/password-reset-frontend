import React, { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const baseUrl = process.env.REACT_APP_BASE_URL;

const toastEmitterConfig = {
  position: "top-right",
  autoClose: 2000,
  closeOnClick: true,
  draggable: false,
};

const RequestResetPassword = ({ url, setUrl }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.warn("Enter email to proceed", toastEmitterConfig);
      return;
    }

    try {
      const res = await axios.post(
        `${baseUrl}/api/auth/requestPasswordReset`,
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 200) {
        toast.success("Password reset link generated", toastEmitterConfig);
        setUrl(res.data.url);
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
    <>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="d-flex mt-4">
            <Button
              variant="primary"
              type="submit"
              className="mx-auto"
              onClick={submitHandler}
            >
              Submit
            </Button>
          </div>
        </Form.Group>

        {url && (
          <div
            className="text-center text-primary fs-5"
            style={{
              cursor: "pointer",
              textDecoration: "underline",
            }}
            onClick={() => {
              navigate(`/resetPassword`);
            }}
          >
            click here to reset
          </div>
        )}
      </Form>
    </>
  );
};

export default RequestResetPassword;

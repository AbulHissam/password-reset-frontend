import React, { useState } from "react";
import { Container, Tabs, Tab } from "react-bootstrap";
import Login from "../components/Login";
import RequestResetPassword from "../components/RequestResetPassword";

const AuthPage = ({ url, setUrl }) => {
  const [key, setKey] = useState("login");

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
          Forgot Password Flow
        </p>
        <Tabs
          className="mb-3 nav-pills"
          fill
          activeKey={key}
          onSelect={(k) => setKey(k)}
        >
          <Tab eventKey="login" title="Login">
            <Login setKey={setKey} />
          </Tab>
          <Tab eventKey="reset" title="Reset password">
            <RequestResetPassword setUrl={setUrl} url={url} />
          </Tab>
        </Tabs>
      </div>
    </Container>
  );
};

export default AuthPage;

import React from "react";
import LoginForm from "./LoginForm";
import styled from "styled-components";
import { Container } from "react-bootstrap";
import { Form } from "react-final-form";
import { loginUser, logoutUser } from "../../shared/utils/cognito";
import { useUser } from "../../Contexts/UserContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const LoginContainer = styled.div`
    max-width: 500px;
    margin: 10em auto;
  `;

  const navigate = useNavigate();
  const userData = useUser();

  const onFormSubmit = async (values) => {
    loginUser(values.username, values.password);
  };

  return (
    <Container>
      <LoginContainer>
        <h1 className="mb-4">Login</h1>
        {!userData?.profileData?.data?.username && (
          <Form
            onSubmit={onFormSubmit}
            render={({ handleSubmit }) => {
              return (
                <form onSubmit={handleSubmit}>
                  <LoginForm />
                </form>
              );
            }}
          />
        )}
        {userData?.profileData?.data?.username && (
          <>
            <div>
              You are currently logged in as :{" "}
              {userData?.profileData?.data?.email}
            </div>
            <div>
              <button
                onClick={() => {
                  logoutUser();
                  navigate("/tags");
                }}
              >
                logout
              </button>
            </div>
          </>
        )}
      </LoginContainer>
    </Container>
  );
};

export default LoginPage;

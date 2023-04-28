// React and Next
import React from "react";
import Link from "next/link";

// Bootstrap
import { Container, Button } from "react-bootstrap";

// Storygraf Items
import { Form } from "react-final-form";
import { loginUser, logoutUser } from "../../utils/cognito";
import { useUser } from "../../Contexts/UserContext";
import InputWrapper from "../../components/Forms/InputWrapper";

import styles from "./styles.module.css";

const LoginPage = () => {
  const userData = useUser();

  const onFormSubmit = async (values) => {
    loginUser(values.username, values.password);
  };

  return (
    <Container>
      <div className={styles.LoginContainer}>
        <h1 className="mb-4">Login</h1>
        {!userData?.profileData?.data?.username && (
          <Form
            onSubmit={onFormSubmit}
            render={({ handleSubmit }) => {
              return (
                <form onSubmit={handleSubmit}>
                  <Container>
                    <InputWrapper
                      label={"email"}
                      name={"username"}
                      required={true}
                    />
                    <InputWrapper
                      label={"Password"}
                      name={"password"}
                      type={"password"}
                      required={true}
                    />

                    <Button variant="primary" type="submit">
                      Login
                    </Button>
                    <p className="forgot-password text-right">
                      Not a user?{" "}
                      <Link href="/Register">Create an Account</Link>
                    </p>
                  </Container>
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
                }}
              >
                logout
              </button>
            </div>
          </>
        )}
      </div>
    </Container>
  );
};

export default LoginPage;

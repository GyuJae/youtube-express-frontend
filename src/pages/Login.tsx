import React from "react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";

interface ILogin {
  email: string;
  password: string;
}

const LoginContainer = styled.main`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const Form = styled.form`
  display: flex;
  border-radius: 5px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  width: 30%;
  padding: 20px;
`;

const Input = styled.input`
  background-color: ${(props) => props.theme.colors.white};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  padding: 5px 20px;
  margin-bottom: 5px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  width: 80%;
`;

const SubmitInput = styled.input`
  width: 80%;
  background-color: ${(props) => props.theme.colors.blue};
  color: ${(props) => props.theme.colors.white};
  padding: 5px 20px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    filter: brightness(120%);
  }
`;

const CreateAccountContainer = styled.div`
  margin-top: 10px;
  color: ${(props) => props.theme.colors.grayIcon};
  font-size: 12px;
`;

const CreateAccountLink = styled(Link)`
  color: ${(props) => props.theme.colors.blue};
  font-weight: 700;
  &:hover {
    text-decoration: underline;
  }
`;

const Login = () => {
  const TOKEN = "token";
  const { register, handleSubmit } = useForm<ILogin>();
  const history = useHistory();
  const [loginData, setLoginData] = useState<{
    ok: boolean;
    error?: string;
    token?: string;
  } | null>(null);

  const onSubmit: SubmitHandler<ILogin> = async ({ email, password }) => {
    await axios({
      method: "post",
      url: "http://localhost:4000/users/login",
      data: {
        email,
        password,
      },
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then(({ data }) => {
        setLoginData(data);
        if (loginData?.token) {
          localStorage.setItem(TOKEN, loginData.token);
          axios.defaults.headers["token"] = loginData.token;
          history.push("/");
          history.go(0);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <LoginContainer>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input placeholder="email" {...register("email")} />
        <Input
          placeholder="password"
          type="password"
          {...register("password")}
        />
        <SubmitInput type="submit" value="로그인" />
      </Form>
      <CreateAccountContainer>
        아직 계정이 없으신가요?{" "}
        <CreateAccountLink to={"/create-account"}>
          계정 만들기
        </CreateAccountLink>
      </CreateAccountContainer>
      {loginData?.error && <ErrorMessage error={loginData.error} />}
    </LoginContainer>
  );
};

export default Login;

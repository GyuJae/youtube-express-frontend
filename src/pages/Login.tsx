import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import { userService } from "../api/api";

interface ILogin {
  email: string;
  password: string;
}

const LoginContainer = styled.main`
  display: flex;
  justify-content: center;
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

const LoginInput = styled.input`
  width: 80%;
  background-color: ${(props) => props.theme.colors.blue};
  color: ${(props) => props.theme.colors.white};
  padding: 5px 20px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Login = () => {
  const { register, handleSubmit } = useForm<ILogin>();

  const onSubmit: SubmitHandler<ILogin> = async (data) => {
    await userService.login(data);
  };

  return (
    <LoginContainer>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input placeholder="email" {...register("email")} />
        <Input placeholder="password" {...register("password")} />
        <LoginInput type="submit" value="로그인" />
      </Form>
    </LoginContainer>
  );
};

export default Login;

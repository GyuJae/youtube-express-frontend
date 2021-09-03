import axios from "axios";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import ErrorMessage from "../components/ErrorMessage";

interface ICreateAccount {
  email: string;
  password: string;
  username: string;
}

const AccountContainer = styled.main`
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

const CreateAccount = () => {
  const { register, handleSubmit } = useForm<ICreateAccount>();
  const [error, setError] = useState<string | null>();
  const history = useHistory();
  const onSubmit: SubmitHandler<ICreateAccount> = async (data) => {
    await axios({
      method: "post",
      url: "http://localhost:4000/users/join",
      data: {
        ...data,
      },
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then(({ data: { ok, error } }) => {
        if (ok) {
          alert("계정을 만들었습니다! 축하합니다~");
          history.push("/login");
        }
        if (error?.code === 11000) {
          setError("Email or username already exist.");
        }
      })
      .catch((e) => {
        setError(e);
      });
  };

  return (
    <AccountContainer>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input type="email" placeholder="email" {...register("email")} />
        <Input
          type="password"
          placeholder="password"
          {...register("password")}
        />
        <Input placeholder="username" {...register("username")} />
        <SubmitInput type="submit" />
      </Form>
      {error && <ErrorMessage error={error} />}
    </AccountContainer>
  );
};

export default CreateAccount;

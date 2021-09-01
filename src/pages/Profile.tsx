import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import { TOKEN } from "../contants";
import { tokenVerify } from "../utils/tokenVerify";

interface IEditForm {
  username: string;
  avatarURL: string;
  password: string;
}

const ProfileContainer = styled.main`
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
  align-items: flex-start;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  width: 30%;
  padding: 20px;
`;

const Label = styled.label`
  margin-bottom: 7px;
  font-size: 14px;
  font-weight: 700;
  margin-left: 3px;
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

const Profile = () => {
  const { register, handleSubmit } = useForm<IEditForm>();
  const [user, setUser] = useState<any>(null);
  const token = localStorage.getItem(TOKEN);
  const onSubmit: SubmitHandler<IEditForm> = async ({
    username,
    avatarURL,
    password,
  }) => {
    await axios({
      method: "POST",
      url: `http://localhost:4000/users/edit/${user?._id}`,
      data: {
        username,
        avatarURL,
        password,
      },
      headers: {
        "Access-Control-Allow-Origin": "*",
        TOKEN: token,
      },
    })
      .then(({ data }) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getUser = async (token: string) => {
    const result = await tokenVerify(token);
    setUser(result?.data);
  };

  useEffect(() => {
    if (token) {
      getUser(token);
    }
  }, [token]);
  return (
    <ProfileContainer>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Label htmlFor="username">Username</Label>
        <Input id="username" placeholder="Username" {...register("username")} />
        <Label htmlFor="password">Password</Label>
        <Input id="password" placeholder="Password" {...register("password")} />
        <Label htmlFor="avatarURL">AvatarURL</Label>
        <Input
          id="avatarURL"
          placeholder="AvatarURL"
          {...register("avatarURL")}
        />
        <SubmitInput type="submit" />
      </Form>
    </ProfileContainer>
  );
};

export default Profile;

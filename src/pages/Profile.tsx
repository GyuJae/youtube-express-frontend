import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import { TOKEN } from "../contants";
import { tokenVerify } from "../utils/tokenVerify";
import { useHistory } from "react-router-dom";
import { IUser } from "../types/User.interface";

interface IEditForm {
  username: string;
  avatarURL: string;
  password: string;
}

const ProfileContainer = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
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
  width: 90%;
`;

const SubmitInput = styled.input`
  width: 90%;
  margin-top: 10px;
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

const BtnContainer = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 20%;
`;

const Btn = styled.button`
  padding: 5px 10px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.colors.white};
  &:hover {
    filter: brightness(90%);
  }
`;

const LogoutBtn = styled(Btn)`
  background-color: ${(props) => props.theme.colors.cancelRed};
`;

const DeleteAccount = styled(Btn)`
  background-color: ${(props) => props.theme.colors.red};
`;

const Profile = () => {
  const { register, handleSubmit } = useForm<IEditForm>();
  const history = useHistory();
  const [user, setUser] = useState<IUser>();
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
      .then(({ data: { ok } }) => {
        if (ok) {
          history.push("/");
          history.go(0);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const logout = () => {
    localStorage.removeItem(TOKEN);
    history.push("/");
    history.go(0);
  };

  const getUser = async (token: string) => {
    const result = await tokenVerify(token);
    setUser(result?.data as IUser);
  };

  const deleteAccount = async () => {
    await axios({
      method: "post",
      url: `http://localhost:4000/users/remove/${user?._id}`,
      headers: {
        "Access-Control-Allow-Origin": "*",
        TOKEN: token,
      },
    })
      .then(({ data: { ok } }) => {
        if (ok) {
          localStorage.removeItem(TOKEN);
          history.push("/");
          history.go(0);
        }
      })
      .catch((error) => {
        console.log(error);
      });
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
        <Input
          id="username"
          placeholder="Username"
          defaultValue={user?.username}
          {...register("username")}
        />
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          placeholder="Password"
          defaultValue={user?.password}
          {...register("password")}
        />
        <Label htmlFor="avatarURL">AvatarURL</Label>
        <Input
          id="avatarURL"
          placeholder="AvatarURL"
          defaultValue={user?.avatarUrl}
          {...register("avatarURL")}
        />
        <SubmitInput type="submit" value="편집" />
      </Form>
      <BtnContainer>
        <LogoutBtn onClick={logout}>로그아웃</LogoutBtn>
        <DeleteAccount onClick={deleteAccount}>계정삭제</DeleteAccount>
      </BtnContainer>
    </ProfileContainer>
  );
};

export default Profile;

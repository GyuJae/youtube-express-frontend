import React from "react";
import styled from "styled-components";

interface IProfileIcon {
  username: string;
}

const ProfileIconContainer = styled.div<{ color: string }>`
  color: ${(props) => props.theme.colors.white};
  background: ${(props) => props.color};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  font-size: 20px;
  width: 32px;
  height: 32px;
  margin-right: 10px;
  &:hover {
    filter: brightness(90%);
  }
`;

const Username = styled.span`
  margin-bottom: 5px;
  margin-left: 1.2px;
`;

const ProfileIcon: React.FC<IProfileIcon> = ({ username }) => {
  const makeColor = (): string => {
    let color = "#";
    const hexList = [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
    ];
    for (var i = 0; i < 6; i++) {
      const randomNumber = Math.floor(Math.random() * hexList.length);
      color += hexList[randomNumber];
    }
    return color;
  };

  return (
    <ProfileIconContainer color={makeColor()}>
      <Username>{username.slice(0, 2)}</Username>
    </ProfileIconContainer>
  );
};

export default ProfileIcon;

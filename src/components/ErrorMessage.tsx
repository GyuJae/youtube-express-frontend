import React from "react";
import styled from "styled-components";

interface IErrorMessage {
  error: string;
}

const ErrorContainer = styled.div`
  margin-top: 10px;
`;

const ErrorSpan = styled.h4`
  color: ${(props) => props.theme.colors.red};
`;

const ErrorMessage: React.FC<IErrorMessage> = ({ error }) => {
  return (
    <ErrorContainer>
      <ErrorSpan>{error}</ErrorSpan>
    </ErrorContainer>
  );
};

export default ErrorMessage;

import { GithubAuthProvider, signInWithPopup } from "firebase/auth";

import styled from "styled-components";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Button = styled.span`
  background-color: white;
  font-weight: 600;
  width: 100%;
  margin-top: 50px;
  color: black;
  cursor: pointer;
  padding: 10px 20px;
  border-radius: 50px;
  border: 0;
  display: flex;
  gap: 5;
  align-items: center;
  justify-content: center;
`;

const Logo = styled.img`
  height: 25px;
`;

const GithubButton = () => {
  const navigate = useNavigate();
  const onClick = async () => {
    try {
      const provider = new GithubAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Button onClick={onClick}>
      <Logo src="/githubLogo.png"></Logo> 깃허브로 로그인 하세요
    </Button>
  );
};

export default GithubButton;

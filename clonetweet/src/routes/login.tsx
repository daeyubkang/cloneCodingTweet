import React, { useState } from "react";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import {
  Form,
  Error,
  Input,
  Switcher,
  Title,
  Wrapper,
} from "../components/auth-components";
import GithubButton from "../components/github-btn";

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (isLoading || email === "" || password === "") return;
    try {
      setIsLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (e) {
      if (e instanceof FirebaseError) {
        setError(e.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Wrapper>
      <Title>로그인 🔒</Title>
      <Form onSubmit={onSubmit}>
        <Input
          onChange={onChange}
          name="email"
          placeholder="Email"
          type="email"
          value={email}
          required
        ></Input>
        <Input
          onChange={onChange}
          name="password"
          placeholder="Password"
          type="password"
          value={password}
          required
        ></Input>
        <Input
          type="submit"
          value={isLoading ? "Loading..." : "로그인 🔑"}
        ></Input>
      </Form>
      {error !== "" ? <Error>{error}</Error> : null}
      <Switcher>
        회원가입을 해주세요 <Link to="/create-account">회원가입 &rarr;</Link>
      </Switcher>
      <Switcher>
        비밀번호를 잊어버렸다면{" "}
        <Link to="/find-password">비밀번호 찾기 &rarr;</Link>
      </Switcher>
      <GithubButton></GithubButton>
    </Wrapper>
  );
};

export default Login;

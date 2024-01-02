import React, { useState } from "react";
import styled from "styled-components";
import { auth, db } from "../firebase";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { updateProfile } from "firebase/auth";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 500px;
  height: 300px;
`;

const CloseButton = styled.button`
  background-color: #093a3a;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  margin-top: 10px;

  &:hover,
  &:active {
    opacity: 0.9;
  }
`;

const TextArea = styled.textarea`
  border: 2px solid white;
  border-radius: 20px;
  font-size: 16px;
  color: white;
  background-color: black;
  width: 100%;
  resize: none;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  &::placeholder {
    font-size: 16px;
  }
  &:focus {
    outline: none;
    border-color: aqua;
  }
`;

const SubmitButton = styled.input`
  background-color: aqua;
  color: #ffffff;
  border: none;
  padding: 10px 0px;
  border-radius: 20px;
  font-size: 16px;
  cursor: pointer;
  &:hover,
  &:active {
    opacity: 0.9;
  }
`;

interface ModalProps {
  closeModal: () => void;
}

const NameEditModal: React.FC<ModalProps> = ({ closeModal }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const user = auth.currentUser;

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUsername(e.target.value);
  };

  const onClick = async () => {
    try {
      if (!user) return;
      setIsLoading(true);

      // 1. 사용자의 displayName 업데이트
      await updateProfile(user, {
        displayName: username,
      });

      // 2. 사용자의 게시글의 username 업데이트
      const q = query(
        collection(db, "tweets"),
        where("userId", "==", user.uid)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (docs) => {
        const targetDocRef = doc(db, "tweets", docs.id);
        await updateDoc(targetDocRef, { username, updatedAt: Date.now() });
      });

      closeModal();
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <TextArea
          onChange={onChange}
          placeholder="이름을 수정하세요"
        ></TextArea>
        <SubmitButton
          onClick={onClick}
          value={isLoading ? "Posting..." : "수정"}
        ></SubmitButton>
        <CloseButton onClick={closeModal}>닫기</CloseButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default NameEditModal;

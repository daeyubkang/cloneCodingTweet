import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { auth, db, storage } from "../firebase";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
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

const AttatchFileButton = styled.label`
  padding: 10px 0px;
  color: #2e7575;
  text-align: center;
  border-radius: 20px;
  border: 1px solid aqua;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
`;

const AttatchFileInput = styled.input`
  display: none;
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
  username: string;
  tweet2: string;
  photo?: string;
}

const Modal: React.FC<ModalProps> = ({
  closeModal,
  username,
  tweet2,
  photo,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [tweet, setTweet] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [file, setFile] = useState<File | null>(null);
  useEffect(() => {
    setTweet(tweet2);
    if (photo) {
      setPhotoURL(photo);
    }
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTweet(e.target.value);
  };
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length === 1) {
      if (files[0].size > 1000000) {
        alert("파일 용량이 너무 큽니다.");
        setFile(null);
        return;
      }
      setFile(files[0]);
    }
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user || isLoading || tweet === "" || tweet.length > 180) return;

    try {
      setIsLoading(true);

      // 트윗 수정을 위해 기존 트윗 데이터 가져오기
      const tweetsRef = collection(db, "tweets");
      const querySnapshot = await getDocs(tweetsRef);
      let targetDocId = null;

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (
          data.userId === user.uid &&
          data.username === username &&
          data.tweet === tweet2
        ) {
          targetDocId = doc.id;
        }
      });

      if (targetDocId) {
        // 기존 트윗 업데이트
        const targetDocRef = doc(db, "tweets", targetDocId);
        await updateDoc(targetDocRef, { tweet, updatedAt: Date.now() });

        // 사진 업로드 및 기존 사진 삭제
        if (file) {
          const locationRef = ref(storage, `tweets/${user.uid}/${targetDocId}`);
          const result = await uploadBytes(locationRef, file);
          const url = await getDownloadURL(result.ref);
          await updateDoc(targetDocRef, { photo: url });
        }
        closeModal();
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <ModalOverlay>
      <ModalContent>
        <Form onSubmit={onSubmit}>
          <TextArea
            onChange={onChange}
            rows={5}
            maxLength={180}
            value={tweet}
            placeholder="What is happening"
          ></TextArea>
          <AttatchFileButton htmlFor="file2">
            {photoURL ? "사진 수정" : "사진 추가"}
            {file ? "✅" : ""}
          </AttatchFileButton>
          <AttatchFileInput
            type="file"
            id="file2"
            accept="image/*"
            onChange={onFileChange}
          ></AttatchFileInput>
          <SubmitButton
            type="submit"
            value={isLoading ? "Posting..." : "수정"}
          ></SubmitButton>
        </Form>
        <CloseButton onClick={closeModal}>닫기</CloseButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;

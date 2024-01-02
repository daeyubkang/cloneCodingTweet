import styled from "styled-components";
import PostTweetForm from "../components/post-tweet-form";
import TimeLine from "../components/timeline";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
  height: 90vh;
  /* overflow-y: scroll; */
  /* grid-template-rows: 1fr 14fr; */
`;

const Home = () => {
  return (
    <Wrapper>
      <PostTweetForm></PostTweetForm>
      <TimeLine></TimeLine>
    </Wrapper>
  );
};

export default Home;

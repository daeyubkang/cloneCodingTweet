# cloneCodingTweet

## 23-12-29

Firebase와 Vite 사용
typescript 사용
styledComponents 사용
createBrowerRouter 사용

firebase를 이용해 auth, CRUD 구현

파일구조
components

- auth-components: 로그인과 회원가입 페이지에서의 사용하는 디자인들을 styledComponent형식으로 만들어 재사용하도록 export
- github-btn: 로그인 페이지에서 gitbub 계정으로 로그인 할 수 있도록 하는 컴포넌트
- layout: 네비게이션 바
- loading-screen: Loading 시 보여주는 컴포넌트
- protected-route: 로그인 상태를 검증하여 로그인 여부로 페이지 분기
- modal: 게시글 수정 모달 컴포넌트
- name-edit-modal: 이름 수정 모달 컴포넌트
- post-tweet-form: 트윗을 게시하는 폼 컴포넌트
- timeline: 다른 모든 트윗을 볼 수 있는 컴포넌트
- tweets: 트윗 틀 컴포넌트

  routes

- create-account: 회원가입 페이지, 이름 이메일 비밀번호를 받아 회원가입 에러 발생 시 에러 이유 표기
- home: 트윗을 남길 수도 있고 다른 트위을 볼 수 있는 페이지
- login: 회원가입한 정보로 로그인, 깃허브 계정을 이용하여 로그인 가능
- profile: 본인 사진과 이름 작성한 트윗을 모아 볼 수 있다.
- find-password: 비밀번호를 재설정하는 페이지 이메일로 보내 인증을 한다.

배포 주소: https://clonetweet-fd9be.web.app

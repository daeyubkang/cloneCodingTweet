# cloneCodingTweet

## 23-12-29

Firebase와 Vite 사용
typescript 사용
styledComponents 사용
createBrowerRouter 사용

firebase를 이용해 auth 방식 구현

파일구조
components

- auth-components: 로그인과 회원가입 페이지에서의 사용하는 디자인들을 styledComponent형식으로 만들어 재사용하도록 export
- github-btn: 로그인 페이지에서 gitbub 계정으로 로그인 할 수 있도록 하는 컴포넌트
- layout: 네비게이션 바로 사용할 예정
- loading-screen: Loading 시 보여주는 컴포넌트
- protected-route: 로그인 상태를 검증하여 로그인 여부로 페이지 분기
  routes
- create-account: 회원가입 페이지, 이름 이메일 비밀번호를 받아 회원가입 에러 발생 시 에러 이유 표기
- home: 현재는 로그아웃을 하는 페이지
- login: 회원가입한 정보로 로그인, 깃허브 계정을 이용하여 로그인 가능

vite는 확실히 빠른 것이 체감이 된다.
typescript는 확실히 오류 처리에 효과적이다.

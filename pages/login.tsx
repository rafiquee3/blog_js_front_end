import Content from "../components/Content/Contnet.component";
import Header from "../components/Header/Header.component";
import LoginForm from "../components/LoginForm/LoginForm.component";

export default function Login() {
  return (
    <>
      <Header/>
      <Content>
        <LoginForm/>
      </Content>
    </>
  )
}
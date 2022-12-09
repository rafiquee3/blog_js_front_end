import Content from "../components/Content/Contnet.component";
import Header from "../components/Header/Header.component";
import RegisterForm from "../components/RegisterForm/RegisterForm.component";


export default function Signup() {
  return (
    <>
      <Header/>
      <Content>
        <RegisterForm/>
      </Content>
    </>
  )
}
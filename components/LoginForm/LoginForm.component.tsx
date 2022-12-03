import { css } from '@emotion/css'

const LoginForm = () => {
  const style = css`
    display: flex;
    width: 500px;
    height: 200px;
    border: 2px solid #166587;
    border-radius: 18px;
    overflow: hidden;
  
    div:nth-child(1) {
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 40%;
      align-items: center;
      background: #166587;
    }

    div:nth-child(2) {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 60%;
      background: #183D61;

      input:nth-child(1), input:nth-child(2) {
        height: 40px;
        border: none;
        border-bottom: 4px solid #166587;
        background: #183D61;
      }

      input:focus {
        border: none;
        background-color: #166587;
        outline: none;
        border-bottom: 4px solid red;
      }
  }
  `
  return (
    <>
      <form 
        action="" 
        method="get"
        className={style}
        onSubmit={(e: React.SyntheticEvent) => {
          e.preventDefault();
          const target = e.target as typeof e.target & {
            email: { value: string };
            password: { value: string };
          };
          const email = target.email.value; // typechecks!
          const password = target.password.value; // typechecks!
          // etc...
        }}
      >
        <div className="first">
          <p>Login</p>
          <p>Password</p>
        </div>
        <div>
          <input type="email" name="email" />
          <input type="password" name="password" /> 
          <input type="submit" value="login"></input>
        </div>
      </form>
    </>
  )
}
export default LoginForm;
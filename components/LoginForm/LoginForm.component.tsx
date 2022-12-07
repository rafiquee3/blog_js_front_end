import { css } from '@emotion/css'
import Image from 'next/image'
import { InferGetServerSidePropsType } from 'next'
import { GetServerSideProps } from 'next'

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
      color: white;

      input {
        font-size: 1em;
        color: #8CAFBD;
      }

      input:nth-child(1), input:nth-child(2) {
        height: 50px;
        margin: 5px;
        border: none;
        border-bottom: 1px solid #166587;
        background: #183D61;
      }

      input:nth-child(3) {
        position: relative;
        top: 8px;
        align-self: flex-end;
        gap: 10px;
        color: #7FA2B3;
        background: #183D61;
        border: 1px solid #166587;
        border-radius: 14px;
        padding: 8px 12px 8px 12px;
        margin-right: 12px;

        &:hover {
          color: green;
          cursor: pointer;
          border-color: green;
        }
      }

      input:focus-visible {
        outline: none;
        border-bottom: 1px solid green;
      }

      input::placeholder {
        font-size: 1em;
        opacity: .5;
        color: gray;
      }
    }

    input:-webkit-autofill,
    input:-webkit-autofill:hover, 
    input:-webkit-autofill:focus, 
    input:-webkit-autofill:active{
      -webkit-box-shadow: 0 0 0 30px #183D61 inset !important;
    }
  `
  const styleImg = css`
    opacity: 0.4;
  `
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };
    const email = target.email.value; // typechecks!
    const password = target.password.value; // typechecks!
    // etc...
  }
  return (
    <>
      <form 
        action="" 
        method="get"
        className={style}
        onSubmit={handleSubmit}
      >
        <div>
          <Image
            src="/login.png"
            alt="Picture of the author"
            width={110}
            height={110}
            className={styleImg}
          />
        </div>
        <div>
          <input type="text" name="login" placeholder="login"/>
          <input type="password" name="password" placeholder="password"/> 
          <input type="submit" value="login"></input>
        </div>
      </form>
    </>
  )
}
export default LoginForm;



type Data = {
  login: string,
  email: string,
  password: string,
  firstName?: string,
  lastName?: string
 }

export const getServerSideProps: GetServerSideProps<{ data: Data }> = async () => {
  const res = await fetch('https://.../data')
  const data: Data = await res.json()

  return {
    props: {
      data,
    },
  }
}

function Page({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  // will resolve data to type Data
}

export default Page
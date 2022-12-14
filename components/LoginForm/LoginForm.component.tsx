import { css } from '@emotion/css'
import Image from 'next/image'
import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const LoginForm = () => {
  const enum FontColor {
    GREEN = 'green',
    RED = '#BE5555',
    DEFAULT = '#8CAFBD',
    GRAY = 'gray'
  }
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [currentField, setCurrentField] = useState('');
  const [error, setError] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const router = useRouter();

  const style = css`
    display: flex;
    position: relative;
    border: 2px solid #166587;
    border-radius: 18px;
    overflow: hidden;

    div:nth-child(1) {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background: #166587;
      padding: 30px;
    }
    div:nth-child(2) {
      display: flex;
      flex-direction: column;
      justify-content: 'flex-start';
      align-items: center;
      padding: 25px;
      background: #183D61;

      input {
        font-size: 1em;
        color: ${error ? FontColor.RED : FontColor.DEFAULT};
      }
      span {
        color: ${FontColor.RED};
        font-size: 0.7em;
        align-self: flex-start;
        padding-left: 0.5em;
        flex-wrap: wrap;
      }
      input[type="text"], input[type="password"] {
        height: 50px;
        margin: 5px;
        border: none;
        border-bottom: 1px solid #166587;
        background: #183D61;
      }
      input[type="submit"] {
        height: 50px;
        bottom: 12px;
        align-self: flex-end;
        color: #7FA2B3;
        background: #183D61;
        border: 1px solid #166587;
        border-radius: 14px;
        padding: 12px 12px;
        margin-top: 20px;

        &:hover {
          color: ${FontColor.GREEN};
          cursor: pointer;
          border-color: green;
        }
      }
      input:focus-visible {
        outline: none;
        border-bottom: 1px solid ${error ? FontColor.RED : FontColor.GREEN};
      }
      input::placeholder {
        font-size: 1em;
        opacity: .5;
        color: ${FontColor.GRAY};
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
  const styleCurrentField = css`
    position: absolute;
    padding-bottom: 27px;
    color: ${FontColor.DEFAULT};
    bottom: 0;
  `
  const styleLink = css`
    margin: 1em;
    margin-left: 260px;
    color: ${FontColor.DEFAULT};
    
    &:hover {
      color: ${FontColor.GREEN};
    }
  `
  const apiConnect = (login: string, password: string) => {
    axios.post('http://localhost:3001/auth/signin', {
      login,
      password
    })
    .then(function (response) {
      if(login === 'admin') {
        router.push('/admin');
      } else {
        router.push('/');
      }
    })
    .catch(function (error) {
      setError(true);
      setErrMsg('Login or password incorrect');
      setCurrentField('');
    });
  }
  const handleOnChange = (callback: () => void) => {
    if(error) {
      if(currentField === 'login') {
        setError(false);
        setErrMsg('');
      }
    }
    callback();
  }
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    apiConnect(login, password);
  }
  return (
    <>
      <form 
        method="post"
        className={style}
        onSubmit={handleSubmit}
      >
        <div>
          <div className={styleCurrentField}>{currentField}</div>
          <Image
            src="/login.png"
            alt="Picture of the author"
            width={110}
            height={110}
            className={styleImg}
          />
        </div>
        <div>
          <input 
            type="text" 
            value={login} 
            name="login" 
            onChange={e => handleOnChange(() => setLogin(e.target.value))}
            onFocus={() => setCurrentField('login')}
            placeholder="login"
          />
          <input 
            type="password" 
            value={password} 
            onChange={e => handleOnChange(() => setPassword(e.target.value))}
            onFocus={() => setCurrentField('password')}
            name="password" 
            placeholder="password"
          /> 
          <span>{errMsg}</span>
          <input type="submit" value="Login"></input>
        </div>
      </form>
      <Link href="/signup" className={styleLink}>create a new account</Link>
    </>
  )
}
export default LoginForm;
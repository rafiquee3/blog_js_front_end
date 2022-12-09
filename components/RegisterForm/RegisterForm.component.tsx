import { css } from '@emotion/css'
import Image from 'next/image'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { usePrevious } from '../../hooks/usePrevious';
import { useRouter } from 'next/router';

const RegisterForm = () => {
  const enum FontColor {
    GREEN = 'green',
    RED = '#BE5555',
    DEFAULT = '#8CAFBD'
  }
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [currentField, setCurrentField] = useState('')
  const prevLogin = usePrevious(login);
  const [error, setError] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const router = useRouter();

  const style = css`
    display: flex;
    position: relative;
    width: 500px;
    height: 370px;
    border: 2px solid #166587;
    border-radius: 18px;
    overflow: hidden;

    span {
      position: absolute;
      bottom: 0;
      font-size: 0.7em;
      margin: 1em;
      color: ${FontColor.RED};
      align-self: flex-start;
    }

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

      input {
        font-size: 1em;
        color: ${error ? FontColor.RED : FontColor.DEFAULT};
      }

      input:nth-child(1), input:nth-child(2), input:nth-child(3), input:nth-child(4), input:nth-child(5) {
        height: 50px;
        margin: 5px;
        border: none;
        border-bottom: 1px solid #166587;
        background: #183D61;
      }

      input:nth-child(6) {
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
        border-bottom: 1px solid ${error ? FontColor.RED : FontColor.GREEN};
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
  const styleCurrentField = css`
    position: absolute;
    padding-bottom: 95px;
    color: white;
    bottom: 0;
  `
  const apiConnect = (login: string, password: string) => {
    axios.post('http://localhost:3001/auth/signin', {
      login,
      password
    })
    .then(function (response) {
      console.log(response);
      router.push('/admin');
      
    })
    .catch(function (error) {
      setError(true);
      setErrMsg('Login or password incorrect');
    });
  }

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    apiConnect(login, password);
  }

  useEffect(() => {
    if(FontColor.RED && prevLogin !== login) {
      setError(false);
      setErrMsg('');
    }
  }, [login])

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
            onChange={e => setLogin(e.target.value)}
            onFocus={() => setCurrentField('login')} 
            placeholder="login"
          />
          <input 
            type="password" 
            value={password} 
            onChange={e => setPassword(e.target.value)}
            onFocus={() => setCurrentField('password')}  
            name="password" 
            placeholder="password"
          /> 
          <input 
            type="email" 
            value={email} 
            onChange={e => setEmail(e.target.value)}
            onFocus={() => setCurrentField('email')} 
            name="email" 
            placeholder="email"
          /> 
          <input 
            type="text" 
            value={firstName} 
            onChange={e => setFirstName(e.target.value)}
            onFocus={() => setCurrentField('first name')}
            name="firstName" 
            placeholder="first name"
          /> 
          <input 
            type="text" 
            value={lastName} 
            onChange={e => setLastName(e.target.value)}
            onFocus={() => setCurrentField('last name')}
            name="lastName" 
            placeholder="last name"
          /> 
          <input type="submit" value="signup" name="submit"></input>
          <span>{errMsg}</span>
        </div>
      </form>
    </>
  )
}
export default RegisterForm;

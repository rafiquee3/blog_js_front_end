import { css } from '@emotion/css'
import Image from 'next/image'
import axios from 'axios';
import { FC, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { FontColor, BckgColor } from '../../styles/colors';

export const PostForm: FC = (): JSX.Element => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [currentField, setCurrentField] = useState('');
  const [error, setError] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const router = useRouter();
  const loginRef = useRef<HTMLInputElement>(null);
  //background: #166587;
  //background: #183D61;

  //border-bottom: 1px solid #166587;
  const container = css`
    display: flex;
    flex-direction: column;
    width: 70%;
    height: 70%;
    border: 2px solid #166587;
    border-radius: 18px;
    background: ${BckgColor.SKYBLUE};
    overflow: hidden;

    .title {
      text-align: center;
      padding: 1em;
      color: ${FontColor.DEFAULT};
      
    }
  `
  const styleForm = css`
    display: flex;
    flex-direction: row;
    height: 100%;

    .left {
      display: flex;
      flex-direction: column;
      width: 25%;
      justify-content: center;
      align-items: center;
      background: #166587;
      padding: 30px;
    }
    .right {
      display: flex;
      flex-direction: column;
      width: 80%;
      justify-content: 'flex-start';
      align-items: left;
      background: ${BckgColor.BLUE};
      border-top-left-radius: 10px;

      textarea {
        padding: 0px;
        width: 100%;
        height: 100%;
        resize: none;
        border: none;
        border-top-left-radius: 10px;
        padding: 1em;
        
        background: #183D61;
        color: ${FontColor.DEFAULT};
      }

      .title {
        display: flex;
        width: 100%;
        height: 7%;
        color: ${FontColor.DEFAULT};
        background: ${BckgColor.SKYBLUE}
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
    }
  `
  type ErrorObj = {
    field: string;
    error: string;
  }
  type GetResponse = {
    data: ErrorObj[];
  };
  const apiConnect = (login: string, password: string) => {
    axios.post<GetResponse>('http://localhost:3001/auth/signin', {
      login,
      password
    })
    .then((res) => {
      if(login === 'admin') {
        router.push('/admin');
      } else {
        router.push('/');
      }
    })
    .catch((err) => {
      setError(true);
      setErrMsg('Login or password incorrect');
      loginRef.current?.focus();
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
        className={container} 
      > 
        <div className="title">Add a new post</div>
        <div className={styleForm}>
          <div className="left"> 
          </div>
          <div className="right">
            <textarea 
              name="content"
            >
              New blog post...
            </textarea>
            <input type="submit" name="submitBttn" value="create" ></input>
          </div>
        </div>
      </form>
    </>
  )
}

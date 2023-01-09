import { css } from '@emotion/css'
import Image from 'next/image'
import axios from 'axios';
import { FC, useRef, useState } from 'react';
import { BckgColor, FontColor } from '../../styles/colors';
import { useRecoilState } from 'recoil';
import { user } from '../../atoms/atoms';
import { Status } from '../Status/Status.component';

export const CreatePost: FC = (): JSX.Element => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [currentField, setCurrentField] = useState('');
  const [error, setError] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const loginRef = useRef<HTMLInputElement>(null);
  const [currentUser, setCurrentUser] = useRecoilState(user);

  const style = css`
    display: flex;
    position: relative;
    width: 70%;
    border: 2px solid #166587;
    border-radius: 18px;
    overflow: hidden;

    div:nth-child(1) {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      background: #166587;
      padding-left: 30px;
      padding-right: 30px;

      .closeBttn {
        position: absolute;
        top: 10px;
        left: 10px; 
        background: ${'#128bab'};
        border: 1px solid ${BckgColor.SKYBLUE};
        border-radius: 20px;
        padding: 0;
        width: 20px;
        height: 20px;
        overflow: hidden;

        &:hover {
          opacity: 1;
          cursor: pointer;
          background: ${BckgColor.RED};
        }
        &:before, &:after {
          position: absolute;
          bottom: -1px;
          content: ' ';
          height: 20px;
          width: 2px;
          background-color: ${BckgColor.SKYBLUE};
        }
        &:before {
          transform: rotate(45deg);
        }
        &:after {
          transform: rotate(-45deg);
        }
      }

      .fakeElem {
        height: 30px;
        background-color: ${BckgColor.SKYBLUE};
      }
    }
    div:nth-child(2) {
      display: flex;
      flex-direction: column;
      width: 100%;
      justify-content: 'flex-start';
      align-items: flex-start;
      padding: 25px;
      padding-top: 0px;
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
      input[name="title"] {
        height: 50px;
        width: 80%;
        margin: 5px;
        border: none;
        border-bottom: 1px solid #166587;
        background: #183D61;
      }
      textarea[name="content"] {
        height: 200px;
        width: 100%;
        margin-top: 10px;
        border: 1px solid #166587;
        border-radius: 18px;
        background: ${BckgColor.BLUE};
        resize: none;
        font-size: 1em;
        color: ${FontColor.DEFAULT};
        padding: 10px;
      }
      textarea:focus-visible {
        outline: none;
        border-bottom: 1px solid ${error ? FontColor.RED : FontColor.GREEN};
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
    text-align: center;
    padding-bottom: 27px;
    color: ${FontColor.DEFAULT};
    bottom: 0;
  `
  const styleLink = css`
    margin: 1em;
    margin-left: 260px;
    color: ${FontColor.DEFAULT};
    
    &:hover {
      color: ${FontColor.BLUEE};
    }
  `
  type ErrorObj = {
    field: string;
    error: string;
  }
  type GetResponse = {
    data: ErrorObj[];
  };
  type Token = {
    accessToken: string;
    refreshToken: string;
  }
  const apiConnect = async (login: string, password: string) => {
    const data = {
      login,
      password
    };
    const url: string = 'http://localhost:3001/auth/signin';
    await axios.post(url, data)
    .then((res) => {
    
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
    apiConnect('login', 'password');
  }

  return (
    <>
      <form 
        method="post"
        className={style}
        onSubmit={handleSubmit}
      >
        <div>
          <div className='closeBttn'></div>
          <div className='fakeElem'></div>
          <Image
            src="/login.png"
            alt="Picture of the author"
            width={110}
            height={110}
            className={styleImg}
          />
          <div className={styleCurrentField}>{currentUser}</div>
        </div>
        <div>
          <input 
            type="text" 
            value={title} 
            name="title" 
            onChange={e => handleOnChange(() => setTitle(e.target.value))}
            onFocus={() => setCurrentField('title')}
            ref={loginRef}
            placeholder="title..."
          />
          <textarea  
            value={content} 
            name="content" 
            onChange={e => handleOnChange(() => setContent(e.target.value))}
            onFocus={() => setCurrentField('content')}
            placeholder="comment..."
          ></textarea> 
          <span>{errMsg}</span>
          <input type="submit" value="Create"></input>
        </div>
      </form>
    </>
  )
}

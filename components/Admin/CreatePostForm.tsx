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
  // border: 2px solid #166587;
  const styleForm = css`
    display: flex;
    position: relative;
    flex-direction: column;
    width: 70%;
    height: 90%;
    justify-content: 'flex-start';
    align-items: left;
    background: ${BckgColor.SKYBLUE};

    border-top-left-radius: 18px;
    border-top-right-radius: 18px;
    overflow: hidden;
  

    .title {
      display: flex;
      justify-content: center;
      align-items: center;
      
      
      background: ${BckgColor.BLUE};

      .label {
        display: flex;
        height: 100%;
        align-items: center;
        padding-left: 1em;
        background: ${BckgColor.SKYBLUE};
        color: ${FontColor.DEFAULT};
        
      }

      .addImg {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 10%;
        color: #7FA2B3;
        background: #183D61;
        border: none;
       
        font-size: 1em;

        &:hover {
          color: ${FontColor.GREEN};
          cursor: pointer;
          border-color: green;
        }
      }

    }
    .postTitle {
      width: 100%;
      height: 100%;
      background: ${'#166587'};
      border: none;
      border-bottom-right-radius: 8px;
      font-size: 1em;
      padding: 0px;
      color: ${FontColor.DEFAULT};
      
    }

    textarea {
      padding: 0px;
      width: 100%;
      height: 100%;
      resize: none;
      border: none;
      padding: 1em;
      border-bottom: 4px solid ${BckgColor.SKYBLUE};
      background: #183D61;
      color: ${FontColor.DEFAULT};
      font-size: 1em;
  
    }
    textarea:focus-visible {
      outline: none;
      border-bottom: 1px solid ${error ? FontColor.RED : FontColor.GREEN};
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
      <div className={styleForm}> 
        <div className="title">
          <div className="label">Title: </div>
          <input className="postTitle" type="text"/>
          <div className="addImg">
            <Image
              src="/send.png"
              alt="create post icon"
              width={50}
              height={50}
            />
          </div>
        </div>
        <textarea 
          name="content"
        >
        </textarea>
      </div>
    </>
  )
}

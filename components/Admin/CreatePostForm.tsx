import { css } from '@emotion/css'
import Image from 'next/image'
import axios from 'axios';
import { FC, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { FontColor, BckgColor } from '../../styles/colors';
import matter from 'gray-matter';

export const PostForm: FC = (): JSX.Element => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [currentField, setCurrentField] = useState('');
  const [error, setError] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const router = useRouter();
  const loginRef = useRef<HTMLInputElement>(null);

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
    border-left: 2px solid ${BckgColor.SKYBLUE};
    overflow: hidden;

    -webkit-box-shadow: -2px -1px 76px 3px rgba(0,0,0,0.23);
    -moz-box-shadow: -2px -1px 76px 3px rgba(0,0,0,0.23);
    box-shadow: -2px -1px 76px 3px rgba(0,0,0,0.23);

    .title {
      display: flex;
      justify-content: center;
      align-items: center;      
      background: ${BckgColor.BLUE};

      .label {
        display: flex;
        height: 100%;
        align-items: center;
        padding: 1em 0.5em 1em 1em;
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

        .img:hover {
          filter: hue-rotate(300deg) saturate(190%) brightness(1);
          cursor: pointer;
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
      
      &:hover {
        box-shadow: inset 0 -2px 0 ${'green'};
      }
    }
    textarea {
      padding: 0px;
      width: 100%;
      height: 100%;
      resize: none;
      border: none;
      padding: 1em;
      border-bottom: 1px solid ${FontColor.DEFAULT};
      border-top-left-radius: 4px;
      background: #183D61;
      color: ${FontColor.DEFAULT};
      font-size: 1em;
    }
    textarea:focus-visible {
      outline: none;
      border-bottom: 1px solid ${error ? FontColor.RED : FontColor.GREEN};
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
  const apiConnect = (txt: any) => {
   
    axios.post<GetResponse>('http://localhost:3001/article/add', {
      title,
      content: txt.content
    })
    .then((res) => {
      console.log('save in db')
    })
    .catch((err) => {
      //setError(true);
      //setErrMsg('Login or password incorrect');
      //loginRef.current?.focus();
      console.log('err')
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
  const createPost = () => {
    const txt = matter(text);
    apiConnect(txt);
  }
  return (
    <>
      <div className={styleForm}> 
        <div className="title">
          <div className="label">Title: </div>
          <input className="postTitle" type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
          <div className="addImg">
            <Image
              src="/send.png"
              alt="create post icon"
              width={30}
              height={40}
              className="img"
              onClick={createPost}
            />
          </div>
        </div>
        <textarea 
          name="content"
          value={text}
          onChange={(e) => setText(e.target.value)}
        >
        </textarea>
      </div>
    </>
  )
}

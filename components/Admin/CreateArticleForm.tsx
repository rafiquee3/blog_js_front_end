import { css } from '@emotion/css'
import Image from 'next/image'
import axios from 'axios';
import { FC, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { FontColor, BckgColor } from '../../styles/colors';
import {remark} from 'remark'
import remarkHtml from 'remark-html'
import {escape} from 'html-escaper';
import { useRecoilState } from 'recoil'
import { user } from '../../atoms/atoms';
import { LoginForm } from '../LoginForm';
import { Status } from '../Status/Status.component';

export const PostForm: FC = (): JSX.Element => {
  type ErrorObj = {
    field: string;
    error: string;
  }
  type Article = {
    title: string;
    content: string;
  }
  type GetResponse = {
    data: ErrorObj[];
  };
  type ErrorsArrays = ErrorObj[];

  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [currentField, setCurrentField] = useState('');
  const [error, setError] = useState(false);
  const [errMsg, setErrMsg] = useState<ErrorsArrays>([{field: '', error: ''}]);
  const [bttnClicked, setBttnClicked] = useState(false);
  const router = useRouter();
  const loginRef = useRef<HTMLInputElement>(null);
  const [currentUser, setCurrentUser] = useRecoilState(user);
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
        background: ${BckgColor.BLUE};
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
      background: ${BckgColor.SKYBLUE};
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
      background: ${BckgColor.BLUE};
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
    span {
      padding-left: .5em;
    }
    input:-webkit-autofill,
    input:-webkit-autofill:hover, 
    input:-webkit-autofill:focus, 
    input:-webkit-autofill:active{
      -webkit-box-shadow: 0 0 0 30px #183D61 inset !important;
    }
  `
  const apiConnect = async (html: any) => {
    const JwtToken = localStorage.getItem('JWT');
    const config = {
      headers:{
        Authorization: 'Bearer ' + JwtToken,
      }
    };
    const data = {
      title,
      content: html
    }
    const url: string = 'http://localhost:3001/article/add'
    //<GetResponse>
    await axios.post(url, data, config)
    .then((res) => {
      setTitle('');
      setText('');
      setError(false);
      console.log('save in db')
    })
    .catch((err) => {
      setError(true);
      //setErrMsg('Login or password incorrect');
      //loginRef.current?.focus();
      console.log(err)
    });
  }
  const handleOnChange = (callback: () => void) => {
    if(error) {
      if(currentField === 'login') {
        setError(false);
        //setErrMsg('');
      }
    }
    callback();
  }
  const articleValidator = (article: Article): ErrorObj[] => {
    const errors: ErrorObj[] = [];
    if (!article.title) {
      errors.push({
        field: 'title',
        error: 'the title field cannot be empty',
      });
    }
    if (!article.content) {
      errors.push({
        field: 'content',
        error: 'the content field cannot be empty',
      });
    }
    return errors;
  }
  const createPost = () => {
    setBttnClicked(true);
    setTimeout(() => setBttnClicked(false), 1700);
    setErrMsg([{
      field: '',
      error: ''
    }]);
    const article = {
      title,
      content: text
    }
    const validatorErr = articleValidator(article);
    if (validatorErr.length) {
      setErrMsg(validatorErr);
      return setError(true);
    }
    remark()
    .use(remarkHtml)
    .process(text)
    .then((file) => {
      const escapeChar = escape(String(file));
      apiConnect(escapeChar);
    })
  }

  useEffect(() => {
    if(!currentUser) {
      const user = currentUser || (localStorage.getItem("user") || "");
      console.log(user);
      //setCurrentUser(userLS);
    }
  }, [currentUser])
  return (
    <>
    {currentUser === 'admin' ?
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
        {errMsg.length && errMsg.map((msg) => <span key={msg.field}>{msg.error}</span>)}
      </div>

      :

      <LoginForm />
    }
    { bttnClicked && !error && <Status info={'new post added'} error={false} /> }
    { bttnClicked && error && <Status info={'error'} error={true} /> }
    </>
  )
}

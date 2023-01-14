import { css } from '@emotion/css'
import Image from 'next/image'
import axios from 'axios';
import { FC, useRef, useState } from 'react';
import { BckgColor, FontColor } from '../../styles/colors';
import { useRecoilState } from 'recoil';
import { user } from '../../atoms/atoms';
import { Status } from '../Status/Status.component';

interface Show {
	show: (param: boolean) => void,
}

export const CreatePost = ({show}: Show): JSX.Element => {
  const [content, setContent] = useState('');
  const [currentField, setCurrentField] = useState('');
  const [errorFields, setErrorFields] = useState([]);
  const contentRef = useRef<HTMLTextAreaElement>(null);
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
        left: 13px; 
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
        color: ${FontColor.DEFAULT};
      }
      span {
        color: ${FontColor.RED};
        font-size: 0.7em;
        align-self: flex-start;
        padding-left: 0.5em;
        flex-wrap: wrap;
      }
      textarea[name="content"] {
        height: 250px;
        width: 100%;
        margin-top: 20px;
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
        border-bottom: 1px solid ${FontColor.GREEN};
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
        border-bottom: 1px solid ${FontColor.GREEN};
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
  const styleErrField = {
    color: FontColor.RED, 
    borderBottom: `1px solid ${FontColor.RED}`
  }
  type ErrorObj = {
    field: string;
    error: string;
  }
  const apiConnect = async (content: string) => {
    const data = {
      content
    };
    const JwtToken = localStorage.getItem('JWT');
    const config = {
      headers:{
        Authorization: 'Bearer ' + JwtToken,
      }
    };
    const url: string = 'http://localhost:3001/post/add';
    await axios.post(url, data, config)
    .then((res) => {
      console.log('post added');
      show(false);
    })
    .catch((err) => {
      const validationErrors = err.response.data.errors;
      setErrorFields(validationErrors);
      focusOnErrField(validationErrors);
    });
  }
  const postValidator = (content: string): ErrorObj[] => {
    const errors: ErrorObj[] = [];
    if (!content) {
      errors.push({ field: 'content', error: 'field "content" cannot be empty' })
    }

    return errors;
  }
  const handleOnChange = (callback: () => void) => {
    console.log(errorFields)
    if(errorFields.length) {
      if(currentField === 'content') {
        setErrorFields(prev => prev.filter((elem: ErrorObj) => elem.field !== 'content'));
      }
    }
    callback();
  }
  const focusOnErrField = (validationErrors: ErrorObj[]): void => {
    const [firstErrField] = validationErrors;
    const {field} = firstErrField;

    if (field === 'content') {
      contentRef.current?.focus();
    } 
  }
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const validationErrors: any = postValidator(content);
    if(validationErrors.length) {
      setErrorFields(validationErrors);
      focusOnErrField(validationErrors);
    } else {
      apiConnect(content);
    }
  }
  type ValidationField = {
    res: Boolean;
    elem: ErrorObj | undefined;
  }
  const isValid = (formField: string): ValidationField => {
    const result = errorFields?.find((elem: ErrorObj) => elem.field === formField);
    return {
      res: !Boolean(result),
      elem: result
    }
  }
  const handleOnClick = () => {
    show(false);
  }
  return (
    <>
      <form 
        method="post"
        className={style}
        onSubmit={handleSubmit}
      >
        <div>
          <div className='closeBttn' onClick={handleOnClick}></div>
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
          <textarea  
            value={content} 
            name="content"
            style={isValid('content').res ? {} : styleErrField}
            onChange={e => handleOnChange(() => setContent(e.target.value))}
            onFocus={() => setCurrentField('content')}
            ref={contentRef}
            placeholder="comment..." 
          ></textarea> 
          <span>{isValid('content').elem?.error}</span>
          <input type="submit" value="Create"></input>
        </div>
      </form>
    </>
  )
}

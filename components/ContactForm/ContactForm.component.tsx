import { css } from '@emotion/css'
import Image from 'next/image'
import axios from 'axios';
import { FC, useRef, useState } from 'react';
import { BckgColor, FontColor } from '../../styles/colors';

export const ContactForm: FC = (): JSX.Element => {
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [email, setEmail] = useState('');
  const [currentField, setCurrentField] = useState('');
  const [errorFields, setErrorFields] = useState([]);
  const [success, setSuccess] = useState(false);
  const subjectRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const style = css`
    display: flex;
    position: relative;
    min-height: 250px;
   
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
      justify-content: flex-end;
      align-items: center;
      padding: 25px;
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
      input[type="text"], input[type="email"] {
        height: 50px;
        width: 320px;
        margin: 5px;
        border: none;
        border-bottom: 1px solid #166587;
        background: #183D61;
      }
      input[type="submit"] {
        align-self: flex-end;
        height: 50px;
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
      textarea[name="content"] {
        height: 250px;
        width: 100%;
        margin-top: 20px;
        border: 1px solid ${BckgColor.SKYBLUE};
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
    }
    input:-webkit-autofill,
    input:-webkit-autofill:hover, 
    input:-webkit-autofill:focus, 
    input:-webkit-autofill:active{
      -webkit-box-shadow: 0 0 0 30px #183D61 inset !important;
    }
  `
  const styleImg = css`
    opacity: ${success ? 0.5 : 0.4};
    filter: ${success ? 'hue-rotate(340deg) saturate(130%) brightness(1.9)' : ''};
  `
  const styleCurrentField = css`
    position: absolute;
    padding: 10px;
    color: ${success ?  '#BABFBF' : FontColor.DEFAULT};
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
  type FormData = {
    subject: string;
    email: string;
    content: string;
  }
  const formValidator = (data: FormData): ErrorObj[] => {
    const errors: ErrorObj[] = [];

    if (!data.subject)
      errors.push({
        field: 'subject',
        error: 'the subject field cannot be empty',
      });
    if (!data.content)
      errors.push({
        field: 'content',
        error: 'the content field cannot be empty',
      });
    if(!data.email.length) {
      errors.push({
        field: 'email',
        error:
          'email is empty',
      });
    } else {
      const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

      if (!reg.test(data.email))
        errors.push({
          field: 'email',
          error:
            'email format incorrect',
        });
    }
    return errors;
  }
  const apiConnect = (subject: string, email: string, content: string) => {
    axios.post('http://localhost:3001/auth/signup', {
      subject,
      email,
      content,
    })
    .then((res) => {
      setSuccess(true);
      setCurrentField('subject');
    })
    .catch((err) => {
      const validationErrors = err.response.data.errors;
      setErrorFields(validationErrors);
      focusOnErrField(validationErrors);
    });
  }
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const validationErrors: ErrorObj[] | any = formValidator({subject, email, content});
    if(validationErrors.length) {
      setErrorFields(validationErrors);
      focusOnErrField(validationErrors);
    } else {
      apiConnect(subject, content, email);
    }
  }
  const handleOnChange = (callback: () => void) => {
    if(errorFields.length) {
      if(currentField === 'subject') {
        setErrorFields(prev => prev.filter((elem: ErrorObj) => elem.field !== 'subject'));
      }
      if(currentField === 'email') {
        setErrorFields(prev => prev.filter((elem: ErrorObj) => elem.field !== 'email'));
      }
      if(currentField === 'content') {
        setErrorFields(prev => prev.filter((elem: ErrorObj) => elem.field !== 'content'));
      }
    }
    callback();
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
  const focusOnErrField = (validationErrors: ErrorObj[]): void => {
    const [firstErrField] = validationErrors;
    const {field} = firstErrField;
    
    if(field === 'subject') {
      subjectRef.current?.focus();
    } else if(field === 'email') {
      emailRef.current?.focus();
    } else if(field === 'content') {
      contentRef.current?.focus();
    }
  }

  return (
    <>
        <form 
            method="post"
            className={style}
            onSubmit={handleSubmit}
            autoComplete="do-not-autofill"
          >
            <div>
              <div className={styleCurrentField}>{currentField}</div>
              <Image
                src="/email.png"
                alt="Email icon"
                width={130}
                height={130}
                className={styleImg}
              />
            </div>
            <div>
              <input 
                type="text" 
                value={subject} 
                style={isValid('subject').res ? {} : styleErrField}
                onChange={e => handleOnChange(() => setSubject(e.target.value))}
                onFocus={() => setCurrentField('subject')}
                ref={subjectRef} 
                name="subject"
                placeholder="subject"
              />
              <span>{isValid('subject').elem?.error}</span>
              <input 
                type="email" 
                value={email}
                style={isValid('email').res ? {} : styleErrField} 
                onChange={e => handleOnChange(() => setEmail(e.target.value))}
                onFocus={() => setCurrentField('email')}
                ref={emailRef}  
                name="email" 
                placeholder="email"
              /> 
              <span>{isValid('email').elem?.error}</span>
              <textarea 
                name="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                onFocus={() => setCurrentField('content')}
                ref={contentRef}
              >
              </textarea>
              <span>{isValid('content').elem?.error}</span>
              <input type="submit" value="Send" name="submit"></input>
            </div>
        </form>
    </>
  )
}
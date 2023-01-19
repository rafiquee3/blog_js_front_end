import { css } from '@emotion/css'
import Image from 'next/image'
import axios from 'axios';
import { FC, useRef, useState } from 'react';
import { FontColor } from '../../styles/colors';

export const ContactForm: FC = (): JSX.Element => {
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [email, setEmail] = useState('');
  const [currentField, setCurrentField] = useState('');
  const [errorFields, setErrorFields] = useState([]);
  const [success, setSuccess] = useState(false);
  const subjectRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const style = css`
    display: flex;
    position: relative;
    min-height: 250px;
    max-width: 470px;
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
      input[type="text"], input[type="password"] {
        height: 50px;
        width: 220px;
        margin: 5px;
        border: none;
        border-bottom: 1px solid #166587;
        background: #183D61;
      }
      input[type="submit"], input[type="button"] {
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
  const styleSuccess = css`
    color: ${FontColor.DEFAULT};
    & p {
      text-align: left;
    }
    & b {
      color: #166587;
      filter: brightness(1.4);
    }
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
  const apiConnect = (login: string, password: string, email: string, firstName: string, lastName: string) => {
    axios.post('http://localhost:3001/auth/signup', {
      login,
      email,
      password,
      firstName,
      lastName
    })
    .then((res) => {
      setSuccess(true);
      setCurrentField(login);
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
      apiConnect(login, password, email, firstName, lastName);
    }
  }
  const handleOnChange = (callback: () => void) => {
    if(errorFields.length) {
      if(currentField === 'login') {
        setErrorFields(prev => prev.filter((elem: ErrorObj) => elem.field !== 'login'));
      }
      if(currentField === 'password') {
        setErrorFields(prev => prev.filter((elem: ErrorObj) => elem.field !== 'password'));
      }
      if(currentField === 'email') {
        setErrorFields(prev => prev.filter((elem: ErrorObj) => elem.field !== 'email'));
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
  const Form = (
          <form 
            method="post"
            className={style}
            onSubmit={handleSubmit}
            autoComplete="do-not-autofill"
          >
            <div>
              <div className={styleCurrentField}>{currentField}</div>
              <Image
                src="/login.png"
                alt="Picture of the author"
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
                onFocus={() => setCurrentField('login')}
                ref={SubjectRef} 
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
              <span>{isValid('content').elem?.error}</span>
              <textarea 
                name="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              >
              </textarea>
              <span>{isValid('content').elem?.error}</span>
              <input type="submit" value="Send" name="submit"></input>
            </div>
          </form>
  );
  return (
    <>
      {Form}
    </>
  )
}
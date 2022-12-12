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
    DEFAULT = '#8CAFBD',
    GRAY = 'gray'
  }
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [currentField, setCurrentField] = useState('');
  const [errorFields, setErrorFields] = useState([]);
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const prevLogin = usePrevious(login);
  const prevPassword = usePrevious(password);
  const prevEmail = usePrevious(email);

  const style = css`
    display: flex;
    position: relative;
    width: ${success ? '380px' : '500px'};
    height: ${success ? '220px' : '400px'};
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
        color: ${FontColor.DEFAULT};
      }

      input:nth-child(1), input:nth-child(2), input:nth-child(3), input:nth-child(4), input:nth-child(5) {
        height: 50px;
        margin: 5px;
        border: none;
        border-bottom: 1px solid #166587;
        background: #183D61;
      }

      input:nth-child(6), input[type="button"] {
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

      p {
        color: ${FontColor.DEFAULT};
        text-align: center;
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
    filter: ${success ? 'hue-rotate(340deg) saturate(130%) brightness(0.3)' : ''};
  `
  const styleCurrentField = css`
    position: absolute;
    padding-bottom: ${success ? '22px' : '110px'};
    color: ${success ? '#BAD1CD' : FontColor.DEFAULT};
    bottom: 0;
  `
  const errField = {
    color: FontColor.RED, 
    borderBottom: `1px solid ${FontColor.RED}`
  }
  type ErrorObj = {
    field: string;
    error: string;
  }
  type User = {
    login: string;
    password: string;
    email: string;
  }
  const userValidator = (user: User): ErrorObj[] => {
    const errors: ErrorObj[] = [];

    if (user.login.length < 5)
      errors.push({
        field: 'login',
        error: 'the entered word should contain at least 5 characters',
      });
    if (user.login.length > 13)
      errors.push({
        field: 'login',
        error: 'the entered word should contain at max 13 characters',
      });
    if (user.password.length < 5)
      errors.push({
        field: 'password',
        error: 'the entered password should contain at least 5 characters',
      });
    if (user.password.length > 13)
      errors.push({
        field: 'password',
        error: 'the entered password should contain at max 13 characters',
      });
    if (user.login.length > 0 && user.password.length > 0) {
      const reg = /^[a-zA-Z0-9]+[_]?[a-zA-Z0-9]+$/;
  
      if (!reg.test(user.login))
        errors.push({
          field: 'login',
          error:
            'login should consist of letters and numbers and may contain _',
        });
      if (!reg.test(user.password))
        errors.push({
          field: 'password',
          error:
            'password should consist of letters and numbers and may contain _',
        });
    }
    if(!user.email.length) {
      errors.push({
        field: 'email',
        error:
          'email is empty',
      });
    } else {
      const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

      if (!reg.test(user.email))
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
    .then(function (response) {
      setSuccess(true);
      setCurrentField(login);
      //router.push('/login');
    })
    .catch(function (error) {
      const validationErrors = error.response.data.errors;
      setErrorFields(validationErrors);
      setCurrentField('');
    });
  }
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const validationErrors: any = userValidator({login, password, email});
    if(validationErrors.length) {
      setErrorFields(validationErrors);
    } else {
      apiConnect(login, password, email, firstName, lastName);
    }
  }
  const isValid = (formField: string): Boolean => {
    const result = errorFields?.find((elem: ErrorObj) => elem.field === formField);
    return !Boolean(result);
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
                width={110}
                height={110}
                className={styleImg}
              />
            </div>
            <div>
              <input 
                type="text" 
                value={login} 
                style={isValid('login') ? {} : errField}
                onChange={e => setLogin(e.target.value)}
                onFocus={() => setCurrentField('login')} 
                name="login"
                placeholder="login"
              />
              <input 
                type="password" 
                value={password}
                style={isValid('password') ? {} : errField} 
                onChange={e => setPassword(e.target.value)}
                onFocus={() => setCurrentField('password')}  
                name="password" 
                placeholder="password"
              /> 
              <input 
                type="text" 
                value={email} 
                style={isValid('email') ? {} : errField} 
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
  );
  const SuccessMsg = (
          <div className={style}>
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
                <p>User <b>{login}</b> has been successfully registered</p>
              <input type="button" value="Login" name="submit"></input>
            </div>
          </div>
  );
  useEffect(() => {
    if(errorFields.length) {
      if(prevLogin !== login) {
        setErrMsg('');
        setErrorFields(prev => prev.filter((elem: ErrorObj) => elem.field !== 'login'));
      }
      if(prevPassword !== password) {
        setErrMsg('');
        setErrorFields(prev => prev.filter((elem: ErrorObj) => elem.field !== 'password'));
      }
      if(prevEmail !== email) {
        setErrMsg('');
        setErrorFields(prev => prev.filter((elem: ErrorObj) => elem.field !== 'email'));
      }
    }
  }, [login, password, email])

  return (
    <>
      {success ? SuccessMsg : Form}
    </>
  )
}
export default RegisterForm;
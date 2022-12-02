import Image from 'next/image'
import { css } from '@emotion/css'

const LoginBttn = () => {
  const style = css`
    opacity: 0.3;
    cursor: pointer;
    margin-right: 2rem;
    &:hover {
      opacity: 1;
    }
  `
  const handleClick = () => {
    alert('login');
  }  
  return (
    <Image
      src="/login.png"
      alt="Picture of the author"
      width={40}
      height={40}
      className={style}
      onClick={handleClick}
  />
  )
}
export default LoginBttn;
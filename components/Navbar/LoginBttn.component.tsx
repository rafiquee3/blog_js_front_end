import Image from 'next/image'
import { css } from '@emotion/css'
import Link from 'next/link'
import { FC, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { user } from '../../atoms/atoms'

export const LoginBttn: FC = (): JSX.Element => {
  const [currentUser, setCurrentUser] = useRecoilState(user);
  const style = css`
    opacity: ${currentUser ? 1 : 0.3};
    cursor: pointer;
    &:hover {
      opacity: 1;
    }
  `
  const styleLink = css`
    height: 40px;
  `
 
  useEffect(() => {
      const userLS = (localStorage.getItem('user') || "");
      setCurrentUser(userLS);  
  },[setCurrentUser])
  return (
    <>
      <Link className={styleLink} href={currentUser ? '/logout' : '/signin'}>
        <Image
          src="/login.png"
          alt="Picture of the author"
          width={40}
          height={40}
          className={style}
        />
      </Link>
    </>
  )
}

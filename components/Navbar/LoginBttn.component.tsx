import Image from 'next/image'
import { css } from '@emotion/css'
import Link from 'next/link'
import { FC } from 'react'

export const LoginBttn: FC = (): JSX.Element => {
  const style = css`
    opacity: 0.3;
    cursor: pointer;
   
    &:hover {
      opacity: 1;
    }
  `
  const styleLink = css`
    height: 40px;
  `
  return (
    <Link className={styleLink} href={'/signin'}>
      <Image
        src="/login.png"
        alt="Picture of the author"
        width={40}
        height={40}
        className={style}
      />
    </Link>
  )
}

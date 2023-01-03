import { css } from '@emotion/css'
import { FC } from 'react'
import { Navbar } from '../Navbar'
import {
  RecoilRoot,
} from 'recoil';

export const Layout = ({children}: any): JSX.Element => {
  const style = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100vw;
    overflow: hidden;
    line-height: 1.5em;
  `
  return ( 
    <>
      <RecoilRoot>
        <Navbar/>
        <main className={style}>
          {children}
        </main>
      </RecoilRoot>
    </>
  )
}

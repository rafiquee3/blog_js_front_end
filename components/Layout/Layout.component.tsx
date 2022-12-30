import { css } from '@emotion/css'
import { FC } from 'react'
import { Navbar } from '../Navbar'
import {
  RecoilRoot,
} from 'recoil';
import { atom } from "recoil";

export const user = atom({
  key: "user", 
  default: '',
});

export const Layout = ({children}: any): JSX.Element => {
  const style = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
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

import { css } from '@emotion/css'
import { FC } from 'react'
import { Navbar } from '../Navbar'
export const Layout = ({children}: any): JSX.Element => {
  const style = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    line-height: 1.5em;
  `
  return ( 
    <>
      <Navbar/>
      <div className={style}>
        <main>{children}</main>
      </div>
    </>
  )
}

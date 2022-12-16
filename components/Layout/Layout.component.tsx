import { css } from '@emotion/css'
import { FC } from 'react'
import { Navbar } from '../Navbar'
export const Layout = ({children}: any): JSX.Element => {
  const style = css`

  `
  return ( 
    <>
      <Navbar/>
      <main>{children}</main>
    </>
  )
}

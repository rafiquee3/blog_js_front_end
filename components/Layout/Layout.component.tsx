import { css } from '@emotion/css'
import { Navbar } from '../Navbar'
export const Layout = ({children}: any) => {
  const style = css`

  `
  return ( 
    <>
      <Navbar/>
      {children}
    </>
  )
}

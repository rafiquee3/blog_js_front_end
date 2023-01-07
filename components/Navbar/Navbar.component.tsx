import { FC } from 'react';
import { LoginBttn } from '.';
import { Menu } from ".";

export const Navbar: FC = (): JSX.Element => {
  return (
    <nav 
      style={{
        position: 'fixed',
        top: '0px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: '2rem',
        width: '100%',
        height: '70px',
        background: '#183D61',
        fontSize: 25,
        color: 'white',
        zIndex: '999',
        boxShadow: '5px 5px 15px 5px rgba(0,0,0,0.18)',
      }}
    >
      <div style={{marginLeft: 'calc(2rem + 40px)'}}></div>
      <Menu/>
      <LoginBttn/>
    </nav>
  )
}
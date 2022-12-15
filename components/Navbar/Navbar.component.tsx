import { LoginBttn } from '.';
import { Menu } from ".";

export const Navbar = () => {
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
        color: 'white'
      }}
    >
      <div style={{marginLeft: 'calc(2rem + 40px)'}}></div>
      <Menu/>
      <LoginBttn/>
    </nav>
  )
}
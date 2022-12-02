import LoginBttn from "./LoginBttn.component";
import Menu from "./Menu.component";

const Header = () => {
  return (
    <header 
    style={{
      position: 'fixed',
      top: '0px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      height: '70px',
      background: '#183D61',
      fontSize: 25,
      color: 'white'
    }}><div></div><Menu/><LoginBttn/></header>
  )
}
export default Header;
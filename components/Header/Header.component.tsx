import Menu from "./Menu.component";

const Header = () => {
  return (
    <header 
    style={{
      position: 'fixed',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '70px',
      background: '#183D61',
      fontSize: 25,
      color: 'white'
    }}><Menu/></header>
  )
}
export default Header;
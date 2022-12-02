const Menu = () => {
  const menuStyle = {
    ul: {
      display: 'flex',
    },
    li: {
      padding: '1rem'
    },
    a: {
      textDecoration: 'none'
    }
  }
  return (
    <>
      <ul style={menuStyle.ul}>
        <li style={menuStyle.li}><a>HOME</a></li>
        <li style={menuStyle.li}><a>BLOG</a></li>
        <li style={menuStyle.li}><a>O MNIE</a></li>
        <li style={menuStyle.li}><a>KONTAKT</a></li>
      </ul> 
    </>
  )
}
export default Menu;
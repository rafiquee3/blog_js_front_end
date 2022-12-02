import { css } from '@emotion/css'

const Menu = () => {
  const style = css`
    display: flex;
    height: 70px;
    list-style-type: none;
    color: #BAD1CD;
    margin: 0;
    padding: 0;
    
    & > li > a {
      display: block;
      line-height: 70px;
      padding: 0 1rem 0 1rem;
      cursor: pointer;
      text-decoration: none;
    }

    a:hover {
      box-shadow: inset 0 -5px 0 #BB3333;
      color: #BB3333;
    }
  `
  return (
    <>
      <ul className={style}>
        <li><a>HOME</a></li>
        <li><a>BLOG</a></li>
        <li><a>O MNIE</a></li>
        <li><a>KONTAKT</a></li>
      </ul> 
    </>
  )
}
export default Menu;
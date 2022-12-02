import { css } from '@emotion/css'

const Menu = () => {
  const styleLi = css`
    color: red;
    &:hover {
      color: white;
  }
`
  return (
    <>
      <ul className={css`
        display: flex;
        color: green;
        list-style-type: none;
        & > li {
          margin: 1em;
        }
        & > li > a {
          cursor: default;
          text-decoration: none;
        }
        }
        a:hover {
          color: white;
        }
      `}>
        <li><a>HOME</a></li>
        <li><a>BLOG</a></li>
        <li><a>O MNIE</a></li>
        <li><a>KONTAKT</a></li>
      </ul> 
    </>
  )
}
export default Menu;
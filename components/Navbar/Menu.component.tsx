import { css } from '@emotion/css'
import Link from 'next/link'
import { FontColor } from '../../styles/colors'

export const Menu = () => {
  const style = css`
    display: flex;
    height: 70px;
    list-style-type: none;
    color: #BAD1CD;
    margin: 0;
    padding: 0;
  `
  const linkStyle = css`
    display: block;
    line-height: 70px;
    padding: 0 1rem 0 1rem;
    cursor: pointer;
    text-decoration: none;

    &:hover {
      box-shadow: inset 0 -5px 0 ${FontColor.BLUEE};
      color: ${FontColor.BLUEE};
    }
  `
  return (
    <>
        <ul className={style}>
          <li><Link href={'/'} className={linkStyle}>HOME</Link></li>
          <li><Link href={'/'} className={linkStyle}>BLOG</Link></li>
          <li><Link href={'/'} className={linkStyle}>O MNIE</Link></li>
          <li><Link href={'/'} className={linkStyle}>KONTAKT</Link></li>
        </ul> 
    </>
  )
}

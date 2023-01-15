import { css } from '@emotion/css'
import { FC } from 'react'
import { FontColor } from '../../styles/colors'
import Link from 'next/link'
import { useRecoilState } from 'recoil';
import { page } from '../../atoms/atoms';

export const Menu: FC = (): JSX.Element => {
  const [thisPage, setThisPage] = useRecoilState(page);
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
  const linkStyleSelect = css`
    display: block;
    line-height: 70px;
    padding: 0 1rem 0 1rem;
    cursor: pointer;
    text-decoration: none;
    color: ${FontColor.BLUEE};
`
  return (
    <>
        <ul className={style}>
          <li><Link href={'/'} className={thisPage === 'home' ? linkStyleSelect : linkStyle}>HOME</Link></li>
          <li><Link href={'/articles'} className={thisPage === 'blog' ? linkStyleSelect : linkStyle}>BLOG</Link></li>
          <li><Link href={'/about'} className={thisPage === 'about' ? linkStyleSelect : linkStyle}>O MNIE</Link></li>
          <li><Link href={'/contact'} className={thisPage === 'contact' ? linkStyleSelect : linkStyle}>KONTAKT</Link></li>
        </ul> 
    </>
  )
}

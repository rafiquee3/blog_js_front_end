import { css } from '@emotion/css'
import Image from 'next/image';
import Link from 'next/link';
import { BckgColor, FontColor } from '../../styles/colors';

const style = css`
  display: flex;
  flex-direction: rows;
  justify-content: flex-end;
  position: relative;
  width: 100%;
  height: 200px;
  background: ${BckgColor.FOOTER};
  border-top-left-radius: 80%;
  margin-top: 8em;

  .left {
    position: absolute;
    padding-left: 2em;
    bottom: 0.1em;
    left: 0;
    color: ${FontColor.TITLE};
    font-size: 0.8em;
  }
  .center {
    width: 25%;
    padding: 2em;
    padding-top: 10px;
    line-height: 1em;
    color: ${FontColor.DEFAULT};
    
    & > p {
      font-size: 0.8em;
    }
    p:first-child {
      font-size: 1em;
      color: ${FontColor.DEFAULT};
    } 
    p:first-child::after {
      display: block;
      content: '';
      margin-top: 12px;
      width: 47%;
      border-bottom: 1px solid #9B59B6;
    }

  }
  .right {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 2em;
    gap: 15px;

  }
`
const styleLink = css`
  height: 40px;
`
const styleImg = css`

`

const Footer = () => {

  return (
    <>
      <footer className={style}>
        <div className="left">
          <p>© 2022 Rafał Sokołowski - rafiquee3</p>
        </div>
        <div className="center">
          <p>Ostatnie wpisy</p>
          <p>Co to jest hoisting</p>
          <p>Co nie co o obiektach</p>
          <p>Array i mapy</p>
          <p>Ostatnie wpisy</p>
        </div>
        <div className="right">
          <Link className={styleLink} href={'/signin'}>
            <Image
              src="/linkedin.png"
              alt="linkedin icon"
              width={40}
              height={40}
              className={styleImg}
            />
          </Link>
          <Link className={styleLink} href={'/signin'}>
            <Image
              src="/github.png"
              alt="github icon"
              width={40}
              height={40}
              className={styleImg}
            />
          </Link>
          <Link className={styleLink} href={'/signin'}>
            <Image
              src="/mail.png"
              alt="email icon"
              width={40}
              height={40}
              className={styleImg}
            />
          </Link>
        </div>
      </footer>
    </>
  )
}

export default Footer;
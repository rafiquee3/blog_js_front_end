import { css } from '@emotion/css'
import { BckgColor, FontColor } from '../../styles/colors'
import Footer from '../Footer/Footer.component'

export const BlogLayout = ({children}: any): JSX.Element => {
  const style = css`
    display: flex;
    flex-direction: column;
    min-height: calc(100vh - 128px - 70px - 180px);
    max-width: 780px;
    margin-top: 70px;
    color: ${FontColor.DEFAULT};

    code {
      background: ${BckgColor.CODE};
      width: 780px;
      border-left: 4px solid ${BckgColor.SKYBLUE};
      border-top-left-radius: 2px; 
      border-bottom-left-radius: 2px; 
    }
    h1 {
      color: ${FontColor.TITLE};
      text-transform: uppercase;
    }
    h1::before {
      color: ${BckgColor.SKYBLUE};
      content: '-';
      height: 10px;
      width: 10px;
      background: ${BckgColor.SKYBLUE};
      margin-right: 0.5em;
    }
    h2 {
      color: ${FontColor.SUBTITLE};
    }
  `
  return (
    <>
      <div className={style}>
        {children}
      </div>
      <Footer/>
    </>
  )
}
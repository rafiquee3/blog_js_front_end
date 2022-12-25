import { css } from '@emotion/css'
import { BckgColor, FontColor } from '../../styles/colors';

const style = css`
display: flex;
position: relative;
flex-direction: column;
width: 100%;
height: 200px;
background: ${BckgColor.FOOTER};
border-top-left-radius: 80%;
margin-top: 8em;

.left {
  position: absolute;
  padding-left: 1em;
  bottom: 0.5em;
  color: ${FontColor.DEFAULT}
}
.right {

}
`
const Footer = () => {

  return (
    <>
      <footer className={style}>
        <div className="left">
          <p>© 2022 Rafał Sokołowski - rafiquee3</p>
        </div>
        <div className="right">

        </div>
      </footer>
    </>
  )
}

export default Footer;
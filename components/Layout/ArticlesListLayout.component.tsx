import { css } from '@emotion/css'
import { FontColor } from '../../styles/colors'
import Footer from '../Footer/Footer.component'

export const ArticlesListLayout = ({children}: any): JSX.Element => {
  const style = css`
    display: flex;
    flex-flow: row wrap;
    gap: 50px;
    min-height: calc(100vh - 128px - 70px - 180px);
    max-width: 850px;
    margin-top: 70px;
    color: ${FontColor.DEFAULT};
  `
  return (
    <>
      <div className={style}>
        {children}
      </div>
      <Footer />
    </>
  )
}
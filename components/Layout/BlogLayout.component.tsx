import { css } from '@emotion/css'
import { FontColor } from '../../styles/colors'

export const BlogLayout = ({children}: any): JSX.Element => {
  const style = css`
    display: flex;
    flex-direction: column;
    
    
    height-min: calc(100vh - 70px);
    max-width: 780px;
    color: ${FontColor.DEFAULT};

    code {
      background: #102B44;
      width: 780px;
    }
    h1 {
      color: ${FontColor.SUBTITLE};
      margin: 2em 1.5em 1em 0;
    }
    h2 {
      color: ${FontColor.SUBTITLE}};
    }
  `
  return (
    <>
      <div className={style}>
        {children}
      </div>
    </>
  )
}
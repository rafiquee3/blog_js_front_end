import { css } from '@emotion/css'

const Content = ({children}: any) => {
  const style = css`
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 70px);
  `
  return ( 
    <>
      <div className={style}>
        {children}
      </div>
    </>
  )
}
export default Content;
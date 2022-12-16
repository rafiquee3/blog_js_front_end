import { css } from '@emotion/css'

export const BlogLayout = ({children}: any): JSX.Element => {
  const style = css`
    display: flex;
    flex-direction: column;
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
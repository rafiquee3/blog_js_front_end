import { css } from '@emotion/css'

export const FormLayout = ({children}: any): JSX.Element => {
  const style = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
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
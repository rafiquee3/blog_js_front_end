import { css } from '@emotion/css';
import { useRecoilState } from 'recoil';
import { user } from '../../atoms/atoms';
import { FontColor } from '../../styles/colors';

export const CreatePostBttn = (ref) => {
    const [currentUser, setCurrentUser] = useRecoilState(user);
    const bttnStyle = css`
        display: flex;
        position: relative;
        width: 30%;
        border: 2px solid #166587;
        border-radius: 18px;
        overflow: hidden;

    div:nth-child(1) {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background: #166587;
    }
    div:nth-child(2) {
      display: flex;
      flex-direction: column;
      width: 100%;
      justify-content: center;
      padding-top: 0px;
      background: #183D61;

      input[type="button"] {
        height: 50px;
        bottom: 12px;
        color: ${FontColor.BLUEE};
        background: #183D61;
        border: none;
        padding: 12px 12px;
       

        &:hover {
          color: ${FontColor.GREEN};
          cursor: pointer;
          border-color: green;
        }
      }
    }
  `
  const styleCurrentField = css`
    padding: 5px 30px 5px 30px;
    margin: 0px;
    color: ${FontColor.DEFAULT};
    bottom: 0;
  `
  const handleOnClick = () => {
    alert('on click');
  }
    return (
        <>
            <div className={bttnStyle}> 
                <div>
                    <div className={styleCurrentField}>{currentUser}</div>
                </div>
                <div>
                    <input type="button" onClick={handleOnClick} value="Create new post"></input>
                </div>
            </div>
      </>
    )
}
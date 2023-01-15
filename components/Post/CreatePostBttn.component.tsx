import { css } from '@emotion/css';
import { forwardRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { user } from '../../atoms/atoms';
import { FontColor } from '../../styles/colors';

interface Show {
	show: (param: string) => void,
}

export const CreatePostBttn = ({show}: Show): JSX.Element => {
    const [currentUser, setCurrentUser] = useRecoilState(user);
    const [hide, setHide] = useState(false);
    const bttnStyle = css`
        display: flex;
        align-content: flex-start;
        position: relative;
        max-width: 35%;
        border: 2px solid #166587;
        border-radius: 18px;
        overflow: hidden;
        margin-top: 30px;

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
    setHide(prev => !prev);
    show('openBttn');
  }
  return (
      <>
        {currentUser &&
        <div className={bttnStyle}> 
            <div>
                <div className={styleCurrentField}>{currentUser}</div>
            </div>
            <div>
                <input type="button" onClick={handleOnClick} value="Add comment"></input>
            </div>
        </div>
        }    
    </>
  )
};
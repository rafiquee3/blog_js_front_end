import { css } from '@emotion/css'
import { useEffect, useRef } from 'react'
import { BckgColor, FontColor } from '../../styles/colors'

export const Status = ({info, error}: {info: string, error: boolean}) => {
    const statusRef: any = useRef(null);
    const styleStatus = css`
        position: fixed;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 180px;
        top: 90px;
        right: 0px;
        color: ${error ? FontColor.RED : FontColor.GREEN};
        background: ${BckgColor.BLUE};
        border: none;
        border-left: 5px solid ${error ? BckgColor.RED : BckgColor.GREEN};
    ` 
    useEffect(() => {
      const timeout = setTimeout(() => {
        if (statusRef.current) {
            statusRef.current.style.transform = 'translateX(999px)';
            statusRef.current.style.transition = 'transform 2s ease-in-out 0s';
        }
      },1000);
      () => clearTimeout(timeout);
    }, []);
    return (
        <>
            <div id="status" ref={statusRef} className={styleStatus} >
                <p>{info}</p>
            </div>
        </>
    )
}

import { css } from '@emotion/css'
import { useState } from 'react'
import { BckgColor } from '../../styles/colors'

export const Post = ({authorLogin, content}: {authorLogin: string, content: string}): JSX.Element => {
    const style = css`
        display: flex;
        align-items: flex-start;
        margin-top: 30px;
        width: 100%;
        .author {
            display: flex;
            justify-content: flex-end;
            width: 16%;
            padding: 0;
            margin-right: 30px;

          div {
            background-color: ${BckgColor.SKYBLUE};
            margin: 5px;
            padding: 5px 10px;
          }     
        }
        .content {
            width: 84%;
            margin-top: 1px;
            padding-bottom: 29px;
            border-bottom: 1px solid ${BckgColor.SKYBLUE};
        }
    `
    return (
        <>
            <div className={style}>
                <div className='author'>
                    <div>{authorLogin}</div>
                </div>
                <div className='content'>
                    {content}
                </div>
            </div>
        </>
    )
}

function useCallbeack(id: any, number: any) {
    throw new Error('Function not implemented.')
}

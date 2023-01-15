import { css } from '@emotion/css'
import { useState } from 'react'
import { BckgColor } from '../../styles/colors'

export const Post = ({authorLogin, content, date}: {authorLogin: string, content: string, date: string}): JSX.Element => {
    const dateFormat = `${date.split('T')[0]} ${date.split('T')[1].slice(0, 5)}`
    const style = css`
        display: flex;
        position: relative;
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
        .date {
            position: absolute;
            font-size: 12px;
            right: 0;
            bottom: 0;
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
                <div className='date'>{dateFormat}</div>
            </div>
        </>
    )
}

function useCallbeack(id: any, number: any) {
    throw new Error('Function not implemented.')
}

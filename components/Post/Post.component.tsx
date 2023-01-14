import { css } from '@emotion/css'
import { BckgColor } from '../../styles/colors'

export const Post = ({authorLogin, content}: {authorLogin: string, content: string}): JSX.Element => {
    const style = css`
        display: flex;
        align-items: flex-start;
        margin-top: 30px;
        .author {
          padding: 0;
          margin-right: 30px;

          p {
            background-color: ${BckgColor.SKYBLUE};
            margin: 5px;
            padding: 5px 10px;
          }     
        }
        .author:before {
            content: '';
            width: 5px;
            height: 5px;
            background-color: ${BckgColor.RED};
        }
        .content {
            margin-top: 1px;
            padding-bottom: 29px;
            border-bottom: 1px solid ${BckgColor.SKYBLUE};
        }
    `
    return (
        <>
            <div className={style}>
                <div className='author'>
                    <p>{authorLogin}</p>
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

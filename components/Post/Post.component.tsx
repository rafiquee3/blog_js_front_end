import { css } from '@emotion/css'
import { BckgColor } from '../../styles/colors'

export const Post = ({authorId, content}: {authorId: number, content: string}): JSX.Element => {
    const style = css`
        display: flex;
        align-items: flex-start;
        margin-top: 30px;
        .author {
          padding: 0;
          margin-right: 30px;
          border: 1px solid ${BckgColor.RED};
          border-radius: 8px;
          padding: 10px 15px 10px 15px;
        }
        .author:before {
            content: '';
            width: 5px;
            height: 5px;
            background-color: ${BckgColor.RED};
        }
        .content {
            margin-top: 1px;
            padding-bottom: 10px;
            border-bottom: 3px solid ${BckgColor.SKYBLUE};
        }
    `
    const findAuthor = (id: number) => {
        return 'author'
    }
    const author = findAuthor(authorId);
    return (
        <>
            <div className={style}>
                <div className='author'>
                    {author}
                </div>
                <div className='content'>
                    {content}
                </div>
            </div>
        </>
    )
}
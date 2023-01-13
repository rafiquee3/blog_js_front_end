import { css } from '@emotion/css'

export const Post = ({authorId, content}: {authorId: number, content: string}): JSX.Element => {
    const style = css`
        display: flex;
    `
    const findAuthor = (id: number) => {
        return 'author'
    }
    const author = findAuthor(authorId);
    return (
        <>
            <div className={style}>
                <div className='author'>
                    <p>{author}</p>
                </div>
                <div className='content'>
                    <p>{content}</p>
                </div>
            </div>
        </>
    )
}
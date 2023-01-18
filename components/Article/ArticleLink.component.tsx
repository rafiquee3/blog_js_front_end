import parse from 'html-react-parser';
import { css } from '@emotion/css'
import { BckgColor, FontColor } from "../../styles/colors";
import Link from "next/link";
import DOMPurify from 'isomorphic-dompurify';

export const ArticleLink = ({title, date, content, id}): JSX.Element => {
    const style = css`
        display: flex;
        flex-direction: column;
        width: 400px;
        border-radius: 18px;
        overflow: hidden;
        .up {
            display: flex;

            .left {
                display: flex;
                flex-direction: column;
                justify-content: center;
                width: 75%;
                background: ${BckgColor.SKYBLUE};
                padding: 20px 25px;
                .title {
                    font-size: 22px;
                    color: #b9d1cd;
                    &:hover {
                        color: white;
                    }
                }
                .author {
                    font-size: 14px;
                    color: ${BckgColor.BLUE};
                    font-weight: bold;
                    padding-top: 10px;
                }
            }
            .right {
                display: flex;
                width: 25%;
                flex-direction: column;
                justify-content: center;
                background: ${BckgColor.RED};
                text-align: center;
                padding: 20px 20px;
                color: ${BckgColor.FOOTER};
                
                font-weight: bold;
            }
        }
        .down {
            display: flex;
            flex-direction: column;
            background: ${BckgColor.BLUE};
            padding: 30px 25px 20px 25px;
            text-align: justify;
        }
    `
    const styleLink = css`
        align-self: flex-end;
        color: ${FontColor.BLUE};
        margin-top: 25px;
        &:hover {
            text-decoration: underline;
        }
    `
    const sanitize = (text) => {
        const txt = text.split(' ').slice(0, 60).join(' ');
        return txt
            .replace(/&lt;p&gt;/g, '')
            .replace(/&lt;\/p&gt;/g, '')
            .replace(/&lt;h2&gt;/g, '')
            .replace(/&lt;\/h2&gt;/g, '')
    } 
    const formatDate = (date: string): string => {
        return date;
    }
    return (
        <div className={style}>
            <div className="up">
                <div className="left">
                    <Link href={`/articles/${id}`} className="title">{title}</Link>
                    <div className="author">Rafał Sokołowski</div>
                </div>
                <div className="right"><div>14</div><div>grudzien</div><div>2022</div></div>
            </div>
            <div className="down">
                <div>{sanitize(content)}</div>
                <Link href={`/articles/${id}`} className={styleLink}>czytaj artykul</Link>
            </div>
        </div>
    )
}
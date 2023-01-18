import { FC } from "react";
import { css } from '@emotion/css'
import { BckgColor, FontColor } from "../../styles/colors";
import Link from "next/link";

export const ArticleLink: FC = (): JSX.Element => {
    const style = css`
        display: flex;
        flex-direction: column;
        width: 400px;
        .up {
            display: flex;
            
            .left {
                background: ${BckgColor.SKYBLUE};
                .title {
                    font-size: 22px;
                    color: #b9d1cd;
                    padding: 20px;
                }
                .author {
                    display: flex;
                    justify-content: space-between;
                    padding: 0 20px;
                    font-size: 12px;
                    color: ${BckgColor.BLUE};
                    font-weight: bold;
                }
            }
            .right {
                display: flex;
                flex-direction: column;
                justify-content: center;
                background: ${BckgColor.RED};
                text-align: center;
                padding: 20px;
                color: ${BckgColor.FOOTER};
                font-weight: bold;
            }
        }
        .down {
            display: flex;
            flex-direction: column;
            background: ${BckgColor.BLUE};
            padding: 30px 20px 20px 20px;
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
    return (
        <div className={style}>
            <div className="up">
                <div className="left">
                    <div className="title">TypeScript 4.9 – pierwsza wersja beta, nowy operator</div>
                    <div className="author"><div>Rafał Sokołowski</div><div>5 minut czytania</div></div>
                </div>
                <div className="right"><div>14</div><div>grudzien</div><div>2022</div></div>
            </div>
            <div className="down">
                <div>Na finalną wersję TypeScript 5.0 poczekać trzeba będzie najprawdopodobniej do 14 marca, ale wczesna beta do testowania powinna pojawić się już pod koniec stycznia. Będący nadzbiorem języka JavaScript TypeScript wprowadza do niego mechanizmy, które charakterystyczne są dla obiektowych języków programowania. Najważniejszym z nich jest bez wątpienia statyczne typowanie zmiennych. Z tego właśnie powodu w wersji…</div>
                <Link href="/signup" className={styleLink}>czytaj artykul</Link>
            </div>
        </div>
    )
}
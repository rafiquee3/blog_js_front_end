import { FC } from "react";
import { css } from '@emotion/css'
import { BckgColor } from "../../styles/colors";

export const ArticleLink: FC = (): JSX.Element => {
    const style = css`
        display: flex;
        flex-direction: column;
        width: 300px;
        height: 300px;
        .up {
            display: flex;
            background: ${BckgColor.SKYBLUE}
            .left {
                
            }
            .right {
                background: red;
            }
        }
        .down {
            background: ${BckgColor.BLUE}
        }
    `
    return (
        <>
            <div className={style}>
                <div className="up">
                    <div className="left">TypeScript 4.9 – pierwsza wersja beta, nowy operator</div>
                    <div className="right"><div>14</div><div>grudzien</div><div>2022</div></div>
                </div>
                <div className="down">
                    <div>Na finalną wersję TypeScript 5.0 poczekać trzeba będzie najprawdopodobniej do 14 marca, ale wczesna beta do testowania powinna pojawić się już pod koniec stycznia. Będący nadzbiorem języka JavaScript TypeScript wprowadza do niego mechanizmy, które charakterystyczne są dla obiektowych języków programowania. Najważniejszym z nich jest bez wątpienia statyczne typowanie zmiennych. Z tego właśnie powodu w wersji…</div>
                    <div>czytaj artykul</div>
                </div>
            </div>
        </>
    )
}
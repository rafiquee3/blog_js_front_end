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
            
            .left {
                background: ${BckgColor.SKYBLUE};
                .title {
                    font-size: 22px;
                }
                .author {
                    display: flex;
                    font-size: 12px;
                }
            }
            .right {
                background: ${BckgColor.RED};
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
                    <div className="left">
                       <div className="title">TypeScript 4.9 – pierwsza wersja beta, nowy operator</div>
                       <div className="author"><div>Rafał Sokołowski</div><div>5 minut czytania</div></div>
                    </div>
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
import { GetStaticProps, GetStaticPaths } from 'next'
import { FC, ReactElement, useEffect } from 'react'
import { Layout } from '../../components/Layout'
import { BlogLayout } from '../../components/Layout'
import { NextPageWithLayout } from '../_app'
import parse from 'html-react-parser';
import hljs from 'highlight.js';
import javascript from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/atom-one-dark.css';
import Head from 'next/head'
import {unescape} from 'html-escaper';
import { useRecoilState } from 'recoil'
import { useRouter } from 'next/router'

type ArticleType = {
  content: string;
  createdAt: string;
  id: number;
  title: string;
  updatedAt: string;  
}

const addClass = (html: any) => {
  return html.replace(/<code>/g, '<code className="js">');
}

const Article: NextPageWithLayout = ({ article }: any): JSX.Element => {
  const router = useRouter();
  const unescapeContent = unescape(article.content);
  const content = addClass(unescapeContent);
  useEffect(() => {
    hljs.registerLanguage('javascript', javascript);
    hljs.highlightAll();
  }, [])

  return (
    <>
      <Head>
        <title>r3 blog</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <h1>{article.title}</h1>
      {parse(content)}
    </>
  )
}

Article.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <BlogLayout>{page}</BlogLayout>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch('http://localhost:3001/article/all')
  const articles = await res.json()
  const paths = articles.map((article: ArticleType) => ({
    params: { id: article.id.toString() },
  }))
  return { paths, fallback: false }
  //return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
  const res = await fetch(`http://localhost:3001/article/${params.id}`)
  const article = await res.json()

  return {
    props: {
      article,
    },
    //revalidate: 10,
  }
}

export default Article;
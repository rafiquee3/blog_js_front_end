import { GetStaticProps, GetStaticPaths } from 'next'
import { ReactElement, useEffect } from 'react'
import { Layout } from '../../components/Layout'
import { BlogLayout } from '../../components/Layout'
import type { NextPageWithLayout } from '../_app'
import parse, { domToReact } from 'html-react-parser';
import hljs from 'highlight.js';
import 'highlight.js/styles/base16/solarized-dark.css';

type ArticleType = {
  title: string;
  content: string;
}

const Article: NextPageWithLayout = ({ article }: {article: ArticleType }) => {
  console.log(article)
  useEffect(() => {
    hljs.initHighlighting()
  }, [])
  return (
    <>
    {parse(article.content)}
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
  const paths = articles.map((article) => ({
    params: { id: article.id.toString() },
  }))
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const res = await fetch(`http://localhost:3001/article/${params.id}`)
  const article = await res.json()

  return {
    props: {
      article,
    },
  }
}
export default Article;
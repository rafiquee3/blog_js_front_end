import { GetStaticProps, GetStaticPaths } from 'next'

import type { ReactElement } from 'react'
import { Layout } from '../../components/Layout'
import { BlogLayout } from '../../components/Layout'
import type { NextPageWithLayout } from '../_app'

type ArticleType = {
  title: String;
  content: String;
}

const Article: NextPageWithLayout = ({ article }: {article: ArticleType }) => {
  return (
    <>
    <div>{article.title}</div>
    <div>{article.content}</div>
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
  // Call an external API endpoint to get posts
  const res = await fetch('http://localhost:3001/article/all')
  const articles = await res.json()

  // Get the paths we want to pre-render based on posts
  const paths = articles.map((article) => ({
    params: { id: article.id.toString() },
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // Call an external API endpoint to get posts
  const res = await fetch(`http://localhost:3001/article/${params.id}`)
  const article = await res.json()

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      article,
    },
  }
}
export default Article;
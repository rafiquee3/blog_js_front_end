import { GetStaticProps, GetStaticPaths } from 'next'
import { FC, ReactElement, useEffect, useState } from 'react'
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
import { user } from '../../atoms/atoms'
import { CreatePost } from '../../components/Post/CreatePost.component'
import { CreatePostBttn } from '../../components/Post/CreatePostBttn.component'
import { PostsList } from '../../components/Post/PostsList.component'

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
  const [currUser, setUser] = useRecoilState(user);
  const unescapeContent = unescape(article.content);
  const content = addClass(unescapeContent);
  const [hidePostForm, setHidePostForm] = useState(false); 
  const showBttn = (hide: boolean) => {
    setHidePostForm(hide);
  }
  const showForm = (hide: boolean) => {
    setHidePostForm(hide);
  }
  useEffect(() => {
    hljs.registerLanguage('javascript', javascript);
    hljs.highlightAll();
    console.log(localStorage.getItem('user'))
    setUser(localStorage.getItem('user'));
  }, [setUser])
  //console.log(currUser)
  return (
    <>
      <Head>
        <title>r3 blog</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <h1>{article.title}</h1>
      {parse(content)}
      {hidePostForm ? <CreatePost show={showBttn}/> : <CreatePostBttn show={showForm}/>}
      <PostsList />
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
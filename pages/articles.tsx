import { GetStaticProps } from 'next'
import { ReactElement, useEffect } from 'react';
import { BlogLayout, Layout } from '../components/Layout';
import { Status } from '../components/Status/Status.component';
import { useRecoilState } from 'recoil';
import { firstRender, page } from '../atoms/atoms';
import { NextPageWithLayout } from './_app';
import { ArticleLink } from '../components/Article/ArticleLink.component';
import { ArticlesListLayout } from '../components/Layout/ArticlesListLayout.component';

type Props = {
  id: number;       
  createdAt: any;
  updatedAt: any;
  title:     string;
  content:   string;
};
//const Index: NextPageWithLayout = (): JSX.Element => {
  const Articles: NextPageWithLayout = ({ articles }: any): JSX.Element => {
  const [firstView, setFirstView] = useRecoilState(firstRender)
  const [thisPage, setThisPage] = useRecoilState(page);
  useEffect(() => {
    setThisPage('blog');
    return () => {
      setFirstView(false);
    }
  }, [setFirstView, setThisPage])
 
  return (
   <>
        {firstView && <Status info="Logged in" error={false} />}
        {articles.map((article: Props) => (<ArticleLink key={article.id} title={article.title} date={article.createdAt} content={article.content} id={article.id.toString()} />))}
   </>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  // Call an external API endpoint to get posts
  const res = await fetch('http://localhost:3001/article/all')
  const articles: Props = await res.json()

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      articles,
    },
  }
}

Articles.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <ArticlesListLayout>{page}</ArticlesListLayout>
    </Layout>
  )
}

export default Articles;
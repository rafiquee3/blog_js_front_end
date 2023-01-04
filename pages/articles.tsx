import { GetStaticProps } from 'next'
import { useEffect } from 'react';
import { BlogLayout, Layout } from '../components/Layout';
import { Status } from '../components/Status/Status.component';
import { useRecoilState } from 'recoil';
import { firstRender } from '../atoms/atoms';
import { NextPageWithLayout } from './_app';

type Props = {
  id: number;       
  createdAt: any;
  updatedAt: any;
  title:     string;
  content:   string;
};
//const Index: NextPageWithLayout = (): JSX.Element => {
  const Articles = ({ articles }: Props) => {
  const [firstView, setFirstView] = useRecoilState(firstRender)
  useEffect(() => {

    console.log(firstView);
    return () => {
      console.log('unmount')
      setFirstView(false);
    }
  }, [])
 
  return (
   <>
        {firstView && <Status info="Logged in" error={false} />}
        <div>{articles.map((article: Props) => (<p key={article.id}>{article.title}</p>))}</div>
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
      <BlogLayout>{page}</BlogLayout>
    </Layout>
  )
}

export default Articles;
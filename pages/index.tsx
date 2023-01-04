import { BlogLayout } from '../components/Layout'
import { page } from '../atoms/atoms'
import { ReactElement, useEffect } from 'react'
import { Layout } from '../components/Layout'
import type { NextPageWithLayout } from './_app'
import { useRecoilState } from 'recoil'
import { user } from '../atoms/atoms'
import { useRouter } from 'next/router'

const Index: NextPageWithLayout = (): JSX.Element => {
  const [currUser, setUser] = useRecoilState(user);
  const [thisPage, setThisPage] = useRecoilState(page);
  const router = useRouter();
  useEffect(() => {
    setThisPage('home');
  }, [setThisPage])

  return (
    <>
        <p>hello word</p>
         <input type="button" onClick={()=>router.push('/articles/16')}/>
        {currUser}
    </>
  )
}

Index.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <BlogLayout>{page}</BlogLayout>
    </Layout>
  )
}

export default Index;

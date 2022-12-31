import { ReactElement, useEffect } from 'react'
import { Layout } from '../components/Layout'
import { BlogLayout } from '../components/Layout'
import type { NextPageWithLayout } from './_app'
import { useRecoilState } from 'recoil'
import { user } from '../atoms/atoms'
import { useRouter } from 'next/router'


const Index: NextPageWithLayout = (): JSX.Element => {
  const [currUser, setUser] = useRecoilState(user);
  const router = useRouter();
  useEffect(() => {
    console.log(localStorage.getItem('user'), 'hello word')
    console.log(localStorage.getItem('user'));
  }, [])

  return <>
          <p>hello word</p>
          <input type="button" onClick={()=>router.push('/articles/1')}/>
          {currUser}
          </>
}

Index.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <BlogLayout>{page}</BlogLayout>
    </Layout>
  )
}

export default Index;

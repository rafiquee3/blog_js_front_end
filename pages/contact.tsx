import { ReactElement, useEffect } from 'react'
import { BlogLayout, Layout } from '../components/Layout'
import type { NextPageWithLayout } from './_app'
import { useRecoilState } from 'recoil'
import { page, user } from '../atoms/atoms'

const Admin: NextPageWithLayout = () => {
  const [isAdmin, setIsAdmin] = useRecoilState(user);
  const [thisPage, setThisPage] = useRecoilState(page);
  useEffect(() => {
    setThisPage('contact');
  },[]);
  return (
    <>
      <p>contact</p>
    </>
  )
}

Admin.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <BlogLayout>{page}</BlogLayout>
    </Layout>
  )
}

export default Admin;
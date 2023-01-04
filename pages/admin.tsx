import { ReactElement, useState, useEffect, useRef } from 'react'
import { Layout } from '../components/Layout'
import { FormLayout } from '../components/Layout'
import { PostForm } from '../components/Admin'
import type { NextPageWithLayout } from './_app'
import { useRecoilState } from 'recoil'
import { page, user } from '../atoms/atoms'
import { Status } from '../components/Status/Status.component'

const Admin: NextPageWithLayout = () => {
  const [isAdmin, setIsAdmin] = useRecoilState(user);
  const [thisPage, setThisPage] = useRecoilState(page);
  useEffect(() => {
    setThisPage('about');
  },[]);
  return (
    <>
      {isAdmin === 'admin' && <Status info="Admin logged in" error={false} />}
      <PostForm/>
    </>
  )
}

Admin.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <FormLayout>{page}</FormLayout>
    </Layout>
  )
}

export default Admin;
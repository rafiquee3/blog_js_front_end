import { ReactElement, useState, useEffect, useRef } from 'react'
import { Layout } from '../components/Layout'
import { FormLayout } from '../components/Layout'
import { PostForm } from '../components/Admin'
import type { NextPageWithLayout } from './_app'
import { useRecoilState } from 'recoil'
import { user } from '../atoms/atoms'

const Admin: NextPageWithLayout = () => {
  const [sa, setSa] = useRecoilState(user);

  return (
    <>
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
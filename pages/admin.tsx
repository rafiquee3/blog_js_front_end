import { ReactElement, useState, useEffect, useRef } from 'react'
import { Layout } from '../components/Layout'
import { FormLayout } from '../components/Layout'
import { PostForm } from '../components/Admin'
import type { NextPageWithLayout } from './_app'

const Admin: NextPageWithLayout = () => {
  return <PostForm/>
}

Admin.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <FormLayout>{page}</FormLayout>
    </Layout>
  )
}

export default Admin;
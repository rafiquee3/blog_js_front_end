import type { ReactElement } from 'react'
import { Layout } from '../components/Layout'
import { BlogLayout } from '../components/Layout'
import type { NextPageWithLayout } from './_app'

const Admin: NextPageWithLayout = () => {
  return <p>admin</p>
}

Admin.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <BlogLayout>{page}</BlogLayout>
    </Layout>
  )
}

export default Admin;
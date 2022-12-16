import {LoginForm} from '../components/LoginForm'
import type { ReactElement } from 'react'
import { Layout } from '../components/Layout'
import { FormLayout } from '../components/Layout'
import type { NextPageWithLayout } from './_app'

const Signin: NextPageWithLayout = () => {
  return <LoginForm/>
}

Signin.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <FormLayout>{page}</FormLayout>
    </Layout>
  )
}

export default Signin;
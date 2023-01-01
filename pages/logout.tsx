import axios from 'axios';
import { ReactElement, useEffect } from 'react';
import { useRecoilState } from 'recoil'
import { user } from '../atoms/atoms'
import { BlogLayout, Layout } from '../components/Layout';
import { NextPageWithLayout } from './_app';

const Logout: NextPageWithLayout = (): JSX.Element  => {
  const [currentUser, setCurrentUser] = useRecoilState(user);
  const logoutApi = () => {
    axios.get('http://localhost:3001/auth/logout', {})
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err)
    });
    
  }
  
  useEffect(() => {
    if(currentUser) {
      setCurrentUser('');
      localStorage.clear();
      logoutApi();
    }
  }, [currentUser, setCurrentUser])
  return <>
      <p>logout</p>
    </>
}

Logout.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <BlogLayout>{page}</BlogLayout>
    </Layout>
  )
}

export default Logout;
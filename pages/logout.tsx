import axios from 'axios';
import { ReactElement, useEffect } from 'react';
import { useRecoilState } from 'recoil'
import { user } from '../atoms/atoms'
import { BlogLayout, Layout } from '../components/Layout';
import { NextPageWithLayout } from './_app';

const Logout: NextPageWithLayout = (): JSX.Element  => {
  const [currentUser, setCurrentUser] = useRecoilState(user);
  
  useEffect(() => {
    const logoutApi = async () => {
      const JwtToken = localStorage.getItem('JWT');
      const config = {
        headers: {
          'Authorization': `Bearer ${JwtToken}`,
        }
      };
      console.log(config);
      const url: string = 'http://localhost:3001/auth/logout';
      await axios.get(url, config)
      .then((res) => {
        localStorage.clear();
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err)
      });  
    }

    if(currentUser) {
      setCurrentUser('');
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
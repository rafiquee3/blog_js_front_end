import axios from "axios";
import { useEffect, useState } from "react"
import { Post } from "./Post.component";

type ArticleType = {
    content: string;
    createdAt: string;
    id: number;
    title: string;
    updatedAt: string;  
}
  
export const PostsList = ({article, refresh}: {article: ArticleType, refresh: object} ) => {
    type PostType = {
        id: number;
        authorLogin: string;
        content: string;
        createdAt: string;
    }
    const initial: PostType[] = [
        {
            id: 0,
            authorLogin: '',
            content: '',
            createdAt: '',
        }
    ]
    const [posts, setPosts] = useState(initial);
    const [loading, setLoading] = useState(true);
    const forceRefresh = refresh;
    useEffect(() => {
        console.log('useEffect PostList render')
        const apiConnect = async () => {
            const data = article;
            const url: string = 'http://localhost:3001/post/all';
            await axios.post(url, data)
            .then((res) => {
                setLoading(false);
                setPosts(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
        }
       apiConnect();
    }, [forceRefresh]);
    console.log('PostList render')
    return (
        <>
            <div style={{marginTop: '20px'}}>
                {loading && <div>Loading...</div>}
                {!loading && <>{posts.map((post) => <Post key={post.id} authorLogin={post.authorLogin} content={post.content} date={post.createdAt} />).reverse()}</>}
            </div>
        </>
    )
}
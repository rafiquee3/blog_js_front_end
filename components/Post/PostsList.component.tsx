import axios from "axios";
import { useEffect, useState } from "react"
import { Post } from "./Post.component";

export const PostsList = ({refresh}: {refresh: object}) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const forceRefresh = refresh;
    useEffect(() => {
        const apiConnect = async () => {
            const url: string = 'http://localhost:3001/post/all';
            await axios.get(url)
            .then((res) => {
                setLoading(false);
                console.log(res.data)
                setPosts(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
        }
       apiConnect();
    }, [forceRefresh]);
    console.log('postList render');
    return (
        <>
            <div style={{marginTop: '20px'}}>
                {loading && <div>Loading...</div>}
                {!loading && <>{posts.map((post) => <Post key={post.id} authorLogin={post.authorLogin} content={post.content} date={post.createdAt} />).reverse()}</>}
            </div>
        </>
    )
}
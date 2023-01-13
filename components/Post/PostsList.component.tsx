import axios from "axios";
import { useEffect, useState } from "react"
import { Post } from "./Post.component";

export const PostsList = () => {
    const [posts, setPosts] = useState(null);
    const [loading, setLoading] = useState(true);
    
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
    }, []);
    return (
        <>
            <div style={{marginTop: '30px'}}>
                {loading && <div>Loading...</div>}
                {!loading && <>{posts.map((post) => <Post key={post.id} authorId={post.authorId} content={post.content} />)}</>}
            </div>
        </>
    )
}
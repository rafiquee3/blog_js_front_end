import axios from "axios";
import { useEffect, useState } from "react"

export const PostsList = (): JSX.Element => {
    const [posts, setPosts] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const apiConnect = async () => {
            const url: string = 'http://localhost:3001/post/all';
            await axios.get(url)
            .then((res) => {
                setLoading(false);
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
           {loading && <div>Loading...</div>}
           {!loading && <div>{posts.map((post) => {(<div>{post.content}</div>)})}</div>}
        </>
    )
}
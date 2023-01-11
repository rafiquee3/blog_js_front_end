import axios from "axios";
import { useEffect } from "react"

export const PostsList = (): JSX.Element => {
    const apiConnect = async () => {
        const url: string = 'http://localhost:3001/auth/signin';
        await axios.post(url, data)
        .then((res) => {
        
        })
        .catch((err) => {
       
        });
    }
    useEffect(() => {
       
    }, [])
    return (
        <>

        </>
    )
}
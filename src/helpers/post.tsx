import { toast } from 'react-toastify';
import axios from "axios";
import APIURL from "./environment/urlSwitch";

const createPost = async (e: any, content: string, CurrentUser: any, history: any) => {
    e.preventDefault()
    
    // Get user request and set to CurrentUser context
    let request = await axios.post(
        `${APIURL}/post/create`,
        { content },
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": CurrentUser?.token
            }
        }
    )
    let data = request.data;
    if (data && data.post) {
        toast.success("Post created successfully!");
        return history('/newsfeed')
    } else {
        toast.error(data.message)
    }
}

const getSinglePostWithInfo = async () => {

}

const getPostForEdit  = async (id: string, CurrentUser: any) => {
    let request: any = await axios.get(
        `${APIURL}/post/view/edit/${id}`,
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": CurrentUser?.token
            }
        }
    )
    request = request.data

    if  (request.status === "SUCCESS") {
        return request.post.content
    }
}

const editPost = async (e: any, content: string, postId: string, CurrentUser: any, history: any) => {
    e.preventDefault()
    // console.log(CurrentUser)

    let request: any = await axios.put(
        `${APIURL}/post/update/${postId}`,
        {
            content: content.trim(),
        },
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": CurrentUser.token
            }
        }
    )
    request = request.data;
    console.log(request)
    if (request.status === "SUCCESS") {
        toast.success('Post content successfully updated!')
        return history('/newsfeed')
    } else {
        toast.error(`${request.message}`)
    }
}

const getPostForDelete  = async (id: string, CurrentUser: any) => {
    let request: any = await axios.get(
        `${APIURL}/post/view/delete/${id}`,
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": CurrentUser?.token
            }
        }
    )
    request = request.data

    if  (request.status === "SUCCESS") {
        return request.post
    }
}

const deletePost = async(e: any, id: string, CurrentUser: any, history:  any) => {
    e.preventDefault();
    let request: any = await axios.delete(
        `${APIURL}/post/delete/${id}`,
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": CurrentUser?.token
            }
        }
    )
    request = request.data

    if  (request.status === "SUCCESS") {
        toast.success('Post successfully destroyed!')
        return history('/newsfeed')
    }
}

const togglePostLikeNewsfeed = async (e: any, post: any, CurrentUser: any, posts: any, setPosts: any) => {
    e.preventDefault();

    // Check to see if the user has liked the post already or not
    // Check to see if post has been liked by user
    if (!post.postlikeIds.includes(CurrentUser.id)) {
        // IF the user is liking the post
        let request: any = await axios.post(
            `${APIURL}/post/like/${post.id}`,
            {},
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": CurrentUser?.token
                }
            }
        )
        request = request.data
    
        if  (request.status === "SUCCESS") {
            toast.success('Post successfully liked!')
    
            // Take original post, modify the postlikes
            post.postlikes = request.likedPost.postlikes
            let tempUserLikes: any = []
            post.postlikes.forEach((like: any) => {
                tempUserLikes.push(like.userId)
            })
            post.postlikeIds = tempUserLikes
            // Append modified post to the posts array
            let postIndex = posts.findIndex((post:any) => post.id === request.likedPost.id)
            let temp = [...posts]
            temp[postIndex] = post
            setPosts(temp)
        }
    } else {
        // If the user is liking the post
        let request: any = await axios.delete(
            `${APIURL}/post/unlike/${post.id}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": CurrentUser?.token
                }
            }
        )
        request = request.data
    
        if  (request.status === "SUCCESS") {
            toast.success('Post successfully unliked!')
    
            // Take original post, modify the postlikes
            post.postlikes = request.unlikedPost.postlikes
            let tempUserLikes: any = []
            post.postlikes.forEach((like: any) => {
                tempUserLikes.push(like.userId)
            })
            post.postlikeIds = tempUserLikes
            // Append modified post to the posts array
            let postIndex = posts.findIndex((post:any) => post.id === request.unlikedPost.id)
            let temp = [...posts]
            temp[postIndex] = post
            setPosts(temp)
        }
    }
}


export { createPost, getSinglePostWithInfo, getPostForEdit, editPost, getPostForDelete, deletePost, togglePostLikeNewsfeed }
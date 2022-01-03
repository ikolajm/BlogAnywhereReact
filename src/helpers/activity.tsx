import { toast } from 'react-toastify';
import axios from "axios";
import APIURL from "./environment/urlSwitch";

const togglePostLike = async (activity: any, recent: any, CurrentUser: any, setRecent: any) => {
    // Post not liked
    if (!activity.postlikeIds.includes(CurrentUser.id)) {
        // IF the user is liking the post
        let request: any = await axios.post(
            `${APIURL}/post/like/${activity.id}`,
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
            activity.postlikes = request.likedPost.postlikes
            let tempUserLikes: any = []
            activity.postlikes.forEach((like: any) => {
                tempUserLikes.push(like.userId)
            })
            activity.postlikeIds = tempUserLikes
            // Append modified post to the posts array
            let postIndex = recent.findIndex((post:any) => post.id === request.likedPost.id)
            let temp = [...recent]
            temp[postIndex] = activity
            setRecent(temp)
        }
    } else {
        // If the user is liking the post
        let request: any = await axios.delete(
            `${APIURL}/post/unlike/${activity.id}`,
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
            activity.postlikes = request.unlikedPost.postlikes
            let tempUserLikes: any = []
            activity.postlikes.forEach((like: any) => {
                tempUserLikes.push(like.userId)
            })
            activity.postlikeIds = tempUserLikes
            // Append modified post to the posts array
            let postIndex = recent.findIndex((post:any) => post.id === request.unlikedPost.id)
            let temp = [...recent]
            temp[postIndex] = activity
            setRecent(temp)
        }
    }
}

const toggleCommentLike = async (activity: any, recent: any, CurrentUser: any, setRecent: any) => {
    // Post not liked
    if (!activity.commentlikeIds.includes(CurrentUser.id)) {
        // IF the user is liking the post
        let request: any = await axios.post(
            `${APIURL}/comment/like/${activity.id}`,
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
            toast.success('Comment successfully liked!')
    
            // Take original post, modify the postlikes
            activity.commentlikes = request.likedComment.commentlikes
            let tempUserLikes: any = []
            activity.commentlikes.forEach((like: any) => {
                tempUserLikes.push(like.userId)
            })
            activity.commentlikeIds = tempUserLikes
            // Append modified post to the posts array
            let commentIndex = recent.findIndex((comment:any) => comment.id === request.likedComment.id)
            let temp = [...recent]
            temp[commentIndex] = activity
            setRecent(temp)
        }
    } else {
        // If the user is liking the post
        let request: any = await axios.delete(
            `${APIURL}/comment/unlike/${activity.id}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": CurrentUser?.token
                }
            }
        )
        request = request.data
    
        if  (request.status === "SUCCESS") {
            toast.success('Comment successfully unliked!')
    
            // Take original post, modify the postlikes
            activity.commentlikes = request.unlikedComment.commentlikes
            let tempUserLikes: any = []
            activity.commentlikes.forEach((like: any) => {
                tempUserLikes.push(like.userId)
            })
            activity.commentlikeIds = tempUserLikes
            // Append modified post to the posts array
            let commentIndex = recent.findIndex((comment:any) => comment.id === request.unlikedComment.id)
            let temp = [...recent]
            temp[commentIndex] = activity
            setRecent(temp)
        }
    }
}

const toggleLikedPostLike = async (activity: any, recent: any, CurrentUser: any, setRecent: any) => {
    // Post not liked
    if (!activity.post.postlikeIds.includes(CurrentUser.id)) {
        // IF the user is liking the post
        let request: any = await axios.post(
            `${APIURL}/post/like/${activity.post.id}`,
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
            activity.post.postlikes = request.likedPost.postlikes
            let tempUserLikes: any = []
            activity.post.postlikes.forEach((like: any) => {
                tempUserLikes.push(like.userId)
            })
            activity.post.postlikeIds = tempUserLikes
            // Append modified post to the posts array
            let postIndex = recent.findIndex((like:any) => like.post.id === request.likedPost.id)
            let temp = [...recent]
            temp[postIndex] = activity
            setRecent(temp)
        }
    } else {
        // If the user is liking the post
        let request: any = await axios.delete(
            `${APIURL}/post/unlike/${activity.post.id}`,
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
            activity.post.postlikes = request.unlikedPost.postlikes
            let tempUserLikes: any = []
            activity.post.postlikes.forEach((like: any) => {
                tempUserLikes.push(like.userId)
            })
            activity.post.postlikeIds = tempUserLikes
            // Append modified post to the posts array
            let postIndex = recent.findIndex((like:any) => like.post.id === request.unlikedPost.id)
            let temp = [...recent]
            temp[postIndex] = activity
            setRecent(temp)
        }
    }
}

const toggleLikedCommentLike = async (activity: any, recent: any, CurrentUser: any, setRecent: any) => {
    // Post not liked
    if (!activity.comment.commentlikeIds.includes(CurrentUser.id)) {
        // IF the user is liking the post
        let request: any = await axios.post(
            `${APIURL}/post/like/${activity.comment.id}`,
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
            toast.success('Comment successfully liked!')
    
            // Take original post, modify the postlikes
            activity.comment.commentlikes = request.likedComment.commentlikes
            let tempUserLikes: any = []
            activity.comment.commentlikes.forEach((like: any) => {
                tempUserLikes.push(like.userId)
            })
            activity.comment.commentlikeIds = tempUserLikes
            // Append modified post to the posts array
            let commentIndex = recent.findIndex((like:any) => like.comment.id === request.likedComment.id)
            let temp = [...recent]
            temp[commentIndex] = activity
            setRecent(temp)
        }
    } else {
        // If the user is liking the post
        let request: any = await axios.delete(
            `${APIURL}/comment/unlike/${activity.comment.id}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": CurrentUser?.token
                }
            }
        )
        request = request.data
    
        if  (request.status === "SUCCESS") {
            toast.success('Comment successfully unliked!')
    
            // Take original post, modify the postlikes
            activity.comment.commentlikes = request.unlikedComment.commentlikes
            let tempUserLikes: any = []
            activity.comment.commentlikes.forEach((like: any) => {
                tempUserLikes.push(like.userId)
            })
            activity.comment.commentlikeIds = tempUserLikes
            // Append modified post to the posts array
            let commentIndex = recent.findIndex((like:any) => like.comment.id === request.unlikedComment.id)
            let temp = [...recent]
            temp[commentIndex] = activity
            setRecent(temp)
        }
    }
}

const toggleLikeActivityFeed = async (e: any, activity: any, CurrentUser: any, recent: any, setRecent: any) => {
    e.preventDefault()

    const modifyActivity = async (item: any) => {
        switch(activity.type) {
            case 'post':
                togglePostLike(item, recent, CurrentUser, setRecent);
                break;
            case 'comment':
                toggleCommentLike(item, recent, CurrentUser, setRecent);
                break;
            case 'postlike':
                toggleLikedPostLike(item, recent, CurrentUser, setRecent);
                break;
            default:
                // toggleLikedCommentLike(item, recent, CurrentUser, setRecent);
        }
    }

    modifyActivity(activity)
}

export { toggleLikeActivityFeed }
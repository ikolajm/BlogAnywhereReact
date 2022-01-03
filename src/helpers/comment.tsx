import { toast } from 'react-toastify';
import axios from "axios";
import APIURL from "./environment/urlSwitch";

const createComment = async (e: any, content: string, post: any, setPost: any, CurrentUser: any, setCommentContent: any, setParticipants: any) => {
    e.preventDefault()
    
    // Get user request and set to CurrentUser context
    let request = await axios.post(
        `${APIURL}/comment/create`,
        { content, postId: post.id },
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": CurrentUser?.token
            }
        }
    )
    let data = request.data;
    if (data && data.comment) {
        toast.success("Comment created successfully!");
        console.log(data.comment)
        let newComment = data.comment
        newComment.user = CurrentUser
        newComment.commentlikes = []
        newComment.commentlikeIds = []
        // Unshift comment with user data to post comments, if not already present, add user to participants
        post.comments.unshift(newComment)
        let temp = {...post}
        let present = false
        post.participants.forEach((user: any) => {
            if (user.id === CurrentUser.id) {
                present = true
            }
        })
        if (!present) {
            let tempParticipants = [...post.participants]
            tempParticipants.push(CurrentUser)
            setParticipants(tempParticipants)
        }
        setPost(temp)
        setCommentContent('')
    } else {
        toast.error(data.message)
    }
}

const getCommentForEdit = async (id: string, CurrentUser: any) => {
    let request: any = await axios.get(
        `${APIURL}/comment/view/edit/${id}`,
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": CurrentUser?.token
            }
        }
    )
    request = request.data

    if  (request.status === "SUCCESS") {
        return request.comment
    }
}

const editComment = async (e: any, content: string, commentId: any, postId: string, CurrentUser: any, history: any) => {
    e.preventDefault()

    let request: any = await axios.put(
        `${APIURL}/comment/edit/${commentId}`,
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
    // console.log(request)
    if (request.status === "SUCCESS") {
        toast.success('Comment content successfully updated!')
        return history('/post/' + postId)
    } else {
        toast.error(`${request.message}`)
    }
}

const getCommentForDelete = async (id: string, CurrentUser: any) => {
    // console.log('function fired')
    let request: any = await axios.get(
        `${APIURL}/comment/view/delete/${id}`,
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": CurrentUser?.token
            }
        }
    )
    request = request.data
    // console.log(request)

    if (request.status === "SUCCESS") {
        // console.log(request.comment)
        return request.comment
    }
}

const deleteComment = async (e:any, commentId: any, postId: any, CurrentUser: any, history: any) => {
    e.preventDefault();
    let request: any = await axios.delete(
        `${APIURL}/comment/delete/${commentId}`,
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": CurrentUser?.token
            }
        }
    )
    request = request.data

    if  (request.status === "SUCCESS") {
        toast.success('Comment successfully destroyed!')
        return history('/post/' + postId)
    }
}

const toggleCommentLikePostView = async (e: any, comment: any, CurrentUser: any, post: any, setComments: any) => {
    e.preventDefault();

    // Check to see if the user has liked the comment already or not
    // Check to see if comment has been liked by user
    if (!comment.commentlikeIds.includes(CurrentUser.id)) {
        console.log('likingthepost')
        // IF the user is liking the post
        let request: any = await axios.post(
            `${APIURL}/comment/like/${comment.id}`,
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
            comment.commentlikes = request.likedComment.commentlikes
            let tempUserLikes: any = []
            comment.commentlikes.forEach((like: any) => {
                tempUserLikes.push(like.userId)
            })
            comment.commentlikeIds = tempUserLikes
            // Append modified post to the posts array
            let commentIndex = post.comments.findIndex((comment:any) => comment.id === request.likedComment.id)
            let temp = [...post.comments]
            temp[commentIndex] = comment
            setComments(temp)
        }
    } else {
        console.log('unlikingthepost')
        // IF the user is liking the post
        let request: any = await axios.delete(
            `${APIURL}/comment/unlike/${comment.id}`,
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
            comment.commentlikes = request.unlikedComment.commentlikes
            let tempUserLikes: any = []
            comment.commentlikes.forEach((like: any) => {
                tempUserLikes.push(like.userId)
            })
            comment.commentlikeIds = tempUserLikes
            // Append modified post to the posts array
            let commentIndex = post.comments.findIndex((comment:any) => comment.id === request.unlikedComment.id)
            let temp = [...post.comments]
            temp[commentIndex] = comment
            setComments(temp)
        }
    }
}

export { createComment, getCommentForEdit, editComment, getCommentForDelete, deleteComment, toggleCommentLikePostView }
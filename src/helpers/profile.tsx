import { toast } from 'react-toastify';
import axios from "axios";
import APIURL from "./environment/urlSwitch";

const getUserProfile = async (userId: any, CurrentUser: any) => {
    console.log(userId)
    let request: any = await axios.get(
        `${APIURL}/user/view/edit/${userId}`,
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": CurrentUser?.token
            }
        }
    )
    request = request.data

    if  (request.status === "SUCCESS") {
        return request.user
    }
}


interface FormDetails {
    _name: string, 
    email: string, 
    username: string, 
    bio: string, 
    avatar: any
}
const editUser =  async (e: any, form: FormDetails, CurrentUser: any, UpdateCurrentUser: any, history: any) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append("name", form._name)
    formData.append("email", form.email)
    formData.append("username", form.username)
    formData.append("bio", form.bio)
    formData.append("avatar", form.avatar)

    let request: any = await axios.put(
        `${APIURL}/user/update/${CurrentUser.id}`,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": CurrentUser.token
            }
        }
    )
    request = request.data;
    if (request.status === "SUCCESS") {
        toast.success('User successfully updated!')
        let newUser = request.user
        newUser.token = CurrentUser.token
        UpdateCurrentUser(newUser)
        return history('/profile/' + CurrentUser.id)
    } else {
        toast.error(`${request.message}`)
    }
}

export { getUserProfile, editUser }
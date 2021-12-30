import { toast } from 'react-toastify';
import AuthenticatedUser from '../interfaces/AuthenticatedUser';

interface SignupFormDetails {
    name: string,
    username: string,
    email: string,
    password: string,
    confirm: string
}

const signup = (e: any, form: SignupFormDetails, SetCurrentUser: any) => {
    e.preventDefault();
    let name = form.name.trim();
    let email = form.email.trim();
    let username = form.username.trim();
    let password = form.password.trim();
    let confirm = form.confirm.trim();

    // Any fields are null
    if (username === "" ||  email === "" || password === "" || confirm === "") {
        return toast.error("Please ensure all fields are filled in!")
    }

    // Passwords do not match
    if (password !== confirm) {
        return toast.error("Please make sure your passwords match!")
    }

    let loggedInUser = {
        uuid: 'abc12345',
        name,
        email,
        username,
        bio: 'Loving bloggin anywhere, this app and my posts both rock, dude',
        avatar: 'blah',
        token: 'abc123'
    }
    toast.success("Successfully signed up!");
    setTimeout(() => {
        SetCurrentUser(loggedInUser)
    })
}

interface LoginFormDetails {
    email: string,
    password: string,
}

const login = (e: any, form: LoginFormDetails, SetCurrentUser: any) => {
    e.preventDefault();
    let email = form.email.trim();
    let password = form.password.trim();

    // Any fields are null
    if (email === "" || password === "") {
        return toast.error("Please ensure all fields are filled in!")
    }

    let loggedInUser = {
        uuid: 'abc12345',
        name: 'Jake',
        email,
        username: 'jmijake',
        bio: 'Loving bloggin anywhere, this app and my posts both rock, dude',
        avatar: 'blah',
        token: 'abc123'
    }
    toast.success("Successfully signed up!");
    setTimeout(() => {
        SetCurrentUser(loggedInUser)
    })
}

const logout = (SetCurrentUser: any) => {
    const nullUser: AuthenticatedUser = {
        uuid: null,
        name: '',
        email: '',
        username: '',
        bio: '',
        avatar: '',
        token: null
    }
    // localStorage.removeItem('token');
    SetCurrentUser(nullUser);
}

export { signup, login, logout }
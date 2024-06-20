import axios from 'axios';
// import { trusted } from 'mongoose';
import jwtDecode from 'jwt-decode';

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;


//make API Requests


// получение ниka из токена
export async function getUsername() {
    const token = localStorage.getItem('token')
    if(!token) return Promise.reject("Не получается найти токен");
    let decode = jwtDecode (token)
    // console.log(decode);
    return decode
}

//authenticat function
export async function authenticate(username){
    try{
        return await axios.post('/api/authenticate', { username });
    }catch (error) {
        return {
            error : "Имя пользователя не существует"
        }
    }
}

//get User details
export async function getUser({username}){
    try {
        const { data } = await axios.get(`/api/user/${username}`);
        return{ data };
    }catch(error) {
        return{ error : "Пароли не совпадают"}
    }
}

// register user function 
export async function registerUser(credentials){
    try {
        const { data: { msg }, status } = await axios.post(`/api/register`, credentials);

        let { username, email } = credentials;

        // send mail
        if(status === 201){
            await axios.post('/api/registerMail', {username, userEmail : email, text : msg})
        }

        return Promise.resolve(msg)
    } catch (error) {
        return Promise.reject({ error })
    }
}

// login function
export async function verifyPassword({ username, password}){
    try {
        if(username){
           const { data } = await axios.post('/api/login', { username, password });
           return Promise.resolve({ data })
        }
    } catch (error) {
        return Promise.reject({error : "Пароли не совпадают"})
    }
}

// uptade user profile function
export async function updateUser(response){
    try {
        const token = await localStorage.getItem('token');
        const data = await axios.put('/api/updateuser', response, { headers : { "Authorization" : `Bearer ${token}`}});

        return Promise.resolve({ data })
    } catch (error) {
        return Promise.reject({ error : "Не возможно обновить профиль"})
    }
}

// generate OTP
export async function generateOTP(username){
    try {
        const { data : { code }, status } = await axios.get('/api/generateOTP', { params : { username}});

        // send mail with the OTP
        if(status === 201){
            let { data : { email }} = await getUser({ username });
            let text = `Ваш код восстановления пароля: ${code}. Восстановите совой пароль.`;
            await axios.post('/api/registerMail', { username, userEmail: email, text, subject : "Код восстановления пароля"});
        }
        return Promise.resolve(code);
    } catch (error) {
        console.error("ошибка создания кода", error);
        return Promise.reject({ error : error.message || "Произошла ошибка при генерации OTP" });
    }
}

// verify OTP
export async function verifyOTP({ username, code }) {
    try {
        console.log("Sending request to verify OTP with:", { username, code });
        const { data, status } = await axios.get('/api/verifyOTP', { params: { username, code } });
        return { data, status };
    } catch (error) {
        console.error("Error verifying OTP:", error);
        return Promise.reject(error);
    }
}

// reset password
export async function resetPassword({ username, password }){
    try {
        const { data, status } = await axios.put('/api/resetPassword', { username, password });
        return Promise.resolve({ data, status})
    } catch (error) {
        return Promise.reject({ error })
    }
}
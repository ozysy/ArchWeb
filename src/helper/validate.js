import toast from 'react-hot-toast'
import { authenticate } from './helper'

// validate login page username

export async function usernameValidate(values){
    const errors = usernameVerify({}, values);

    if(values.username){
        //check user exist or not
        const { status } = await authenticate(values.username);

        if(status !== 200){
            errors.exist = toast.error('Пользователь не существует')
        }
    }

    return errors;
}

// validate password
export async function passwordValidate(values){
    const errors = passwordVerify({}, values);

    return errors;
}

// validate reset password
export async function resetPasswordValidation(values) {
    const errors = passwordVerify({}, values);

    if(values.password !== values.confirm_pwd){
        errors.exist = toast.error("Пароли не совпадают")
    }

    return errors;
}

// validate register form
export async function registerValidation(values){
    const errors = usernameVerify({}, values);
    passwordVerify(errors, values);
    emailVerify(errors, values);

    return errors;
}

/** validate profile page */
export async function profileValidation(values){
    const errors = emailVerify({}, values);
    return errors;
}

// *******************************************************************************

// validate password
function passwordVerify(errors = {}, values){
    /* eslint-disable no-useless-escape */
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    if(!values.password){
        errors.password = toast.error("Требуется пароль!");
    } else if(values.password.includes(" ")){
        errors.password = toast.error("Неправильный пароль!");
    }else if(values.password.length < 4){
        errors.password = toast.error("Пароль должен быть длиннее 4 символов");
    }else if(!specialChars.test(values.password)){
        errors.password = toast.error("Пароль должен иметь специальный символ");
    }

    return errors;
}

// validate username
function usernameVerify(error = {}, values){
    if(!values.username){
        error.username = toast.error('Требуется имя пользователя!');
    }else if(values.username.includes(" ")){
        error.username = toast.error('Неверное имя пользователя!')
    }

    return error;
}

// validate email
function emailVerify(error ={}, values){
    if(!values.email){
        error.email = toast.error("Требуется электронная почта!");
    }else if(values.email.includes(" ")){
        error.email = toast.error("Неправильный адрес электронной почты!")
    }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
        error.email = toast.error("Неверный адрес электронной почты!")
    }

    return error;
}
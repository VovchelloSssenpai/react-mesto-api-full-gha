import {Link} from "react-router-dom"
import { useState } from "react";
import AuthorizationFrom from "./AuthorizationForm";


function Register({onRegister, isLoading}) {

const [formValue, setFormValue] = useState({
    password: '',
    email: ''
})

const handleChange = (e) => {  
    const {name, value} = e.target;
    setFormValue({...formValue, [name]: value})
}

const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(formValue)
}

    return (
        <div className="signpage">
            <h2 className="signpage__header">Регистрация</h2>
            <AuthorizationFrom handleChange={handleChange} 
                                handleSubmit={handleSubmit} 
                                formValue={formValue} 
                                button={isLoading ? "Регистрация..." : "Зарегистрироваться"} >
            <p className="signpage__question">Уже зарегистрированы? <Link to={'/sign-in'} className="signpage__link">Войти</Link> </p>
            </AuthorizationFrom>
        </div>
    );
  }
  
  export default Register;
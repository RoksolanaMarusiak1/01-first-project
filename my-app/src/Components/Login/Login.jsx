import React from 'react';
import { reduxForm } from 'redux-form';
import { Input, createField } from '../command/FormsControls/FormsControls';
import { required, maxLenghtCreator } from '../../utils/validators/validator';
import { connect } from 'react-redux';
import { login } from './../../redux/authReducer';
import { Redirect } from 'react-router-dom';
import styles from '../command/FormsControls/FormsControls.module.css';
import './Login.css'
const maxLenght40 = maxLenghtCreator(40);

const LoginForm = ({ handleSubmit, error, captchaUrl }) => {
    return (
        <form class="decor" onSubmit={handleSubmit}>
            <div class="form-left-decoration"></div>
            <div class="form-right-decoration"></div>
            <div class="circle"></div>
            <div class="form-inner">
                <h1>Login</h1>
                {createField("Email", "email", [required, maxLenght40], Input)}
                {createField("password", "password", [required, maxLenght40], Input, { type: "password" })}
                {createField(null, "rememberMe", null, "input", { type: "checkbox" }, "remember me")}
                <button>Login</button>
            </div>


            {captchaUrl && <img src={captchaUrl} />}
            {captchaUrl && createField("Symbols from image", "captcha", [required], Input)}
            {error && <div className={styles.FormSomeError}>
                {error}
            </div>}
            <div>
                
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm({
    form: 'login'
})(LoginForm)

const Login = (props) => {
    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha);
    }

    if (props.isAuth) {
        return <Redirect to='/profile' />
    }
    return (
        <div class='login_form'>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
        </div>
    )
}

const mapStateToProps = (state) => ({
    captchaUrl: state.auth.captchaUrl,
    isAuth: state.auth.isAuth
});

export default connect(mapStateToProps, { login })(Login);
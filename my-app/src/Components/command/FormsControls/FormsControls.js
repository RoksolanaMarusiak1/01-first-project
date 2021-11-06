import React from 'react';
import classes from './FormsControls.module.css';
import { Field } from 'redux-form';

export const FormControl = ({ input, meta:{touched, error}, children }) => {
    const hasError = error && touched;
    return (
        <div>
            <div className={classes.FormControl + " " + (hasError ? classes.error : "")}>
                {children}
                <div>
                    {hasError && <span>{error}</span>}
                </div>
            </div>
        </div>
    )
};

export const Textarea = (props) => {
    const { input, meta, child, ...restProps } = props;
    return <FormControl  {...props}>
        <textarea className={classes.textarea} {...input} {...restProps} />
        </FormControl>
};

export const Input = (props) => {
    const { input, meta, child, ...restProps } = props;
    return <FormControl {...props}><input {...input} {...restProps} /></FormControl>
};

export const createField = (placeholder, name, validators, component, props={}, text = "") => {
    return (
    <div>
        <Field placeholder={placeholder} 
        name={name} 
        component={component}
        validate={validators}
        {...props}
        /> {text}
    </div>
    )
};
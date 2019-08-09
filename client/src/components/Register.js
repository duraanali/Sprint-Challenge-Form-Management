import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

function Register({ errors, touched, isSubmitting, status }) {

    const [userInfo, setUserInfo] = useState([]);

    useEffect(() => {
        // status sometimes comes through as undefined
        if (status) {
            setUserInfo([...userInfo, status])
        }
    }, [userInfo, status]);


    return (
        <div>
            <Form>
                <div>
                    {touched.username && errors.username && <p>{errors.username}</p>}
                    <Field type="username" name="username" placeholder="username" />
                </div>
                <div>
                    {touched.password && errors.password && <p>{errors.password}</p>}
                    <Field type="password" name="password" placeholder="Password" />
                </div>
                <button type="submit" disabled={isSubmitting}>Submit</button>
            </Form>

            <div>
                {userInfo.map((user, index) => (
                    <div key={index}>
                        <h2>User Information</h2>
                        <h4>username: {user.username}</h4>

                    </div>
                ))}
            </div>
        </div>
    );
}

const FormikLoginForm = withFormik({
    mapPropsToValues({ username, password }) {
        return {
            username: username || "",
            password: password || "",


        };
    },
    validationSchema: Yup.object().shape({
        username: Yup.string()
            .required(),
        password: Yup.string()
            .min(5, "Password must be 16 characters or longer")
            .required("Password is required")
    }),
    handleSubmit(values, { resetForm, setSubmitting, setStatus }) {
        console.log(values);
        axios
            .post("http://localhost:5000/api/register", values)
            .then(res => {
                console.log(res); // Data was created successfully and logs to console
                setStatus(res.data)
                resetForm();
                setSubmitting(false);
            })
            .catch(err => {
                console.log(err); // There was an error creating the data and logs to console
                setSubmitting(false);
            });
        //THIS IS WHERE YOU DO YOUR FORM SUBMISSION CODE... HTTP REQUESTS, ETC.
    }
})(Register);

export default FormikLoginForm;
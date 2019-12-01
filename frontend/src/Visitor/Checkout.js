import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';

export class CheckOut extends React.Component {
    handleSubmit = (fields) => {
            console.log(fields);
            axios.post(`http://localhost:8081/checkOut?pass=${fields.pass}`)
                .then(res => {
                    console.log(res.data);
                    toast.success(res.data, {
                        position: toast.POSITION.TOP_RIGHT
                    });
                }).catch(err=>{
                    console.log(err);
                    toast.error("Error in checking out- "+err, {
                        position: toast.POSITION.TOP_LEFT
                    });
                });
    }
    render() {
        return (
            <Formik
                initialValues={{
                    pass: ''
                }}
                validationSchema={Yup.object().shape({
                    pass: Yup.string()
                        .required('pass Id is required')
                })}
                onSubmit={this.handleSubmit}
                render={({ errors, status, touched }) => (
                    <Form>
                        <div className="form-group">
                            <label htmlFor="pass">Pass Id:</label>
                            <Field name="pass" type="text" className={'form-control' + (errors.pass && touched.pass ? ' is-invalid' : '')} />
                            <ErrorMessage name="pass" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary mr-2">Check Out</button>
                        </div>
                    </Form>
                )}
            />
        )
    }
}
import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';

export class Host extends React.Component {
    constructor(props) 
    { 
        super(props); 
        //this.state = { hosts : [] }; 
    } 
    // componentDidMount() {
    //     console.log('in mount');
    //     axios.post(`http://localhost:8081/getHosts`)
    //         .then(res => {
    //             console.log(res.data);
    //             this.setState({hosts: res.data});
    //         }).catch(err=>{
    //             console.log(err);
    //         });
    // }
    handleSubmit = (fields) => {
            console.log(fields);
            axios.post(`http://localhost:8081/addHost?name=${fields.name}&email=${fields.email}&mobile=${fields.mobile}&address=${fields.address}`)
                .then(res => {
                    console.log(res.data);
                    toast.success(res.data, {
                        position: toast.POSITION.TOP_RIGHT
                    });
                }).catch(err=>{
                    console.log(err);
                    toast.error(err, {
                        position: toast.POSITION.TOP_LEFT
                    });
                })
    }
    render() {
        return (
            <div class="host">
                <Link to="/"><button class="button_in" >Main Page</button></Link>
                <div class="container" id='mainPage'>
                <Formik
                initialValues={{
                    name: '',
                    email: '',
                    mobile: '',
                    address:''
                }}
                validationSchema={Yup.object().shape({
                    name: Yup.string()
                        .required('name is required'),
                    email: Yup.string()
                        .email('Email is invalid')
                        .required('Email is required'),
                    mobile: Yup.string()
                        .required('Mobile is required'),
                    address: Yup.string()
                        .required('Address is required')
                })}
                onSubmit={this.handleSubmit}
                render={({ errors, status, touched }) => (
                    <Form>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <Field name="name" type="text" className={'form-control' + (errors.name && touched.name ? ' is-invalid' : '')} />
                            <ErrorMessage name="name" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                            <ErrorMessage name="email" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="mobile">Mobile</label>
                            <Field name="mobile" type="text" className={'form-control' + (errors.mobile && touched.mobile ? ' is-invalid' : '')} />
                            <ErrorMessage name="mobile" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">Address</label>
                            <Field name="address" type="text" className={'form-control' + (errors.address && touched.address ? ' is-invalid' : '')} />
                            <ErrorMessage name="address" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary mr-2">Add Host</button>
                        </div>
                    </Form>
                )}
            />
            </div>
            </div>
        )
    }
}
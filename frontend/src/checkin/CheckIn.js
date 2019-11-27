import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

export class CheckIn extends React.Component {
    constructor(props) 
    { 
        super(props); 
        this.state = { hosts : [] }; 
    } 
    componentDidMount() {
        console.log('in mount');
        axios.post(`http://localhost:8081/getHosts`)
            .then(res => {
                console.log(res.data);
                this.setState({hosts: res.data});
            }).catch(err=>{
                console.log(err);
            });
    }
    handleSubmit = (fields) => {
            console.log(fields);
            axios.post(`http://localhost:8081/generatePass?firstName=${fields.firstName}&lastName=${fields.lastName}&email=${fields.email}&mobile=${fields.mobile}&host=${fields.host}`)
                .then(res => {
                    console.log(res);
                    console.log(res.data);
                }).catch(err=>{
                    console.log(err);
                })
    }
    render() {
        return (
            <Formik
                initialValues={{
                    firstName: '',
                    lastName: '',
                    email: '',
                    mobile: '',
                    host:''
                }}
                validationSchema={Yup.object().shape({
                    firstName: Yup.string()
                        .required('First Name is required'),
                    lastName: Yup.string()
                        .required('Last Name is required'),
                    email: Yup.string()
                        .email('Email is invalid')
                        .required('Email is required'),
                    mobile: Yup.string()
                        .required('Mobile is required')
                })}
                onSubmit={this.handleSubmit}
                render={({ errors, status, touched }) => (
                    <Form>
                        <div className="form-group">
                            <label htmlFor="firstName">First Name</label>
                            <Field name="firstName" type="text" className={'form-control' + (errors.firstName && touched.firstName ? ' is-invalid' : '')} />
                            <ErrorMessage name="firstName" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Last Name</label>
                            <Field name="lastName" type="text" className={'form-control' + (errors.lastName && touched.lastName ? ' is-invalid' : '')} />
                            <ErrorMessage name="lastName" component="div" className="invalid-feedback" />
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
                            <label htmlFor="host">Host</label>
                            <Field component='select' className={'form-control' + (errors.host && touched.host ? ' is-invalid' : '')} name='host'>
                                <option value="" label="Select a Host" />
                                {this.state.hosts.map(host => (
                                    <option key={host._id} value={host._id}>{host.name}-{host.email}</option>
                                ))}
                            </Field>
                            <ErrorMessage name="host" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary mr-2">Genarate Pass</button>
                        </div>
                    </Form>
                )}
            />
        )
    }
}
import { useFormik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup'
import clsx from 'clsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import isEmpty from 'lodash';

export function ForPage() {
    const [values, setValues] = useState([])
    const [startDate, setStartDate] = useState('')

    const initialValues = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        dob: '',
    };

    const loginSchema = Yup.object().shape({
        firstName: Yup.string()
            .required('firstName is required'),
        lastName: Yup.string()
            .required('lastName is required'),
        email: Yup.string()
            .email('Wrong email format')
            .required('Email is required'),
        password: Yup.string()
            .min(3, 'Minimum 3 symbols')
            .max(50, 'Maximum 50 symbols')
            .required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required'),
        dob: Yup.date().nullable(),
    });

    const formik = useFormik({
        initialValues,
        validationSchema: loginSchema,
        onSubmit: async (values) => {
            console.log(values)
            try {
                setValues(values)
            } catch (err) {

            }
        }
    })

    return (
        <div className=' '>
            <form className=' mx-auto' onSubmit={formik.handleSubmit}>
                <h2 className=' d-flex justify-content-center fw-bolder'>Form Validation</h2>
                <div className='border border-0 rounded p-5 bg-light'>
                    <div className='row mb-4'>
                        <label className='col-md-4 col-form-label lable-txt fs-6 fw-bolder text-gray-900'>First Name</label>
                        <div className='col-md-8'>
                            <input
                                placeholder='first name'
                                {...formik.getFieldProps('firstName')}
                                className={clsx(
                                    'form-control bg-transparent ',
                                    { 'is-invalid': formik.touched.firstName && formik.errors.firstName },
                                    {
                                        'is-valid': formik.touched.firstName && !formik.errors.firstName,
                                    }
                                )}
                                type='name'
                                name='firstName'
                                autoComplete='off'
                            />
                            {formik.touched.firstName && formik.errors.firstName && (
                                <div className='text-danger'>
                                    <span className='text-danger'>{formik.errors.firstName}</span>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='row mb-4'>
                        <label className='col-md-4 col-form-label lable-txt fs-6 fw-bolder text-gray-900'>Last Name</label>
                        <div className='col-md-8'>
                            <input
                                placeholder='last Name'
                                {...formik.getFieldProps('lastName')}
                                className={clsx(
                                    'form-control bg-transparent',
                                    { 'is-invalid': formik.touched.lastName && formik.errors.lastName },
                                    {
                                        'is-valid': formik.touched.lastName && !formik.errors.lastName,
                                    }
                                )}
                                type='name'
                                name='lastName'
                                autoComplete='off'
                            />

                            {formik.touched.lastName && formik.errors.lastName && (
                                <div className='text-danger'>
                                    <span className='text-danger'>{formik.errors.lastName}</span>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='row mb-4'>
                        <label className='col-md-4 col-form-label lable-txt fs-6 fw-bolder text-gray-900'>Email</label>
                        <div className='col-md-8'>
                            <input
                                placeholder='Email'
                                {...formik.getFieldProps('email')}
                                className={clsx(
                                    'form-control bg-transparent',
                                    { 'is-invalid': formik.touched.email && formik.errors.email },
                                    {
                                        'is-valid': formik.touched.email && !formik.errors.email,
                                    }
                                )}
                                type='email'
                                name='email'
                                autoComplete='off'
                            />
                            {formik.touched.email && formik.errors.email && (
                                <div className='text-danger'>
                                    <span className='text-danger'>{formik.errors.email}</span>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='row mb-4'>
                        <label className='col-md-4 col-form-label lable-txt fs-6 fw-bolder text-gray-900'>Password</label>
                        <div className='col-md-8'>
                            <input
                                placeholder='Password'
                                {...formik.getFieldProps('password')}
                                className={clsx(
                                    'form-control bg-transparent',
                                    { 'is-invalid': formik.touched.password && formik.errors.password },
                                    {
                                        'is-valid': formik.touched.password && !formik.errors.password,
                                    }
                                )}
                                type='password'
                                name='password'
                                autoComplete='off'
                            />
                            {formik.touched.password && formik.errors.password && (
                                <div className='text-danger'>
                                    <span className='text-danger'>{formik.errors.password}</span>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='row mb-4'>
                        <label className='col-md-4 col-form-label lable-txt fs-6 fw-bolder text-gray-900'>Confirm Password</label>
                        <div className='col-md-8'>
                            <input
                                placeholder='Confirm Password'
                                {...formik.getFieldProps('confirmPassword')}
                                className={clsx(
                                    'form-control bg-transparent',
                                    { 'is-invalid': formik.touched.confirmPassword && formik.errors.confirmPassword },
                                    {
                                        'is-valid': formik.touched.confirmPassword && !formik.errors.confirmPassword,
                                    }
                                )}
                                type='password'
                                name='confirmPassword'
                                autoComplete='off'
                            />
                            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                                <div className='text-danger'>
                                    <span className='text-danger'>{formik.errors.confirmPassword}</span>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='row mb-4'>
                        <label className='col-md-4 col-form-label lable-txt fs-6 fw-bolder text-gray-900'>Date of Birth</label>
                        <div className="col-md-8 position-relative ">
                            <DatePicker
                                selected={startDate}
                                onChange={(date) => {
                                    setStartDate(date);
                                    formik.setFieldValue('dob', moment(date).format('YYYY-MM-DD'));
                                }}
                                dateFormat="yyyy-MM-dd"
                                className="form-control  bg-transparent w-100"
                                placeholderText="Select Date of Birth"

                            />
                        </div>
                    </div>
                    {/* {formik.touched.dob && formik.errors.dob && <div className='text-danger'>{formik.errors.dob}</div>} */}

                    <button
                        type="submit"
                        className="btn btn-primary w-100 mt-3"
                    >
                        Submit
                    </button>
                </div>
            </form>
            {/* {!isEmpty(values) && values.map((item) =>
                <>
                    <div className='fw-bolder text-dark'>First Name: </div>
                    <div className='text-primary'>{item.firstName}</div>
                    <div className='fw-bolder text-dark'>Last Name: </div>
                    <div className='text-primary'>{item.lastName}</div>
                    <div className='fw-bolder text-dark'>Email: </div>
                    <div className='text-primary'>{item.email}</div>
                </>
            )} */}
        </div>
    )
}


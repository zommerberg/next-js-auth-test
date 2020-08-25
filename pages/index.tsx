import { useRouter } from 'next/router'
import Link from 'next/link'
import { useState } from 'react'
import { Formik } from 'formik'
import axios from 'axios'
import * as Yup from 'yup'

const IndexPage = () => {
  const router = useRouter()
  const [error, setError] = useState('')

  console.log(router)
  let registerType = router.query.type && router.query.type === 'register'

  const LoginSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, 'Password is too short!')
      .max(50, 'Password is too long!')
      .required('Password is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
  })

  return (
    <div className='flex flex-col justify-center min-h-screen pb-12 bg-gray-500 sm:px-6 lg:px-8'>
      <div className='mt-6 sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10'>
          <h2 className='mb-6 text-2xl font-extrabold leading-9 text-center text-gray-800'>
            {registerType ? 'Sign Up' : 'Sign in to your account'}
          </h2>
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={LoginSchema}
            onSubmit={async (values, { setSubmitting }) => {
              setError('')
              try {
                let response
                if (registerType) {
                  response = await axios.post('/register', values)
                } else {
                  response = await axios.post('/login', values)
                }

                if (response.data.error) {
                  setError(response.data.error)
                } else {
                  router.push('/me')
                }
              } catch (error) {
                console.log(error)
                setError('Internal Server Error')
              }
              console.log(values)
              setSubmitting(false)
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              /* and other goodies */
            }) => (
              <form onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor='email'
                    className='block text-sm font-medium leading-5 text-gray-700'
                  >
                    Email address
                  </label>
                  <div className='mt-1 rounded-md shadow-sm'>
                    <input
                      id='email'
                      type='email'
                      name='email'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      className='block w-full px-3 py-2 placeholder-gray-400 transition duration-150 ease-in-out border border-gray-300 rounded-md appearance-none focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5'
                    />
                  </div>
                  <span className='font-semibold text-red-600 '>
                    {errors.email && touched.email && errors.email}
                  </span>
                </div>
                <div className='mt-6'>
                  <label
                    htmlFor='password'
                    className='block text-sm font-medium leading-5 text-gray-700'
                  >
                    Password
                  </label>
                  <div className='mt-1 rounded-md shadow-sm'>
                    <input
                      id='password'
                      type='password'
                      name='password'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      className='block w-full px-3 py-2 placeholder-gray-400 transition duration-150 ease-in-out border border-gray-300 rounded-md appearance-none focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5'
                    />
                  </div>
                  <span className='font-semibold text-red-600 '>
                    {errors.password && touched.password && errors.password}
                  </span>
                </div>
                <span className='font-semibold text-red-600 '>
                  {error && error}
                </span>

                <div className='mt-6'>
                  <span className='block w-full rounded-md shadow-sm'>
                    <button
                      type='submit'
                      disabled={isSubmitting}
                      className='flex justify-center w-full px-4 py-2 text-sm font-medium text-white transition duration-150 ease-in-out bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700'
                    >
                      Sign in
                    </button>
                  </span>
                </div>
              </form>
            )}
          </Formik>

          <p className='mt-8 text-sm leading-5 text-center text-gray-600 max-w'>
            {registerType ? 'Already have an account?' : 'No account yet?'}
            <Link href={registerType ? '/' : '/?type=register'}>
              <a className='pl-1 font-medium text-indigo-600 transition duration-150 ease-in-out hover:text-indigo-500 focus:outline-none focus:underline'>
                {registerType ? 'Sign in here' : 'Sign up here'}
              </a>
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default IndexPage

// import React from "react"

// export default function index() {
//   return (
//     <div className="flex h-screen overflow-hidden bg-cool-gray-100">

//   <!-- Off-canvas menu for mobile -->

//   <div className="lg:hidden">

//     <div className="fixed inset-0 z-40 flex">

//       <!--

//         Off-canvas menu overlay, show/hide based on off-canvas menu state.

//         Entering: "transition-opacity ease-linear duration-300"

//           From: "opacity-0"

//           To: "opacity-100"

//         Leaving: "transition-opacity ease-linear duration-300"

//           From: "opacity-100"

//           To: "opacity-0"

//       -->

//       <div className="fixed inset-0">

//         <div className="absolute inset-0 opacity-75 bg-cool-gray-600"></div>

//       </div>

//       <!--

//         Off-canvas menu, show/hide based on off-canvas menu state.

//         Entering: "transition ease-in-out duration-300 transform"

//           From: "-translate-x-full"

//           To: "translate-x-0"

//         Leaving: "transition ease-in-out duration-300 transform"

//           From: "translate-x-0"

//           To: "-translate-x-full"

//       -->

//       <div className="relative flex flex-col flex-1 w-full max-w-xs pt-5 pb-4 bg-teal-600">

//         <div className="absolute top-0 right-0 p-1 -mr-14">

//           <button className="flex items-center justify-center w-12 h-12 rounded-full focus:outline-none focus:bg-cool-gray-600" aria-label="Close sidebar">

//             <svg className="w-6 h-6 text-white" stroke="currentColor" fill="none" viewBox="0 0 24 24">

//               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />

//             </svg>

//           </button>

//         </div>

//         <div className="flex items-center flex-shrink-0 px-4">

//           <img className="w-auto h-8" src="https://tailwindui.com/img/logos/easywire-logo-on-brand.svg" alt="Easywire logo">

//         </div>

//         <div className="mt-5 overflow-y-auto">

//           <nav className="px-2 space-y-1">

//             <a href="#" className="flex items-center px-2 py-2 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-teal-700 rounded-md group focus:outline-none focus:bg-teal-500">

//               <svg className="w-6 h-6 mr-4 text-teal-200 transition duration-150 ease-in-out" fill="none" viewBox="0 0 24 24" stroke="currentColor">

//                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />

//               </svg>

//               Home

//             </a>

//             <a href="#" className="flex items-center px-2 py-2 text-base font-medium leading-6 text-teal-100 transition duration-150 ease-in-out rounded-md group hover:text-white hover:bg-teal-500 focus:outline-none focus:bg-teal-500">

//               <svg className="w-6 h-6 mr-4 text-teal-200 transition duration-150 ease-in-out" fill="none" viewBox="0 0 24 24" stroke="currentColor">

//                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />

//               </svg>

//               History

//             </a>

//             <a href="#" className="flex items-center px-2 py-2 text-base font-medium leading-6 text-teal-100 transition duration-150 ease-in-out rounded-md group hover:text-white hover:bg-teal-500 focus:outline-none focus:bg-teal-500">

//               <svg className="w-6 h-6 mr-4 text-teal-200 transition duration-150 ease-in-out" fill="none" viewBox="0 0 24 24" stroke="currentColor">

//                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />

//               </svg>

//               Balances

//             </a>

//             <a href="#" className="flex items-center px-2 py-2 text-base font-medium leading-6 text-teal-100 transition duration-150 ease-in-out rounded-md group hover:text-white hover:bg-teal-500 focus:outline-none focus:bg-teal-500">

//               <svg className="w-6 h-6 mr-4 text-teal-200 transition duration-150 ease-in-out" fill="none" viewBox="0 0 24 24" stroke="currentColor">

//                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />

//               </svg>

//               Cards

//             </a>

//             <a href="#" className="flex items-center px-2 py-2 text-base font-medium leading-6 text-teal-100 transition duration-150 ease-in-out rounded-md group hover:text-white hover:bg-teal-500 focus:outline-none focus:bg-teal-500">

//               <svg className="w-6 h-6 mr-4 text-teal-200 transition duration-150 ease-in-out" fill="none" viewBox="0 0 24 24" stroke="currentColor">

//                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />

//               </svg>

//               Recipients

//             </a>

//             <a href="#" className="flex items-center px-2 py-2 text-base font-medium leading-6 text-teal-100 transition duration-150 ease-in-out rounded-md group hover:text-white hover:bg-teal-500 focus:outline-none focus:bg-teal-500">

//               <svg className="w-6 h-6 mr-4 text-teal-200 transition duration-150 ease-in-out" fill="none" viewBox="0 0 24 24" stroke="currentColor">

//                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />

//               </svg>

//               Reports

//             </a>

//           </nav>

//         </div>

//         <hr className="h-px mt-6 bg-teal-700 border-none">

//         <div className="flex-1 h-0 mt-6 overflow-y-auto">

//           <nav className="px-2 space-y-1">

//             <a href="#" className="flex items-center px-2 py-2 text-base font-medium leading-6 text-teal-100 transition duration-150 ease-in-out rounded-md group hover:text-white hover:bg-teal-500 focus:outline-none focus:bg-teal-500">

//               <svg className="w-6 h-6 mr-4 text-teal-200 transition duration-150 ease-in-out group-hover:text-teal-200 group-focus:text-teal-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">

//                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />

//                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />

//               </svg>

//               Settings

//             </a>

//             <a href="#" className="flex items-center px-2 py-2 text-base font-medium leading-6 text-teal-100 transition duration-150 ease-in-out rounded-md group hover:text-white hover:bg-teal-500 focus:outline-none focus:bg-teal-500">

//               <svg className="w-6 h-6 mr-4 text-teal-300 transition duration-150 ease-in-out group-hover:text-teal-200 group-focus:text-teal-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">

//                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />

//               </svg>

//               Help

//             </a>

//             <a href="#" className="flex items-center px-2 py-2 text-base font-medium leading-6 text-teal-100 transition duration-150 ease-in-out rounded-md group hover:text-white hover:bg-teal-500 focus:outline-none focus:bg-teal-500">

//               <svg className="w-6 h-6 mr-4 text-teal-300 transition duration-150 ease-in-out group-hover:text-teal-200 group-focus:text-teal-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">

//                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />

//               </svg>

//               Privacy

//             </a>

//           </nav>

//         </div>

//       </div>

//       <div className="flex-shrink-0 w-14">

//         <!-- Dummy element to force sidebar to shrink to fit close icon -->

//       </div>

//     </div>

//   </div>

//   <!-- Static sidebar for desktop -->

//   <div className="hidden lg:flex lg:flex-shrink-0">

//     <div className="flex flex-col w-64">

//       <!-- Sidebar component, swap this element with another sidebar if you like -->

//       <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto bg-teal-600">

//         <div className="flex items-center flex-shrink-0 px-4">

//           <img className="w-auto h-8" src="https://tailwindui.com/img/logos/easywire-logo-on-brand.svg" alt="Easywire logo">

//         </div>

//         <div className="flex flex-col flex-1 mt-5 overflow-y-auto">

//           <div className="overflow-y-auto">

//             <nav className="px-2 space-y-1">

//               <a href="#" className="flex items-center px-2 py-2 text-sm font-medium leading-6 text-white transition duration-150 ease-in-out bg-teal-700 rounded-md group focus:outline-none focus:bg-teal-500">

//                 <svg className="w-6 h-6 mr-4 text-teal-200 transition duration-150 ease-in-out group-hover:text-teal-200 group-focus:text-teal-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">

//                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />

//                 </svg>

//                 Home

//               </a>

//               <a href="#" className="flex items-center px-2 py-2 text-sm font-medium leading-6 text-teal-100 transition duration-150 ease-in-out rounded-md group hover:text-white hover:bg-teal-500 focus:outline-none focus:bg-teal-500">

//                 <svg className="w-6 h-6 mr-4 text-teal-300 transition duration-150 ease-in-out group-hover:text-teal-200 group-focus:text-teal-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">

//                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />

//                 </svg>

//                 History

//               </a>

//               <a href="#" className="flex items-center px-2 py-2 text-sm font-medium leading-6 text-teal-100 transition duration-150 ease-in-out rounded-md group hover:text-white hover:bg-teal-500 focus:outline-none focus:bg-teal-500">

//                 <svg className="w-6 h-6 mr-4 text-teal-300 transition duration-150 ease-in-out group-hover:text-teal-200 group-focus:text-teal-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">

//                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />

//                 </svg>

//                 Balances

//               </a>

//               <a href="#" className="flex items-center px-2 py-2 text-sm font-medium leading-6 text-teal-100 transition duration-150 ease-in-out rounded-md group hover:text-white hover:bg-teal-500 focus:outline-none focus:bg-teal-500">

//                 <svg className="w-6 h-6 mr-4 text-teal-300 transition duration-150 ease-in-out group-hover:text-teal-200 group-focus:text-teal-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">

//                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />

//                 </svg>

//                 Cards

//               </a>

//               <a href="#" className="flex items-center px-2 py-2 text-sm font-medium leading-6 text-teal-100 transition duration-150 ease-in-out rounded-md group hover:text-white hover:bg-teal-500 focus:outline-none focus:bg-teal-500">

//                 <svg className="w-6 h-6 mr-4 text-teal-300 transition duration-150 ease-in-out group-hover:text-teal-200 group-focus:text-teal-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">

//                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />

//                 </svg>

//                 Recipients

//               </a>

//               <a href="#" className="flex items-center px-2 py-2 text-sm font-medium leading-6 text-teal-100 transition duration-150 ease-in-out rounded-md group hover:text-white hover:bg-teal-500 focus:outline-none focus:bg-teal-500">

//                 <svg className="w-6 h-6 mr-4 text-teal-300 transition duration-150 ease-in-out group-hover:text-teal-200 group-focus:text-teal-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">

//                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />

//                 </svg>

//                 Reports

//               </a>

//             </nav>

//           </div>

//           <hr className="h-px mt-6 bg-teal-700 border-none">

//           <div className="flex-1 h-0 mt-6 overflow-y-auto">

//             <nav className="px-2 space-y-1">

//               <a href="#" className="flex items-center px-2 py-2 text-sm font-medium leading-6 text-teal-100 transition duration-150 ease-in-out rounded-md group hover:text-white hover:bg-teal-500 focus:outline-none focus:bg-teal-500">

//                 <svg className="w-6 h-6 mr-4 text-teal-200 transition duration-150 ease-in-out" fill="none" viewBox="0 0 24 24" stroke="currentColor">

//                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />

//                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />

//                 </svg>

//                 Settings

//               </a>

//               <a href="#" className="flex items-center px-2 py-2 text-sm font-medium leading-6 text-teal-100 transition duration-150 ease-in-out rounded-md group hover:text-white hover:bg-teal-500 focus:outline-none focus:bg-teal-500">

//                 <svg className="w-6 h-6 mr-4 text-teal-200 transition duration-150 ease-in-out" fill="none" viewBox="0 0 24 24" stroke="currentColor">

//                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />

//                 </svg>

//                 Help

//               </a>

//               <a href="#" className="flex items-center px-2 py-2 text-sm font-medium leading-6 text-teal-100 transition duration-150 ease-in-out rounded-md group hover:text-white hover:bg-teal-500 focus:outline-none focus:bg-teal-500">

//                 <svg className="w-6 h-6 mr-4 text-teal-200 transition duration-150 ease-in-out" fill="none" viewBox="0 0 24 24" stroke="currentColor">

//                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />

//                 </svg>

//                 Privacy

//               </a>

//             </nav>

//           </div>

//         </div>

//       </div>

//     </div>

//   </div>

//   <div className="flex-1 overflow-auto focus:outline-none" tabindex="0">

//     <div className="relative z-10 flex flex-shrink-0 h-16 bg-white border-b border-gray-200 lg:border-none">

//       <button className="px-4 border-r border-cool-gray-200 text-cool-gray-400 focus:outline-none focus:bg-cool-gray-100 focus:text-cool-gray-600 lg:hidden" aria-label="Open sidebar">

//         <svg className="w-6 h-6 transition duration-150 ease-in-out" fill="none" viewBox="0 0 24 24" stroke="currentColor">

//           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />

//         </svg>

//       </button>

//       <!-- Search bar -->

//       <div className="flex justify-between flex-1 px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">

//         <div className="flex flex-1">

//           <form className="flex w-full md:ml-0" action="#" method="GET">

//             <label htmlFor="search_field" className="sr-only">Search</label>

//             <div className="relative w-full text-cool-gray-400 focus-within:text-cool-gray-600">

//               <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">

//                 <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">

//                   <path fillRule="evenodd" clipRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" />

//                 </svg>

//               </div>

//               <input id="search_field" className="block w-full h-full py-2 pl-8 pr-3 rounded-md text-cool-gray-900 placeholder-cool-gray-500 focus:outline-none focus:placeholder-cool-gray-400 sm:text-sm" placeholder="Search" type="search">

//             </div>

//           </form>

//         </div>

//         <div className="flex items-center ml-4 md:ml-6">

//           <button className="p-1 rounded-full text-cool-gray-400 hover:bg-cool-gray-100 hover:text-cool-gray-500 focus:outline-none focus:shadow-outline focus:text-cool-gray-500" aria-label="Notifications">

//             <svg className="w-6 h-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">

//               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />

//             </svg>

//           </button>

//           <!-- Profile dropdown -->

//           <div className="relative ml-3">

//             <div>

//               <button className="flex items-center max-w-xs text-sm rounded-full focus:outline-none focus:bg-cool-gray-100 lg:p-2 lg:rounded-md lg:hover:bg-cool-gray-100" id="user-menu" aria-label="User menu" aria-haspopup="true">

//                 <img className="w-8 h-8 rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="">

//                 <p className="hidden ml-3 text-sm font-medium leading-5 text-cool-gray-700 lg:block">Emilia Birch</p>

//                 <svg className="flex-shrink-0 hidden w-5 h-5 ml-1 text-cool-gray-400 lg:block" viewBox="0 0 20 20" fill="currentColor">

//                   <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />

//                 </svg>

//               </button>

//             </div>

//             <!--

//               Profile dropdown panel, show/hide based on dropdown state.

//               Entering: "transition ease-out duration-100"

//                 From: "transform opacity-0 scale-95"

//                 To: "transform opacity-100 scale-100"

//               Leaving: "transition ease-in duration-75"

//                 From: "transform opacity-100 scale-100"

//                 To: "transform opacity-0 scale-95"

//             -->

//             <div className="absolute right-0 w-48 mt-2 origin-top-right rounded-md shadow-lg">

//               <div className="py-1 bg-white rounded-md shadow-xs" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">

//                 <a href="#" className="block px-4 py-2 text-sm transition duration-150 ease-in-out text-cool-gray-700 hover:bg-cool-gray-100" role="menuitem">Your Profile</a>

//                 <a href="#" className="block px-4 py-2 text-sm transition duration-150 ease-in-out text-cool-gray-700 hover:bg-cool-gray-100" role="menuitem">Settings</a>

//                 <a href="#" className="block px-4 py-2 text-sm transition duration-150 ease-in-out text-cool-gray-700 hover:bg-cool-gray-100" role="menuitem">Logout</a>

//               </div>

//             </div>

//           </div>

//         </div>

//       </div>

//     </div>

//     <main className="relative z-0 flex-1 pb-8 overflow-y-auto">

//       <!-- Page header -->

//       <div className="bg-white shadow">

//         <div className="px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">

//           <div className="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-cool-gray-200">

//             <div className="flex-1 min-w-0">

//               <!-- Profile -->

//               <div className="flex items-center">

//                 <img className="hidden rounded-full h-15 w-15 sm:block" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.6&w=256&h=256&q=80" alt="">

//                 <div>

//                   <div className="flex items-center">

//                     <img className="rounded-full h-15 w-15 sm:hidden" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.6&w=256&h=256&q=80" alt="">

//                     <h1 className="ml-3 text-2xl font-bold leading-7 text-cool-gray-900 sm:leading-9 sm:truncate">

//                       Good morning, Emilia Birch

//                     </h1>

//                   </div>

//                   <dl className="flex flex-col mt-6 sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap">

//                     <dt className="sr-only">Company</dt>

//                     <dd className="flex items-center text-sm font-medium leading-5 capitalize text-cool-gray-500 sm:mr-6">

//                       <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-cool-gray-400" viewBox="0 0 20 20" fill="currentColor">

//                         <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />

//                       </svg>

//                       Duke street studio

//                     </dd>

//                     <dt className="sr-only">Account status</dt>

//                     <dd className="flex items-center mt-3 text-sm font-medium leading-5 capitalize text-cool-gray-500 sm:mr-6 sm:mt-0">

//                       <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">

//                         <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />

//                       </svg>

//                       Verified account

//                     </dd>

//                   </dl>

//                 </div>

//               </div>

//             </div>

//             <div className="flex mt-6 space-x-3 md:mt-0 md:ml-4">

//               <span className="rounded-md shadow-sm">

//                 <button type="button" className="inline-flex items-center px-4 py-2 text-sm font-medium leading-5 transition duration-150 ease-in-out bg-white border rounded-md border-cool-gray-300 text-cool-gray-700 hover:text-cool-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-cool-gray-800 active:bg-cool-gray-50">

//                   Add money

//                 </button>

//               </span>

//               <span className="rounded-md shadow-sm">

//                 <button type="button" className="inline-flex items-center px-4 py-2 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out bg-teal-600 border border-transparent rounded-md hover:bg-teal-500 focus:outline-none focus:shadow-outline-teal focus:border-teal-700 active:bg-teal-700">

//                   Send money

//                 </button>

//               </span>

//             </div>

//           </div>

//         </div>

//       </div>

//       <div className="mt-8">

//         <div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">

//           <h2 className="text-lg font-medium leading-6 text-cool-gray-900">Overview</h2>

//           <div className="grid grid-cols-1 gap-5 mt-2 sm:grid-cols-2 lg:grid-cols-3">

//             <!-- Card -->

//             <div className="overflow-hidden bg-white rounded-lg shadow">

//               <div className="p-5">

//                 <div className="flex items-center">

//                   <div className="flex-shrink-0">

//                     <svg className="w-6 h-6 text-cool-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">

//                       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />

//                     </svg>

//                   </div>

//                   <div className="flex-1 w-0 ml-5">

//                     <dl>

//                       <dt className="text-sm font-medium leading-5 truncate text-cool-gray-500">

//                         Account balance

//                       </dt>

//                       <dd>

//                         <div className="text-lg font-medium leading-7 text-cool-gray-900">

//                           $30,659.45

//                         </div>

//                       </dd>

//                     </dl>

//                   </div>

//                 </div>

//               </div>

//               <div className="px-5 py-3 bg-cool-gray-50">

//                 <div className="text-sm leading-5">

//                   <a href="#" className="font-medium text-teal-600 transition duration-150 ease-in-out hover:text-teal-900">

//                     View all

//                   </a>

//                 </div>

//               </div>

//             </div>

//             <!-- More cards... -->

//           </div>

//         </div>

//         <h2 className="max-w-6xl px-4 mx-auto mt-8 text-lg font-medium leading-6 text-cool-gray-900 sm:px-6 lg:px-8">

//           Recent activity

//         </h2>

//         <!-- Activity list (smallest breakopoint only) -->

//         <div className="shadow sm:hidden">

//           <ul className="mt-2 overflow-hidden divide-y shadow divide-cool-gray-200 sm:hidden">

//             <li>

//               <a href="#" className="block px-4 py-4 bg-white hover:bg-cool-gray-50">

//                 <div className="flex items-center space-x-4">

//                   <div className="flex flex-1 space-x-2 truncate">

//                     <svg className="flex-shrink-0 w-5 h-5 text-cool-gray-400" viewBox="0 0 20 20" fill="currentColor">

//                       <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />

//                     </svg>

//                     <div className="text-sm truncate text-cool-gray-500">

//                       <p className="truncate">Payment to Molly Sanders</p>

//                       <p><span className="font-medium text-cool-gray-900">$20,000</span> USD</p>

//                       <p>July 11, 2020</p>

//                     </div>

//                   </div>

//                   <div>

//                     <svg className="flex-shrink-0 w-5 h-5 text-cool-gray-400" viewBox="0 0 20 20" fill="currentColor">

//                       <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />

//                     </svg>

//                   </div>

//                 </div>

//               </a>

//             </li>

//             <!-- More items... -->

//           </ul>

//           <nav className="flex items-center justify-between px-4 py-3 bg-white border-t border-cool-gray-200">

//             <div className="flex justify-between flex-1">

//               <a href="#" className="relative inline-flex items-center px-4 py-2 text-sm font-medium leading-5 transition duration-150 ease-in-out bg-white border rounded-md border-cool-gray-300 text-cool-gray-700 hover:text-cool-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-cool-gray-100 active:text-cool-gray-700">

//                 Previous

//               </a>

//               <a href="#" className="relative inline-flex items-center px-4 py-2 ml-3 text-sm font-medium leading-5 transition duration-150 ease-in-out bg-white border rounded-md border-cool-gray-300 text-cool-gray-700 hover:text-cool-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-cool-gray-100 active:text-cool-gray-700">

//                 Next

//               </a>

//             </div>

//           </nav>

//         </div>

//         <!-- Activity table (small breakopoint and up) -->

//         <div className="hidden sm:block">

//           <div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">

//             <div className="flex flex-col mt-2">

//               <div className="min-w-full overflow-hidden overflow-x-auto align-middle shadow sm:rounded-lg">

//                 <table className="min-w-full divide-y divide-cool-gray-200">

//                   <thead>

//                     <tr>

//                       <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left uppercase bg-cool-gray-50 text-cool-gray-500">

//                         Transaction

//                       </th>

//                       <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-right uppercase bg-cool-gray-50 text-cool-gray-500">

//                         Amount

//                       </th>

//                       <th className="hidden px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left uppercase bg-cool-gray-50 text-cool-gray-500 md:block">

//                         Status

//                       </th>

//                       <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-right uppercase bg-cool-gray-50 text-cool-gray-500">

//                         Date

//                       </th>

//                     </tr>

//                   </thead>

//                   <tbody className="bg-white divide-y divide-cool-gray-200">

//                     <tr className="bg-white">

//                       <td className="w-full px-6 py-4 text-sm leading-5 whitespace-no-wrap max-w-0 text-cool-gray-900">

//                         <div className="flex">

//                           <a href="#" className="inline-flex space-x-2 text-sm leading-5 truncate group">

//                             <svg className="flex-shrink-0 w-5 h-5 transition duration-150 ease-in-out text-cool-gray-400 group-hover:text-cool-gray-500" viewBox="0 0 20 20" fill="currentColor">

//                               <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />

//                             </svg>

//                             <p className="truncate transition duration-150 ease-in-out text-cool-gray-500 group-hover:text-cool-gray-900">

//                               Payment to Molly Sanders

//                             </p>

//                           </a>

//                         </div>

//                       </td>

//                       <td className="px-6 py-4 text-sm leading-5 text-right whitespace-no-wrap text-cool-gray-500">

//                         <span className="font-medium text-cool-gray-900">$20,000 </span>

//                         USD

//                       </td>

//                       <td className="hidden px-6 py-4 text-sm leading-5 whitespace-no-wrap text-cool-gray-500 md:block">

//                         <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium leading-4 bg-green-100 text-green-800 capitalize">

//                           success

//                         </span>

//                       </td>

//                       <td className="px-6 py-4 text-sm leading-5 text-right whitespace-no-wrap text-cool-gray-500">

//                         July 11, 2020

//                       </td>

//                     </tr>

//                     <!-- More rows... -->

//                   </tbody>

//                 </table>

//                 <!-- Pagination -->

//                 <nav className="flex items-center justify-between px-4 py-3 bg-white border-t border-cool-gray-200 sm:px-6">

//                   <div className="hidden sm:block">

//                     <p className="text-sm leading-5 text-cool-gray-700">

//                       Showing

//                       <span className="font-medium">1</span>

//                       to

//                       <span className="font-medium">10</span>

//                       of

//                       <span className="font-medium">20</span>

//                       results

//                     </p>

//                   </div>

//                   <div className="flex justify-between flex-1 sm:justify-end">

//                     <a href="#" className="relative inline-flex items-center px-4 py-2 text-sm font-medium leading-5 transition duration-150 ease-in-out bg-white border rounded-md border-cool-gray-300 text-cool-gray-700 hover:text-cool-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-cool-gray-100 active:text-cool-gray-700">

//                       Previous

//                     </a>

//                     <a href="#" className="relative inline-flex items-center px-4 py-2 ml-3 text-sm font-medium leading-5 transition duration-150 ease-in-out bg-white border rounded-md border-cool-gray-300 text-cool-gray-700 hover:text-cool-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-cool-gray-100 active:text-cool-gray-700">

//                       Next

//                     </a>

//                   </div>

//                 </nav>

//               </div>

//             </div>

//           </div>

//         </div>

//       </div>

//     </main>

//   </div>

// </div>
//   )
// }

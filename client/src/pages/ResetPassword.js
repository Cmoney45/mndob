// import React, { Component } from 'react';
// import axios from 'axios';
// import TextField from '@material-ui/core/TextField';

// // import {
// //   LinkButtons,
// //   updateButton,
// //   homeButton,
// //   loginButton,
// //   HeaderBar,
// //   forgotButton,
// //   inputStyle,
// //   SubmitButtons,
// // } from '../components';

// const loading = {
//   margin: '1em',
//   fontSize: '24px',
// };

// const title = {
//   pageTitle: 'Password Reset Screen',
// };

// export default class ResetPassword extends Component {
//   constructor() {
//     super();

//     this.state = {
//       username: '',
//       password: '',
//       confirmPassword: '',
//       update: false,
//       isLoading: true,
//       error: false,
//     };
//   }

//   async componentDidMount() {
//     await axios
//       .get('http://localhost:3001/reset', {
//         params: {
//           resetPasswordToken: this.props.match.params.token,
//         },
//       })
//       .then(response => {
//         console.log(response);
//         if (response.data.message === 'password reset link a-ok') {
//           this.setState({
//             username: response.data.username,
//             update: false,
//             isLoading: false,
//             error: false,
//           });
//         } else {
//           this.setState({
//             update: false,
//             isLoading: false,
//             error: true,
//           });
//         }
//       })
//       .catch(error => {
//         console.log(error.data);
//       });
//   }

//   handleChange = name => event => {
//     this.setState({
//       [name]: event.target.value,
//     });
//   };

//   updatePassword = e => {
//     e.preventDefault();
//     axios
//       .put('http://localhost:3003/updatePasswordViaEmail', {
//         username: this.state.username,
//         password: this.state.password,
//       })
//       .then(response => {
//         console.log(response.data);
//         if (response.data.message === 'password updated') {
//           this.setState({
//             updated: true,
//             error: false,
//           });
//         } else {
//           this.setState({
//             updated: false,
//             error: true,
//           });
//         }
//       })
//       .catch(error => {
//         console.log(error.data);
//       });
//   };

//   render() {
//     const { password, error, isLoading, updated } = this.state;

//     if (error) {
//       return (
//         <div>
//           <div title={title} />
//           <div style={loading}>
//             <h4>Problem resetting password. Please send another reset link.</h4>
//             <button
//               buttonText={`Go Home`}
//               // buttonStyle={homeButton}
//               link={'/'}
//             />
//             <button
//               // buttonStyle={forgotButton}
//               buttonText={'Forgot Password?'}
//               link={'/forgotPassword'}
//             />
//           </div>
//         </div>
//       );
//     } else if (isLoading) {
//       return (
//         <div>
//           <div title={title} />
//           <div style={loading}>Loading User Data...</div>
//         </div>
//       );
//     } else {
//       return (
//         <div>
//           <div title={title} />
//           <form className="password-form" onSubmit={this.updatePassword}>
//             <input
//               // style={inputSt??yle}
//               id="password"
//               label="password"
//               onChange={this.handleChange('password')}
//               value={password}
//               type="password"
//             />
//             <button
//               // buttonStyle={updateButton}
//               buttonText={'Update Password'}
//             />
//           </form>

//           {updated && (
//             <div>
//               <p>
//                 Your password has been successfully reset, please try logging in
//                 again.
//               </p>
//               <button
//                 // buttonStyle={loginButton}
//                 buttonText={'Login'}
//                 link={`/login`}
//               />
//             </div>
//           )}
//           <button
//             buttonText={`Go Home`}
//             // buttonStyle={homeButton}
//             link={'/'}
//           />
//         </div>
//       );
//     }
//   }
// }
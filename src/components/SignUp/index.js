import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { withFirebase } from "../Firebase";

const SignUpPage = () => (
  <div className="container">
    <h1>SignUp</h1>
    <SignUpForm />
  </div>
);

const INITIAL_STATE = {
  username: "",
  email: "",
  passwordOne: "",
  passwordTwo: "",
  error: null
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    // eslint-disable-next-line no-unused-vars
    const { username, email, passwordOne } = this.state;
    event.preventDefault();

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push("/");
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    console.log(this.props);
  };

  render() {
    const { username, email, passwordOne, passwordTwo, error } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === "" ||
      email === "" ||
      username === "";

    return (
      <div className="container">
        <form onSubmit={this.onSubmit}>
          <input
            name="username"
            value={username}
            onChange={this.onChange}
            type="text"
            placeholder="Full Name"
          />
          <input
            name="email"
            value={email}
            onChange={this.onChange}
            type="text"
            placeholder="Email Address"
          />
          <input
            name="passwordOne"
            value={passwordOne}
            onChange={this.onChange}
            type="password"
            placeholder="Password"
          />
          <input
            name="passwordTwo"
            value={passwordTwo}
            onChange={this.onChange}
            type="password"
            placeholder="Confirm Password"
          />

          <button disabled={isInvalid} type="submit">
            Sign Up
          </button>

          {error && <p>{error.message}</p>}
        </form>
      </div>
    );
  }
}

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={"/signup"}>Sign Up</Link>
  </p>
);

const SignUpForm = withRouter(withFirebase(SignUpFormBase));
export default SignUpPage;

export { SignUpForm, SignUpLink };

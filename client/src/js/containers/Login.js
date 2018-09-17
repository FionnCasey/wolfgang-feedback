import React, { Component } from 'react';
import styled from 'styled-components';
import { BackgroundImage } from '../components';
import { colour, api } from '../utils';
import signupImg from '../../assets/Sign_Up_Illustration.png';
import loginImg from '../../assets/Login_Illustration.png';
import withContext from '../context';

const Wrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Button = styled.button`
	position: relative;
	top: ${props => props.top};
	left: ${props => props.left};
	border-radius: 16px;
	width: 100px;
	padding: 6px 10px;
	background: ${colour.secondary};
	color: #FFF;
	border: 1px solid ${colour.secondary};
	cursor: pointer;
	letter-spacing: 1px;
	transition: all .3s ease-in-out;
	outline: 0;

	&:hover {
		background: #FFF;
		color: ${colour.secondary};
	}
`;

const Input = styled.input`
	position: relative;
	left: ${props => props.left};
	top: ${props => props.top};
	border-radius: 24px;
	padding: 12px 10px 10px 10px;
	border: 1px solid transparent;
	background: #FFF;
	outline: none;
	height: 28px;
	width: ${props => props.width || '180px'};
	color: ${colour.grey[0]};
	font-size: 12px;
	font-weight: 300;
	margin: 0;

	&::placeholder {
		color: ${colour.primary};
		letter-spacing: 1px;
		font-weight: 300;
	}

	&:focus, &:active {
		border: 1px solid ${colour.secondaryHighlight};
	}
`;

class Login extends Component {
	state = {
		login: true,
		email: '',
		password: '',
		confirmPassword: '',
		message: ''
	};

	handleChange = ({ target }) => {
		this.setState({ [target.name]: target.value });
	};

	handleSignup = async event => {
		event.preventDefault();
		window.scrollTo(0,0);
		const { email, password, confirmPassword } = this.state;

		if (!email || !password || !confirmPassword) {
			this.setMessage('Fields cannot be blank.');
			return;
		}
		if (password !== confirmPassword) {
			this.setMessage('Passwords must match.');
			return;
		}

		const res = await api.signup({
			email,
			password
		});

		if (res.success) {
			this.props.context.user.login(res.data);
		} else {
			this.setMessage(res.message);
		}
	};

	handleLogin = async event => {
		event.preventDefault();
		window.scrollTo(0,0);
		const { email, password } = this.state;

		if (!email || !password) {
			this.setMessage('Fields cannot be blank.');
			return;
		}

		const res = await api.login({
			email,
			password
		});

		if (res.success) {
			this.props.context.user.login(res.data);
		} else {
			this.setMessage(res.message);
		}
	};

	setMessage(message) {
		this.setState({ message });
		setTimeout(() => this.setState({ message: '' }), 3000);
	}

	selectLogin = login => this.setState({ login });

	render() {
		const { login, email, password, confirmPassword, message } = this.state;

		return (
			<Wrapper>
				{
					login ?
					<BackgroundImage src={loginImg}>
						<Button
							onClick={() => this.selectLogin(false)}
							top='0'
							left='-10px'
						>
							Signup
						</Button>
						<form onSubmit={this.handleLogin}>
							<Input
								name='email'
								type='text'
								value={email}
								placeholder='EMAIL'
								top='82px'
								left='59px'
								width='200px'
								onChange={this.handleChange}
							/>
							<Input
								name='password'
								value={password}
								type='password'
								placeholder='PASSWORD'
								top='88px'
								left='60px'
								width='200px'
								onChange={this.handleChange}
							/>
							<Button
								type='submit'
								onClick={this.handleLogin}
								top='160px'
								left='70px'
							>
								Login
							</Button>
						</form>
					</BackgroundImage>
					:
					<BackgroundImage src={signupImg}>
						<Button
							onClick={() => this.selectLogin(true)}
						>
							Login
						</Button>
						<form onSubmit={this.handleSignup}>
							<Input
								name='email'
								type='text'
								value={email}
								placeholder='EMAIL'
								top='53px'
								left='83px'
								onChange={this.handleChange}
							/>
							<Input
								name='password'
								type='password'
								value={password}
								placeholder='PASSWORD'
								top='84px'
								left='-97px'
								onChange={this.handleChange}
							/>
							<Input
								name='confirmPassword'
								type='password'
								value={confirmPassword}
								placeholder='CONFIRM PASSWORD'
								top='87px'
								left='83px'
								onChange={this.handleChange}
							/>
							<Button
								type='submit'
								onClick={this.handleSignup}
								top='150px'
								left='90px'
							>
								Signup
							</Button>
						</form>
					</BackgroundImage>
				}
				{ message }
			</Wrapper>
		);
	}
}

export default withContext(Login);
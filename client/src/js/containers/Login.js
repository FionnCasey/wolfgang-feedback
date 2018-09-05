import React, { Component } from 'react';
import styled from 'styled-components';
import { BackgroundImage } from '../components';
import { colour, api } from '../utils';
import signup from '../../assets/Sign_Up_Illustration.png';
import { withContext } from '../context';

const Wrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Input = styled.input`
	position: relative;
	left: ${props => props.left};
	top: ${props => props.top};
	border-radius: 24px;
	padding: 12px 10px 10px 10px;
	border: 1px solid transparent;
	background: rgba(0, 0, 0, 0);
	outline: none;
	height: 28px;
	width: 180px;
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
		login: false,
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
		const { email, password, confirmPassword } = this.state;

		if (!email || !password || !confirmPassword) {
			this.setState({ message: 'Fields canno be blank.' });
		}
		if (password !== confirmPassword) {
			this.setState({ message: 'Passwords must match.' });
		}

		const res = await api.signup({
			email,
			password
		});

		if (res.success) {
			this.props.context.user.login(res.data);
		} else {
			this.setState({ message: res.message });
		}
	};

	render() {
		const { login, email, password, confirmPassword, message } = this.state;

		return (
			<Wrapper>
				{
					login ?
					<BackgroundImage src={signup}>
						<form>
							<Input
								name='email'
								type='text'
								value={email}
								placeholder='EMAIL'
								top='53px'
								left='152px'
								onChange={this.handleChange}
							/>
							<Input
								name='password'
								value={password}
								type='password'
								placeholder='PASSWORD'
								top='84px'
								left='-28px'
								onChange={this.handleChange}
							/>
						</form>
					</BackgroundImage>
					:
					<BackgroundImage src={signup}>
						<form onSubmit={this.handleSignup}>
							<Input
								name='email'
								type='text'
								value={email}
								placeholder='EMAIL'
								top='53px'
								left='152px'
								onChange={this.handleChange}
							/>
							<Input
								name='password'
								type='password'
								value={password}
								placeholder='PASSWORD'
								top='84px'
								left='-28px'
								onChange={this.handleChange}
							/>
							<Input
								name='confirmPassword'
								type='password'
								value={confirmPassword}
								placeholder='CONFIRM PASSWORD'
								top='87px'
								left='152px'
								onChange={this.handleChange}
							/>
							<button type='submit' value='Submit' />
						</form>
					</BackgroundImage>
				}
				{ message }
			</Wrapper>
		);
	}
}

export default withContext(Login);
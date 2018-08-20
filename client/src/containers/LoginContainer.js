import React, { Component } from 'react';
import { GridItem } from 'styled-grid-responsive';
import styled from 'styled-components';
import { sizes, colours, box_shadow, api } from '../utils';
import { TextInput, SubmitButton } from '../components';
import { AppContext } from '../libs';

const Wrapper = styled.div`
  height: ${props => props.height};
	width: 300px;
  overflow: hidden;
	margin-top: 5px;
	background: ${colours.greyscale[0]};
	box-shadow: ${box_shadow};
  color: ${colours.black};
	transition: height .3s ease-out;
  border-radius: ${sizes.border_radius};
  padding: 0;
`;

const Tab = styled.div`
	height: 36px;
	width: 50%;
	float: ${props => props.float};
	border-bottom: 1px solid ${props => props.borderColour};
	border-radius: ${props => props.border};
	background: ${props => props.background};
	color: ${props => props.colour};
	display: grid;
	margin: 0 0 8px 0;
	padding: 0;
	place-items: center center;
	cursor: pointer;
	transition: all .2s ease-out;
`;

const ButtonText = styled.span`
	font-size: 18px;
`;

const Center = styled.div`
	display: flex;
	justify-content: center;
	margin: 25vh 0 0 0;
`;

const left = `${sizes.border_radius} 0 0 0`;
const right = `0 ${sizes.border_radius} 0 0`;

const Tabs = props => {
	const { activeTab, setActiveTab } = props;
	return (
		<React.Fragment>
			<Tab
				onClick={() => setActiveTab(0)}
				border={left}
				float='left'
				background={activeTab === 0 ? colours.primary[1] : colours.greyscale[0]}
				colour={activeTab === 0 ? colours.greyscale[0] : colours.primary[1]}
				borderColour={activeTab === 0 ? colours.primary[1] : colours.greyscale[2]}
			>
				<ButtonText>Login</ButtonText>
			</Tab>
			<Tab
				onClick={() => setActiveTab(1)}
				border={right}
				float='right'
				background={activeTab === 1 ? colours.primary[1] : colours.greyscale[0]}
				colour={activeTab === 1 ? colours.greyscale[0] : colours.primary[1]}
				borderColour={activeTab === 1 ? colours.primary[1] : colours.greyscale[2]}
			>
				<ButtonText>Signup</ButtonText>
			</Tab>
		</React.Fragment>
	);
};

class LoginContainer extends Component {

	state = {
		activeTab: 0,
		email: '',
		password: '',
		confirmPassword: '',
    error: ''
	};

	setActiveTab = activeTab => this.setState({ activeTab });

	handleEmailChange = ({ target: { value }}) => this.setState({ email: value });

	handlePasswordChange = ({ target: { name, value } }) => this.setState({ [name]: value });

	handleLogin = e => {
		e.preventDefault();
		const { email, password } = this.state;
		api.loginUser({ email, password })
      .then(data => {
        if (data.message) {
          this.setState({ error: data.message });
        } else {
          this.props.login(data);
        }
      })
      .catch(error => {
        this.setState({ error });
      });
	};

	handleSignup = e => {
		e.preventDefault();
    const { email, password, confirmPassword } = this.state;
    if (password !== confirmPassword) {
      this.setState({ error: 'Passwords must match.' });
      return;
    }
    api.signupUser({ email, password })
    .then(data => {
      if (data.message) {
        this.setState({ error: data.message });
      } else {
        this.props.login(data);
      }
    })
    .catch(error => {
      this.setState({ error });
    });
	};

	render() {
		const { activeTab, email, password, confirmPassword, error } = this.state;

		return(
        <GridItem col={1}>
  				<Center>
  					<Wrapper height={activeTab === 0 ? '170px' : '210px'}>
  						<Tabs
  							activeTab={activeTab}
  							setActiveTab={this.setActiveTab}
  						/>
  						<TextInput
  							name='email'
  							placeholder='Email'
  							value={email}
  							onChange={this.handleEmailChange}
  						/>
  						<TextInput
  							name='password'
  							placeholder='Password'
  							value={password}
  							type='password'
  							onChange={this.handlePasswordChange}
  						/>
  						{
  							activeTab === 1 && (
  								<TextInput
  									name='confirmPassword'
  									placeholder='Confirm password'
  									value={confirmPassword}
  									type='password'
  									onChange={this.handlePasswordChange}
  								/>
  						)}
  						{
  							activeTab === 0
  								? (<SubmitButton text='Login' onClick={this.handleLogin} />)
  								: (<SubmitButton text='Signup' onClick={this.handleSignup} />)
  						}
              { error }
  					</Wrapper>
  				</Center>
  			</GridItem>
		);
	}
}

export default props => (
  <AppContext.Consumer>
    {({ login }) => (
      <LoginContainer login={login}/>
    )}
  </AppContext.Consumer>
);

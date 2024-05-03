import React, { useState } from 'react'
import styled from 'styled-components'
import logo from '../../../assets/images/logo/national-builders-logo.svg'
import bgImage from '../../../assets/images/login/login-bg.jpg'

// Icons
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";

function LoginComponents() {
  const [form, setForm] = useState({ "username": "", "password": "" })
  const [isVisible, setVisible] = useState();
  const [error, seterror] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (form.username.trim() === '' || form.password.trim() === '') {
      seterror("Invalid Credentials");
      setTimeout(() => {
        seterror('');
      }, 2500)
    }
  };

  return (
    <Section className='grid grid-cols-2'>
      <Left>
        <Logo src={logo} alt="" />
      </Left>
      <Right>
        <Form onSubmit={handleSubmit}>
          <Title>LOGIN</Title>
          <Subtitle errorStatus={error}>
            {
              error ? error : "Please enter your user name and password"
            }
          </Subtitle>
          <Input
            type="text"
            placeholder="User name"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
          <Cover>
            <Input
              type={isVisible ? "text" : "password"}
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <Eye onClick={() => setVisible(!isVisible)}>
              {!isVisible ? (
                <FaRegEye />
              ) : (
                <FaRegEyeSlash />

              )}
            </Eye>
          </Cover>
          <Button type='submit'>Login</Button>
        </Form>
      </Right>
    </Section>
  )
}

export default LoginComponents

const Section = styled.section`
    height: 100vh;
    background-color: white;
    color: black;
`
const Left = styled.div`
  background-image: url(${bgImage});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center ;

`
const Logo = styled.img`
/* width: 50%; */
`
const Right = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Form = styled.form`
  width: 40%;
  margin: 0 auto;
  @media all and (max-width: 1440px) {
    width: 50%;
  }
`;

const Title = styled.h2`
  color: var(--blue);
  font-size: 30px;
  text-align: center;
  font-family: "mont-medium";
  margin-bottom: 30px;
  font-weight: 500;
`;
const Subtitle = styled.p`
 ${(props) => props.errorStatus === "" ? 'color:var(--blue)' : 'color:rgb(255, 73, 69)'};
  font-size: 14px;
  font-family: "mont-regular";
  text-align: center;
  margin-bottom: 40px;
`;
const Input = styled.input`
  height: 50px;
  width: 100%;
  padding-left: 30px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  outline: none;
  font-size: 14px;
  font-family: "mont-regular";
  border-radius: 30px;
  margin-bottom: 20px;
`;
const Cover = styled.div`
  position: relative;
`;
const Button = styled.button`
  background-color: red;
  color: #fff;
  height: 50px;
  width: 100%;
  opacity: 80%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
`;
const Eye = styled.div`
  position: absolute;
  right: 20px;
  cursor: pointer;
  top: 15px;
`;

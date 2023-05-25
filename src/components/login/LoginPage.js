import React, { useState } from 'react';
import { Form, Input, Button, Alert } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import AuthService from '../../services/auth-service';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const [loginError, setLoginError] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (values) => {
        AuthService.login(values.email, values.password)
            .then(() => {
                navigate('/config');
                console.log('Login successful');
            })
            .catch((error) => {
                setLoginError(true);
                console.error('Login error:', error);
            });
    };

    return (
        <div className="login-wrapper">
            <div className="login-form">
                <Form onFinish={handleSubmit} initialValues={{ remember: true }}>
                    <h1>Login</h1>
                    <Form.Item
                        name="email"
                        rules={[
                            { required: true, message: 'Please enter your email!' },
                            { type: 'email', message: 'Please enter a valid email!' },
                        ]}
                    >
                        <Input
                            prefix={<UserOutlined />}
                            placeholder="Email"
                            autoComplete="email"
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please enter your password!' }]}
                    >
                        <Input.Password
                            prefix={<LockOutlined />}
                            placeholder="Password"
                            autoComplete="current-password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Sign in
                        </Button>
                    </Form.Item>
                </Form>
                {loginError && (
                    <Alert
                        type="error"
                        message="Invalid email or password"
                        showIcon
                        closable
                    />
                )}
            </div>
        </div>
    );
}

export default LoginPage;

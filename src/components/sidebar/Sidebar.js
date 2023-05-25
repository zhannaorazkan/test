import React from 'react';
import { Layout, Menu } from 'antd';
import {
    LaptopOutlined,
    PlusCircleOutlined, ArrowLeftOutlined,
} from '@ant-design/icons';
import {Link, NavLink, useNavigate} from "react-router-dom";
import AuthService from "../../services/auth-service";

const { Sider } = Layout;

function Sidebar() {
    const navigate = useNavigate();
    const handleLogout = () => {
        AuthService.logout();
        navigate('/');
    };

    return (
        <Sider theme="dark" width={200}>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                <Menu.Item key="1" icon={<LaptopOutlined />}>
                    <NavLink to="/config" className="nav-link">Configurations</NavLink>
                </Menu.Item>
                <Menu.Item key="2" icon={<PlusCircleOutlined />}>
                    <NavLink to="/create-config" className="nav-link">Create configuration</NavLink>
                </Menu.Item>
                <Menu.Item key="3" icon={<ArrowLeftOutlined />} onClick={handleLogout}>
                    <div>Logout</div>
                </Menu.Item>
            </Menu>
        </Sider>
    );
}

export default Sidebar;

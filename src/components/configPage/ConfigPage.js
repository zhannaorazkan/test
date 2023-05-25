import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, message } from 'antd';
import Sidebar from '../sidebar/Sidebar';

function ConfigFilePage() {
    const [configData, setConfigData] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios
            .get('http://localhost:4000/configs/kibana-3.yml', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setConfigData(response.data);
            })
            .catch((error) => {
                console.error('Error reading configuration file:', error);
            });
    }, []);

    const renderValue = (value) => {
        if (typeof value === 'boolean') {
            return value.toString();
        }
        if (Array.isArray(value)) {
            return JSON.stringify(value);
        }
        if (typeof value === 'object') {
            return JSON.stringify(value);
        }
        return value;
    };

    const columns = [
        {
            title: 'Property',
            dataIndex: 'property',
            key: 'property',
        },
        {
            title: 'Value',
            dataIndex: 'value',
            key: 'value',
        },
    ];

    let dataSource = [];
    if (configData) {
        dataSource = Object.entries(configData).map(([property, value]) => ({
            key: property,
            property,
            value: renderValue(value),
        }));
    }

    return (
        <div className="configPage-wrapper">
            {configData ? (
                <div className="data-wrapper">
                    <h2>Configuration File Data:</h2>
                    <Table columns={columns} dataSource={dataSource} />
                </div>
            ) : (
                <p>Loading data...</p>
            )}
        </div>
    );
}

export default ConfigFilePage;

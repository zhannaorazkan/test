import React from 'react';
import { Table, message } from 'antd';
import {useQuery} from "@tanstack/react-query";
import {getConfigs} from "../../api/configs";

function ConfigFilePage() {
    const configsQuery = useQuery({
        queryKey: ['configs'],
        queryFn: getConfigs
    })
    if (configsQuery.status === 'loading') return <p>Loading...</p>
    if (configsQuery.status === 'error') return <p>Error :(</p>

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

    const dataSource = configsQuery.data
        ? Object.entries(configsQuery.data).map(([property, value]) => ({
            key: property,
            property,
            value: renderValue(value),
        }))
        : [];

    return (
        <div className="configPage-wrapper">
                <div className="data-wrapper">
                    <h2>Configuration File Data:</h2>
                    <Table columns={columns} dataSource={dataSource} />
                </div>
        </div>
    );
}

export default ConfigFilePage;
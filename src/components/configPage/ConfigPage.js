import React, { useEffect } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {fetchConfigs} from "../../features/config/configSlice";


function ConfigFilePage() {
    const dispatch = useDispatch();
    const configs = useSelector((state) => state.configs);

    useEffect(() => {
        dispatch(fetchConfigs());
    }, [dispatch]);

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
    const dataSource = configs.data
        ? Object.entries(configs.data).map(([property, value]) => ({
            key: property,
            property,
            value: renderValue(value),
        }))
        : [];

    if (configs.status === 'loading') return <p>Loading...</p>;
    if (configs.status === 'failed') return <p>Error :(</p>;

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

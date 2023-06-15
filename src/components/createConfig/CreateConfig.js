import React, { useState } from 'react';
import axios from 'axios';
import {message} from "antd";
import {useMutation} from "@tanstack/react-query";
import {createConfigs} from "../../api/configs";

function CreateConfig() {
    const [formData, setFormData] = useState({
        server_name: '',
        server_host: '',
        kibana_index: '',
        elasticsearch_hosts: [],
        elasticsearch_username: '',
        elasticsearch_password: '',
    });
    const createConfigMutation = useMutation({
        mutationFn: createConfigs
    })
    const [messageApi, contextHolder] = message.useMessage();
    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'Configuration was successfully created',
        });
    };
    const errorMessage = () => {
        messageApi.open({
            type: 'error',
            content: 'Something went wrong',
        });
    };

    const [booleanData, setBooleanData] = useState({
        elasticsearch_preserveHost: true,
        logging_silent: true,
    });

    const [numberData, setNumberData] = useState(0);

    const handleBooleanData = (e) => {
        const { name, checked } = e.target;
        setBooleanData((prevBooleanData) => ({
            ...prevBooleanData,
            [name]: checked ? true : false,
        }));
    };

    const handleNumberData = (e) => {
        const newNumber = parseInt(e.target.value);
        setNumberData(newNumber);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevFormData) => {
            if (Array.isArray(prevFormData[name])) {
                const newArrayValue = value.split(',').map((item) => item.trim());
                return {
                    ...prevFormData,
                    [name]: newArrayValue,
                };
            }

            return {
                ...prevFormData,
                [name]: value,
            };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const requestData = {
            ...formData,
            ...booleanData,
            server_port: numberData,
        };

        createConfigMutation.mutate(requestData, {
            onSuccess: () => {
                console.log(requestData);
                console.log('File created successfully');
                success();
            },
            onError: (error) => {
                console.error('Error creating configuration file:', error);
                errorMessage();
            },
        });
    };

    //bootstrap validation
    (() => {
        'use strict';

        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        const forms = document.querySelectorAll('.needs-validation');

        // Loop over them and prevent submission
        Array.from(forms).forEach((form) => {
            form.addEventListener('submit', (event) => {
                const checkboxes = form.querySelectorAll('input[type="checkbox"]');
                let isValid = true;

                checkboxes.forEach((checkbox) => {
                        checkbox.setCustomValidity('');
                });

                if (!form.checkValidity() || !isValid) {
                    event.preventDefault();
                    event.stopPropagation();
                }

                form.classList.add('was-validated');
            }, false);
        });
    })();


    return (
        <div>
            {contextHolder}
            <h1>Create Configuration File Page</h1>
            <form onSubmit={handleSubmit} className="container needs-validation" noValidate>
                <div className="mb-3">
                    <label htmlFor="server_name" className="form-label">
                        server_name:
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="server_name"
                        name="server_name"
                        value={formData.server_name}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="server_host" className="form-label">
                        server_host:
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="server_host"
                        name="server_host"
                        value={formData.server_host}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="server_port" className="form-label">
                        server_port:
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        id="server_port"
                        name="server_port"
                        value={numberData}
                        onChange={handleNumberData}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="elasticsearch_hosts" className="form-label">
                        elasticsearch_hosts:
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="elasticsearch_hosts"
                        name="elasticsearch_hosts"
                        value={formData.elasticsearch_hosts}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="elasticsearch_preserveHost" className="form-label">
                        elasticsearch_preserveHost:
                    </label>
                    <div className="form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="elasticsearch_preserveHost"
                            name="elasticsearch_preserveHost"
                            checked={booleanData.elasticsearch_preserveHost}
                            onChange={handleBooleanData}
                        />
                        <label
                            className="form-check-label"
                            htmlFor="elasticsearch_preserveHost"
                        >
                            {booleanData.elasticsearch_preserveHost ? 'true' : 'false'}
                        </label>
                    </div>
                </div>

                <div className="mb-3">
                    <label htmlFor="kibana_index" className="form-label">
                        kibana_index:
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="kibana_index"
                        name="kibana_index"
                        value={formData.kibana_index}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="elasticsearch_username" className="form-label">
                        elasticsearch_username:
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="elasticsearch_username"
                        name="elasticsearch_username"
                        value={formData.elasticsearch_username}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="elasticsearch_password" className="form-label">
                        elasticsearch_password:
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="elasticsearch_password"
                        name="elasticsearch_password"
                        value={formData.elasticsearch_password}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="logging_silent" className="form-label">
                        logging_silent:
                    </label>
                    <div className="form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="logging_silent"
                            name="logging_silent"
                            checked={booleanData.logging_silent}
                            onChange={handleBooleanData}

                        />
                        <label className="form-check-label" htmlFor="logging_silent">
                            {booleanData.logging_silent ? 'true' : 'false'}
                        </label>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary">
                    Create File
                </button>
            </form>
        </div>
    );
}

export default CreateConfig;
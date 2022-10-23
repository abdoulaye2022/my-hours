import React from "react";
import { Col, Row, Button, Breadcrumb, PageHeader, Table, Card, Space, Avatar } from 'antd';
import { PlusOutlined, SearchOutlined, FilterOutlined } from "@ant-design/icons";

const dataSource = [
    {
        key: '1',
        name: 'Mike',
        age: 32,
        address: '10 Downing Street',
    },
    {
        key: '2',
        name: 'John',
        age: 42,
        address: '10 Downing Street',
    },
];

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
    },
];

const Home = () => {
    return (
        <>
            <h2 style={{ textAlign: "center", padding: 0 }}>List of shifts</h2>
            <div style={{ marginBottom: 15 }}>
                <Button type="primary" size="middle">
                    <PlusOutlined /> Add
                </Button>
                <div style={{
                    float: "right"
                }}>
                    <Button type="primary"><SearchOutlined /> Search</Button>
                    <Button style={{ marginLeft: 15 }}><FilterOutlined /> Filter</Button>
                </div>
            </div>

            <Table dataSource={dataSource} columns={columns} />

        </>
    );
}

export default Home;
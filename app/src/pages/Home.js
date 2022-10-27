import React, { useEffect } from "react";
import {
    Button,
    Table,
    Divider
} from "antd";
import {
    PlusOutlined,
    SearchOutlined,
    FilterOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { employerActions } from "../redux/actions/employers.actions";

const dataSource = [
    {
        key: "1",
        index: "Mike",
        jobs: "Security",
        hours: "10 Downing Street",
        employers: "Protrans",
        locations: "43 indutrual rue"
    },
    {
        key: "2",
        index: "Mike",
        jobs: "Security",
        hours: "10 Downing Street",
        employers: "Protrans",
        locations: "43 indutrual rue"
    },
    {
        key: "3",
        index: "Mike",
        jobs: "Security",
        hours: "10 Downing Street",
        employers: "Protrans",
        locations: "43 indutrual rue"
    },
];

const columns = [
    {
        title: "#",
        dataIndex: "index",
        key: "index",
    },
    {
        title: "Jobs",
        dataIndex: "jobs",
        key: "jobs",
    },
    {
        title: "Hours",
        dataIndex: "hours",
        key: "hours",
    },
    {
        title: "Employers",
        dataIndex: "emploers",
        key: "employers",
    },
    {
        title: "Location",
        dataIndex: "locations",
        key: "locations",
    },
];

const Home = () => {

    // const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(employerActions.getAll());
    // }, []);

    return (
        <>
            <Divider orientation="left">
                <h2 style={{ textAlign: "center", padding: 0 }}>
                    List of shifts
                </h2>
            </Divider>

            <div style={{ marginBottom: 15 }}>
                <Button type="primary" size="middle">
                    <PlusOutlined /> Add
                </Button>
                <div
                    style={{
                        float: "right",
                    }}
                >
                    <Button type="primary">
                        <SearchOutlined /> Search
                    </Button>
                    <Button style={{ marginLeft: 15 }}>
                        <FilterOutlined /> Filter
                    </Button>
                </div>
            </div>

            <Table dataSource={dataSource} columns={columns} size="small" />
        </>
    );
};

export default Home;

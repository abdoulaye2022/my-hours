import React, { useEffect } from "react";
import { Button, Table, Divider, Form } from "antd";
import {
    PlusOutlined,
    SearchOutlined,
    FilterOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { ModalShift } from "../components/ModalShift";
import { shiftAction } from "../redux/actions/shifts.actions";

const dataSource = [
    {
        key: "1",
        index: "Mike",
        jobs: "Security",
        hours: "6",
        date: "10/20/2022",
        locations: "43 indutrual rue",
    },
    {
        key: "2",
        index: "Mike",
        jobs: "Security",
        hours: "8",
        date: "15/12/2023",
        locations: "43 indutrual rue",
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
        title: "Date",
        dataIndex: "date",
        key: "date",
    },
    {
        title: "Location",
        dataIndex: "locations",
        key: "locations",
        ellipsis: {
            showTitle: true,
        },
    },
];

const Home = () => {
    const dispatch = useDispatch();
    const [formShift] = Form.useForm();

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
                <Button
                    type="primary"
                    size="middle"
                    onClick={() => dispatch(shiftAction.modalShift())}
                >
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
            <ModalShift formShift={formShift} />
            <Table dataSource={dataSource} columns={columns} size="small" />
        </>
    );
};

export default Home;

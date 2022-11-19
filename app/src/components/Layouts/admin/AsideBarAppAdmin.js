import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Icon } from "semantic-ui-react";

export const AsideBarAppAdmin = () => {
    return (
        <div
            style={{
                backgroundColor: "#647295",
                width: "100%",
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                alignContent: "center",
                justifyContent: "space-between",
            }}
        >
            <div style={{ backgroundColor: "white", height: 50 }}>
                <h3
                    style={{
                        fontWeight: "bold",
                        color: "#647295",
                        textAlign: "center",
                        marginTop: 10,
                    }}
                >
                    My-Hours
                </h3>
            </div>
            <div
                style={{
                    display: "flex",
                    justifyItems: "center",
                    flexDirection: "column",
                    alignItems: "center",
                    borderBottom: "2px solid white",
                }}
            >
                <div
                    style={{
                        backgroundColor: "white",
                        borderRadius: "50%",
                        height: 70,
                        width: 70,
                        marginTop: 15,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 18,
                        marginBottom: 10,
                    }}
                >
                    M.A
                </div>
                <span style={{ color: "white", marginBottom: 10 }}>Abdoulaye Mohamed Ahmed</span>
            </div>
            <div style={{ flex: 2, display: "flex", flexDirection: "column", alignItems: "center", marginTop: 18 }}>
                <Link to="/dashboard">
                    <Button style={{ width: 218, marginBottom: 10 }}><Icon name="home" />Dashboard</Button>
                </Link>
                <Link to="/utilisateurs">
                    <Button style={{ width: 218, marginBottom: 10 }}><Icon name="users" />Gestions des utilisateurs</Button>
                </Link>
                <Button style={{ width: 218, marginBottom: 10 }}><Icon name="mail" />Messageries</Button>
                <Button style={{ width: 218 }}><Icon name="setting" /> Configurations</Button>
            </div>
        </div>
    );
};
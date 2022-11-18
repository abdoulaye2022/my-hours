import React from "react";
import { Button, Icon } from "semantic-ui-react";
import { userActions } from "../../../redux/actions/users.actions";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const HeaderAppAdmin = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const redirectToLogin = () => {
        return navigate('/');
    }

    return (
        <div
            style={{
                display: "flex",
                backgroundColor: "#647295",
                height: 50,
                padding: "0px 5px",
                alignItems: "center",
                justifyContent: "end"
            }}
        >
            <div>
                <Button
                    color="red"
                    onClick={() =>
                        dispatch(userActions.logout(redirectToLogin))
                    }
                    style={{ fontWeight: "bold", marginRight: 10 }}
                >
                    <Icon name="sign out" /> Deconexion
                </Button>
            </div>
        </div>
    );
};

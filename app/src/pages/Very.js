import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { userActions } from "../../src/redux/actions/users.actions";

const Very = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const redirectToCreateAccount = () => {
        return navigate("/");
    }

    useEffect(() => {
        dispatch(userActions.verifyUserEmail(params.token, redirectToCreateAccount, redirectToCreateAccount))
    }, [dispatch, params.token])

    return (
        <div>
        </div>
    );
}

export default Very;
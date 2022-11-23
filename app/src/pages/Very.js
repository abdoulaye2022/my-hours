import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { userActions } from "../../src/redux/actions/users.actions";

const Very = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const redirectToCreateAccount = () => {
        return navigate("/accueil");
    }

    useEffect(() => {
        dispatch(userActions.verifyUserEmail(params.token, redirectToCreateAccount))
    }, [dispatch, params.token])

    return (
        <div>
        </div>
    );
}

export default Very;
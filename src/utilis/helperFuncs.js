import { useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";



export const ReDirectPage = () => {
    const { currentUser } = useContext(CurrentUserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (currentUser) {
            navigate("/create");
        }
    }, [currentUser, navigate]);

}

export const ReDirectPageNotUser = () => {

    const { currentUser } = useContext(CurrentUserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!currentUser) {
            navigate("/learn");
        }
    }, [currentUser, navigate]);

}
import React from "react";
import { Button, Icon } from 'semantic-ui-react';

export const Pagination = ({ nPages, currentPage, setCurrentPage }) => {
    const pageNumbers = [...Array(nPages + 1).keys()].slice(1)

    const nextPage = () => {
        if (currentPage !== nPages)
            setCurrentPage(currentPage + 1)
    }
    const prevPage = () => {
        if (currentPage !== 1)
            setCurrentPage(currentPage - 1)
    }

    return (
        <Button.Group>
            <Button onClick={() => prevPage()}><Icon name="arrow circle left" /></Button>
            {pageNumbers.map((p) => (
                <Button onClick={() => setCurrentPage(p)} style={{ backgroundColor: currentPage === p ? "rgba(34,36,38,.15)" : ""}}>{p}</Button>
            ))}
            <Button onClick={() => nextPage()}><Icon name="arrow circle right" /></Button>
        </Button.Group>
    );
}
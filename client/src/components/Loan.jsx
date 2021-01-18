import React, { Component } from 'react';
import { useParams } from "react-router-dom";

const Loan = ({ data }) => {
    const { loanId } = useParams();
    const loan = data.find(e => e.ObjectId === Number(loanId));
    let loanData;

    if (loan) {
        loanData = (
            <div>
                <h3> {loan.merchantId} </h3>
                <p> {loan.documents} </p>
            </div>
        );
    } else {
        loanData = <h2>Loan data not found </h2>;
    }

    return (
        <div>
        <div>{loanData}</div>
        </div>
    );

};

export default Loan;

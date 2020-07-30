import React from 'react';
import '../styles/Users.css';

function UserCard(props) {
    return (
        <div className="col-12 col-sm-4 col-md-2 col-lg-2" id="cardContent">
            <div className="cardHeader">
                <b> {props.user.accountId} </b>
            </div>
            <table className="cardBody">
                <tbody>
                    <tr>
                        <td className="cardText"><b>Age </b>:</td>
                        <td className="cardValue">{props.user.age}</td>
                    </tr>
                    <tr>
                        <td className="cardText"><b>First Name </b>: </td>
                        <td className="cardValue">{props.user.firstName}</td>
                    </tr>
                    <tr>
                        <td className="cardText"><b>Last Name </b>: </td>
                        <td className="cardValue">{props.user.lastName}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default UserCard;


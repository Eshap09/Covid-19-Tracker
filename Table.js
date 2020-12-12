import React from 'react';
import './Table.css';
//iss props wale country me saara data hai
//destructured
function Table({countries}) {
    return (
        <div className="table">
            {countries.map(({ country , cases})=>(
                <tr>
                    <td>{country}</td>
                    <td>
                        <strong>{cases}</strong>
                    </td>
                </tr>

            ))}
        </div>
    );
}

export default Table
//<tr> table row
//<td> table data
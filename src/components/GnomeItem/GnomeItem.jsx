import React from 'react';

const GnomeItem = ({ gnome, goToDetailPage }) =>{
    return (
        <tr>
            <td>{gnome.id}</td>
            <td>{gnome.name}</td>
            <td><img className="thumbnail" src={gnome.thumbnail} alt={gnome.name}/></td>
            <td>
                <a role="button" className="btn btn-success" onClick={()=> goToDetailPage(gnome.id) }>
                    <i className="fa fa-eye" data-toggle="tooltip" title="View details" ></i>
                </a>
            </td>
        </tr>
    );
}

export default GnomeItem;
import React, { Component } from 'react';
import '../styles/fentity.css'


class Fentity extends Component {
    render() {
        const match = this.props.match
        const name = match.params.name
        const fentity = this.props.fentities[match.params.fentities].filter(f => {
            return f.name.toLowerCase() === name.toLowerCase()
        })[0]

        return (
            <div id="creature-container">
                <h1>{fentity.name}</h1>
                <img src={fentity.imgUrl} alt=""/>
                <div className="title">Power:</div>
                <div className="power text"> {fentity.power}</div>
                <div className="other text">{fentity.other}</div>
            </div>
        )
    }
}

export default Fentity;

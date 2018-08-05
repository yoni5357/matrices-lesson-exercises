import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import '../styles/fentity-directory.css'

class Fentities extends Component {
    render() {
        const match = this.props.match
        const fentities = this.props.fentities[match.params.fentities]

        return (
            <div>
                <h1 id="fentities-title">{match.params.fentities}</h1>
                <div id="fentities-container">
                    {fentities.map(f => {
                        return (
                            <Link key={f.name} to={`${match.params.fentities}/${f.name}`}>
                                <div className="mini">
                                    <img className="directory-img" src={f.imgUrl} alt="" />
                                    <span>{f.name}</span>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>)
    }
}

export default Fentities
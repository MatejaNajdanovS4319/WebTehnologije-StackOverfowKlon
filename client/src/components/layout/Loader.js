import React from 'react'
import loaderImg from '../../style/img/loader2.gif'

const Loader = () => {
    return (
        <div className="loader-container">
            <div>
                <img src={loaderImg} alt="loader" />
            </div>
        </div>
    )
}

export default Loader

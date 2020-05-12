import React from "react";

const ButtonRectangle = (props) => {
    const { className } = props;
    return (
        <svg className={className} viewBox='0 0 150 50' xmlns='http://www.w3.org/2000/svg'>
            <rect x='0' y='0' fill='none' width='150' height='50'/>
        </svg>
    );
}

export default ButtonRectangle;
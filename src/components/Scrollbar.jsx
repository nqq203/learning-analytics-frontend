import React from "react";

const Scrollbar = ({ children, style }) => {
    return (
        <div className="scroll-view" style={style}>
            {children}
        </div>
    )
}

export default Scrollbar;
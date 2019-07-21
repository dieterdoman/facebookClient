import React from "react";

const RenderPostItems = (props) => {
    const data = props.data;
    return (
        <ul>
            {data && data.map((item, i) => (
                <li key={i}>
                    {item}
                </li>
            ))}
        </ul>
    );
};

export default RenderPostItems;
import React from 'react'

function DataPoint(props) {
    return (
        <div className={"data-point " + props.type}>
            <p>{props.type + ":"}</p>
            <p
                className={props.color ? props.color : ""}
            >
                {props.value ? props.value.substring(0, props.value.length - 2) : ""}
            </p>
        </div>
    )
}

export default DataPoint;
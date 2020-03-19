import React, { useEffect, useState } from 'react'
import Snapshot from './Snapshot'

type Props = {
    hash?: number,
}

const cameras = [
    {
        description: "AI701", 
        xaddr: "http://192.168.3.249:8080/onvif/device_service",
        username: "admin",
        password: "admin"
    },
    /*
    {
        description: "AI701", 
        xaddr: "http://192.168.3.249:8080/onvif/device_service",
        username: "admin",
        password: "admin"
    }
    */
]

const Layout: React.FC<Props> = (props) => {
    return (
        <div className="container bp3-dark">
            <div className="row">
                {cameras.map((v,i) => {
                    return (
                        <div className="col" key={i}>
                            <Snapshot hash={props.hash} camera={v} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default Layout
import React, { useEffect, useState } from 'react'
import Snapshot from './Snapshot'

type Props = {
    hash?: number,
}

const Layout: React.FC<Props> = (props) => {
    return (
        <div className="container bp3-dark">
            <div className="row">
                <div className="col">
                    <Snapshot hash={props.hash} />
                </div>
                <div className="col">
                    <Snapshot hash={props.hash} />
                </div>
                <div className="col">
                    <Snapshot hash={props.hash} />
                </div>
            </div>
        </div>
    )
}
export default Layout
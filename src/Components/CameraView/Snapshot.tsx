import React, { useEffect, useState } from 'react'
import { Card, Elevation, Dialog } from '@blueprintjs/core'

type Props = {
    hash?: number,
    camera?: any
}


const Snapshot: React.FC<Props> = (props) => {
    const [ picture, setPicture ] = useState("")
    const [ isOpen, setIsOpen ] = useState(false)
    
    const getSnapshot = () => {
        const method = "POST"
        const body = JSON.stringify({
            xaddr: props.camera["xaddr"],
            username: props.camera["username"],
            password: props.camera["password"]
        })

        fetch("http://localhost:3999/snapshot", {method, headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }, body})
        .then(res => res.blob())
        .then(images => {
            setPicture(URL.createObjectURL(images))
        })
      }

    useEffect(() => {
        getSnapshot()
    }, [props.hash])

    return (
        <React.Fragment>
            <Card interactive={true} elevation={Elevation.TWO} style={{padding: '10px', textAlign: 'center'}} onClick={() => setIsOpen(true)}>
                <img className="snapshot snapshot-box" src={picture} />
                <div style={{'textAlign': 'center'}}>{props.camera["description"]}</div>
            </Card>
            {isOpen ? 
            <Dialog isOpen={isOpen} onClose={() => setIsOpen(false)} style={{width: '90%', textAlign: 'center'}}>
                <img className="snapshot" src={picture} />
            </Dialog> : null}
        </React.Fragment>
    )
}

export default Snapshot
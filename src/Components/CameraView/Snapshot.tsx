import React, { useEffect, useState } from 'react'
import { Card, Elevation, Dialog } from '@blueprintjs/core'

type Props = {
    hash?: number
}

const Snapshot: React.FC<Props> = (props) => {
    const [ picture, setPicture ] = useState("")
    const [ isOpen, setIsOpen ] = useState(false)
    
    const getSnapshot = () => {
        fetch("http://localhost:3999/snapshot")
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
            <Card interactive={true} elevation={Elevation.TWO} style={{padding: '10px'}} onClick={() => setIsOpen(true)}>
                <img className="snapshot" src={picture} />
            </Card>
            {isOpen ? 
            <Dialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <img className="snapshot" src={picture} />
            </Dialog> : null}
        </React.Fragment>
    )
}

export default Snapshot
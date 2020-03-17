import React from 'react'
import { Navbar, Button, Alignment } from '@blueprintjs/core'

const NavigationBar = (props:any) => {
    return (
        <Navbar>
            <Navbar.Group align={Alignment.LEFT}>
                <Navbar.Heading>Camera</Navbar.Heading>
                <Navbar.Divider />
            </Navbar.Group>
            <Navbar.Group align={Alignment.RIGHT}>
                <Button className="bp3-minimal" icon="refresh" text="Refresh" onClick={() => props.actions.handleRefresh()} />
            </Navbar.Group>
        </Navbar>
    )
}

export default NavigationBar
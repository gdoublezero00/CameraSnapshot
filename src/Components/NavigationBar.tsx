import React, { useState } from 'react'
import { Navbar, Button, Alignment } from '@blueprintjs/core'
import { Select } from '@blueprintjs/select'

const NavigationBar = (props:any) => {

    const handleChangeInterval = (e:any) => {
        props.actions.handleSetInterval(e.target.value)
    }
    
    return (
        <Navbar>
            <Navbar.Group align={Alignment.LEFT}>
                <Navbar.Heading>Camera</Navbar.Heading>
                <Navbar.Divider />
            </Navbar.Group>
            <Navbar.Group align={Alignment.RIGHT}>
                <select onChange={(e) => handleChangeInterval(e)} value={props.values.interval}>
                    <option value="0">NoUpdate</option>
                    <option value="1">1 min</option>
                    <option value="3">3 min</option>
                    <option value="5">5 min</option>
                    <option value="10">10 min</option>
                    <option value="15">15 min</option>
                    <option value="30">30 min</option>
                    <option value="60">60 min</option>
                </select>

                <Button className="bp3-minimal" icon="refresh" onClick={() => props.actions.handleRefresh()} />
            </Navbar.Group>
        </Navbar>
    )
}

export default NavigationBar
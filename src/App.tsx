import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, BrowserRouter } from 'react-router-dom';
import NavigationBar from './Components/NavigationBar';
import { default as CameraView } from './Components/CameraView/Layout'
import { response } from 'express';
const Cam = require('onvif').Cam

const App: React.FC = () => {
  const [ hash, setHash ] = useState((new Date()).getTime())

  const handleRefresh = () => {
    setHash((new Date()).getTime())
  }

  useEffect(() => {
  }, [])

  return (
    <BrowserRouter>
      <div className="bp3-dark full-height">
        <NavigationBar actions={{
          handleRefresh: handleRefresh
        }} />
        <Switch>
          <Route exact path="/">
            <CameraView hash={hash}/>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;

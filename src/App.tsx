import React, { useEffect, useState } from 'react';
import { HashRouter, Route } from 'react-router-dom';
import NavigationBar from './Components/NavigationBar';
import { default as CameraView } from './Components/CameraView/Layout'

const App: React.FC = () => {
  const [ hash, setHash ] = useState((new Date()).getTime())
  const [ interval, setInterval ] = useState("0")

  const handleSetInterval = (changedInterval:string) => {
    setInterval(changedInterval)
    if (parseInt(changedInterval) != 0) {
      handleScheduleRefresh(changedInterval)
    }
  }

  const handleRefresh = () => {
    setHash((new Date()).getTime())
  }

  const handleScheduleRefresh = (changedInterval:any) => {
    handleRefresh()
    let times = changedInterval != -1 ? changedInterval : parseInt(interval)
    if (times > 0) {
      setTimeout(handleScheduleRefresh, parseInt(times) * 60 * 1000)
    }
  }

  useEffect(() => {
  }, [])

  return (
    <HashRouter>
      <div className="bp3-dark full-height">
        <NavigationBar values={{
          interval: interval
        }}
        actions={{
          handleSetInterval: handleSetInterval,
          handleRefresh: handleRefresh
        }} />
        <Route exact path="/">
          <CameraView hash={hash}/>
        </Route>
      </div>
    </HashRouter>
  );
}

export default App;

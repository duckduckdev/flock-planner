import {Tab, Tabs, TabList, TabPanel} from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import React from 'react'
import Login from './login'
import Signup from './signup'

class LoginSignupTabs extends React.Component {
  render() {
    return (
      <Tabs className="tabContainer">
        <TabList>
          <Tab tabfor="login">Login</Tab>
          <Tab tabfor="signup">Signup</Tab>
        </TabList>

        <TabPanel tabId="login">
          <Login />
        </TabPanel>
        <TabPanel tabId="signup">
          <Signup />
        </TabPanel>
      </Tabs>
    )
  }
}

export default LoginSignupTabs

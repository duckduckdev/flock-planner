import React from 'react'
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import Map from './map/map'
import Visual from './visual'

const MapVisualTabs = () => (
  <Tabs>
    <TabList>
      <Tab>Preference Breakdown</Tab>
      <Tab>Interactive Map</Tab>
    </TabList>

    <TabPanel>
      <Visual />
    </TabPanel>
    <TabPanel>
      <Map />
    </TabPanel>
  </Tabs>
)

export default MapVisualTabs

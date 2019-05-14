import React from 'react'
import {Tabs, Tab, TabPanel, TabList} from 'react-web-tabs'
import Map from './map/map'
import Visual from './visual'
import 'react-web-tabs/dist/react-web-tabs.css'

class MapVisualTabs extends React.Component {
  render() {
    return (
      <Tabs defaultTab="preferences">
        <TabList>
          <Tab tabFor="preferences">Preference Breakdown</Tab>
          <Tab tabFor="map">Interactive Map</Tab>
        </TabList>
        <TabPanel tabId="preferences">
          <Visual trip={this.props.match.params.tripId} />
        </TabPanel>
        <TabPanel tabId="map">
          <Map trip={this.props.match.params.tripId} />
        </TabPanel>
      </Tabs>
    )
  }
}

export default MapVisualTabs

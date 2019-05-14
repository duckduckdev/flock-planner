import {Tab, Tabs, TabList, TabPanel} from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import React from 'react'
import Visual from './visual'
import Map from './map/map'

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

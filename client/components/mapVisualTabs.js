import React from 'react'
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import Map from './map/map'
import Visual from './visual'

class MapVisualTabs extends React.Component {
  render() {
    return (
      <Tabs>
        <TabList>
          <Tab>Preference Breakdown</Tab>
          <Tab>Interactive Map</Tab>
        </TabList>

        <TabPanel>
          <Visual trip={this.props.match.params.tripId} />
        </TabPanel>
        <TabPanel>
          <Map />
        </TabPanel>
      </Tabs>
    )
  }
}

export default MapVisualTabs

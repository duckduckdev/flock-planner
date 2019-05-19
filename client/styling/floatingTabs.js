import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'

function TabContainer(props) {
  return (
    <Typography component="div" style={{padding: 8 * 3}}>
      {props.children}
    </Typography>
  )
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
}

const styles = theme => ({
  root: {
    // flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
})

class SimpleTabs extends React.Component {
  state = {
    value: 0
  }

  handleChange = (event, value) => {
    this.setState({value})
  }

  render() {
    const {classes} = this.props
    const {value} = this.state

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs fullWidth={true} value={value} onChange={this.handleChange}>
            <Tab label="Destinations" />
            <Tab label="Dates" />
            <Tab label="Budget" />
            <Tab label="Map" />
          </Tabs>
        </AppBar>
        {value === 0 && <TabContainer>Item One</TabContainer>}
        {value === 1 && <TabContainer>Item Two</TabContainer>}
        {value === 2 && <TabContainer>Item Three</TabContainer>}
        {value === 3 && <TabContainer>Item Three</TabContainer>}
      </div>
    )
  }
}

SimpleTabs.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SimpleTabs)

// import Tab from 'react-bootstrap/Tab'
// import Nav from 'react-bootstrap/Nav'
// import Row from 'react-bootstrap/Row'
// import Col from 'react-bootstrap/Col'
// import Map from '../components/map/map'
// import Visual from '../components/visual'

// const tabs = () => {
//   return (
//     <Tab.Container id="left-tabs-example" defaultActiveKey="first">
//       <Row>
//         <Col sm={3}>
//           <Nav variant="pills" className="flex-column">
//             <Nav.Item>
//               <Nav.Link eventKey="first">Tab 1</Nav.Link>
//             </Nav.Item>
//             <Nav.Item>
//               <Nav.Link eventKey="second">Tab 2</Nav.Link>
//             </Nav.Item>
//           </Nav>
//         </Col>
//         <Col sm={9}>
//           <Tab.Content>
//             <Tab.Pane eventKey="first" />
//             <Visual />
//             <Tab.Pane eventKey="second" />
//           </Tab.Content>
//         </Col>
//       </Row>
//     </Tab.Container>
//   )
// }

// export default tabs

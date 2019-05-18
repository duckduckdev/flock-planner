import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Button from '@material-ui/core/Button'
import {withStyles} from '@material-ui/core/styles'
import DeleteIcon from '@material-ui/icons/Delete'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice'
import Icon from '@material-ui/core/Icon'
import SaveIcon from '@material-ui/icons/Save'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  iconSmall: {
    fontSize: 20
  }
})

function IconLabelButtons(props) {
  const {classes} = props
  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        size="large"
        className={classes.button}
      >
        Send
        {/* This Button uses a Font Icon, see the installation instructions in the docs. */}
        <Icon className={classes.rightIcon}>send</Icon>
      </Button>
    </div>
  )
}

IconLabelButtons.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(IconLabelButtons)

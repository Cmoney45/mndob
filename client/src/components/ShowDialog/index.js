import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';

class ShowDialog extends Component {

  render() {
    const show = this.props.result;
    const actions = [
      <Button label="Close" primary={true} onClick={this.handleClose} />
    ]

    return (
      <Dialog
        actions={actions}
        //modal={false}
        open={this.state.open}
        onClose={this.handleClose}
      ><div>
          {this.state.currentResult ? (
            <Card className="showModal">
              <CardHeader
                title={this.state.currentResult.show.name}
              />
            </Card>
          ) : (null)
          }
        </div>
      </Dialog>
    )
  }
}

export default ShowDialog;
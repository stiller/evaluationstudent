import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import Card, {CardActions, CardContent} from 'material-ui/Card';
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
//import CreateIcon from '@material-ui/icons/Create'
//import InfoOutlineIcon from '@material-ui/icons/InfoOutlineIcon'
import './batches.css'
import { getBatches } from '../../actions/batches'
import {Link} from 'react-router-dom'

class BatchesList extends PureComponent {

    componentWillMount() {
         this.props.getBatches();
        }
  

renderBatch = (batch) => {

    return (<Card key={batch.id} className="batch-card">
      <CardContent>
          <Typography variant="headline" component="h2">
            # BATCH{batch.batchNumber}
          </Typography>
          <Typography component="p">
            Start date: {batch.startDate}<br />
            End date: {batch.endDate}
          </Typography>
      </CardContent>
        <CardActions>
            <Link to={`/batches/edit/${batch.id}`}>
            <Button
                size="small"
                color="secondary"
                variant="raised"
                > 
                    EDIT BATCH INFO
            </Button> 
            </Link>
            <Link to={`/batches/${batch.id}/students`} >
            <Button
                size="small"
                color="secondary"
                variant="raised"
            >
                 TO BATCH
            </Button>
            </Link>
        </CardActions>
    </Card>
    )}

    render() {
        const {batches} = this.props

        return(
            <div>
                {batches.map(batch => this.renderBatch(batch))}
            </div>
            
        )
    }
}

const mapStateToProps = function (state) {
	return {
        batches: state.batches,
	}
}

export default connect(mapStateToProps, {getBatches})(BatchesList)
import { makeStyles } from '@material-ui/styles';
import Color from 'config/Color';

const { Border } = Color

export default makeStyles(theme => {
    return ({
        drawer: {
            width: 250,
            // boxShadow: '0 1px 4px 0 rgba(0,0,0,.15)',
            borderLeft: `1px solid ${Border.gray}`,
        },
        root: {
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
        }
    })
})
import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

const styles = {
    uploadButton : {
        width: '305px',
        height: '70px',
        marginTop: '525px',
        marginBottom: '15px',
        background: '#F7B633',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        borderRadius: '10px',
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: '22px',
        lineHeight: '33px',
        color: '#FFFFFF'
    }
}

class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = { 

         };
    }
    render() {
        return (
            <React.Fragment>
            <CssBaseline />
            <Container component="div" style={{ position: 'absolute',width: '384px',marginLeft: '0px',marginTop: '0px',background: '#070D59' }}>
                <img src={require('../../src/resources/logo_sm_white.png')} style={{width: '208px',height: '37px',marginTop: '70px'}}></img>
                <Button style={styles.uploadButton}>
        Upload files
      </Button>
            </Container>
          </React.Fragment>
        );
    }
}

export default Layout;
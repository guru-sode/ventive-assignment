import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

const styles = {
    uploadButton: {
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
    },
    image: {
        width: '208px',
        height: '37px',
        marginTop: '70px'
    },
    container: {
        position: 'absolute',
        width: '384px',
        marginLeft: '0px',
        marginTop: '0px',
        background: '#070D59'
    }
}

class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            documents: []
        };
        this.handleUpload = this.handleUpload.bind(this);
        this.getBase64 = this.getBase64.bind(this);
    }

    getBase64(file) {
        const self = this;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            const newDoc = { name: file.name, data: reader.result}
          self.setState({
              documents: self.state.documents.concat(newDoc)
          })
        };
        reader.onerror = function (error) {
          console.log('Error: ', error);
        };
     }

     handleUpload(file){
         this.getBase64(file)
        console.log(file.name);
     }
     
    render() {
        console.log(this.state.documents)
        return (
            <React.Fragment>
                <CssBaseline />
                <Container component="div" style={styles.container}>
                    <img src={require('../../src/resources/logo_sm_white.png')} style={styles.image}></img>
                    <input
                        accept="application/pdf"
                        style={{ display: 'none' }}
                        id="raised-button-file"
                        type="file"
                        onChange={ (e) => this.handleUpload(e.target.files[0]) }
                    />
                    <label htmlFor="raised-button-file">
                    <Button variant="raised" component="span" style={styles.uploadButton}>
                        <i class="fa fa-cloud-upload" aria-hidden="true"> Upload files </i>
                    </Button>
                    </label>
                </Container>
            </React.Fragment>
        );
    }
}

export default Layout;
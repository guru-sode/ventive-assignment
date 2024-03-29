import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import $ from 'jquery';

const styles = {
    uploadButton: {
        width: '100%',
        height: '10%',
        marginTop: '625px',
        marginLeft: '40px',
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
    leftPanel: {
        position: 'absolute',
        width: '384px',
        height: '100vh',
        marginLeft: '0px',
        marginTop: '0px',
        background: '#070D59',
        overflow: 'scroll'
    },
    rightPanel: {
        position: 'absolute',
        marginTop: '50px',
        width: '634px',
        height: '650px',
        marginLeft: '463.16px',
        background: '#FFFFFF',
        border: '10px solid #FF0000',
        boxSizing: 'border-box',
        overflow: 'scroll'
    },
    list: {
        height: '82px',
        width: '344px',
        overflow: 'hidden',
        background: '#5893D4',
        opacity: '0.2',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        borderRadius: '15px',
    },
    listText: {
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: '22px',
        lineHeight: '31px',
        color: '#FFFFFF'
    },
    header: {
        // position: 'absolute',
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: '36px',
        lineHeight: '54px',
        display: 'flex',
        alignItems: 'center',
        color: '#2D1F3F',
        width: '757px',
        height: '41px',
        marginLeft: '529px',
        marginTop: '10px',
        overflow: 'hidden'
    },
    grid: {
        background: '#000000',
        opacity: '0.8'
    }
}

class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            documents: [],
            selectedDoc: ''
        };
        this.handleUpload = this.handleUpload.bind(this);
        this.getBase64 = this.getBase64.bind(this);
        this.renderDocuments = this.renderDocuments.bind(this);
        this.handleListClick = this.handleListClick.bind(this);
    }

    getBase64(file) {
        if(file){
            const self = this;
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                const newDoc = { name: file.name, data: reader.result }
                self.decodeBase64(reader.result)
                self.setState({
                    documents: self.state.documents.concat(newDoc)
                })
            };
            reader.onerror = function (error) {
                console.log('Error: ', error);
            };
        }
    }

    handleUpload(file) {
        this.getBase64(file)
    }

    decodeBase64(b64) {
        b64 = b64.replace(/^[^,]+,/, '');
        b64 = b64.replace(/\s/g, '');
        if(document.getElementsByName('object')){
            $("object").remove(); 
        }
        var obj = document.createElement('object');
        obj.style.width = '100%';
        obj.style.height = '100%';
        obj.type = 'application/pdf';
        obj.data = 'data:application/pdf;base64,' + b64;
        document.getElementById('pdf').appendChild(obj);
    }

    handleListClick(document){
        this.setState({
            selectedDoc: document.name
        })
        this.decodeBase64(document.data)
    }

    renderDocuments(){
        const items = this.state.documents.map((document)=>{
                return(
                <List component="nav" aria-label="Main mailbox folders">
                <ListItem button style={styles.list} onClick={()=>this.handleListClick(document)}>
                  <Typography style={styles.listText}> {document.name} </Typography>
                </ListItem>
              </List>)
            })
        return items;
    }

    render() {
        return (
            <Grid container spacing={3}>
                <CssBaseline />
                <Grid item xs={5} style={styles.leftPanel}>
                    <img src={require('../../src/resources/logo_sm_white.png')} style={styles.image}></img>
                    <input
                        accept="application/pdf"
                        style={{ display: 'none' }}
                        id="raised-button-file"
                        type="file"
                        onChange={(e) => this.handleUpload(e.target.files[0])}
                    />
                    {this.renderDocuments()}
                    </Grid>
                    <Grid>
                    <label htmlFor="raised-button-file">
                        <Button variant="raised" component="span" style={styles.uploadButton}>
                            <i className="fa fa-cloud-upload" aria-hidden="true"> Upload files </i>
                        </Button>
                    </label>
                </Grid>
                <Grid item xs={7} id="pdf" style={styles.rightPanel}>
                </Grid>
            </Grid>
        );
    }
}

export default Layout;
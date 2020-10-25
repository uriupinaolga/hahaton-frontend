import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Header from "./Components/Header";
import UploadedImage from "./Components/UploadedImage";
import ImageData from "./Components/ImageData";
import {UploadManager} from "./UploadManager";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: '#f8f9fe',
        fontFamily: 'Roboto',
    },
    paper: {
        zIndex: 1,
        position: "relative",
    },
}));

function App() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <UploadManager>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Header/>
                    </Grid>
                    <Grid item xs={12} sm={7} className={classes.paper}>
                        <UploadedImage/>
                    </Grid>
                    <Grid item xs={12} sm={5} className={classes.paper}>
                        <ImageData/>
                    </Grid>
                    <Grid item xs={12} sm={12} className={classes.paper}>
                        <div style={{color: '#292929', fontWeight: 600, padding: 10, paddingLeft: 30}}>2020 Gu-est</div>
                    </Grid>
                </Grid>
            </UploadManager>
        </div>
    );
}

export default App;

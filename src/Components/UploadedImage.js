import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {useUpload} from "../UploadManager";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: '-75px 10px 0 50px',
        backgroundColor: '#fff',
        borderRadius: 'calc(.375rem - 1px)',
        position: 'relative',
    },
    image: {
        borderRadius: 'calc(.375rem - 1px)',
    },
    spinner: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#1f215250',
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
    },
}));

export default (props) => {
    const manager = useUpload();
    const classes = useStyles();

    return (<div className={classes.root}>
        <img src={manager.image} alt="" width="100%" className={classes.image}/>
        {manager.loading && <div className={classes.spinner}><CircularProgress /></div>}
    </div>)
}

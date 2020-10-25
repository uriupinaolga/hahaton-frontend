import React, {useCallback, useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {useDropzone} from 'react-dropzone'
import CircularProgress from "@material-ui/core/CircularProgress";
import * as axios from "axios";
import to from 'await-to-js';
import {useUpload} from "../UploadManager";

const useStyles = makeStyles((theme) => ({
    background: {
        width: "100vw",
        minHeight: 500,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        backgroundImage: 'url(./images/profile-cover.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
    },
    mask: {
        opacity: .9,
        background: 'linear-gradient(87deg, #172b4d 0, #1a174d 100%) !important',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        minHeight: 500,
    },
    container: {
        minHeight: 500,
        position: 'relative',
        display: "flex",
        flexDirection: 'row',
        margin: '0 50px',
    },
    col: {
        display: "flex",
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: "flex-start",
        flex: 1,
    },
    title: {
        fontSize: '2.75rem',
        color: '#fff',
        fontWeight: 600,
        lineHeight: 1.5,
        margin: 0,
    },
    text: {
        fontSize: '1rem',
        fontWeight: 300,
        lineHeight: 1.7,
        color: '#fff',
        margin: '10px 0 30px 0',
    },
    dragzoneContainer: {
        width: 500,
        height: 300,
        background: '#ffffff20',
        display: 'flex',
        alignSelf: "flex-end",
        justifyContent: 'center',
        alignItems: 'center',
    },
    dragzone: {
        width: 500,
        height: 300,
        background: '#ffffff20',
        display: 'flex',
        alignSelf: "flex-end",
        justifyContent: 'center',
        alignItems: 'center',
        border: '2px dashed #1b2759',
        color: '#fff',
        fontSize: '1rem',
    },
}));

function MyDropzone() {
    const manager = useUpload();

    const classes = useStyles();

    const onDrop = useCallback(acceptedFiles => {
        manager.upload(acceptedFiles);
    }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    return (
        <div className={classes.dragzoneContainer}>
            {manager.loading
                ? <CircularProgress/>
                :
                (
                    <div className={classes.dragzone} {...getRootProps()}>
                        <input {...getInputProps()} />
                        {
                            isDragActive ?
                                <p>Брось меня сюда</p> :
                                <p>Перетащите фото или кликните по старинке</p>
                        }
                    </div>
                )
            }
        </div>
    )
}

export default () => {
    const classes = useStyles();
    return (
        <div>
            <div className={classes.background}>
                <span className={classes.mask}></span>
            </div>

            <div className={classes.container}>
                <div className={classes.col}>
                    <h1 className={classes.title}>Оценка качества ремонта квартиры по цветам</h1>
                    <p className={classes.text}>Мы оцениваем тип ремонта квартиры с помощью анализа ее цветовой палитры.
                        А еще подскажем вам основные
                        и акцентные цвета в дизайне интерьера.</p>
                </div>

                <div className={classes.col}>
                    <MyDropzone/>
                </div>
            </div>
        </div>
    );
};

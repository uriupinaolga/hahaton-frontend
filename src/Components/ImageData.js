import React, {useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {useUpload} from "../UploadManager";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TablePagination from "@material-ui/core/TablePagination";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import withStyles from "@material-ui/core/styles/withStyles";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: '-75px 50px 0 0',
        backgroundColor: '#fff',
        borderRadius: 'calc(.375rem - 1px)',
    },
    header: {
        fontSize: '1.0625rem',
        borderBottom: '1px solid rgba(0, 0, 0, .05)',
        padding: '1.25rem 1.5rem',
        color: '#32325d',
        fontWeight: 600,
        lineHeight: 1.5,
    },
    title: {
        color: '#8898aa',
        fontWeight: 600,
        marginBottom: 10,
    },
    titleWin: {
        color: '#32325d',
        fontWeight: 600,
        fontSize: '1.7rem',
        marginBottom: 10,
    },
    containerData: {
        borderBottom: '1px solid rgba(0, 0, 0, .05)',
        padding: '1.25rem 1.5rem',
    },
    containerDominant: {
        borderBottom: '1px solid rgba(0, 0, 0, .05)',
        padding: '1.25rem 1.5rem',

    },
    containerPalette: {
        padding: '1.25rem 1.5rem',

    },
    nameColor: {
        fontSize: '.8125rem',
        color: '#525f7f',
        fontWeight: 600,
    },
}));

const BorderLinearProgressCosmetic = withStyles((theme) => ({
    root: {
        height: 3,
    },
    colorPrimary: {
        backgroundColor: '#e9ecef',
    },
    bar: {
        backgroundColor: '#f5365c',
    },
}))(LinearProgress);

const BorderLinearProgressWithout = withStyles((theme) => ({
    root: {
        height: 3,
    },
    colorPrimary: {
        backgroundColor: '#e9ecef',
    },
    bar: {
        backgroundColor: '#2dce89',
    },
}))(LinearProgress);

const BorderLinearProgressLuxury = withStyles((theme) => ({
    root: {
        height: 3,
    },
    colorPrimary: {
        backgroundColor: '#e9ecef',
    },
    bar: {
        backgroundColor: '#5e72e4',
    },
}))(LinearProgress);

const BorderLinearProgressStandard = withStyles((theme) => ({
    root: {
        height: 3,
    },
    colorPrimary: {
        backgroundColor: '#e9ecef',
    },
    bar: {
        backgroundColor: '#11cdef',
    },
}))(LinearProgress);

function LinearProgressWithLabel(props) {
    return (
        <Box display="flex" alignItems="center">
            <Box minWidth={35}>
                <Typography variant="body2" color="#525f7f">{`${Math.round(
                    props.value,
                )}%`}</Typography>
            </Box>

            <Box width="100%" mr={1}>
                {props.name === 'Требуется косметический ремонт' && <BorderLinearProgressCosmetic variant="determinate" {...props} />}
                {props.name === 'Без отделки' && <BorderLinearProgressWithout variant="determinate" {...props} />}
                {props.name === 'Люкс' && <BorderLinearProgressLuxury variant="determinate" {...props} />}
                {props.name === 'Стандартный ремонт' && <BorderLinearProgressStandard variant="determinate" {...props} />}
            </Box>
        </Box>
    );
}

const columnsData = [
    { id: 'name', label: 'ТИП РЕМОНТА', minWidth: 170 },
    { id: 'chance', label: 'ВЕРОЯТНОСТЬ', minWidth: 100 },
];

const columnsDominant = [
    { id: 'name', label: 'НАЗВАНИЕ ЦВЕТА', minWidth: 170 },
    { id: 'color', label: 'ИЗОБРАЖЕНИЕ', minWidth: 100 },
];

const columnsPalette = [
    { id: 'name', label: 'НАЗВАНИЕ ЦВЕТА', minWidth: 170 },
    { id: 'color', label: 'ИЗОБРАЖЕНИЕ', minWidth: 100 },
];

const CircleColor = ({value}) => {
    return <div style={{display: 'inline-block', backgroundColor: value, borderRadius: '50%', width: '3rem', height: '3rem'}}></div>
}

export default () => {
    const manager = useUpload();
    const [rowData, setRowData] = useState([
        {name: 'Требуется косметический ремонт', chance: 0},
        {name: 'Без отделки', chance: 0},
        {name: 'Люкс', chance: 0},
        {name: 'Стандартный ремонт', chance: 0},
    ]);

    const [rowDominant, setRowDominant] = useState([{name: 'GREY', color: '#AAA'}]);
    const [rowPalette, setRowPalette] = useState([{name: 'GREY', color: '#AAA'}]);

    const classes = useStyles();

    useEffect(() => {
        const floor = (a) => Math.floor(a * 100)
        setRowData([
            {name: 'Требуется косметический ремонт', chance: floor(manager.response?.cosmetic || 0)},
            {name: 'Без отделки', chance: floor(manager.response?.without || 0)},
            {name: 'Люкс', chance: floor(manager.response?.luxury || 0)},
            {name: 'Стандартный ремонт', chance: floor(manager.response?.standard || 0)},
        ]);

        setRowDominant(manager.response?.dominant && [manager.response?.dominant] || [{name: 'GREY', color: '#AAA'}]);

        setRowPalette(manager.response?.palette || [{name: 'GREY', color: '#AAA'}]);

    }, [manager.response]);

    return (<div className={classes.root}>
        <div className={classes.header}>Оценка качества ремонта</div>

        <div className={classes.containerData}>
            <div className={classes.titleWin}>{manager.response?.win?.toUpperCase()}</div>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columnsData.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rowData.map((row) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.name}>
                                    {columnsData.map((column) => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                                {typeof value === 'number' ? <LinearProgressWithLabel value={value} name={row.name} /> : <div className={classes.nameColor}>{value}</div>}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>

        <div className={classes.containerDominant}>
            <div className={classes.title}>ДОМИНИРУЮЩИЙ ЦВЕТ</div>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columnsDominant.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rowDominant.map((row) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.name}>
                                    {columnsDominant.map((column) => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                                {column.id === 'color' ? <CircleColor value={value} /> : <div className={classes.nameColor}>{value.toUpperCase()}</div>}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>

        <div className={classes.containerPalette}>
            <div className={classes.title}>ДОПОЛНИТЕЛЬНЫЕ ЦВЕТА</div>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columnsPalette.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rowPalette.map((row) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.name}>
                                    {columnsPalette.map((column) => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                                {column.id === 'color' ? <CircleColor value={value} /> : <div className={classes.nameColor}>{value.toUpperCase()}</div>}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    </div>)
}

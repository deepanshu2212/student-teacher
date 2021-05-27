import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, Grid, List, ListItem, ListItemSecondaryAction, ListItemText, ListSubheader, makeStyles, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";

const useStyles = makeStyles((theme) => ({
    head: {
        fontWeight: '700'
    },
    panel: {
        padding: '2%'
    },
    search: {
        width: '100%'
    },
    formCtrl: {
        width: '100%',
        marginLeft: '0px'
    },
    label: {
        fontWeight: 'bold',
        width: '50%'
    },
    input: {
        width: '50%'
    },
    dateInput: {
        width: '70%'
    },
    dateLabel: {
        width: '30%'
    },
    table: {
        marginTop: '5vh',
        maxHeight: '60vh'
    },
    dialogTitle: {
        backgroundColor: theme.palette.primary.main
    },
    doj: {
        display: 'flex',
        justifyContent: 'flex-end',
        paddingTop: '0.5rem',
        fontWeight: 'bold'
    },
    btnSpace:{
        marginLeft: '4%'
    }
}))
const Teacher = () => {

    const classes = useStyles();
    const [teacherData, setTeacherData] = useState([]);
    const [teacherDataForFilter, setTeacherDataForFilter] = useState([]);
    const [searchName, setSearchName] = useState('');
    const [openPopup, setOpenPopup] = useState(false);
    const [selectedTeacher, setSelectedTeacher] = useState('');
    const [classData, setClassData] = useState([]);
    const [updatedData, setUpdatedData] = useState([]);
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');

    const handleClose = () => {
        setOpenPopup(false);
        setSelectedTeacher('');
    }

    const handleOpen = (name) => {
        const isLogIn = JSON.parse(localStorage.getItem('isLoggedIn'));
        if (!isLogIn) {
            return
        }
        setOpenPopup(true);
        setSelectedTeacher(name);
    }

    const getTeacherData = () => {
        axios.get("http://localhost:3005/teacherData")
            .then((result) => {
                if (result.data) {
                    setTeacherData(result.data);
                    setTeacherDataForFilter(result.data);
                }
            })
    }

    useEffect(() => {
        getTeacherData();
    }, []);

    useEffect(() => {
        axios.get("http://localhost:3005/classData")
            .then((result) => {
                if (result.data) {
                    setClassData(result.data);
                }
            })
    }, [])

    const onSearch = (value) => {
        setSearchName(value);
    }

    const onSelectSubject = (isChecked, section, subject) => {
        var subjectData = [...classData];
        let classIndex;
        var secArr = subjectData.filter((data, i) => {
            if (data.class === section) {
                classIndex = i;
                return data;
            } else {
                return null;
            }
        });

        let ind = secArr[0][subject].indexOf(selectedTeacher);
        if (isChecked && ind === -1) {
            subjectData[classIndex][subject].push(selectedTeacher);
        } else if (ind !== -1 && !isChecked) {
            subjectData[classIndex][subject].splice(ind, 1);
        }
        // console.log(subjectData);
        setUpdatedData(subjectData);
    }

    const getDateFormat = (value) => {
        const dateValue = new Date(value);
        const day = dateValue.toLocaleString('default', { day: '2-digit' });
        const month = dateValue.toLocaleString('default', { month: '2-digit' });
        const year = dateValue.toLocaleString('default', { year: 'numeric' });
        return `${year}-${month}-${day}`;
    }

    const onChangeDate = (value, field) => {
        if (field === 'fromDate') {
            setFromDate(value);
        } else if (field === 'toDate') {
            setToDate(value);
        }
    }

    const onSearchByDate = () => {
        if (fromDate && toDate) {
            let dateOne = Date.parse(fromDate);
            let dateTwo = Date.parse(toDate);
            var tempdata = [...teacherData];
            var data = tempdata.filter((value) => {
                return (Date.parse(value.doj) >= dateOne && Date.parse(value.doj) <= dateTwo) ? value : null
            });

            setTeacherData(data);
        }
    }

    const onReset = () => {
        setSearchName('');
        setFromDate('');
        setToDate('');
        getTeacherData();
    }

    const onSaveAssign = () => {
        handleClose();
        let url = "http://localhost:3005/classData/";
        axios.put(url + 1, updatedData[0])
            .then((result) => {
                axios.put(url + 2, updatedData[1])
                    .then((result) => {
                        axios.put(url + 3, updatedData[2])
                            .then((result) => {
                                axios.put(url + 4, updatedData[3])
                                    .then((result) => {
                                        alert("Subject Assign Successfully!!!");
                                    })
                            })
                    })
            })
    }

    return (
        <>
            <Paper elevation={2} className={classes.panel}>
                <Grid container direction="row">
                    <Grid item xs={3}>
                        <FormControlLabel label="Search Name:" className={classes.formCtrl} classes={{ label: classes.label }} labelPlacement="start" control={
                            <TextField variant="outlined" size="small" className={classes.input} value={searchName} placeholder="Enter Here..." onChange={(e) => onSearch(e.target.value)} />
                        } />
                    </Grid>
                    <Grid item xs={9}>
                        <Grid container direction="row">
                            <Grid item xs={2} className={classes.doj}>Date Of Joining :</Grid>
                            <Grid item xs={3}>
                                <FormControlLabel label="From" labelPlacement="start" className={classes.formCtrl} classes={{ label: classes.dateLabel }} control={
                                    <TextField type="date" value={fromDate} onChange={(e) => onChangeDate(e.target.value, 'fromDate')} className={classes.dateInput} variant="outlined" size="small" />
                                } />
                            </Grid>
                            <Grid item xs={3}>
                                <FormControlLabel label="To" labelPlacement="start" className={classes.formCtrl} classes={{ label: classes.dateLabel }} control={
                                    <TextField type="date" value={toDate} onChange={(e) => onChangeDate(e.target.value, 'toDate')} className={classes.dateInput} variant="outlined" size="small" />
                                } />
                            </Grid>
                            <Grid item xs={3}>
                                <Button color="primary" variant="contained" size="small" onClick={onSearchByDate}>Search</Button>
                                <Button className={classes.btnSpace} color="secondary" variant="outlined" size="small" onClick={onReset}>Reset</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                {teacherData &&
                    <TableContainer className={classes.table}>
                        <Table size="small" >
                            <TableHead>
                                <TableRow>
                                    <TableCell classes={{ head: classes.head }}>Row No.</TableCell>
                                    <TableCell classes={{ head: classes.head }}>Teacher ID</TableCell>
                                    <TableCell classes={{ head: classes.head }}>Name</TableCell>
                                    <TableCell classes={{ head: classes.head }}>Qualification</TableCell>
                                    <TableCell classes={{ head: classes.head }}>Date of Joining</TableCell>
                                    <TableCell classes={{ head: classes.head }}>Assign Subject</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {teacherData.filter((value) => { return value.name.toLowerCase().includes(searchName.toLowerCase()) ? value : '' }).map((data, i) => (
                                    <TableRow>
                                        <TableCell>{i+1}</TableCell>
                                        <TableCell>{data.id}</TableCell>
                                        <TableCell>{data.name}</TableCell>
                                        <TableCell>{data.qualification}</TableCell>
                                        <TableCell>{data.doj}</TableCell>
                                        <TableCell><Button variant="contained" color="primary" size="small" onClick={() => handleOpen(data.name)}>Assign</Button></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>}
                {openPopup &&
                    <Dialog open={openPopup} maxWidth="sm" fullWidth={true}>
                        <DialogTitle classes={{ root: classes.dialogTitle }} >Assign Subject</DialogTitle>
                        <DialogContent>
                            {classData.map((data) => (
                                <List>
                                    <ListSubheader>Class : {data.class}</ListSubheader>
                                    {
                                        Object.keys(data).filter((value) => { return value !== 'class' && value !== 'id' ? value : '' }).map((classKey) => (
                                            <ListItem>
                                                <ListItemText>{classKey}</ListItemText>
                                                <ListItemSecondaryAction onClick={(e) => onSelectSubject(e.target.checked, data.class, classKey)}>
                                                    <Checkbox />
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                        ))
                                    }
                                </List>
                            ))}
                        </DialogContent>
                        <DialogActions>
                            <Button variant="outlined" color="secondary" size="small" onClick={handleClose}>Cancel</Button>
                            <Button variant="contained" color="primary" size="small" onClick={onSaveAssign}>Save</Button>
                        </DialogActions>
                    </Dialog>}
            </Paper>
        </>
    )
}


export default Teacher;
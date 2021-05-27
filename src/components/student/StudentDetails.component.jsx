import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";

const useStyles = makeStyles((theme) => ({
    head: {
        fontWeight: '700'
    },
    subjectName:{
        cursor: 'pointer'
    }
}));

const StudentDetails = (props) => {
    const [details, setDetails] = useState({});
    const classes = useStyles();
    let { id } = useParams();
    const [openPopup, setOpenPopup] = useState(false);
    const [teacherList, setTeacherList] = useState([]);

    const handleOpen = () => {
        setOpenPopup(true);
    }
    const handleClose = () => {
        setOpenPopup(false);
    }
    useEffect(() => {
        let url = "http://localhost:3005/studentData/" + id;
        axios.get(url)
            .then((result) => {
                setDetails(result.data);
            })
    }, [id]);

    const showTeachers = (section, subject) => {
        axios.get("http://localhost:3005/classData")
            .then((result) => {
                var data = result.data.filter((val) => {
                    return val.class === section ? val : null
                });
                var teacher = data[0][subject];
                setTeacherList(teacher);
                handleOpen();
            })
    }
    return (
        <>
            <Paper elevation={2}>
                {details.subject &&
                    <TableContainer>
                        <Table aria-label="simple-table">
                            <TableHead>
                                <TableRow>
                                    <TableCell classes={{ head: classes.head }}>Student Name</TableCell>
                                    <TableCell classes={{ head: classes.head }}>Subject Name</TableCell>
                                    <TableCell classes={{ head: classes.head }}>Marks/100</TableCell>
                                </TableRow >
                            </TableHead>
                            <TableBody>
                                {details.subject.map((data) => (
                                    <TableRow>
                                        <TableCell>{details.first_name + ' ' + details.last_name}</TableCell>
                                        <TableCell className={classes.subjectName} onClick={() => showTeachers(details.class, data.name)}>{data.name}</TableCell>
                                        <TableCell>{data.marks}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>}
                {openPopup &&
                    <Dialog open={openPopup} maxWidth="xs" fullWidth={true}>
                        <DialogTitle>Teachers</DialogTitle>
                        <DialogContent>
                            {teacherList.length > 0 ? <Grid>
                                {teacherList.map((item) => (
                                    <Grid>{item}</Grid>
                                ))}
                            </Grid> : <Grid>No Teachers Has been assigned.</Grid>}

                        </DialogContent>
                        <DialogActions>
                            <Button variant="contained" color="primary" size="small" onClick={handleClose}>Close</Button>
                        </DialogActions>
                    </Dialog>}
            </Paper>
        </>
    )

}

export default StudentDetails;
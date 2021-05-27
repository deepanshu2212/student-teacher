import { Grid, makeStyles, Paper } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import axios from "axios";
import StudentCard from "./StudentCard.component";
const useStyles = makeStyles((theme) => ({

}))
const Student = () => {
    const classes = useStyles();
    const [studentData, setStudentdata] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:3005/studentData")
            .then((result) => {
                if (result.data) {
                    setStudentdata(result.data);
                }
            })
    }, [])
    return (
        <>
            <Paper elevation={2}>
                <Grid container direction="row" spacing={3}>
                    {studentData.map((data) => (
                        <Grid item xs={4}>
                            <StudentCard data={data} />
                        </Grid>
                    ))}
                </Grid>
            </Paper>
        </>
    )
}


export default Student;
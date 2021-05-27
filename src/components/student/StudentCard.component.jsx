import { Card, CardContent, makeStyles, Typography } from "@material-ui/core";
import react from "react";
import { Link, useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    studentCard: {
        cursor: 'pointer'
    }
}));

const StudentCard = (props) => {
    const { data } = props;
    const classes = useStyles();
    const history = useHistory()

    const goToStudentDetails = (id) => {
        const isLogIn = JSON.parse(localStorage.getItem('isLoggedIn'));
        if (!isLogIn) {
            return
        } else {
            history.push('/student/' + id);
        }
    }
    return (
        <>
            <Card key={`student-detail-${data.id}`} variant="elevation" className={classes.studentCard} onClick={() => goToStudentDetails(data.id)}>
                <CardContent>
                    <Typography color="textSecondary" variant="h5" component="h3" >
                        {data.first_name + ' ' + data.last_name}
                    </Typography>
                    <Typography color="inherit">
                        <span>Roll No: {data.roll_num}</span>
                    </Typography>
                    <Typography>
                        <span>Date Of Birth: {data.dob}</span>
                    </Typography>
                    <Typography>
                        <span>Class: {data.class}</span>
                    </Typography>
                </CardContent>
            </Card>
        </>
    )
}

export default StudentCard;
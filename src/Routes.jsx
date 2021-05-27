import React from "react";
import { Redirect, Route, Switch } from "react-router";
import Student from "./components/student/Student.component";
import StudentDetails from "./components/student/StudentDetails.component";
import Teacher from "./components/teacher/Teacher.component";

const Routes = () => {

    return(
        <>
        <Switch>
            <Route exact path="/">
                <Redirect to="/student"></Redirect>
            </Route>
            <Route exact path="/student" component={Student}></Route>
            <Route exact path="/teacher" component={Teacher}></Route>
            <Route exact path="/student/:id" component={StudentDetails}></Route>
        </Switch>
        </>
    )
}

export default Routes;
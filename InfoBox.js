import React from 'react';
import {Card,CardContent,Typography} from "@material-ui/core";
import "./InfoBox.css";
function InfoBox({title,cases,isRed,active,total,...props}) {
    return (
        <div>
            <Card
                onClick={props.onClick}
                className={`infoBox ${active && "infoBox--selected"} ${
                    isRed && "infoBox--red"}`}
                >
                <CardContent>
                    {/*titlr i.e coronacases*/}
                    <Typography className="infoBox__title" color="textSecondary">
                        <h4>{title}</h4>
                    </Typography>
                     {/*+120K number of cases*/}
                     <h2 className={`infoBox__cases ${!isRed && "infoBox__cases--green"}`}>{cases}</h2>
                    <Typography className="infoBox__total" color="textSecondary">
                        {/*1.2M total*/}
                        {total}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
}

export default InfoBox

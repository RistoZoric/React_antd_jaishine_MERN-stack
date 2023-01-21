import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import { Link } from "react-router-dom";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
function Card4() {
    return (
        <Box sx={{ padding: 2,backgroundColor:'grey' }}>
            <Grid container spacing={2} columns={16}>
                <Grid item xs={8}>
                    <img src='/img/1.jpg' width='100%' height='100%' />
                </Grid>
                <Grid item xs={8} sx={{position:'relative'}}>
                    <Grid item xs={14}>
                        <Typography sx={{ textAlign: 'left', fontWeight: 'bolder' }}>They should be easy to scan for relevant and actionable information. Elements, like text and images, should be placed on them in a way that clearly indicates hierarchy.</Typography>
                    </Grid>
                    <Box sx={{ display: 'flex',position:'absolute',right:0,top:10 }}>
                        <ErrorOutlineIcon />
                        <CancelOutlinedIcon />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}
export default Card4;
import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import {Link} from "react-router-dom";

function Card3() {
    return (
        <Box sx={{padding:2}}>
            <Grid container spacing={2} columns={16}>
                <Grid item xs={8}>
                    <img src='/img/1.jpg' width='100%' height='100%' />
                </Grid>
                <Grid item xs={8}
                    alignItems="center"
                    justify="center">
                    <Typography sx={{ textAlign: 'left', fontWeight: 'bolder' }}>They should be easy to scan for relevant and actionable information. Elements, like text and images, should be placed on them in a way that clearly indicates hierarchy.</Typography>
                    <Typography sx={{marginTop:2}}>
                        <VisibilityIcon/>12<ModeCommentIcon/>12
                    </Typography>
                    <Typography  sx={{marginTop:2,textAlign:"right",paddingRight:2}}>
                        <Link to="#">They should</Link>
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    )
}
export default Card3;
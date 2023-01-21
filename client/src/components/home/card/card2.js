import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function Card2() {
    return (
        <Box sx={{ padding: 2 }}>
            <Grid container spacing={2} columns={16} xs={{ padding: 5 }}>
                <Grid item xs={4}>
                    <img src='/img/1.jpg' width='100%' height='100%' />
                </Grid>
                <Grid item xs={12} display="flex"
                    alignItems="center"
                    justify="center">
                    <Typography sx={{ textAlign: 'left', fontWeight: 'bolder' }}>They should be easy to scan for relevant and actionable information. Elements, like text and images, should be placed on them in a way that clearly indicates hierarchy.</Typography>
                </Grid>
                <Grid item xs={16} xs={{padding:2}}>
                    <Typography sx={{ textAlign: 'left',paddingTop:2 }}>They should be easy to scan for relevant and actionable information. Elements, like text and images, should be placed on them in a way that clearly indicates hierarchy.</Typography>
                    <Typography sx={{ textAlign: 'left',paddingTop:2 }}>They should be easy to scan for relevant and actionable information. Elements, like text and images, should be placed on them in a way that clearly indicates hierarchy.</Typography>
                    <Typography sx={{ textAlign: 'left',paddingTop:2 }}>They should be easy to scan for relevant and actionable information. Elements, like text and images, should be placed on them in a way that clearly indicates hierarchy.</Typography>
                    <Typography sx={{ textAlign: 'left',paddingTop:2 }}>They should be easy to scan for relevant and actionable information. Elements, like text and images, should be placed on them in a way that clearly indicates hierarchy.</Typography>
                </Grid>

            </Grid>
        </Box>
    )
}
export default Card2;
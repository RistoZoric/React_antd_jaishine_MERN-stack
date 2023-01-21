import React from "react";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';

//custom component
import SubAds from './submain/subAds';


function Main() {
    const [data, setData] = React.useState([1, 1, 1, 1])
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h5" component="h5">
                Recent Ads
            </Typography>
            <Grid container spacing={2}>
                {
                    data.map((list, index) => (
                        <Grid item xs={12} sm={6} md={3}>
                            <SubAds />
                        </Grid>
                    ))
                }
            </Grid>
            <Typography variant="h5" component="h5" mt={2}>
                Popular Ads
            </Typography>
            <Grid container spacing={2}>
                {
                    data.map((list, index) => (
                        <Grid item xs={12} sm={6} md={3}>
                            <SubAds />
                        </Grid>
                    ))
                }
            </Grid>
        </Box>
    )
}
export default Main;
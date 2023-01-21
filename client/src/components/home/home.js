import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
//custom component
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";

//card component
import Card from "./card/card";
import Card1 from "./card/card1";
import Card2 from "./card/card2";
import Card3 from "./card/card3";
import Card4 from "./card/card4";
import Card5 from "./card/card5";
import Card6 from "./card/card6";
import Card7 from "./card/card7";
import Card8 from "./card/card8";
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function Home() {
    return (
        <div>
            <Navbar />
            <div>
                <Box sx={{ flexGrow: 1,mt:1 }}>
                    <Grid container spacing={1}>
                        <Grid item xs={6}>
                            <Card/><Card1/><Card2/><Card3/><Card4/><Card5/><Card6/><Card7/><Card8/>
                        </Grid>
                        <Grid item xs={3}  sx={{ display: { xs: 'hide',md:'show'} }}>
                            <Item><b>What's new</b></Item>
                        </Grid>
                        <Grid item xs={3} sx={{ display: { xs: 'hide',md:'show'} }}>
                            <Item><b>Latest News</b></Item>
                        </Grid>
                    </Grid>
                </Box>
            </div>
            <Footer />
        </div>
    );
}
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Grid from '@mui/material/Grid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
export default function DefaultCard() {
    return (
        <Card sx={{ maxWidth: '100%', height: 400 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="300"
                    image="/img/1.jpg"
                    alt="green iguana"
                />
                <CardContent sx={{ position: 'absolute', left: 10, top: 270, backgroundColor: 'white', right: 10 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ textAlign: "left", fontSize: 18, fontWeight: 'bolder' }}>
                        Lizards are a widespread group of squamate reptiles, with over 6,000
          </Typography>
                    <Grid container sx={{ marginTop: 1 }}>
                        <VisibilityIcon />12
                <ModeCommentIcon />12
                <Typography sx={{ marginLeft: 10 }}>Lizards are Lizards Lizards are Lizards Lizards are Lizards</Typography>
                    </Grid>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
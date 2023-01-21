import React from "react";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    width: "50%",
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

function Profile() {

    React.useEffect(()=>{

    },[])

    //modal function 
    const [openmodal, setOpenModal] = React.useState(false);
    const handleOpen = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);
    return (
        <Box sx={{ marginTop: 5, margin: "auto" }}>
            <Card sx={{ maxWidth: 500, margin: "auto" }}>
                <Avatar
                    alt="My avatar"
                    src="/avatar/1.jpg"
                    sx={{ width: 100, height: 100, margin: 'auto', marginTop: 2 }}
                />

                <CardContent sx={{ marginTop: 1 }}>
                    <Grid container spacing={4}>
                        <Grid item xs={4}>
                            <Typography sx={{ textAlign: "right" }} gutterBottom variant="h6" component="div">
                                Name:
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography sx={{ textAlign: "left" }} gutterBottom variant="h6" component="div">
                                Marijan Jokic
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography sx={{ textAlign: "right" }} gutterBottom variant="h6" component="div">
                                Email:
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography sx={{ textAlign: "left" }} gutterBottom variant="h6" component="div">
                                JokicMarijan@email.com
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
                <CardActions >
                    <Button sx={{ margin: "auto" }} size="small" onClick={handleOpen}>Edit</Button>
                </CardActions>
            </Card>
            <div>
                <Modal
                    open={openmodal}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Avatar
                            alt="My avatar"
                            src="/avatar/1.jpg"
                            sx={{ width: 60, height: 60, margin: 'auto', marginTop: 1 }}
                        />
                        <IconButton color="primary" aria-label="upload picture" sx={{ display: 'flex', justifyContent: "center", marginTop: 1 }} component="label">
                            <input hidden accept="image/*" type="file" />
                            <PhotoCamera />
                        </IconButton>
                        <Grid container spacing={4}>
                            <Grid item xs={6} sx={{ marginTop: 1 }}>
                                <TextField id="standard-size-normal" fullWidth label="FirstName" variant="standard" />
                            </Grid>
                            <Grid item xs={6} sx={{ marginTop: 1 }}>
                                <TextField id="standard-size-normal" fullWidth label="LastName" variant="standard" />
                            </Grid>
                            <Grid item xs={12} sx={{ marginTop: 1 }}>
                                <TextField id="standard-size-normal" type="email" fullWidth label="Email" variant="standard" />
                            </Grid>
                            <Grid item xs={12} sx={{ marginTop: 1 }}>
                                <TextField type="password" id="standard-size-normal" fullWidth label="Current Password" variant="standard" />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField type="password" id="standard-size-normal" fullWidth label="Password" variant="standard" />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField type="password" id="standard-size-normal" fullWidth label="Conform Password" variant="standard" />
                            </Grid>
                        </Grid>
                        <Box fullWidth sx={{ display: "flex", justifyContent: "center", marginTop: 3 }} spacing={2}>
                            <Button size="small" onClick={handleClose}>Save</Button>
                            <Button size="small" onClick={handleClose} color="error">Cancel</Button>
                        </Box>
                    </Box>
                </Modal>
            </div>
        </Box>
    )
}
export default Profile;
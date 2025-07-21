import React from 'react';
import { Container, Box, Typography } from '@mui/material';

function Home() {
    return ( 
        <Container maxWidth="xl" sx={{ backgroundColor: 'primary.main', height: '100vh' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '90vh' }}>
                <Typography variant="h2" sx={{ fontSize: '2rem' }}>Help fellow students choose their courses wisely!</Typography> 
            </Box>
        </Container>
    );
};

export default Home;
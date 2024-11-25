// src/components/Header.tsx
import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Globab</Link>
                </Typography>
                <Link to="/menu" style={{ textDecoration: 'none', color: 'inherit', marginRight: '20px' }}>Menu</Link>
            </Toolbar>
        </AppBar>
    );
};

export default Header;

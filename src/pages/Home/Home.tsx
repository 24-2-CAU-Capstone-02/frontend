import React, { useState, useEffect } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Box,
    Paper,
} from '@mui/material';
import LanguageSwitcher from "../../components/LanguageSwitcher";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import axiosClient from '../../utils/axiosClient';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { ReactComponent as GoogleIcon } from '../../assets/google-icon.svg';

const redirect_uri = process.env.REACT_APP_REDIRECT_URI || "http://localhost:3000";

const Home: React.FC = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState<string | null>(null);

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            setIsLoggedIn(true);
            setUserName('User');
        }
    }, []);

    const handleLoginSuccess = async (tokenResponse: any) => {
        try {
            const serverResponse: any = await axiosClient.post(
                '/auth/login',
                { code: tokenResponse.code },
            );

            const rawAccessToken = serverResponse.accessToken.replace("Bearer ", "");
            localStorage.setItem('accessToken', rawAccessToken);

            setIsLoggedIn(true);
            setUserName('User');
        } catch (error) {
            alert(t('error.loginFailed'));
        }
    };

    const login = useGoogleLogin({
        onSuccess: handleLoginSuccess,
        onError: () => alert(t('error.loginFailed')),
        flow: 'auth-code',
        redirect_uri: redirect_uri,
    });

    const handleCreateRoomAndNavigate = async () => {
        try {
            const response: any = await axiosClient.post('/room');
            const { roomId } = response;
            navigate(`/camera?roomId=${roomId}`);
        } catch (error) {
            console.error('Failed to create room:', error);
            alert('Error creating room');
        }
    };

    return (
        <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
            {/* Header */}
            <AppBar position="static" sx={{ backgroundColor: '#4caf50' }}>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }} onClick={() => navigate('/')}>
                        {t('welcome')}
                    </Typography>
                    <IconButton color="inherit" title={t('languageSelector')}>
                        <LanguageSwitcher />
                    </IconButton>
                </Toolbar>
            </AppBar>

            {/* Main Content */}
            <Box
                sx={{
                    flexGrow: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    gap: 2,
                    backgroundColor: '#f5f5f5',
                }}
            >
                <Paper
                    elevation={3}
                    sx={{
                        p: 4,
                        textAlign: 'center',
                        borderRadius: '12px',
                        backgroundColor: '#fff',
                        maxWidth: '400px',
                    }}
                >
                    {isLoggedIn ? (
                        <Button
                            variant="contained"
                            onClick={handleCreateRoomAndNavigate}
                            sx={{
                                fontSize: '18px',
                                padding: '12px 24px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 1,
                                borderRadius: '8px',
                                textTransform: 'none',
                                backgroundColor: '#34A853',
                                color: '#fff',
                                '&:hover': {
                                    backgroundColor: '#2b8c43',
                                },
                            }}
                        >
                            <CameraAltIcon />
                            {t('createRoom')}
                        </Button>

                    ) : (
                        <Button
                            variant="contained"
                            onClick={() => login()}
                            sx={{
                                fontSize: '18px',
                                padding: '12px 24px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 1,
                                borderRadius: '8px',
                                textTransform: 'none',
                                backgroundColor: '#4285F4',
                                color: '#fff',
                                '&:hover': {
                                    backgroundColor: '#357ae8',
                                },
                            }}
                        >
                            <GoogleIcon style={{ width: '20px', height: '20px' }} />
                            {t('loginWithGoogle')}
                        </Button>

                    )}
                </Paper>
            </Box>
        </Box>
    );
};

export default Home;

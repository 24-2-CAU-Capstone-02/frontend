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
import logo from '../../assets/logo.png';

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
        } catch (error: any) {
            console.error('Failed to create room:', error);

            console.log(error.response.status);

            // 403 오류 처리: 로그아웃 상태로 전환
            if (error.response?.status === 403) {
                console.error('Access token is invalid or expired. Logging out...');

                localStorage.removeItem('accessToken');
                localStorage.removeItem('roomId');
                localStorage.removeItem('memberId');
                localStorage.removeItem('sessionToken');
                localStorage.removeItem('username');

                setIsLoggedIn(false);
                setUserName(null);
                alert(t('error.sessionExpired'));
                window.location.reload();
            } else {
                alert('Error creating room');
            }
        }
    };

    return (
        <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
            {/* Header */}
            <AppBar position="static" sx={{ backgroundColor: '#c62828' }}>
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
                    alignItems: 'flex-start', // 콘텐츠를 위에서부터 시작
                    justifyContent: 'center',
                    flexDirection: 'column',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                {/* 배경 전용 레이어 */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: '15%',
                        left: 0,
                        width: '100%',
                        height: '30%',
                        backgroundImage: `url(${logo})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center top',
                        backgroundSize: 'contain',
                        opacity: 0.4,
                        zIndex: 1,
                        pointerEvents: 'none',
                    }}
                />

                {/* 실제 콘텐츠 */}
                <Box
                    sx={{
                        zIndex: 2,
                        marginTop: '15vh',
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <Paper
                        elevation={3}
                        sx={{
                            backgroundColor: '#fff',
                            padding: 4,
                            borderRadius: 2,
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
                                    backgroundColor: '#c62828',
                                    opacity: 0.9,
                                    color: '#fff',
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
                                    backgroundColor: '#fff',
                                    color: '#000',
                                }}
                            >
                                <GoogleIcon style={{ width: '20px', height: '20px' }} />
                                {t('loginWithGoogle')}
                            </Button>
                        )}
                    </Paper>
                </Box>
            </Box>
        </Box>
    );
};

export default Home;
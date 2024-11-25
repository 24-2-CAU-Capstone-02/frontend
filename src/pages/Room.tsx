import React from 'react';
import { useTranslation } from 'react-i18next';
import { AppBar, Toolbar, Typography, IconButton, TextField, Button, Box, Paper, BottomNavigation, BottomNavigationAction } from '@mui/material';
import LanguageSwitcher from "../components/LanguageSwitcher";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import {useLocation, useNavigate} from "react-router-dom";
import axiosClient from '../utils/axiosClient';
import {CreateRoomMemberResponse} from "../utils/resTypes";

const CreateRoom: React.FC = () => {
    const navigation = useNavigate();
    const { t } = useTranslation();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const roomId = params.get('roomId');

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [value, setValue] = React.useState(0);

    const handleCreateRoom = async () => {
        try {
            if(!roomId) {
                throw new Error('Room ID is required');
            }

            if(!username) {
                alert(t('usernameRequired'));
                return;
            }

            // 빈 문자열 처리
            const roomPassword = password || '';

            const response = await axiosClient.post<CreateRoomMemberResponse>(`/room/${roomId}/member`, { username: username, roomPassword });
            const { memberId, username: createdUsername, sessionToken } = response.data || response;

            // 세션 토큰 저장 memberId, username, sesssionToken을 다 같이 저장
            localStorage.setItem('roomId', roomId);
            localStorage.setItem('memberId', memberId);
            localStorage.setItem('username', username);
            localStorage.setItem('sessionToken', sessionToken);

            // 카메라 선택 화면으로 이동
            navigation(`/menu?roomId=${roomId}`);
        } catch (error) {
            console.error('Failed to create room:', error);
            alert(t('createRoomError'));
        }
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#f5f5f5' }}>
            {/* 상단 네비게이션 바 */}
            <AppBar position="sticky" style={{ backgroundColor: '#4caf50', color: 'white' }}>
                <Toolbar>
                    <Typography variant="h6" style={{ flexGrow: 1 }} onClick={() => navigation('/')}>
                        {t('welcome')}
                    </Typography>
                    <IconButton color="inherit" title="Language Selector">
                        <LanguageSwitcher />
                    </IconButton>
                </Toolbar>
            </AppBar>

            {/* 메인 컨텐츠 */}
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexGrow={1}
                style={{
                    padding: '24px',
                    background: 'linear-gradient(135deg, #ffffff, #e8f5e9)',
                }}
            >
                <Paper
                    elevation={4}
                    style={{
                        padding: '24px',
                        maxWidth: '400px',
                        width: '100%',
                        borderRadius: '16px',
                        backgroundColor: 'white',
                    }}
                >
                    <Typography
                        variant="subtitle1"
                        align="center"
                        style={{
                            marginBottom: '16px',
                            fontSize: '14px',
                            color: '#4caf50',
                            lineHeight: '1.5',
                        }}
                    >
                        {t('createRoomDescription')} {/* 방 생성 설명 */}
                    </Typography>
                    <TextField
                        label={t('username')}
                        variant="outlined"
                        fullWidth
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={{ marginBottom: '16px' }}
                        InputLabelProps={{
                            style: { color: '#4caf50' },
                        }}
                    />
                    <TextField
                        label={t('passwordOptional')}
                        type="password"
                        variant="outlined"
                        fullWidth
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ marginBottom: '16px' }}
                        helperText={t('passwordOptionalHelp')}
                        InputLabelProps={{
                            style: { color: '#4caf50' },
                        }}
                    />
                    <Button
                        variant="contained"
                        fullWidth
                        onClick={handleCreateRoom}
                        style={{
                            padding: '12px',
                            borderRadius: '8px',
                            backgroundColor: '#4caf50',
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: '16px',
                        }}
                    >
                        {t('join')}
                    </Button>
                </Paper>
            </Box>

            {/* 하단 네비게이션 */}
            <BottomNavigation
                value={value}
                onChange={(event, newValue) => setValue(newValue)}
                style={{
                    position: 'sticky',
                    bottom: 0,
                    backgroundColor: '#ffffff',
                    borderTop: '1px solid #e0e0e0',
                }}
            >
                <BottomNavigationAction
                    label={t('Home')}
                    onClick={() => navigation('/')}
                    style={{ color: 'inherit' }}
                />
                <Button
                    variant="contained"
                    onClick={() => navigation('/menu')}
                    style={{
                        position: 'absolute',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        zIndex: 1,
                        marginBottom: '12px',
                        borderRadius: '50%',
                        width: '56px',
                        height: '56px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#4caf50',
                        color: 'white',
                        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    <CameraAltIcon style={{ fontSize: '36px' }} />
                </Button>

                <BottomNavigationAction
                    label={t('Settings')}
                    style={{ color: value === 2 ? '#4caf50' : 'gray' }}
                    onClick={() => setValue(2)}
                    disabled={true}
                />
            </BottomNavigation>
        </div>
    );
};

export default CreateRoom;

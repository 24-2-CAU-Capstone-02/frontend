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
            if (!roomId) {
                throw new Error('Room ID is required');
            }

            if (!username) {
                alert(t('usernameRequired'));
                return;
            }

            // 빈 문자열 처리
            const roomPassword = password || '';

            const response = await axiosClient.post<CreateRoomMemberResponse>(
                `/room/${roomId}/member`,
                { username: username, password: roomPassword }
            );

            const { memberId, username: createdUsername, sessionToken } = response.data || response;

            // 세션 토큰 저장 memberId, username, sessionToken을 다 같이 저장
            localStorage.setItem('roomId', roomId);
            localStorage.setItem('memberId', memberId);
            localStorage.setItem('username', username);
            localStorage.setItem('sessionToken', sessionToken);

            // 카메라 선택 화면으로 이동
            navigation(`/menu?roomId=${roomId}`);
        } catch (error: any) {
            if (error.response?.status === 401) {
                alert(t('unauthorizedAccess'));
            } else {
                console.error('Failed to create room:', error);
                alert(t('createRoomError'));
            }
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
        </div>
    );
};

export default CreateRoom;

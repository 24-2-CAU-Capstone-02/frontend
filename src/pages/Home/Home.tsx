import React from 'react';
import { useTranslation } from 'react-i18next';
import {
    Button,
    AppBar,
    Toolbar,
    Typography,
    BottomNavigation,
    BottomNavigationAction,
    Card,
    CardContent,
    CardMedia,
    IconButton
} from '@mui/material';
import LanguageSwitcher from "../../components/LanguageSwitcher";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { useNavigate } from "react-router-dom";
import axiosClient from '../../utils/axiosClient'; // axios 클라이언트

const Home: React.FC = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [value, setValue] = React.useState(0);

    // Room 생성 및 카메라 화면으로 이동
    const handleCreateRoomAndNavigate = async () => {
        try {
            // Room 생성 API 호출
            const response = await axiosClient.post('/room');

            // 응답 구조 확인
            console.log('Full response:', response);
            console.log('Response data:', response.data);

            const { roomId } = response.data || response; // 구조에 따라 적절히 디스트럭처링

            // navigate(`/camera?roomId=${roomId}`);
            navigate(`/camera?roomId=${roomId}`);
        } catch (error) {
            console.error('Failed to create room:', error);
            alert(t('createRoomError'));
        }
    };

    return (
        <div className="home-container" style={{ paddingBottom: '56px' }}>
            <AppBar position="static" style={{ backgroundColor: '#4caf50' }}>
                <Toolbar>
                    <Typography variant="h6" style={{ flexGrow: 1 }} onClick={() => navigate('/')}>
                        {t('welcome')}
                    </Typography>

                    <IconButton color="inherit" title="Language Selector">
                        <LanguageSwitcher />
                    </IconButton>
                </Toolbar>
            </AppBar>

            <main className="main-content" style={{ padding: '16px' }}>
                <Typography variant="h5" gutterBottom>
                    {t('popular')}
                </Typography>
                <Card className="menu-card" style={{ marginBottom: '16px' }}>
                    <CardMedia
                        component="img"
                        alt="Spicy Pork Stir-fry"
                        height="140"
                        image="https://i.namu.wiki/i/npjMucg7sLxIm8Uca8O3lygeM9UX2Dsu4RVnVxcDdaItsLZ6w0N0Ju54gVqn8O7r7taBR6bAEwL9qOLoUKKbzg.webp"
                    />
                    <CardContent>
                        <Typography variant="h6" component="div">
                            {t('spicyPork')} 🌶️🌶️🌶️
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            A spicy stir-fried pork dish, perfect to enjoy with rice.
                        </Typography>
                    </CardContent>
                </Card>
            </main>

            <BottomNavigation
                value={value}
                onChange={(event, newValue) => setValue(newValue)}
                showLabels
                style={{ position: 'fixed', bottom: 0, width: '100%' }}
            >
                <BottomNavigationAction
                    label={t('Home')}
                    style={{ color: value === 0 ? '#4caf50' : 'inherit' }}
                    onClick={() => setValue(0)}
                />

                <Button
                    variant="contained"
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
                    }}
                    onClick={handleCreateRoomAndNavigate}
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

export default Home;

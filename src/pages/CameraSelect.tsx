import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    Button,
    Typography,
    Box,
    Paper,
    AppBar,
    Toolbar,
    IconButton,
    BottomNavigation,
    BottomNavigationAction,
    CircularProgress,
    Backdrop,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ImageIcon from '@mui/icons-material/Image';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import LanguageSwitcher from "../components/LanguageSwitcher";
import axiosClient from "../utils/axiosClient";
import { useTranslation } from 'react-i18next';

const CameraSelect: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const params = new URLSearchParams(location.search);
    const roomId = params.get('roomId');
    const { t } = useTranslation();

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [imageText, setImageText] = useState('');
    const [value, setValue] = useState(0);
    const [isLoading, setIsLoading] = useState(false); // Loading 상태 추가

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            setSelectedFile(file);

            // Set preview image
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            alert(t('selectImageAlert'));
            return;
        }

        setIsLoading(true); // 로딩 시작
        try {
            const formData = new FormData();
            formData.append('roomId', roomId || '');
            formData.append('images', selectedFile);

            const response = await axiosClient.post(
                `/room/${roomId}/upload/image`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    timeout: 60000, // 타임아웃을 60초(60000ms)로 설정
                }
            );

            alert(t('uploadSuccess'));
            console.log('Upload response:', response);

            // 업로드 성공 후 리디렉션
            navigate(`/menu?roomId=${roomId}`);
        } catch (error) {
            console.error('Error uploading image:', error);
            alert(t('uploadError'));
        } finally {
            setIsLoading(false); // 로딩 종료
        }
    };

    return (
        <div>
            {/* Loading Backdrop */}
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>

            {/* Header */}
            <AppBar position="static" style={{ backgroundColor: '#4caf50' }}>
                <Toolbar>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        {t('cameraSelect')}
                    </Typography>
                    <IconButton color="inherit" title="Language Selector">
                        <LanguageSwitcher />
                    </IconButton>
                </Toolbar>
            </AppBar>

            {/* Main Content */}
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                style={{
                    minHeight: 'calc(100vh - 112px)',
                    padding: '24px',
                    background: 'linear-gradient(135deg, #f3f4f6, #ffffff)',
                }}
            >
                <Paper
                    elevation={3}
                    style={{
                        padding: '24px',
                        borderRadius: '16px',
                        width: '100%',
                        maxWidth: '400px',
                        textAlign: 'center',
                        backgroundColor: '#ffffff',
                    }}
                >
                    <Typography
                        variant="h5"
                        style={{
                            marginBottom: '16px',
                            fontWeight: 'bold',
                            color: '#4caf50',
                        }}
                    >
                        {t('uploadMenuImage')}
                    </Typography>

                    {preview ? (
                        <Box
                            style={{
                                width: '100%',
                                height: '200px',
                                backgroundImage: `url(${preview})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                borderRadius: '8px',
                                marginBottom: '16px',
                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                            }}
                        />
                    ) : (
                        <Box
                            style={{
                                width: '100%',
                                height: '200px',
                                backgroundColor: '#f5f5f5',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '8px',
                                marginBottom: '16px',
                                border: '2px dashed #cccccc',
                            }}
                        >
                            <ImageIcon style={{ fontSize: '48px', color: '#cccccc' }} />
                        </Box>
                    )}

                    <input
                        type="file"
                        accept="image/*"
                        id="file-upload"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />
                    <label htmlFor="file-upload">
                        <Button
                            variant="outlined"
                            component="span"
                            style={{
                                borderColor: '#4caf50',
                                color: '#4caf50',
                                marginBottom: '16px',
                                fontWeight: 'bold',
                            }}
                            startIcon={<CloudUploadIcon />}
                        >
                            {t('chooseFile')}
                        </Button>
                    </label>

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleUpload}
                        disabled={!selectedFile || isLoading} // 로딩 중이면 비활성화
                        style={{
                            padding: '12px 24px',
                            borderRadius: '8px',
                            fontWeight: 'bold',
                            fontSize: '16px',
                            width: '100%',
                        }}
                    >
                        {t('upload')}
                    </Button>
                </Paper>
            </Box>
        </div>
    );
};

export default CameraSelect;

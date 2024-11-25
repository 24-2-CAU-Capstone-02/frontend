import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, TextField, Button, Box, IconButton } from '@mui/material';
import { useTranslation } from 'react-i18next';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

const RoomPage: React.FC = () => {
    const { t } = useTranslation();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [step, setStep] = useState(1);
    const [roomId, setRoomId] = useState<number | null>(null);
    const [sessionToken, setSessionToken] = useState('');
    const [uploadedImages, setUploadedImages] = useState<File[]>([]);

    // 방 생성 API 호출
    const createRoom = async () => {
        const response = await fetch('/room', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });
        const data = await response.json();
        setRoomId(data.roomId);
        setSessionToken(data.sessionToken);
        setStep(2); // Step 2로 이동
    };

    // 이미지 업로드 API 호출
    const uploadMenuImages = async () => {
        const formData = {
            sessionToken,
            imageUrls: uploadedImages.map((file) => URL.createObjectURL(file)),
        };
        await fetch(`/room/${roomId}/upload`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });
        alert(t('uploadSuccess'));
    };

    // 사진 선택 핸들러
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setUploadedImages(Array.from(event.target.files));
        }
    };

    return (
        <div style={{ padding: '16px', minHeight: '100vh' }}>
            <AppBar position="static" style={{ backgroundColor: '#4caf50' }}>
                <Toolbar>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        {t(step === 1 ? 'createRoom' : 'uploadMenu')}
                    </Typography>
                </Toolbar>
            </AppBar>

            <Box display="flex" flexDirection="column" alignItems="center" marginTop={4}>
                {step === 1 && (
                    <>
                        <TextField
                            label={t('username')}
                            fullWidth
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            style={{ marginBottom: '16px' }}
                        />
                        <TextField
                            label={t('passwordOptional')}
                            type="password"
                            fullWidth
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ marginBottom: '16px' }}
                        />
                        <Button variant="contained" color="primary" onClick={createRoom}>
                            {t('create')}
                        </Button>
                    </>
                )}

                {step === 2 && (
                    <>
                        <Typography variant="h6" style={{ marginBottom: '16px' }}>
                            {t('uploadMenuPrompt')}
                        </Typography>
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleFileChange}
                            style={{ display: 'none' }}
                            id="file-upload"
                        />
                        <label htmlFor="file-upload">
                            <Button variant="contained" color="primary" component="span" style={{ marginBottom: '16px' }}>
                                {t('selectPhotos')}
                            </Button>
                        </label>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={uploadMenuImages}
                            disabled={uploadedImages.length === 0}
                        >
                            {t('upload')}
                        </Button>
                    </>
                )}
            </Box>
        </div>
    );
};

export default RoomPage;

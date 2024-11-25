import React, { useState } from 'react';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    MenuItem,
    Typography,
    IconButton
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import LanguageIcon from '@mui/icons-material/Language'; // 언어 아이콘 가져오기

const LanguageSwitcher: React.FC = () => {
    const { i18n } = useTranslation(); // i18n 객체 가져오기
    const [open, setOpen] = useState(false); // 모달 열림 상태 관리

    const handleClickOpen = () => {
        setOpen(true); // 모달 열기
    };

    const handleClose = () => {
        setOpen(false); // 모달 닫기
    };

    const changeLanguage = (lang: string) => {
        i18n.changeLanguage(lang); // 언어 변경
        handleClose(); // 모달 닫기
    };

    return (
        <div>
            <IconButton onClick={handleClickOpen}>
                <LanguageIcon />
            </IconButton>
            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle>
                    <Typography variant="h6" align="center">
                        언어 선택
                    </Typography>
                </DialogTitle>
                <DialogContent dividers>
                    <MenuItem onClick={() => changeLanguage('en')}>English</MenuItem>
                    <MenuItem onClick={() => changeLanguage('ko')}>한국어</MenuItem>
                    <MenuItem onClick={() => changeLanguage('es')}>Español</MenuItem>
                    <MenuItem onClick={() => changeLanguage('fr')}>Français</MenuItem>
                    <MenuItem onClick={() => changeLanguage('ja')}>日本語</MenuItem> {/* 일본어 추가 */}
                    <MenuItem onClick={() => changeLanguage('zh')}>中文</MenuItem> {/* 중국어 추가 */}
                    {/* 추가 언어를 여기에 추가 */}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        닫기
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default LanguageSwitcher;

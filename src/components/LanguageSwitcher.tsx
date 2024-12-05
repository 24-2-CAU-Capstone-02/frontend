import React, { useState } from 'react';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    MenuItem,
    Typography,
    IconButton,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import LanguageIcon from '@mui/icons-material/Language'; // 언어 아이콘 가져오기

const LanguageSwitcher: React.FC = () => {
    const { i18n, t } = useTranslation(); // i18n 및 t 함수 가져오기
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
                        {t('languageSwitcher.selectLanguage')} {/* 번역 키 적용 */}
                    </Typography>
                </DialogTitle>
                <DialogContent dividers>
                    <MenuItem onClick={() => changeLanguage('en')}>{t('languages.english')}</MenuItem>
                    <MenuItem onClick={() => changeLanguage('ko')}>{t('languages.korean')}</MenuItem>
                    <MenuItem onClick={() => changeLanguage('es')}>{t('languages.spanish')}</MenuItem>
                    <MenuItem onClick={() => changeLanguage('fr')}>{t('languages.french')}</MenuItem>
                    <MenuItem onClick={() => changeLanguage('ja')}>{t('languages.japanese')}</MenuItem>
                    <MenuItem onClick={() => changeLanguage('zh')}>{t('languages.chinese')}</MenuItem>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        {t('actions.close')} {/* 번역 키 적용 */}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default LanguageSwitcher;

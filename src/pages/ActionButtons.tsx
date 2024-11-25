import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {Box, Button} from "@mui/material";
import DoorFrontIcon from "@mui/icons-material/DoorFront";
import ShareIcon from "@mui/icons-material/Share";
import {isLoggedInCheck} from "../utils/isLoggedInCheck";

interface ActionButtonsProps {
    roomId: string | null;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ roomId }) => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // 로그인 상태 확인
    useEffect(() => {
        if(roomId) {
            setIsLoggedIn(isLoggedInCheck(roomId));
        }
    }, [roomId]);

    // Web Share API로 공유
    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: `${t('shareTitle')}\n`,
                    text: `\n${t('menuInvitation')}\n`,
                    url: `${window.location.origin}/room?roomId=${roomId}`,
                });
                console.log('Content shared successfully!');
            } catch (error) {
                console.error('Error sharing content:', error);
            }
        } else {
            alert(t('shareNotSupported')); // 다국어 지원
        }
    };

    return (
        <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            style={{
                position: 'sticky',
                bottom: 16,
                backgroundColor: '#f9f9f9',
                padding: '8px 16px',
                boxShadow: '0 -4px 16px rgba(0, 0, 0, 0.1)',
                borderRadius: '16px',
                zIndex: 1000,
            }}
        >
            <Button
                variant="contained"
                startIcon={<ShareIcon />}
                style={{
                    backgroundColor: '#4caf50',
                    color: '#fff',
                    borderRadius: '50px',
                    padding: '8px 24px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                    fontWeight: 'bold',
                    textTransform: 'none',
                    width: isLoggedIn ? '98%' : '49%',
                }}
                onClick={handleShare}
            >
                {t('shareStart')}
            </Button>

            {!isLoggedIn && (
                <Button
                    variant="contained"
                    startIcon={<DoorFrontIcon />}
                    style={{
                        backgroundColor: '#007bff',
                        color: '#fff',
                        borderRadius: '50px',
                        padding: '8px 24px',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                        fontWeight: 'bold',
                        textTransform: 'none',
                        width: '49%',
                    }}
                    onClick={() => navigate(`/room?roomId=${roomId}`)}
                >
                    {t('login')}
                </Button>
            )}
        </Box>
    );
};

export default ActionButtons;

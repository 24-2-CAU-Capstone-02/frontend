import React, { useState } from 'react';
import { Modal, Box, Typography, Button, List, ListItem, ListItemText, Divider, Badge } from '@mui/material';
import { CartItem } from './Menu';
import { useTranslation } from 'react-i18next';

const FooterWithCart: React.FC<{ cart: CartItem[] }> = ({ cart }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { t } = useTranslation();

    // 총 가격 계산
    const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

    // Modal 열기/닫기
    const toggleModal = () => setIsModalOpen((prev) => !prev);

    return (
        <>
            {/* Footer */}
            <Button
                onClick={toggleModal}
                disableRipple
                sx={{
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    maxWidth: '100%',
                    boxSizing: 'border-box',
                    backgroundColor: '#606070',
                    padding: '16px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    zIndex: 1000,
                    color: '#fff',
                    textTransform: 'none',
                    borderRadius: '0',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '20px',
                        flexWrap: 'nowrap',
                        flexShrink: 0,
                        padding: '0 5px',
                    }}
                >
                    <Badge
                        badgeContent={cart.length}
                        color="primary"
                        showZero
                        sx={{
                            '& .MuiBadge-badge': {
                                backgroundColor: '#fff',
                                color: '#606070',
                                fontSize: '0.9rem',
                                minWidth: '24px',
                                height: '24px',
                                borderRadius: '50%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            },
                        }}
                    />
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#fff', whiteSpace: 'nowrap', }}>
                        {t('showCart')}
                    </Typography>
                </Box>

                {/* 오른쪽: 최종 가격 */}
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#fff' }}>
                    {`₩${totalPrice.toLocaleString()}`}
                </Typography>
            </Button>

            {/* Modal */}
            <Modal
                open={isModalOpen}
                onClose={toggleModal}
                aria-labelledby="cart-modal-title"
                aria-describedby="cart-modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        maxHeight: '80vh',
                        overflowY: 'auto',
                    }}
                >
                    <Typography id="cart-modal-title" variant="h6" gutterBottom>
                        {t('selectedMenuItems')}
                    </Typography>
                    <Divider />
                    <List>
                        {cart.map((item) => (
                            <ListItem key={item.id} sx={{ padding: '8px 0' }}>
                                <ListItemText
                                    primary={item.menuName}
                                    secondary={`${t('price')}: ₩${item.price.toLocaleString()}`}
                                />
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                    <Typography variant="h6" align="right" sx={{ marginTop: '16px' }}>
                        {`${t('total')}: ₩${totalPrice.toLocaleString()}`}
                    </Typography>
                    <Button
                        variant="contained"
                        color="error"
                        fullWidth
                        onClick={toggleModal}
                        sx={{ marginTop: '16px', borderRadius: '50px' }}
                    >
                        {t('close')}
                    </Button>
                </Box>
            </Modal>
        </>
    );
};

export default FooterWithCart;

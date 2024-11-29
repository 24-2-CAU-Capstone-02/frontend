import React, { useState } from 'react';
import { Modal, Box, Typography, Button, List, ListItem, ListItemText, Divider, Badge, IconButton } from '@mui/material';
import { useTranslation } from 'react-i18next';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { CartItem, MenuItem } from "../type/types";

const FooterWithCart: React.FC<{
    menu: MenuItem[];
    cart: CartItem[];
    handleAddToCart: (item: MenuItem, isGroup: boolean, quantity: number) => void;
}> = ({ menu, cart, handleAddToCart }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { t } = useTranslation();

    // 총 가격 계산 (quantity 포함)
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Modal 열기/닫기
    const toggleModal = () => setIsModalOpen((prev) => !prev);

    // 공유된 메뉴와 개인 메뉴 분리 및 정렬
    const sharedCart = cart.filter((item) => item.userName === 'Shared Group');
    const personalCart = cart.filter((item) => item.userName !== 'Shared Group').sort((a, b) => a.userName.localeCompare(b.userName));

    const handleIncreaseQuantity = (item: CartItem) => {
        const menuItem = menu.find((menuItem) => menuItem.id === item.id);
        if (menuItem) {
            const newQuantity = item.quantity + 1;
            handleAddToCart(menuItem, item.userName === 'Shared Group', newQuantity);
        }
    };

    const handleDecreaseQuantity = (item: CartItem) => {
        if (item.quantity > 1) {
            const menuItem = menu.find((menuItem) => menuItem.id === item.id);
            if (menuItem) {
                const newQuantity = item.quantity - 1;
                handleAddToCart(menuItem, item.userName === 'Shared Group', newQuantity);
            }
        }
    };

    const handleRemoveItem = (item: CartItem) => {
        const menuItem = menu.find((menuItem) => menuItem.id === item.id);
        if (menuItem) {
            handleAddToCart(menuItem, item.userName === 'Shared Group', 0); // 수량을 0으로 설정
        }
    };

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

                    {sharedCart.length > 0 && (
                        <>
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', marginTop: '16px' }}>
                                {t('sharedMenu')}
                            </Typography>
                            <List>
                                {sharedCart.map((item) => (
                                    <ListItem
                                        key={item.id}
                                        sx={{
                                            padding: '8px 0',
                                            position: 'relative',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'flex-start',
                                        }}
                                    >
                                        <IconButton
                                            size="small"
                                            sx={{
                                                position: 'absolute',
                                                top: '8px',
                                                right: '8px',
                                                width: 24,
                                                height: 24,
                                                padding: '2px',
                                                borderRadius: '50%',
                                            }}
                                            onClick={() => handleRemoveItem(item)}
                                        >
                                            ✕
                                        </IconButton>

                                        <ListItemText
                                            primary={item.menuName}
                                            secondary={`${t('price')}: ₩${(item.price * item.quantity).toLocaleString()}`}
                                        />

                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '8px' }}>
                                            <IconButton
                                                size="small"
                                                sx={{
                                                    width: 28,
                                                    height: 28,
                                                    padding: '2px',
                                                    backgroundColor: '#f5f5f5',
                                                    borderRadius: '50%',
                                                    '&:hover': { backgroundColor: '#e0e0e0' },
                                                }}
                                                onClick={() => handleDecreaseQuantity(item)}
                                                disabled={item.quantity <= 1}
                                            >
                                                <RemoveIcon fontSize="small" />
                                            </IconButton>
                                            <Typography
                                                sx={{
                                                    fontSize: '0.875rem',
                                                    fontWeight: 'bold',
                                                    minWidth: '24px',
                                                    textAlign: 'center',
                                                }}
                                            >
                                                {item.quantity}
                                            </Typography>
                                            <IconButton
                                                size="small"
                                                sx={{
                                                    width: 28,
                                                    height: 28,
                                                    padding: '2px',
                                                    backgroundColor: '#f5f5f5',
                                                    borderRadius: '50%',
                                                    '&:hover': { backgroundColor: '#e0e0e0' },
                                                }}
                                                onClick={() => handleIncreaseQuantity(item)}
                                            >
                                                <AddIcon fontSize="small" />
                                            </IconButton>
                                        </Box>
                                    </ListItem>
                                ))}
                            </List>
                            <Divider sx={{ borderStyle: 'dashed', borderWidth: '1px', borderColor: '#cccccc' }} />
                        </>
                    )}

                    {personalCart.length > 0 && (
                        <>
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', marginTop: '16px' }}>
                                {t('personalMenu')}
                            </Typography>
                            <List>
                                {personalCart.map((item) => (
                                    <ListItem
                                        key={item.id}
                                        sx={{
                                            padding: '8px 0',
                                            position: 'relative',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'flex-start',
                                        }}
                                    >
                                        <IconButton
                                            size="small"
                                            sx={{
                                                position: 'absolute',
                                                top: '8px',
                                                right: '8px',
                                                width: 24,
                                                height: 24,
                                                padding: '2px',
                                                borderRadius: '50%',
                                            }}
                                            onClick={() => handleRemoveItem(item)}
                                        >
                                            ✕
                                        </IconButton>

                                        <ListItemText
                                            primary={item.menuName}
                                            secondary={`${t('price')}: ₩${(item.price * item.quantity).toLocaleString()}${
                                                item.userName !== 'Shared Group' ? ` | ${t('user')}: ${item.userName}` : ''
                                            }`}
                                        />

                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '8px' }}>
                                            <IconButton
                                                size="small"
                                                sx={{
                                                    width: 28,
                                                    height: 28,
                                                    padding: '2px',
                                                    backgroundColor: '#f5f5f5',
                                                    borderRadius: '50%',
                                                    '&:hover': { backgroundColor: '#e0e0e0' },
                                                }}
                                                onClick={() => handleDecreaseQuantity(item)}
                                                disabled={item.quantity <= 1}
                                            >
                                                <RemoveIcon fontSize="small" />
                                            </IconButton>
                                            <Typography
                                                sx={{
                                                    fontSize: '0.875rem',
                                                    fontWeight: 'bold',
                                                    minWidth: '24px',
                                                    textAlign: 'center',
                                                }}
                                            >
                                                {item.quantity}
                                            </Typography>
                                            <IconButton
                                                size="small"
                                                sx={{
                                                    width: 28,
                                                    height: 28,
                                                    padding: '2px',
                                                    backgroundColor: '#f5f5f5',
                                                    borderRadius: '50%',
                                                    '&:hover': { backgroundColor: '#e0e0e0' },
                                                }}
                                                onClick={() => handleIncreaseQuantity(item)}
                                            >
                                                <AddIcon fontSize="small" />
                                            </IconButton>
                                        </Box>
                                    </ListItem>
                                ))}
                            </List>
                            <Divider sx={{ borderStyle: 'dashed', borderWidth: '1px', borderColor: '#cccccc' }} />
                        </>
                    )}

                    {/* 총 가격 */}
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

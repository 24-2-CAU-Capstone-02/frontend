import React, {useEffect, useRef, useState} from 'react';
import {useParams, useNavigate, useLocation} from 'react-router-dom';
import {
    AppBar,
    Toolbar,
    Typography,
    Container,
    Card,
    CardContent,
    CardMedia,
    Grid,
    Button,
    IconButton,
    Badge,
    Box,
} from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import {useTranslation} from "react-i18next";
import LanguageSwitcher from "../components/LanguageSwitcher";
import {getRomanizedName} from "../utils/romainz";
import axiosClient from "../utils/axiosClient";
import {translateTextsDirectly} from "../utils/translateTextDirectly";
import ActionButtons from "./ActionButtons";
import {isLoggedInCheck} from "../utils/isLoggedInCheck";
import FooterWithCart from "./FooterWithCart";
import {generateCartItems} from "../utils/generateCartItems";
import {CartItem, MenuItem} from "../type/types";
import defaultImage from '../assets/default-image.webp';
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
};

const socketUrl = process.env.REACT_APP_SOCKET_URL;

const Menu: React.FC = () => {
    const location = useLocation();
    const {t, i18n} = useTranslation();
    const currentLang = i18n.language;
    const params = new URLSearchParams(location.search);
    const roomId = params.get('roomId');

    const {sessionId: paramSessionId} = useParams<{ sessionId?: string }>();
    const [sessionId, setSessionId] = useState<string | null>(paramSessionId || null);
    const [userInfo, setUserInfo] = useState<any[]>([]);
    const [cart, setCart] = useState<CartItem[]>([]);
    const [menuImages, setMenuImages] = useState<any[]>([]);
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const [groupedData, setGroupedData] = useState<any[]>([]);
    const [pendingCartData, setPendingCartData] = useState<Record<string, any>>({});
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    const ws = useRef<WebSocket | null>(null);

    useEffect(() => {
        if (!roomId) {
            console.error('Room ID is missing.');
            return;
        }

        setIsLoggedIn(isLoggedInCheck(roomId));

        if (isLoggedInCheck(roomId)) {
            const connectWebSocket = () => {
                ws.current = new WebSocket(`${socketUrl}`);

                ws.current.onopen = () => {
                    console.log('WebSocket connection established.');
                    const sessionToken = localStorage.getItem('sessionToken') || 'guest';
                    const connectMessage = JSON.stringify({
                        type: 'connect',
                        roomId,
                        sessionToken,
                    });
                    ws.current?.send(connectMessage);
                    console.log('Sent connect message:', connectMessage);
                };

                ws.current.onmessage = async (event) => {
                    try {
                        const data = JSON.parse(event.data);
                        console.log('Received message from server:', data);

                        if (data.type === 'connect' && data.status === 'success') {
                            console.log('Room data received:', data.data);

                            if (menuItems.length === 0) {
                                console.warn('menuItems is not ready yet. Storing WebSocket data.');
                                setPendingCartData(data.data);
                            } else {
                                setPendingCartData(data.data);
                                const cartItems = generateCartItems(menuItems, data.data, userInfo);
                                console.log('Generated CartItems from WebSocket data:', cartItems);
                                setCart(cartItems);
                            }

                            // 사용자 정보 갱신
                            console.log('Fetching updated user information...');
                            await fetchRoomInfo();
                        } else if (data.type === 'choice') {
                            if (data.data) {
                                setPendingCartData((prevData) => ({
                                    ...prevData,
                                    ...data.data,
                                }));
                                const cartItems = generateCartItems(menuItems, pendingCartData, userInfo);
                                setCart(cartItems);
                            } else {
                                console.error('Invalid room menu data:', data.data);
                            }

                            // 사용자 정보 갱신
                            console.log('Fetching updated user information...');
                            await fetchRoomInfo();
                        }
                    } catch (err) {
                        console.error('Error parsing WebSocket message:', err);
                    }
                };

                ws.current.onerror = (error) => {
                    console.error('WebSocket error:', error);
                };

                ws.current.onclose = () => {
                    console.log('WebSocket connection closed. Reconnecting in 5 seconds...');
                    setTimeout(() => {
                        connectWebSocket();
                    }, 5000);
                };
            };

            connectWebSocket();

            return () => {
                ws.current?.close();
                console.log('WebSocket connection cleaned up.');
            };
        }
    }, [roomId]);


    const fetchMenu = async () => {
        try {
            // 메뉴 데이터 가져오기
            const response: MenuItem[] = await axiosClient.get(`/room/${roomId}/menu`);

            const data = response.map((item) => ({
                ...item,
                originalDescription: item.description,
                originalAllergy: item.allergy,
            }));

            console.log('Menu data:', data);

            // 음식 사진 가져오기
            const itemsWithImages = await fetchImagesForMenuItems(data);
            console.log('Menu with images:', itemsWithImages);

            setMenuItems(itemsWithImages);

            // 메뉴 데이터와 pendingCartData를 결합하여 장바구니 데이터 생성
            if (Object.keys(pendingCartData).length > 0 && userInfo.length > 0) {
                const cartItems = generateCartItems(itemsWithImages, pendingCartData, userInfo);
                console.log('Generated CartItems with images:', cartItems);
                setCart(cartItems);

                // 임시 데이터 초기화
                setPendingCartData({});
            }

            // 다국어 처리
            if (currentLang !== 'ko') {
                const translatedData = await updateDescriptions(itemsWithImages);
                setMenuItems(translatedData);
            }
        } catch (error) {
            console.error('Failed to fetch menu:', error);
        }
    };

    const fetchMenuImages = async () => {
        try {
            // response가 배열임을 명확히 지정
            const response: { id: number; imageUrl: string }[] = await axiosClient.get(`/room/${roomId}/image`);
            setMenuImages(response);
        } catch (error) {
            console.error("Failed to fetch menu images:", error);
        }
    };

    const fetchRoomInfo = async () => {
        try {
            const response: any = await axiosClient.get(`/room/${roomId}`);
            const {memberList} = response;

            if (Array.isArray(memberList)) {
                setUserInfo(memberList);
            } else {
                console.error('Invalid memberList format:', memberList);
            }
        } catch (error) {
            console.error('Failed to fetch room info:', error);
        }
    }

    useEffect(() => {
        fetchMenu();
        fetchMenuImages();
        fetchRoomInfo();
    }, [roomId]);

    // menuItems와 menuImages가 모두 준비되면 메뉴판 사진과 메뉴 정보를 그룹화
    useEffect(() => {
        console.log('menuImages:', menuImages);
        console.log('menuItems:', menuItems);

        if (menuItems.length > 0 && menuImages.length > 0) {
            const groupedData = menuImages.map((image: any) => ({
                imageUrl: image.imageUrl,
                menu: menuItems.filter((menu) => menu.imageId === image.id),
            }));


            console.log('groupedData:', groupedData);
            console.log('groupedData length:', groupedData.length);

            // 빈 그룹은 제외하고 설정
            const filteredGroupedData = groupedData.filter((group) => group.menu.length > 0);

            console.log('filteredGroupedData:', filteredGroupedData)

            setGroupedData(filteredGroupedData);
        }
    }, [menuItems, menuImages]);


    useEffect(() => {
        if (currentLang !== 'ko') {
            const performTranslation = async () => {
                const translatedData = await updateDescriptions(menuItems);
                setMenuItems(translatedData);
            };

            performTranslation();
        }
    }, [currentLang]);

    useEffect(() => {
        if (menuItems.length > 0 && Object.keys(pendingCartData).length > 0 && userInfo.length > 0) {
            const cartItems = generateCartItems(menuItems, pendingCartData, userInfo);
            console.log('Generated CartItems:', cartItems);
            setCart(cartItems);

            // 임시 데이터 초기화
            setPendingCartData({});
        }
    }, [menuItems, pendingCartData, userInfo]);

    const updateDescriptions = async (items: MenuItem[]): Promise<MenuItem[]> => {
        if (currentLang === 'ko') return items;

        // description과 allergy를 하나의 배열로 묶어서 처리
        const textsToTranslate = items.flatMap((item) => [
            item.originalDescription,
            item.originalAllergy,
        ]);

        const translatedTexts = await translateTextsDirectly(textsToTranslate, currentLang);

        // 번역 결과를 description과 allergy로 나눠서 적용
        const updatedMenu = items.map((item, index) => {
            const descriptionIndex = index * 2; // 각 description의 인덱스
            const allergyIndex = descriptionIndex + 1; // 각 allergy의 인덱스
            return {
                ...item,
                description: translatedTexts[descriptionIndex] || item.description,
                allergy: translatedTexts[allergyIndex] || item.allergy,
            };
        });

        return updatedMenu;
    };

    const extractImageUrls = (response: any): string[] => {
        if (!response.items) return [];
        return response.items.map((item: any) => item.link);
    };

    const fetchImagesForMenuItems = async (items: MenuItem[]): Promise<MenuItem[]> => {
        const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
        const maxRetries = 3;
        const retryDelay = 300;

        try {
            const updatedItems: MenuItem[] = [];

            for (const item of items) {
                let imageUrl = '';
                let subUrl = '';
                let attempt = 0;

                while (attempt < maxRetries) {
                    try {
                        // API 요청
                        const response: any = await axiosClient.post('/menu/image', {
                            menuName: item.generalizedName,
                        });

                        // 응답에서 imageUrl과 subUrl 가져오기
                        imageUrl = response.imageUrl || '';
                        subUrl = response.subUrl || '';

                        // imageUrl이 https로 시작하면 http로 변경
                        if (imageUrl.startsWith('https://')) {
                            imageUrl = imageUrl.replace('https://', 'http://');
                        }

                        console.log('Fetched image for', item.menuName, ':', imageUrl, subUrl);

                        break; // 성공적으로 데이터를 가져오면 루프 종료
                    } catch (error) {
                        attempt++;
                        console.error(
                            `Attempt ${attempt} failed for ${item.menuName}:`,
                            error
                        );

                        if (attempt < maxRetries) {
                            console.log(`Retrying after ${retryDelay}ms...`);
                            await delay(retryDelay);
                        } else {
                            console.error(`Max retries reached for ${item.menuName}.`);
                        }
                    }
                }

                updatedItems.push({
                    ...item,
                    imageUrl: imageUrl || '',
                    subUrl: subUrl || '',
                });
            }

            return updatedItems;
        } catch (error) {
            console.error('Failed to fetch images for menu items:', error);
            return items.map((item) => ({
                ...item,
                imageUrl: '',
                subUrl: '', // 전체 요청 실패 시 기본값
            }));
        }
    };

    const handleAddToCart = (item: MenuItem, isGroup: boolean, quantity: number) => {
        if (!isLoggedIn) {
            alert(t('loginToOrder'));
            return;
        }

        // 기존 장바구니에서 해당 아이템의 수량 확인
        const existingCartItem = cart.find((cartItem) => cartItem.id === item.id);
        const currentQuantity = existingCartItem ? existingCartItem.quantity : 0;

        const updatedQuantity = quantity === -1 ? currentQuantity + 1 : quantity;

        // WebSocket 연결 상태 확인
        if (!ws.current || ws.current.readyState !== WebSocket.OPEN) {
            console.error('WebSocket is not open. Current state:', ws.current?.readyState);
            return;
        }

        const message = JSON.stringify({
            type: 'choice',
            menuId: item.id,
            isGroup,
            quantity: updatedQuantity, // 필드명을 quantity로 고정
        });

        ws.current.send(message);
        console.log('Sent choice message to WebSocket:', message);
    };

    // 메뉴명을 로마자로 변환
    const getDisplayName = (name: string) => {
        return currentLang === 'ko' ? name : getRomanizedName(name);
    };

    return (
        <div className="menu-container">
            <AppBar position="static" style={{backgroundColor: '#c62828', marginBottom: '16px'}}>
                <Toolbar>
                    <Typography variant="h6" style={{flexGrow: 1}} onClick={() => navigate('/')}>
                        {t('welcome')}
                    </Typography>
                    <IconButton color="inherit" title="Language Selector">
                        <LanguageSwitcher/>
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Container style={{paddingBottom: '50px', padding: '0'}}>
                <Slider {...sliderSettings}>
                    {groupedData.map((group, index) => (
                        <Container key={`group-${index}`}>
                            <Typography variant="h5" gutterBottom align="center">
                                {t('menuInformation')}
                            </Typography>

                            <img
                                src={group.imageUrl}
                                alt={`menu-${index}`}
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    borderRadius: '8px',
                                    marginBottom: '6px',
                                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                                }}
                            />

                            <Typography variant="body2" color="textSecondary" style={{padding: '10px', fontSize: '12px', marginBottom: '10px'}}>
                                {t('spicyAndAllergyWarning')}
                            </Typography>

                            <ActionButtons roomId={roomId}/>

                            <Grid container spacing={3}>
                                {group.menu.map((item: any) => (
                                    <Grid item xs={12} sm={6} md={4} key={item.id}>
                                        <Card
                                            style={{
                                                borderRadius: '16px',
                                                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
                                                backgroundColor: '#fff',
                                            }}
                                        >
                                            <CardMedia
                                                component="img"
                                                alt={item.menuName}
                                                height="200"
                                                image={item.imageUrl || defaultImage} // 기본 이미지를 초기값으로 사용
                                                onError={(e) => {
                                                    const target = e.target as HTMLImageElement;
                                                    target.onerror = null; // 무한 루프 방지
                                                    target.src = item.subUrl; // 이미지 로드 실패 시 대체 이미지로 재시도
                                                }}
                                                style={{ borderTopLeftRadius: '16px', borderTopRightRadius: '16px' }}
                                            />
                                            <CardContent>
                                                <Box
                                                    display="flex"
                                                    justifyContent="space-between"
                                                    alignItems="center"
                                                    style={{marginBottom: '8px'}}
                                                >
                                                    <Typography variant="h6"
                                                                style={{fontWeight: 'bold', color: '#123456', fontSize: '16px'}}>
                                                        {getDisplayName(item.menuName)}
                                                        {currentLang !== 'ko' && '(' + item.menuName + ')'}
                                                    </Typography>
                                                    <Typography variant="body1" color="textSecondary">
                                                        ₩{item.price.toLocaleString()}
                                                    </Typography>
                                                </Box>
                                                <Typography variant="body2" color="textSecondary"
                                                            style={{marginBottom: '8px'}}>
                                                    {currentLang === 'ko' ? item.originalDescription : item.description}
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary"
                                                            style={{marginBottom: '8px'}}>
                                                    <strong>{t('allergy')}:</strong> {currentLang === 'ko' ? item.originalAllergy : item.allergy || t('none')}
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary"
                                                            style={{marginBottom: '8px'}}>
                                                    <strong>{t('spicy')}:</strong>
                                                    {Array(item.spicyLevel)
                                                        .fill("🌶️")
                                                        .map((icon, index) => (
                                                            <span key={index}
                                                                  style={{fontSize: '16px', marginLeft: '2px'}}>
                                                        {icon}
                                                    </span>
                                                        ))}
                                                </Typography>


                                                <Box display="flex" justifyContent="space-between" gap="8px">
                                                    <Button
                                                        variant="contained"
                                                        startIcon={<AddShoppingCartIcon/>}
                                                        style={{
                                                            backgroundColor: '#007bff',
                                                            color: '#fff',
                                                            fontWeight: 'bold',
                                                            textTransform: 'none',
                                                            borderRadius: '8px',
                                                            padding: '8px 12px',
                                                            flex: 1,
                                                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                                            fontSize: '13px',
                                                        }}
                                                        onClick={() => handleAddToCart(item, false, -1)}
                                                    >
                                                        {t('forMyself')}
                                                    </Button>

                                                    <Button
                                                        variant="contained"
                                                        startIcon={<ShareIcon/>}
                                                        style={{
                                                            backgroundColor: '#ff6f42',
                                                            color: '#fff',
                                                            fontWeight: 'bold',
                                                            textTransform: 'none',
                                                            borderRadius: '8px',
                                                            padding: '8px 12px',
                                                            flex: 1,
                                                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                                            fontSize: '13px',
                                                        }}
                                                        onClick={() => handleAddToCart(item, true, -1)}
                                                    >
                                                        {t('forEveryone')}
                                                    </Button>
                                                </Box>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Container>
                    ))}
                </Slider>
            </Container>

            {
                isLoggedIn && (
                    <FooterWithCart menu={menuItems} cart={cart} handleAddToCart={handleAddToCart} getDisplayName={getDisplayName} />
                )
            }

        </div>
    );
};

export default Menu;

import {CartItem, MenuItem} from "../type/types";

export const generateCartItems = (
    menuItems: MenuItem[],
    websocketData: Record<string, any>,
    userInfo: any[]
): CartItem[] => {
    const cartItems: CartItem[] = [];

    Object.entries(websocketData).forEach(([menuKey, value]) => {
        const matchingItem = menuItems.find((item) => item.id === Number(menuKey));

        if (matchingItem) {
            // value 객체의 각 sessionToken(key)과 quantity(value)를 순회
            Object.entries(value as Record<string, string>).forEach(([sessionToken, quantity]) => {
                const user = userInfo.find((u) => u.sessionToken === sessionToken) || {};

                // 공용 그룹 처리
                const isGroup = sessionToken === 'group';
                const userName = isGroup ? 'Shared Group' : user.username || 'default-user-name';
                const userId = isGroup ? 'shared-group-id' : user.id || 'default-user-id';

                if(Number(quantity) === 0) {
                    return;
                }

                // CartItem 생성 및 추가
                cartItems.push({
                    id: matchingItem.id,
                    roomId: matchingItem.roomId,
                    imageId: matchingItem.imageId,
                    imageUrl: matchingItem.imageUrl,
                    menuName: matchingItem.menuName,
                    price: matchingItem.price,
                    status: matchingItem.status,
                    sessionToken: sessionToken,
                    userId: userId,
                    userName: userName,
                    quantity: Number(quantity),
                });
            });
        } else {
            console.warn(`No matching MenuItem found for menuKey: ${menuKey}`);
        }
    });

    return cartItems;
};

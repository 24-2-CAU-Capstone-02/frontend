import {CartItem, MenuItem} from "../pages/Menu";

export const generateCartItems = (menuItems: MenuItem[], websocketData: Record<string, any>): CartItem[] => {
    return Object.entries(websocketData).map(([key, value]) => {
        const matchingItem = menuItems.find((item) => item.id === Number(key));

        if (matchingItem) {
            return {
                id: matchingItem.id,
                roomId: matchingItem.roomId,
                imageId: matchingItem.imageId,
                imageUrl: matchingItem.imageUrl,
                menuName: matchingItem.menuName,
                price: matchingItem.price,
                status: matchingItem.status,
                sessionToken: localStorage.getItem('sessionToken') || 'guest',
                userId: (value as any).userId || 'default-user-id',
                userName: (value as any).userName || 'default-user-name',
            };
        } else {
            console.warn(`No matching MenuItem found for key: ${key}`);
            return null;
        }
    }).filter((item): item is CartItem => item !== null);
};
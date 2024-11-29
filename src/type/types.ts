export interface MenuItem {
    id: number;
    roomId: number;
    imageId: number;
    imageUrl: string;
    menuName: string;
    price: number;
    status: string;
    description: string;
    originalDescription: string;
    generalizedName: string;
    allergy: string;
    originalAllergy: string;
    spicyLevel: number;
    quantity: number;
}

export interface CartItem {
    id: number;
    roomId: number;
    imageId: number;
    imageUrl: string;
    menuName: string;
    price: number;
    status: string;
    sessionToken: string;
    userId: string;
    userName: string;
    quantity: number;
}
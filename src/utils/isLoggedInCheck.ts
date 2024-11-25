export const isLoggedInCheck = (roomId: string): boolean => {
    const storedRoomId = localStorage.getItem('roomId');
    const storedUsername = localStorage.getItem('username');
    const sessionToken = localStorage.getItem('sessionToken');

    return storedRoomId === roomId && !!storedUsername && !!sessionToken;
};
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
    resources: {
        en: {
            translation: {

                "welcome": "Globab",
                "popular": "Popular Dishes",
                "createRoomError": "Failed to create room. Please try again.",
                "captureMenu": "Capture Menu",
                "boneGuk": "Bone Soup",
                "spicyPork": "Spicy Pork",
                "gamjatang": "Gamjatang (Pork Bone Soup)",
                "jeyukbokkeum": "Jeyuk Bokkeum (Spicy Pork Stir-fry)",
                "menuInformation": "Menu Information",
                "shareStart": "Share",
                "login": "Login",

                "languageSelector": "Language Selector",
                "createRoom": "Create Room",
                "loginWithGoogle": "Login with Google",
                "error": {
                    "createRoom": "Failed to create room",
                    "fetchUserInfo": "Failed to fetch user info",
                    "loginFailed": "Google Login failed. Please try again.",
                    "sessionExpired": "Your session has expired. Please log in again."
                },

                "description": {
                    "boneGuk": "A nourishing soup made with beef bones, perfect for a hangover.",
                    "spicyPork": "A spicy stir-fried pork dish, perfect to enjoy with rice.",
                    "gamjatang": "A spicy Korean pork bone soup with potatoes and vegetables.",
                    "jeyukbokkeum": "A stir-fried spicy pork dish, served with steamed rice.",
                },
                "analysis": {
                    "boneGuk": "Rich and savory, with a hint of spice; ideal for comfort food.",
                    "spicyPork": "Spiciness level is moderate, suitable for most consumers.",
                    "gamjatang": "Hearty and spicy, with a strong flavor from pork bones.",
                    "jeyukbokkeum": "Medium spiciness, balanced with sweet and savory flavors.",
                },
                "nutrition": {
                    "calories": "Calories",
                    "carbohydrate": "Carbohydrate",
                    "protein": "Protein",
                    "fat": "Fat",
                },

                // room
                "createRoomDescription": "Create a room to analyze menus. Username is required, password is optional.",
                "username": "Username",
                "passwordOptional": "Password (Optional)",
                "passwordOptionalHelp": "Leave blank if no password is required.",
                "join": "Join Room",
                "noPassword": "No password provided",
                "Home": "Home",
                "Settings": "Settings",
                "usernameRequired": "Username is required.",

                // camera
                "cameraSelect": "Camera Select",
                "uploadMenuImage": "Upload Menu Image",
                "chooseFile": "Choose File",
                "upload": "Upload",
                "selectImageAlert": "Please select an image.",
                "uploadSuccess": "Image uploaded successfully!",
                "uploadError": "Failed to upload image.",
                "home": "Home",
                "settings": "Settings",

                // share
                "shareTitle": "Check out this room!",
                "shareMessage": "Join the room with ID: {{roomId}}.",
                "menuInvitation": "Let's choose the menu together!",
                "shareNotSupported": "Sharing is not supported on this device.",

                // cart
                "showCart": "Show Cart",
                "selectedMenuItems": "Selected Menu Items",
                "price": "Price",
                "total": "Total",
                "close": "Close",
                "forMyself": "For Myself",
                "forEveryone": "For Everyone",
                "sharedMenu": "Shared Menu",
                "personalMenu": "Personal Menu",
                "loginToOrder": "Please log in to order.",
            }
        },
        ko: {
            translation: {
                "welcome": "Globab",
                "popular": "인기 메뉴",
                "createRoomError": "방 생성에 실패했습니다. 다시 시도해주세요.",
                "captureMenu": "메뉴 촬영",
                "boneGuk": "뼈해장국",
                "spicyPork": "제육볶음",
                "gamjatang": "감자탕",
                "jeyukbokkeum": "제육볶음",
                "menuInformation": "메뉴 정보",
                "shareStart": "공유하기",
                "login": "로그인",

                "languageSelector": "언어 선택",
                "createRoom": "방 생성",
                "loginWithGoogle": "구글로 로그인",
                "error": {
                    "createRoom": "방 생성에 실패했습니다.",
                    "fetchUserInfo": "사용자 정보를 가져오는데 실패했습니다.",
                    "loginFailed": "구글 로그인에 실패했습니다. 다시 시도해주세요.",
                    "sessionExpired": "세션이 만료되었습니다. 다시 로그인해주세요.",
                },

                "description": {
                    "boneGuk": "해장에 좋은 소 뼈로 만든 영양 국.",
                    "spicyPork": "밥과 함께 즐기기 좋은 매운 제육볶음.",
                    "gamjatang": "매운 돼지 뼈 국으로, 감자와 채소가 들어갑니다.",
                    "jeyukbokkeum": "밥과 함께 먹는 매콤한 돼지고기 볶음 요리.",
                },
                "analysis": {
                    "boneGuk": "풍부하고 진한 맛, 약간의 매운맛; 편안한 음식에 이상적입니다.",
                    "spicyPork": "매운 정도는 보통, 대부분의 소비자에게 적합합니다.",
                    "gamjatang": "진하고 매콤한 맛, 돼지 뼈의 깊은 풍미가 특징입니다.",
                    "jeyukbokkeum": "중간 정도의 매운맛, 달콤하고 짭짤한 맛이 조화롭습니다.",
                },
                "nutrition": {
                    "calories": "칼로리",
                    "carbohydrate": "탄수화물",
                    "protein": "단백질",
                    "fat": "지방",
                },

                // room
                "createRoomDescription": "메뉴 분석을 위해 방을 생성하세요. 사용자 이름은 필수, 비밀번호는 선택입니다.",
                "username": "사용자 이름",
                "passwordOptional": "비밀번호 (선택 사항)",
                "passwordOptionalHelp": "비밀번호가 필요하지 않으면 비워두세요.",
                "join": "방 참여",
                "noPassword": "비밀번호가 제공되지 않음",
                "Home": "홈",
                "Settings": "설정",
                "usernameRequired": "사용자 이름을 입력해주세요.",

                // camera
                "cameraSelect": "카메라 선택",
                "uploadMenuImage": "메뉴 이미지 업로드",
                "chooseFile": "파일 선택",
                "upload": "업로드",
                "selectImageAlert": "이미지를 선택해주세요.",
                "uploadSuccess": "이미지가 성공적으로 업로드되었습니다!",
                "uploadError": "이미지 업로드에 실패했습니다.",
                "home": "홈",
                "settings": "설정",

                // share
                "shareTitle": "이 방을 확인해보세요!",
                "shareMessage": "ID: {{roomId}}로 방에 참여하세요.",
                "menuInvitation": "함께 메뉴를 선택해봐요!",
                "shareNotSupported": "이 기기에서는 공유가 지원되지 않습니다.",

                // cart
                "showCart": "카트 보기",
                "selectedMenuItems": "선택한 메뉴 항목",
                "price": "가격",
                "total": "총계",
                "close": "닫기",
                "forMyself": "개인용",
                "forEveryone": "공유용",
                "sharedMenu": "공유된 메뉴",
                "personalMenu": "개인 메뉴",
                "loginToOrder": "주문을 위해 로그인해주세요.",
            }
        }
    },
    lng: "en", // 기본 언어
    fallbackLng: "en",
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;

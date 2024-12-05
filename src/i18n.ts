import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
    resources: {
        en: {
            translation: {
                "welcome": "Globob",
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
                "allergy": "Allergy",
                "spicy": "Spicy",

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
                "unauthorizedAccess": "Please check the password.",

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
                "spicyAndAllergyWarning": "Spiciness and allergy information may vary by restaurant. Please double-check with the restaurant.",

                // language switcher
                "languageSwitcher": {
                    "selectLanguage": "Select Language"
                },
                "languages": {
                    "english": "English",
                    "korean": "Korean",
                    "spanish": "Spanish",
                    "french": "French",
                    "japanese": "Japanese",
                    "chinese": "Chinese"
                },
                "actions": {
                    "close": "Close"
                }
            }
        },
        ja: {
            translation: {
                "welcome": "ようこそ",
                "popular": "人気メニュー",
                "createRoomError": "ルームの作成に失敗しました。再試行してください。",
                "captureMenu": "メニューを撮影",
                "boneGuk": "骨スープ",
                "spicyPork": "辛い豚炒め",
                "gamjatang": "カムジャタン（豚骨スープ）",
                "jeyukbokkeum": "ジェユクポックム（辛い豚炒め）",
                "menuInformation": "メニュー情報",
                "shareStart": "共有する",
                "login": "ログイン",
                "allergy": "アレルギー",
                "spicy": "辛さ",

                "languageSelector": "言語選択",
                "createRoom": "ルームを作成",
                "loginWithGoogle": "Googleでログイン",
                "error": {
                    "createRoom": "ルームの作成に失敗しました。",
                    "fetchUserInfo": "ユーザー情報の取得に失敗しました。",
                    "loginFailed": "Googleログインに失敗しました。再試行してください。",
                    "sessionExpired": "セッションが期限切れです。再度ログインしてください。",
                },

                "description": {
                    "boneGuk": "牛骨で作られた滋養スープ。二日酔いに最適。",
                    "spicyPork": "ご飯と一緒に楽しむ辛い豚炒め。",
                    "gamjatang": "ジャガイモと野菜が入った辛い韓国の豚骨スープ。",
                    "jeyukbokkeum": "辛い豚炒め料理。蒸しご飯と一緒に提供されます。",
                },

                "analysis": {
                    "boneGuk": "濃厚で風味豊か。快適な食事に最適です。",
                    "spicyPork": "辛さは中程度で、多くの人に適しています。",
                    "gamjatang": "豚骨の深い風味が特徴のボリューム満点で辛いスープ。",
                    "jeyukbokkeum": "甘さと辛さが調和した中辛料理。",
                },

                "nutrition": {
                    "calories": "カロリー",
                    "carbohydrate": "炭水化物",
                    "protein": "タンパク質",
                    "fat": "脂肪",
                },

                // room
                "createRoomDescription": "メニューを分析するためにルームを作成します。ユーザー名は必須、パスワードはオプションです。",
                "username": "ユーザー名",
                "passwordOptional": "パスワード（任意）",
                "passwordOptionalHelp": "パスワードが必要ない場合は空欄のままにしてください。",
                "join": "ルームに参加",
                "noPassword": "パスワードが提供されていません",
                "Home": "ホーム",
                "Settings": "設定",
                "usernameRequired": "ユーザー名が必要です。",
                "unauthorizedAccess": "パスワードを確認してください。",

                // camera
                "cameraSelect": "カメラを選択",
                "uploadMenuImage": "メニュー画像をアップロード",
                "chooseFile": "ファイルを選択",
                "upload": "アップロード",
                "selectImageAlert": "画像を選択してください。",
                "uploadSuccess": "画像が正常にアップロードされました！",
                "uploadError": "画像のアップロードに失敗しました。",
                "home": "ホーム",
                "settings": "設定",

                // share
                "shareTitle": "このルームをチェックしてください！",
                "shareMessage": "ルームID: {{roomId}} でルームに参加してください。",
                "menuInvitation": "一緒にメニューを選びましょう！",
                "shareNotSupported": "このデバイスでは共有がサポートされていません。",

                // cart
                "showCart": "カートを表示",
                "selectedMenuItems": "選択したメニュー項目",
                "price": "価格",
                "total": "合計",
                "close": "閉じる",
                "forMyself": "個人用",
                "forEveryone": "共有用",
                "sharedMenu": "共有メニュー",
                "personalMenu": "個人メニュー",
                "loginToOrder": "注文するにはログインしてください。",
                "spicyAndAllergyWarning": "辛さやアレルギー情報は店舗ごとに異なる場合があります。店舗に確認してください。",

                // language switcher
                "languageSwitcher": {
                    "selectLanguage": "言語を選択"
                },
                "languages": {
                    "english": "英語",
                    "korean": "韓国語",
                    "spanish": "スペイン語",
                    "french": "フランス語",
                    "japanese": "日本語",
                    "chinese": "中国語"
                },
                "actions": {
                    "close": "閉じる"
                }
            }
        },
        zh: {
            translation: {
                "welcome": "欢迎",
                "popular": "热门菜品",
                "createRoomError": "创建房间失败，请重试。",
                "captureMenu": "拍摄菜单",
                "boneGuk": "牛骨汤",
                "spicyPork": "辣炒猪肉",
                "gamjatang": "辣猪骨汤",
                "jeyukbokkeum": "辣炒猪肉",
                "menuInformation": "菜单信息",
                "shareStart": "分享",
                "login": "登录",
                "allergy": "过敏原",
                "spicy": "辣度",

                "languageSelector": "语言选择",
                "createRoom": "创建房间",
                "loginWithGoogle": "使用 Google 登录",
                "error": {
                    "createRoom": "创建房间失败",
                    "fetchUserInfo": "获取用户信息失败",
                    "loginFailed": "Google 登录失败，请重试。",
                    "sessionExpired": "会话已过期，请重新登录。",
                },

                "description": {
                    "boneGuk": "用牛骨熬制的滋补汤，非常适合解酒。",
                    "spicyPork": "适合搭配米饭的辣炒猪肉。",
                    "gamjatang": "包含土豆和蔬菜的韩式辣猪骨汤。",
                    "jeyukbokkeum": "辛辣的猪肉炒菜，配蒸米饭食用。",
                },

                "analysis": {
                    "boneGuk": "浓郁香醇，适合作为舒适食品。",
                    "spicyPork": "中等辣度，适合大多数人。",
                    "gamjatang": "味道浓郁辛辣，猪骨香味十足。",
                    "jeyukbokkeum": "中辣，甜味和咸味平衡。",
                },

                "nutrition": {
                    "calories": "卡路里",
                    "carbohydrate": "碳水化合物",
                    "protein": "蛋白质",
                    "fat": "脂肪",
                },

                // room
                "createRoomDescription": "创建一个房间来分析菜单。用户名是必填项，密码是可选项。",
                "username": "用户名",
                "passwordOptional": "密码（可选）",
                "passwordOptionalHelp": "如果不需要密码，请留空。",
                "join": "加入房间",
                "noPassword": "未提供密码",
                "Home": "主页",
                "Settings": "设置",
                "usernameRequired": "用户名是必填项。",
                "unauthorizedAccess": "请检查密码是否正确。",

                // camera
                "cameraSelect": "选择相机",
                "uploadMenuImage": "上传菜单图片",
                "chooseFile": "选择文件",
                "upload": "上传",
                "selectImageAlert": "请选择图片。",
                "uploadSuccess": "图片上传成功！",
                "uploadError": "图片上传失败。",
                "home": "主页",
                "settings": "设置",

                // share
                "shareTitle": "快来看看这个房间！",
                "shareMessage": "使用 ID: {{roomId}} 加入房间。",
                "menuInvitation": "一起来选择菜单吧！",
                "shareNotSupported": "该设备不支持分享功能。",

                // cart
                "showCart": "查看购物车",
                "selectedMenuItems": "已选择的菜单项",
                "price": "价格",
                "total": "总计",
                "close": "关闭",
                "forMyself": "个人用",
                "forEveryone": "共享用",
                "sharedMenu": "共享菜单",
                "personalMenu": "个人菜单",
                "loginToOrder": "请登录后再下单。",
                "spicyAndAllergyWarning": "辣味和过敏原信息因餐厅而异，请咨询餐厅确认。",

                // language switcher
                "languageSwitcher": {
                    "selectLanguage": "选择语言"
                },
                "languages": {
                    "english": "英语",
                    "korean": "韩语",
                    "spanish": "西班牙语",
                    "french": "法语",
                    "japanese": "日语",
                    "chinese": "中文"
                },
                "actions": {
                    "close": "关闭"
                }
            }
        },
        es: {
            translation: {
                "welcome": "Bienvenido",
                "popular": "Platos populares",
                "createRoomError": "Error al crear la sala. Por favor, inténtelo de nuevo.",
                "captureMenu": "Capturar menú",
                "boneGuk": "Sopa de hueso",
                "spicyPork": "Cerdo picante",
                "gamjatang": "Gamjatang (Sopa picante de hueso de cerdo)",
                "jeyukbokkeum": "Jeyuk Bokkeum (Salteado de cerdo picante)",
                "menuInformation": "Información del menú",
                "shareStart": "Compartir",
                "login": "Iniciar sesión",
                "allergy": "Alergias",
                "spicy": "Picante",

                "languageSelector": "Selector de idioma",
                "createRoom": "Crear sala",
                "loginWithGoogle": "Iniciar sesión con Google",
                "error": {
                    "createRoom": "Error al crear la sala",
                    "fetchUserInfo": "Error al obtener información del usuario",
                    "loginFailed": "Fallo al iniciar sesión con Google. Por favor, inténtelo de nuevo.",
                    "sessionExpired": "Su sesión ha expirado. Por favor, inicie sesión de nuevo.",
                },

                "description": {
                    "boneGuk": "Una sopa nutritiva hecha con huesos de res, perfecta para la resaca.",
                    "spicyPork": "Un plato de cerdo salteado picante, perfecto para disfrutar con arroz.",
                    "gamjatang": "Sopa picante coreana de hueso de cerdo con papas y verduras.",
                    "jeyukbokkeum": "Plato de cerdo salteado picante, servido con arroz al vapor.",
                },

                "analysis": {
                    "boneGuk": "Rico y sabroso, con un toque picante; ideal como comida reconfortante.",
                    "spicyPork": "Nivel de picante moderado, adecuado para la mayoría de los consumidores.",
                    "gamjatang": "Fuerte y picante, con un sabor intenso de los huesos de cerdo.",
                    "jeyukbokkeum": "Picante moderado, equilibrado con sabores dulces y salados.",
                },

                "nutrition": {
                    "calories": "Calorías",
                    "carbohydrate": "Carbohidratos",
                    "protein": "Proteínas",
                    "fat": "Grasas",
                },

                // room
                "createRoomDescription": "Cree una sala para analizar los menús. El nombre de usuario es obligatorio, la contraseña es opcional.",
                "username": "Nombre de usuario",
                "passwordOptional": "Contraseña (opcional)",
                "passwordOptionalHelp": "Déjelo en blanco si no se requiere contraseña.",
                "join": "Unirse a la sala",
                "noPassword": "No se proporcionó contraseña",
                "Home": "Inicio",
                "Settings": "Configuración",
                "usernameRequired": "El nombre de usuario es obligatorio.",
                "unauthorizedAccess": "Por favor, verifique la contraseña.",

                // camera
                "cameraSelect": "Seleccionar cámara",
                "uploadMenuImage": "Subir imagen del menú",
                "chooseFile": "Seleccionar archivo",
                "upload": "Subir",
                "selectImageAlert": "Por favor, seleccione una imagen.",
                "uploadSuccess": "¡Imagen subida exitosamente!",
                "uploadError": "Error al subir la imagen.",
                "home": "Inicio",
                "settings": "Configuración",

                // share
                "shareTitle": "¡Echa un vistazo a esta sala!",
                "shareMessage": "Únase a la sala con el ID: {{roomId}}.",
                "menuInvitation": "¡Vamos a elegir el menú juntos!",
                "shareNotSupported": "Compartir no es compatible con este dispositivo.",

                // cart
                "showCart": "Ver carrito",
                "selectedMenuItems": "Artículos seleccionados del menú",
                "price": "Precio",
                "total": "Total",
                "close": "Cerrar",
                "forMyself": "Para mí",
                "forEveryone": "Para todos",
                "sharedMenu": "Menú compartido",
                "personalMenu": "Menú personal",
                "loginToOrder": "Por favor, inicie sesión para realizar un pedido.",
                "spicyAndAllergyWarning": "La información sobre picante y alérgenos puede variar según el restaurante. Por favor, confirme con el restaurante.",

                // language switcher
                "languageSwitcher": {
                    "selectLanguage": "Seleccione idioma"
                },
                "languages": {
                    "english": "Inglés",
                    "korean": "Coreano",
                    "spanish": "Español",
                    "french": "Francés",
                    "japanese": "Japonés",
                    "chinese": "Chino"
                },
                "actions": {
                    "close": "Cerrar"
                }
            }
        },
        fr: {
            translation: {
                "welcome": "Bienvenue",
                "popular": "Plats populaires",
                "createRoomError": "Échec de la création de la salle. Veuillez réessayer.",
                "captureMenu": "Capturer le menu",
                "boneGuk": "Soupe d'os",
                "spicyPork": "Porc épicé",
                "gamjatang": "Gamjatang (Soupe d'os de porc épicée)",
                "jeyukbokkeum": "Jeyuk Bokkeum (Porc épicé sauté)",
                "menuInformation": "Informations sur le menu",
                "shareStart": "Partager",
                "login": "Se connecter",
                "allergy": "Allergènes",
                "spicy": "Épicé",

                "languageSelector": "Sélecteur de langue",
                "createRoom": "Créer une salle",
                "loginWithGoogle": "Se connecter avec Google",
                "error": {
                    "createRoom": "Échec de la création de la salle",
                    "fetchUserInfo": "Échec de la récupération des informations utilisateur",
                    "loginFailed": "Échec de la connexion avec Google. Veuillez réessayer.",
                    "sessionExpired": "Votre session a expiré. Veuillez vous reconnecter.",
                },

                "description": {
                    "boneGuk": "Une soupe nourrissante à base d'os de bœuf, parfaite pour la gueule de bois.",
                    "spicyPork": "Un plat de porc sauté épicé, parfait à savourer avec du riz.",
                    "gamjatang": "Soupe coréenne épicée à base d'os de porc avec des pommes de terre et des légumes.",
                    "jeyukbokkeum": "Un plat de porc sauté épicé, servi avec du riz vapeur.",
                },

                "analysis": {
                    "boneGuk": "Riche et savoureux, avec une touche épicée ; idéal pour un repas réconfortant.",
                    "spicyPork": "Niveau d'épice modéré, adapté à la plupart des consommateurs.",
                    "gamjatang": "Copieux et épicé, avec une forte saveur des os de porc.",
                    "jeyukbokkeum": "Épicé modéré, équilibré avec des saveurs sucrées et salées.",
                },

                "nutrition": {
                    "calories": "Calories",
                    "carbohydrate": "Glucides",
                    "protein": "Protéines",
                    "fat": "Lipides",
                },

                // room
                "createRoomDescription": "Créez une salle pour analyser les menus. Le nom d'utilisateur est requis, le mot de passe est facultatif.",
                "username": "Nom d'utilisateur",
                "passwordOptional": "Mot de passe (facultatif)",
                "passwordOptionalHelp": "Laissez vide si aucun mot de passe n'est requis.",
                "join": "Rejoindre la salle",
                "noPassword": "Aucun mot de passe fourni",
                "Home": "Accueil",
                "Settings": "Paramètres",
                "usernameRequired": "Le nom d'utilisateur est requis.",
                "unauthorizedAccess": "Veuillez vérifier le mot de passe.",

                // camera
                "cameraSelect": "Sélectionner la caméra",
                "uploadMenuImage": "Télécharger une image du menu",
                "chooseFile": "Choisir un fichier",
                "upload": "Télécharger",
                "selectImageAlert": "Veuillez sélectionner une image.",
                "uploadSuccess": "Image téléchargée avec succès !",
                "uploadError": "Échec du téléchargement de l'image.",
                "home": "Accueil",
                "settings": "Paramètres",

                // share
                "shareTitle": "Découvrez cette salle !",
                "shareMessage": "Rejoignez la salle avec l'ID : {{roomId}}.",
                "menuInvitation": "Choisissons le menu ensemble !",
                "shareNotSupported": "Le partage n'est pas pris en charge sur cet appareil.",

                // cart
                "showCart": "Voir le panier",
                "selectedMenuItems": "Éléments sélectionnés",
                "price": "Prix",
                "total": "Total",
                "close": "Fermer",
                "forMyself": "Pour moi",
                "forEveryone": "Pour tous",
                "sharedMenu": "Menu partagé",
                "personalMenu": "Menu personnel",
                "loginToOrder": "Veuillez vous connecter pour commander.",
                "spicyAndAllergyWarning": "Les informations sur les épices et les allergies peuvent varier selon le restaurant. Veuillez vérifier auprès du restaurant.",

                // language switcher
                "languageSwitcher": {
                    "selectLanguage": "Sélectionner une langue"
                },
                "languages": {
                    "english": "Anglais",
                    "korean": "Coréen",
                    "spanish": "Espagnol",
                    "french": "Français",
                    "japanese": "Japonais",
                    "chinese": "Chinois"
                },
                "actions": {
                    "close": "Fermer"
                }
            }
        },
        ko: {
            translation: {
                "welcome": "Globob",
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
                "unauthorizedAccess": "비밀번호를 확인해주세요.",
                "allergy": "알레르기",
                "spicy": "맵기",

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
                "spicyAndAllergyWarning": "맵기와 알레르기 정보는 음식점마다 다를 수 있습니다. 음식점에 문의해주세요.",

                // language
                "languageSwitcher": {
                    "selectLanguage": "언어 선택"
                },
                "languages": {
                    "english": "영어",
                    "korean": "한국어",
                    "spanish": "스페인어",
                    "french": "프랑스어",
                    "japanese": "일본어",
                    "chinese": "중국어"
                },
                "actions": {
                    "close": "닫기"
                }
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

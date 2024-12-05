declare module "slick-carousel" {
    interface SlickOptions {
        infinite?: boolean;
        slidesToShow?: number;
        slidesToScroll?: number;
        arrows?: boolean;
        dots?: boolean;
        autoplay?: boolean;
        autoplaySpeed?: number;
        [key: string]: any; // 필요한 옵션을 여기에 추가
    }

    interface JQuery {
        slick(options?: SlickOptions | "unslick"): JQuery;
    }
}
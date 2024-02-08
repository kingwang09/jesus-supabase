import { convertStringToEnum } from "../utils/string.util";
import { CrawlingMallType } from "./interfaces/crawling.interface";

const main = () => {
    const value = CrawlingMallType.COUPANG;
    console.log(value);

    const value2 = convertStringToEnum(CrawlingMallType, 'coupang');
    console.log(value2);
    console.log(typeof value2);
    console.log(value2 === CrawlingMallType.COUPANG);

};

main();
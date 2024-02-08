import { CrawlingMallType } from "./crawling.interface";

interface IChart {
    mallType?: CrawlingMallType | null;
    chartBody?: IChartBodyByDate[]
}

interface IChartBodyByDate {
    dateKey : string,
    price: number,
}

export type {
    IChart, IChartBodyByDate,
}
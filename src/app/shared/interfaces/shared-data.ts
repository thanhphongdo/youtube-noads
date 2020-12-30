import { VideoInterface } from './video';
export interface SharedDataInterface {
    homeData?: {
        videos: Array<VideoInterface>,
        visitorData: string;
        token: string;
    }
}
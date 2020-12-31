export interface VideoInterface {
    id?: string;
    thumbnail?: Array<{
        url: string;
        width: number;
        height: number;
    }>;
    src?: Array<{
        url: string;
        quality: string;
    }>;
    owner?: {
        name: string;
        thumbnailUrl: string;
    };
    info?: {
        viewCountText: string;
        timeText: string;
        title: string;
    }
}
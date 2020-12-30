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
    }>
}
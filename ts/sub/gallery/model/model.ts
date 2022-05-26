// **: MODEL
export interface Section{
    title: string;
    subdirectory: string;
    description: string;
    number?: number;
}

export interface Photo {
    fileName: string;
    altText: string;
    description: string;
}
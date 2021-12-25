export interface Attachment {
    type: "success";
    name: string;
    size?: number;
    uri: string;
    mimeType?: string;
    lastModified?: number;
    file?: File;
    output?: FileList | null;
}

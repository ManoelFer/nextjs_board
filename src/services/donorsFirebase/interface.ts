import { DocumentData } from "firebase/firestore";
export interface IDonor {
    donate: boolean;
    lastDonate: Date;
    lastDonateFormatted?: string;
    image: string;
    userId?: string;
}

export interface IMethodsCRUDDonors {
    registerDonor: ({ donate, lastDonate, image, userId }: IDonor) => Promise<IDonor>;
    getDonors: () => Promise<DocumentData[] | []>;
    getDonor: (docId: string) => Promise<IDonor | null>;
}
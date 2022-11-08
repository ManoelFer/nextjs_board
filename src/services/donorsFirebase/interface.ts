export interface IDonor {
    donate: boolean; lastDonate: Date; image: string;
}

export interface IMethodsCRUDDonors {
    registerDonor: ({ donate, lastDonate, image }: IDonor) => Promise<IDonor>;
}
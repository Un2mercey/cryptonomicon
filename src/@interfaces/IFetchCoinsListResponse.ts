import { IBase } from '@/@interfaces';

export interface IFetchCoinsListResponse {
    [key: string]: {
        Id: string;
        Url: string;
        ImageUrl: string;
        ContentCreatedOn: number;
        Name: string;
        Symbol: string
        CoinName: string;
        FullName: string;
        Description: string;
        AssetTokenStatus: string;
        Algorithm: string;
        ProofType: string;
        SortOrder: string;
        Sponsored: boolean;
        Taxonomy: IBase;
        Rating: { Weiss: IBase };
        IsTrading: boolean;
        TotalCoinsMined: number;
        CirculatingSupply: number;
        BlockNumber: number;
        NetHashesPerSecond: unknown;
        BlockReward: number;
        BlockTime: number;
        AssetLaunchDate: Date;
        AssetWhitepaperUrl: string;
        AssetWebsiteUrl: string;
        MaxSupply: number;
        MktCapPenalty: number;
        IsUsedInDefi: number;
        IsUsedInNft: number;
        PlatformType: string;
        AlgorithmType: string;
        Difficulty: number;
    }
}

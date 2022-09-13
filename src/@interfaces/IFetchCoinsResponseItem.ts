import { Base } from '@/@types';

export interface IFetchCoinsResponseItem {
    Id: string;
    Url: string;
    ImageUrl: string;
    ContentCreatedOn: number;
    Name: string;
    Symbol: string;
    CoinName: string;
    FullName: string;
    Description: string;
    AssetTokenStatus: string;
    Algorithm: string;
    ProofType: string;
    SortOrder: string;
    Sponsored: boolean;
    Taxonomy: Base;
    Rating: { Weiss: Base };
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

import { find } from 'lodash';
import { ICoin, IFetchCoinsResponseItem } from '@/@interfaces';
import { CoinName, FetchCoinsResponse, Undefined } from '@/@types';

type CoinsConverter = (from: FetchCoinsResponse) => ICoin[];
export const coinsConverter: CoinsConverter = (from: FetchCoinsResponse): ICoin[] => {
    return Object.values(from).map(
        (coin: IFetchCoinsResponseItem): ICoin => ({
            id: coin.Id,
            imageUrl: coin.ImageUrl,
            name: coin.Name,
            symbol: coin.Symbol,
            coinName: coin.CoinName,
            fullCoinName: coin.FullName,
            description: coin.Description,
            isTrading: coin.IsTrading,
            currency: null,
        })
    );
};

type CoinFinder = (where: ICoin[], what: CoinName) => Undefined<ICoin>;
export const coinFinder: CoinFinder = (where: ICoin[], what: CoinName): Undefined<ICoin> => {
    const predicate: (coin: ICoin) => boolean = (coin: ICoin) =>
        coin.name.toLowerCase() === what.toLowerCase() &&
        coin.symbol.toLowerCase() === what.toLowerCase() &&
        coin.fullCoinName.toLowerCase().includes(what.toLowerCase());

    return find(where, predicate);
};

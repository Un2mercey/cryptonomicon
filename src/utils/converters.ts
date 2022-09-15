import { find } from 'lodash';
import { CoinName, FetchCoinsResponse, Undefined } from '@/@types';
import { Coin, FetchCoinsResponseItem } from '@/@interfaces';

type CoinsConverter = (from: FetchCoinsResponse) => Coin[];
export const coinsConverter: CoinsConverter = (from: FetchCoinsResponse): Coin[] => {
    return Object.values(from).map(
        (coin: FetchCoinsResponseItem): Coin => ({
            id: coin.Id,
            imageUrl: coin.ImageUrl,
            name: coin.Name,
            symbol: coin.Symbol,
            coinName: coin.CoinName,
            fullCoinName: coin.FullName,
            description: coin.Description,
            isTrading: coin.IsTrading,
            currency: null,
        }),
    );
};

type CoinFinder = (where: Coin[], what: CoinName) => Undefined<Coin>;
export const coinFinder: CoinFinder = (where: Coin[], what: CoinName): Undefined<Coin> => {
    const predicate: (coin: Coin) => boolean = (coin: Coin) =>
        coin.name.toLowerCase() === what.toLowerCase() &&
        coin.symbol.toLowerCase() === what.toLowerCase() &&
        coin.fullCoinName.toLowerCase().includes(what.toLowerCase());

    return find(where, predicate);
};

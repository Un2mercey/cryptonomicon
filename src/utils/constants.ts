/**
 * It's a generic for type guards
 * @param e { T } - Verifiable value
 */
export const isCorrectEnum: <T>(e: T) => (token: unknown) => token is T[keyof T] =
    <T>(e: T) =>
    (token: unknown): token is T[keyof T] =>
        Object.values(e as { [key: string]: unknown }).includes(token as T[keyof T]);

export enum Currency {
    USD = 'USD',
    EUR = 'EUR',
}

export enum CurrencySymbol {
    USD = '$',
    EUR = '€',
}

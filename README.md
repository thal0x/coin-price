# Coin Price

![Coin Price](/public/coin-price.png)

A simple React app to calculate the price of a token based on the price of the other token in the liquidity pool.

When creating a new token it can take a while for it to show up on apps like Dexscreener, Coinhall, etc. This makes it hard to track the price of the token. The Coin Price app will use the price of the other token in a pool to derive the price of the token you are interested in.

For example if you have a token called `astroBONK` and it's pooled with `NTRN`.

```
1 astroBONK = 0.083209 NTRN
1 NTRN = 1.20 USD
1 astroBONK = 0.083209 * 1.20 = 0.0998508 USD
```

## Configuration

All configuration values, along with explanations, can be found in `src/constants.ts`

## Development

```
npm install

npm run dev
```

---
title: Impermanent loss
ID: "13"
Lang: en
Type: Article
date: 2022-04-13T13:45:07.211Z
category: liquidity
Is_FAQ: "0"
---
***Impermanent loss** occurs when you provide liquidity to a liquidity pool and the price of your deposited assets change compared to the moment you deposited them. The more it changes, the higher the risk of impermanent loss is.*

In fact, impermanent loss is supposed to be temporary as long as the trading fees you earn from providing the liquidity compensate for the losses.

**Keep in mind:**

* If the price returns to its initial price level, impermanent loss doesn’t occur.
* If the price of the deposited assets changes since the deposit, impermanent loss is realized.
* If you remove your funds from the liquidity pool before they return to their original price level, the impermanent loss will be realized and become permanent!

Unlike the traditional exchange, there is no order book to determine the assets’ prices in DEXs so the liquidity pool determines the price of its assets. Due to the impermanent loss, the volatile price of an asset is a risk factor for liquidity providers, which should be compensated by a high level of potential profit from trading fees.

The key innovations of concentrated liquidity on Algebra are aimed at solving the problem of high impermanent loss by introducing dynamic fees, which set optimized fees (to find the right balance between traders/providers) based on volatility, trading volume, and pool volume.

When using the technology of concentrated liquidity, assets are placed at specified price intervals, called positions. 

You set a price range within which your assets will provide liquidity. You will get a percentage of trading fees from the liquidity only if the current price of the assets stays within the range set by the position. It increases the efficiency of using your funds as a liquidity provider. Using positions allows you to achieve an uneven distribution of liquidity and, as a result, different price behavior and temporary losses.

Therefore, the placement of assets within price ranges not only increases the efficiency of funds but also makes the overall market function much more flexible due to the arbitrary distribution of liquidity. Due to this, liquidity providers have the ability to independently adjust the conditions that minimize the impermanent loss.
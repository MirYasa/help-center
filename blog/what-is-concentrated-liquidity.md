---
title: What is concentrated liquidity?
ID: "9"
Lang: en
Type: Article
date: 2022-04-13T13:36:25.122Z
category: liquidity
Is_FAQ: "0"
---
**Сoncentrated liquidity** — is the liquidity allocated within a custom price range. 

When liquidity was distributed evenly, one could trade their assets within the infinite interval (0,∞). With the concentrated liquidity mechanics, liquidity providers (LPs) can accumulate their capital to smaller price intervals than (0, ∞) which enables individualized price curves, higher capital efficiency and deeper liquidity for traders.

In a stablecoin/stablecoin pair, for example, an LP may choose to allocate capital solely to the $0.99 - 1.01 range. As a result, traders are offered deeper liquidity around the mid-price, and LPs earn more trading fees with their capital. 

**A Novel Way of Pooling Liquidity**

Earlier implementations of AMMs used the so-called XYK model, based on the x*y=k price curve. The idea was to maintain constant balance within a liquidity pool so that the total value of one token would always equal the total value of the other token in the pool; regardless of their current price against each other.

With the XYK model, the liquidity in the pool is spread across all possible price ranges. As a result, the liquidity providers (LPs) are earning far smaller trading fee bonuses — which is their compensation for the risk they take. They also suffer from higher slippage, because the majority of their liquidity never gets used in pools of this type at all.

Concentrated liquidity tries to boost capital efficiency, and to make up for the inadequacy of the original formula. Within the new model, liquidity can be allocated to a price interval, resulting in what is called a concentrated liquidity position. LPs can open as many positions in the pool as they wish, thereby creating unique price curves aligned with their personal needs and preferences.

Pic.1 Concentrated Liquidity Position

When the price enters a certain range, the liquidity aggregated for that range starts collecting trading fees, with each LP receiving their slice of the fee pie, proportionally to their contribution to the total liquidity inside of that price range alone.

As the price moves up and down, liquidity from different LPs is used to execute the swaps. Consequently, users are making trades against the aggregated liquidity from all liquidity positions covering the current price, and there is no difference for those whose liquidity their swaps are utilizing.

There are a number of benefits and advantages that the new model of pooling liquidity offers both LPs and traders. Now, LPs can allocate their capital to the preferred price intervals, consolidating their funds to earn more fees and using liquidity more efficiently. At the same time, traders enjoy deeper liquidity when and where it’s needed most, as well as profiting greatly from reduced slippage.

The increase in capital efficiency is further demonstrated by the example that follows.

**Comparative Analysis of Concentrated Liquidity**

LP(1) and LP(2) are providing liquidity to an ETH/DAI pool. They each have $1 million in Ethereum and DAI. LP(1) invests her whole stash of tokens across the entire price range, which is 500,000 DAI and 333.33 ETH at the price of Ethereum equaling 1,500 DAI.

LP(2), on the other hand, takes a concentrated position, investing only 91,751 DAI and 61.17 ETH (worth ~$183,500) within the price range of 1,000 to 2,250.

Despite the fact that LP(1) has deposited 5.44x as much capital as LP(2), as long as the ETH/DAI price stays within the 1,000 to 2,250 range, they are going to earn the same amount of fee rewards. Basically, it means that LP(2)’s capital is more efficient and can earn 5.44x more than LP(1)’s (per dollar deposited).

In case the price breaks out of this price range, LP(2) can no longer earn fees, and his funds will be converted to the less valuable token. At the same time, LP-1’s liquidity, or liquidity on v2 DEXs, will be exposed to impermanent loss to a lesser extent. In this sense, we can imagine a full-range position on the decentralized exchange, with concentrated liquidity equal to the usual position on a v2 exchange. The smaller the range, the faster liquidity gets converted while the price moves. At the same time, choosing a concentrated position and taking on more risk of impermanent loss is remunerated fairly by increasing the LP effectiveness.

As in the worst-case scenario when one token loses all its value and its price falls to 0, both LP(1) and LP(2) will end up with the asset being worth nothing. However, LP(2) will lose only \~$183,500 (\~16% of his capital), with LP(1)’s capital being gone in its entirety.

**Conclusion**:

1. Concentrating liquidity around the current price, as well as updating custom positions according to the price changes, is an effective strategy that is aimed at maximizing gains while exposing far less capital to the risk of asset devaluation.
2. As the price moves up and down, liquidity from different LPs is used to execute the swaps. Consequently, users are making trades against the aggregated liquidity from all liquidity positions covering the current price, and there is no difference for them whose liquidity their swaps are consuming.
3. There are a number of benefits and advantages that the new model of pooling liquidity offers both LPs and traders. Now, LPs can allocate their capital to the preferred price intervals, consolidating their funds to earn more fees. At the same time, traders enjoy deeper liquidity when and where it’s needed most, as well as profit greatly from reduced slippage.
4. Concentrated liquidity is the latest step in the evolution of AMMs —the approach towards capital efficiency and financial performance optimization.
---
title: How are prices determined?
ID: "6"
Lang: en
Type: Article
date: 2022-04-13T13:32:33.852Z
category: getting-started
Is FAQ: "1"
---
Prices are determined by the amount of each token in a pool. The smart contract keeps a constant using the following function: x*y=k. In this case x = token0, y = token1, k = constant. During each trade, a certain amount of one token is removed from the pool for an amount of the other token. To maintain k, the balances held by the smart contract are adjusted during the execution of the trade, therefore changing the price.
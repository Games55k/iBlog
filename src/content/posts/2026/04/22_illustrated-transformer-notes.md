---
title: "阅读：《图解Transformer》"
description: "一个使用注意力来提高这些模型训练速度的模型。"
date: "2026-04-22T00:00:00+08:00"
slug: "illustrated-transformer-notes"
draft: false
tags:
  - "LLM"
---


> 原文 [The Illustrated Transformer](https://jalammar.github.io/illustrated-transformer/)

## 1. Transformer 是什么
Transformer 是一种用于序列建模的神经网络结构，最初主要用于机器翻译。
它的关键创新是：**不再依赖 RNN 那样按顺序一步步处理，而是主要依靠 Attention 机制并行处理整个序列**，因此训练更快、效果也更好。

## 2. 整体结构
模型分为两部分：

- **Encoder（编码器）**：理解输入句子
- **Decoder（解码器）**：逐步生成输出句子

原论文中通常是 **6 层 encoder + 6 层 decoder** 堆叠而成。

## 3. Encoder 的核心
每个 encoder 主要包含两层：

- **Self-Attention**
- **Feed Forward Network**

其中 **Self-Attention** 是重点：
处理某个词时，模型会同时关注句子里其他相关词，从而更好地理解当前词的含义。
例如句子里出现代词 *it* 时，模型可以通过 attention 判断它指代的是哪个词。

## 4. Self-Attention 的计算思路
对于每个词，模型会生成三种向量：

- **Query**
- **Key**
- **Value**

然后通过：

- Query 和其他词的 Key 做相似度计算
- 得到每个词的重要性权重
- 再对各词的 Value 加权求和

**Scaled Dot-Product Attention**：

$$
\mathrm{Attention}(Q, K, V) = \mathrm{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right)V
$$

- **$(d_k)$**：Key 向量的维度

### 公式含义
1. **$(QK^T)$**：计算 query 和 key 的相似度
2. **除以 $(\sqrt{d_k})$**：防止数值过大，使 softmax 更稳定
3. **$softmax(...)$**：把相似度变成权重分布
4. **乘以 V**：按权重对 value 加权求和，得到输出

最终得到当前词的新表示。
本质上就是：**一个词在编码自己时，会动态吸收其他相关词的信息。**

## 5. Multi-Head Attention
Transformer 不只做一次 attention，而是并行做多次，称为 **多头注意力**。
这样不同的头可以关注不同关系，比如：

- 指代关系
- 语法关系
- 语义关联

 **Multi-Head Attention**：

$$
\mathrm{MultiHead}(Q, K, V) = \mathrm{Concat}(head_1, \dots, head_h)W^O
$$

其中

$$
head_i = \mathrm{Attention}(QW_i^Q, KW_i^K, VW_i^V)
$$

意思是：
把 Q、K、V 投影到多个子空间里分别做 attention，再拼接起来。

最后再把这些结果拼接起来，形成更丰富的表示。

## 6. 位置信息问题
因为 Transformer 本身不按顺序逐词处理，所以它天然不知道词序。
为了解决这个问题，模型给每个词加入 **Positional Encoding（位置编码）**，让模型知道：

- 词在句子中的位置
- 词与词之间的相对距离

## 7. 文章的核心观点
这篇文章最想传达的是：

> Transformer 的强大之处，在于它通过 self-attention 让每个词都能直接与其他词建立联系，并且能够高度并行化。

---

## 总结
**Transformer 用 self-attention 替代了传统序列模型中的递归结构，使模型能并行地捕捉全局依赖关系，是现代大语言模型的基础。**

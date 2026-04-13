---
title: Bi-Encoder 与 Cross-Encoder
published: 2026-04-13
description: 'Bi-Encoder 与 Cross-Encoder的区别、应用与实践'
image: ''
tags: [NLP, RAG]
category: 'LLM'
draft: false
lang: ''
---

## 一、什么是 Bi-Encoder 和 Cross-Encoder

Bi-Encoder（双编码器）和 Cross-Encoder（交叉编码器）是 NLP 中常见的文本匹配架构，常用于：

- 语义相似度
- 信息检索
- 问答系统
- 重复问题检测
- RAG 检索与重排

它们的核心区别在于：

- **Bi-Encoder**：两个文本分别编码，再计算向量相似度
- **Cross-Encoder**：两个文本拼接后联合编码，直接输出相关性分数

---

## 二、Bi-Encoder

Bi-Encoder 会分别对 query 和 document 编码：

```text
score(q, d) = cosine(E(q), E(d))
```

### 优点

- 速度快
- 文档向量可提前计算
- 适合大规模检索
- 易于接入向量数据库
- 是 dense retrieval 和向量检索的核心方案

### 缺点

- 两个文本在编码时不能直接交互
- 精度通常低于 Cross-Encoder

不过这并不意味着 Bi-Encoder 在信息检索中“通常表现较差”。在实际系统里，它仍然是第一阶段召回的主力方案，尤其适合大规模语料场景。

### 典型场景

- 大规模召回
- 向量检索
- FAQ 检索
- 聚类 / 去重
- RAG 第一阶段检索

---

## 三、Cross-Encoder

Cross-Encoder 会将两个文本拼接输入模型：

```text
[CLS] query [SEP] document [SEP]
```

模型直接学习两段文本之间的关系，并输出相关性分数。

它的核心优势不是“动态信息”，而是可以直接建模 query 和 document 之间的细粒度交互。

### 优点

- 能建模 token 级交互
- 通常比 Bi-Encoder 更准确
- 适合排序和精排

### 缺点

- 不能预编码文档
- 每个 query-doc 对都要单独推理
- 候选很多时速度较慢

因此，Cross-Encoder 更准确，但并不“快速”，通常适合小候选集上的排序和精排，而不适合大规模全量匹配。

### 典型场景

- 重排序（rerank）
- 高精度语义匹配
- 问答候选排序
- 实体链接第二阶段

---

## 四、二者对比

| 维度 | Bi-Encoder | Cross-Encoder |
|---|---|---|
| 编码方式 | 分别编码 | 联合编码 |
| 是否可预计算 | 可以 | 不可以 |
| 速度 | 快 | 慢 |
| 候选规模 | 大规模 | 小规模 |
| 精度 | 通常较低 | 通常较高 |
| 适合任务 | 召回 | 精排 |

一句话总结：

- **Bi-Encoder 适合从海量文本中快速找候选**
- **Cross-Encoder 适合对少量候选做高精度排序**

---

## 五、典型应用

### 1. 信息检索

最常见做法是：

1. 用 **Bi-Encoder 或 BM25** 召回 Top-K
2. 用 **Cross-Encoder** 对 Top-K 重排

这也是搜索、FAQ、企业知识库和 RAG 中的主流方案。

<div style="margin: 1.25rem 0; padding: 1rem; border: 1px solid var(--btn-regular-bg); border-radius: 1rem; background: var(--card-bg);">
  <div style="display: flex; flex-direction: column; align-items: center; gap: 0.55rem; text-align: center;">
    <span style="min-width: 220px; max-width: 100%; padding: 0.55rem 0.95rem; border-radius: 9999px; background: var(--btn-regular-bg); color: var(--btn-content); font-weight: 600;">User Query</span>
    <span style="font-size: 1.1rem; line-height: 1; color: var(--primary);">↓</span>
    <span style="min-width: 220px; max-width: 100%; padding: 0.55rem 0.95rem; border-radius: 9999px; background: var(--btn-regular-bg); color: var(--btn-content); font-weight: 600;">Bi-Encoder / BM25 Recall</span>
    <span style="font-size: 1.1rem; line-height: 1; color: var(--primary);">↓</span>
    <span style="min-width: 220px; max-width: 100%; padding: 0.55rem 0.95rem; border-radius: 9999px; background: var(--btn-regular-bg); color: var(--btn-content); font-weight: 600;">Top-K</span>
    <span style="font-size: 1.1rem; line-height: 1; color: var(--primary);">↓</span>
    <span style="min-width: 220px; max-width: 100%; padding: 0.55rem 0.95rem; border-radius: 9999px; background: var(--btn-regular-bg); color: var(--btn-content); font-weight: 600;">Cross-Encoder Rerank</span>
    <span style="font-size: 1.1rem; line-height: 1; color: var(--primary);">↓</span>
    <span style="min-width: 220px; max-width: 100%; padding: 0.55rem 0.95rem; border-radius: 9999px; background: var(--btn-regular-bg); color: var(--btn-content); font-weight: 600;">Final Results</span>
  </div>
</div>

### 2. RAG问答系统

- Bi-Encoder：负责召回答案段落
- Cross-Encoder：负责对候选段落精排

### 3. 重复问题检测

- 大规模去重 / 聚类：Bi-Encoder 更实用
- 少量候选精判：Cross-Encoder 更准确

### 4. 实体链接

常见流程也是：

- Bi-Encoder 召回候选实体
- Cross-Encoder 进行重排序

---

## 六、工程上的最佳实践

在实际系统里，通常不是二选一，而是**组合使用**：

### Recall + Rerank

- **第一阶段**：Bi-Encoder 负责召回
- **第二阶段**：Cross-Encoder 负责重排

这个方案兼顾了：

- 检索速度
- 系统可扩展性
- 最终精度

在 RAG 场景中也很常见：

<div style="margin: 1.25rem 0; padding: 1rem; border: 1px solid var(--btn-regular-bg); border-radius: 1rem; background: var(--card-bg);">
  <div style="display: flex; flex-direction: column; align-items: center; gap: 0.55rem; text-align: center;">
    <span style="min-width: 220px; max-width: 100%; padding: 0.55rem 0.95rem; border-radius: 9999px; background: var(--btn-regular-bg); color: var(--btn-content); font-weight: 600;">Question</span>
    <span style="font-size: 1.1rem; line-height: 1; color: var(--primary);">↓</span>
    <span style="min-width: 220px; max-width: 100%; padding: 0.55rem 0.95rem; border-radius: 9999px; background: var(--btn-regular-bg); color: var(--btn-content); font-weight: 600;">Bi-Encoder Retrieve</span>
    <span style="font-size: 1.1rem; line-height: 1; color: var(--primary);">↓</span>
    <span style="min-width: 220px; max-width: 100%; padding: 0.55rem 0.95rem; border-radius: 9999px; background: var(--btn-regular-bg); color: var(--btn-content); font-weight: 600;">Top-K Documents</span>
    <span style="font-size: 1.1rem; line-height: 1; color: var(--primary);">↓</span>
    <span style="min-width: 220px; max-width: 100%; padding: 0.55rem 0.95rem; border-radius: 9999px; background: var(--btn-regular-bg); color: var(--btn-content); font-weight: 600;">Cross-Encoder Rerank</span>
    <span style="font-size: 1.1rem; line-height: 1; color: var(--primary);">↓</span>
    <span style="min-width: 220px; max-width: 100%; padding: 0.55rem 0.95rem; border-radius: 9999px; background: var(--btn-regular-bg); color: var(--btn-content); font-weight: 600;">Top-N Context</span>
    <span style="font-size: 1.1rem; line-height: 1; color: var(--primary);">↓</span>
    <span style="min-width: 220px; max-width: 100%; padding: 0.55rem 0.95rem; border-radius: 9999px; background: var(--btn-regular-bg); color: var(--btn-content); font-weight: 600;">LLM Answer</span>
  </div>
</div>

---

## 七、常见优化方法

相比“用 Bi-LSTM 替代 Encoder”这类早期思路，当前更常见的优化方向主要集中在训练策略、部署效率和两阶段架构上：

### 1. 蒸馏

用更强的 Cross-Encoder 作为 teacher，训练更快的 Bi-Encoder。

### 2. 硬负样本

使用更难区分的负样本提升模型判别能力。

### 3. 推理优化

包括：

- ONNX
- INT8 量化
- TensorRT / OpenVINO
- 控制 rerank 的 Top-K

---

## 八、结论

Bi-Encoder 和 Cross-Encoder 并不是替代关系，而是分工不同：

- **Bi-Encoder**：擅长大规模召回
- **Cross-Encoder**：擅长小规模精排

如果只看单点能力：

- 要效率，选 Bi-Encoder
- 要精度，选 Cross-Encoder

如果看真实系统落地，尤其是搜索、问答和 RAG，最常见的方案仍然是：

> **Bi-Encoder 召回 + Cross-Encoder 重排**

---

## References

https://zhuanlan.zhihu.com/p/688783525

---

---
layout: page
title: Snowball Effect on Reddit
---

## 1. Catchy example

## 2. PLOT Visu of the data

## 3. PLOT Clustering plot

## 4. PLOT Interactions between clusters

## 5. Defining positivity / Negativity score

### 1. PLOT: regression?

## 6. PLOT Most positive and negative clusters by time

## 7. Matching

### 1. within cluster

### 2. by activity level

### 3. by mean sentiment

## 8. Analysis 1)

Define random-ish time windows for analysis

1.  Match: strongly negative/positive event
2.  Match: frequent negative/positive events (within a day or so)
3.  Analyse outgoing
    1. Sentiment mean, intensity threshold (1 strong event)
    2. Frequency: more/less links
4.  Check if changes are statistically significant (8 tests total)
5.  Compare strong vs frequent interaction
6.  Compare results wrt cluster assignment

## 9. Analysis 2)

Match with different clusters?

1.  Match: strongly negative/positive event
2.  Analyse outgoing sentiment mean, intensity threshold
3.  For each treated match identify top-k most interacted with subreddits and top-k closest subreddits in embedding space
4.  Vary k to determine
    1. Reach
    2. Radius
    3. Duration
    4. Decay

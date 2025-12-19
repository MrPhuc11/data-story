---
layout: page
use_math: true
---

<section class="hero-section">
  <div class="hero-overlay">
    <div class="hero-content">
      <h1>Snowball Effect on Reddit</h1>
      <p class="hero-p2">"The more I live, the more I regret how little I know."</p>
      <p2 class="hero-author">- Claude Monet</p2>
      </div>
  </div>
</section>

<img src="{{ site.baseurl }}/Images/reddit_logo.png" alt="reddit logo" style="display:block;margin:0 auto;max-width:180px;">

<div style="text-align: justify;" markdown="1">

#provisoire : faudrait faire une intro un peu plus générale sur le réso reddit
Reddit is a web of thousands of communities (subreddits) that constantly react to each other by sharing hyperlinks. Each link carries a tone: it can be supportive, neutral, or hostile, and those signals can ripple outward.

<div id="monet-bd-story"></div>

The snowball effect is a metaphor for a situation where something small and insignificant grows in size over time, much like a snowball rolling down a hill gathers more snow.
In this project, we aim to investigate whether such an effect exists within Reddit's social network. Specifically, we examine how positive or negative links received by a targeted subreddit influence both its own behavior and the broader network's response. First, we explore whether the sentiment of incoming links affects the sentiment of the outgoing links that the targeted subreddit sends during that period (does receiving negative attention make it more likely to link negatively to others, or does positive attention lead to more supportive interactions?). Next, we study how other subreddits respond to these interactions. When one subreddit links negatively to another, does this make additional subreddits also link negatively to the same target? Conversely, does a positive link between two subreddits also attract more positive attention from others? Overall, we aim to see whether that first link triggers a snowball effect, amplifying positive or negative sentiment across both related and distant communities on Reddit.

</div>

## Dataset

The dataset we are working with is a network of subreddit-to-subreddit hyperlinks, extacted from posts that create hyperlinks from one subreddit to another. A hyperlink originates from a post in the source community and links to a post in the target community. Each hyperlink is annotated with the timestamp of the post, the sentiment of the source community post towards the target community post (−1 for negative and +1 for neutral or positive), and the text property vector of the source post.
The hyperlink network covers the period from December 2013 to April 2017

**The network is directed, signed, temporal, and attributed.**

As a complement, we will utilize subreddit embeddings, vector representations of each subreddit. They were created such that community embeddings will be close together if similar users post on them.

## Clustering

To make sense of the huge network, we can start by clustering subreddits into larger topical communities.

Communities are defined as sets of tightly connected nodes. This can be confusing for our problem because a subreddit can also be called a "community", yet it represents only a single node in the Reddit graph.

<div style="border-left: 4px solid #A7C7E7; padding-left: 20px; font-size: 18px; background-color: #A7C7E7">
The idea is to identify communities by maximizing modularity.
</div>

<div style="border-left: 4px solid #A7C7E7; padding-left: 20px; font-size: 18px; margin-top: 2;">
  <details open> 
    <summary style = "font-size: 18px; cursor: pointer;"><b>Modularity</b></summary>    
     
    Modularity is a measure of how well a network is partitioned into groups (or communities). Given a partition of the network into groups.
    The Modularity of a partitioning S of graph G is :

    $$
    Q = \frac{1}{2m} \sum_{ij} \left( A_{ij} - \frac{k_i k_j}{2m} \right) \delta(c_i, c_j)
    $$

    Where $A_{ij}$ is the edge weight between nodes $i$ and $j$, $k_i$ and $k_j$ are the sum of the weights of the edges attached to nodes $i$ and $j$, $2m$ is the sum of all the edge weights in the graph, $c_i$ and $c_j$ are the communities of the nodes and $\delta$ is an indicator function.

</details>

  <details open> 
    <summary style = "font-size: 18px; cursor: pointer;"><b>Leiden Algorithm</b></summary>     
    To identify communities by maximizing modularity, we can use the Leiden algorithm which is an improvement of the Louvain algorithm. It guarantees well-connected communities, converging towards a partition in which all subsets of all communities are locally optimally assigned and it is much faster than Louvain.

   </details>
</div>

Here are the clusters we found.

<div class="flourish-embed flourish-hierarchy" data-src="visualisation/26907809">
  <script src="https://public.flourish.studio/resources/embed.js"></script>
  <noscript>
    <img src="https://public.flourish.studio/visualisation/26907809/thumbnail" width="100%" alt="hierarchy visualization" />
  </noscript>
</div>

Now we can visualize these clusters in the embedding space by using the subreddit embedings dataset. We can reduce the dimension of to 2D for visualization using PCA followed by t-SNE. This plot shows us how these topical groups of subreddits are organized in the embedding space. The embedding space is organized such that subreddits with similar users will lie close together.

![t-SNE clusters]({{ site.baseurl }}/Images/tsne_plot.png)

<div style="border-left: 4px solid #A7C7E7; padding-left: 20px; font-size: 18px; margin-top: 2;">
  <details open> 
    <summary style = "font-size: 18px; cursor: pointer;"><b>How to plot embeddings?</b></summary>    
  These vector embeddings are actually <b>300 dimensional</b>! That can make visualization hard, so we need to reduce the dimension first before we can see what the clusters look like, for this we can use <b>PCA</b>.

  <details open> 
    <summary style = "font-size: 18px; cursor: pointer;"><b>PCA</b></summary>
    PCA is ..
   </details>
  <details open> 
    <summary style = "font-size: 18px; cursor: pointer;"><b>t-SNE</b></summary>    
    t-SNE converts similarities between data points to joint probabilities and tries to minimize the Kullback-Leibler divergence between the joint probabilities of the low-dimensional embedding and the high-dimensional data.  We apply PCA before-hand because of the number of features is initially very high.
   </details>
  </details>
</div>

We observe that highly connected groups of subreddits are not necessarily close in embedding space. Some topical groups form clear clusters in embedding space, meaning their users are similar: Gaming, Pornography & Music are good examples of these. Other groups are much more spread out: Popular/memes, News, Politics & Conspiracies, Religion & Philosophy are good examples. This makes sense because although subreddits in these might link each other often (eg: r/capitalism and r/communism) this does not mean that their users will be similar, leading to a spread out group in embedding space.

We can also analyse which clusters communicate the most between each other.

<div class="flourish-embed flourish-sankey" data-src="visualisation/26700217">
  <script src="https://public.flourish.studio/resources/embed.js"></script>
  <noscript>
    <img src="https://public.flourish.studio/visualisation/26700217/thumbnail" width="80%" alt="sankey visualization" />
  </noscript>
</div>

# Sentiment analysis

What is the share of positive to negative hyperlinks and how can we define them?
The data is manually labeled with a link sentiment of +/- 1.

<div class="flourish-embed flourish-chart" data-src="visualisation/26769169">
  <script src="https://public.flourish.studio/resources/embed.js"></script>
  <noscript>
    <img src="https://public.flourish.studio/visualisation/26769169/thumbnail" width="60%" alt="chart visualization" />
  </noscript>
</div>

We can also see how the share of positive/neural hyperlinks evolves over time for each cluster.

<div class="flourish-embed flourish-chart" data-src="visualisation/26714353">
  <script src="https://public.flourish.studio/resources/embed.js"></script>
  <noscript>
    <img src="https://public.flourish.studio/visualisation/26714353/thumbnail" width="50%" alt="chart visualization" />
  </noscript>
</div>

The issue with this classification is that it lacks precision. We want to be able to distinguish strongly postive and negative posts from neutral ones. Luckily, we still have some tools we can use. Among the text proporties of each post, we have a couple of useful metrics:

<div style="border-left: 4px solid #A7C7E7; padding-left: 20px; font-size: 18px; margin-top: 2;">
<li><b>VADER</b>: Positive, Negative, Compound</li>
<li><b>LIWC</b>: Posemo, Negemo, Anx, Anger, Sad</li>
</div>

LIWC and VADER are lexicon-based tools for measuring sentiment and affect in text. LIWC computes normalized frequencies of words associated with psychological and emotional categories, such as negative emotion or anger, while VADER produces a continuous sentiment polarity score by combining word-level valence with rules for negation, intensifiers, and punctuation, making it well suited for social media text.

<div class="flourish-embed flourish-radar" data-src="visualisation/26785304">
  <script src="https://public.flourish.studio/resources/embed.js"></script>
  <noscript>
    <img src="https://public.flourish.studio/visualisation/26785304/thumbnail" width="100%" alt="radar visualization" />
  </noscript>
</div>

We can use them to define a continuous sentiment score between -1 and 1, which allows us to quantify sentiment type (negative or positive) as well as strength.

We combine the LIWC and VADER outputs into a single signed sentiment score using principal component analysis (PCA). PCA is applied directly to the LIWC and VADER features, and the first principal component, which captures the dominant shared variation across the lexicon-based measures, is used as a continuous sentiment axis. This signed score provides a compact measure of sentiment polarity and strength, enabling rapid assessment and comparison of sentiment intensity across posts.

![t-SNE clusters]({{ site.baseurl }}/Images/pca_sentiment.png)

The large spike in values just under zero is due to the hyperlinks with zero on all metrics. They are considered to be neutral in sentiment.

## 7. Matching

1. within cluster

2. by activity level

3. by mean sentiment

## 8. Analysis 1) {#analysis-1}

Define random-ish time windows for analysis

1.  Match: strongly negative/positive event
2.  Match: frequent negative/positive events (within a day or so)
3.  Analyse outgoing
    1. Sentiment mean, intensity threshold (1 strong event)
    2. Frequency: more/less links
4.  Check if changes are statistically significant (8 tests total)
5.  Compare strong vs frequent interaction
6.  Compare results wrt cluster assignment

## 9. Analysis 2) {#analysis-2}

Match with different clusters?

1.  Match: strongly negative/positive event
2.  Analyse outgoing sentiment mean, intensity threshold
3.  For each treated match identify top-k most interacted with subreddits and top-k closest subreddits in embedding space
4.  Vary k to determine<>
    1. Reach
    2. Radius
    3. Duration
    4. Decay

<div id="art-snow-bar">
<button onclick="toggleSnow()" id="btn-toggle">
<span class="icon">❄</span> Snow
</button>
<div class="vertical-line"></div>
<div class="slider-wrapper">
<span class="label-flake" style="font-size: 12px;">◌</span>
<input type="range" id="size-slider" min="10" max="80" value="25" oninput="updateSnowSize(this.value)">
<span class="label-flake" style="font-size: 18px;">❄</span>
</div>
</div>

<div id="snow"></div>

<style>
#art-snow-bar {
position: fixed;
bottom: 30px;
left: 50%;
transform: translateX(-50%);
display: flex;
align-items: center;
/* Artsy glass effect */
background: rgba(255, 255, 255, 0.2);
backdrop-filter: blur(15px);
-webkit-backdrop-filter: blur(15px);
border: 1px solid rgba(255, 255, 255, 0.4);
padding: 8px 24px;
border-radius: 100px;
z-index: 10001;
box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
font-family: 'Georgia', serif; /* Elegant serif font */
}

#art-snow-bar button {
background: none;
border: 1px solid rgba(255, 255, 255, 0.6);
color: #4a5568;
padding: 6px 16px;
border-radius: 50px;
cursor: pointer;
font-size: 13px;
font-style: italic;
display: flex;
align-items: center;
gap: 8px;
transition: all 0.3s ease;
}

#art-snow-bar button:hover {
background: rgba(255, 255, 255, 0.5);
transform: translateY(-1px);
box-shadow: 0 4px 10px rgba(0,0,0,0.05);
}

.vertical-line {
width: 1px;
height: 25px;
background: rgba(0, 0, 0, 0.1);
margin: 0 20px;
}

.slider-wrapper {
display: flex;
align-items: center;
gap: 12px;
}

/* Aesthetic thin slider */
#size-slider {
-webkit-appearance: none;
width: 100px;
background: transparent;
cursor: pointer;
}

#size-slider::-webkit-slider-runnable-track {
height: 2px;
background: rgba(0, 0, 0, 0.1);
}

#size-slider::-webkit-slider-thumb {
-webkit-appearance: none;
height: 12px;
width: 12px;
border-radius: 50%;
background: #fff;
border: 1px solid #cbd5e0;
margin-top: -5px;
box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

#snow {
position: fixed;
top: 0; left: 0; right: 0; bottom: 0;
pointer-events: none;
z-index: 9999;
transition: opacity 1s ease-in-out; /* Slow artistic fade */
}

.snowflake {
position: absolute;
color: #a6c9cdff;
filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.8));
user-select: none;
will-change: transform;
font-size: var(--snow-size);
}
</style>

<script>
let snowVisible = true;
const snowflakes = ['❄', '❅', '❆',];

function toggleSnow() {
const snow = document.getElementById('snow');
snowVisible = !snowVisible;
snow.style.opacity = snowVisible ? "1" : "0";
}

function updateSnowSize(val) {
document.documentElement.style.setProperty('--snow-size', val + 'px');
}

document.addEventListener("DOMContentLoaded", function () {
const snowContainer = document.getElementById("snow");
const flakeCount = 50; // Fewer flakes because they are larger and more detailed
document.documentElement.style.setProperty('--snow-size', '25px');

for (let i = 0; i < flakeCount; i++) {
let flake = document.createElement("div");
flake.className = "snowflake";
// Randomly pick a snowflake shape
flake.innerHTML = snowflakes[Math.floor(Math.random() * snowflakes.length)];
flake.style.left = Math.random() * 100 + "vw";
flake.style.opacity = Math.random() * 0.7 + 0.3;
const duration = Math.random() * 5000 + 7000;
const delay = Math.random() * -20;
const spin = Math.random() > 0.5 ? 360 : -360;

// Animate both falling and spinning
flake.animate([
{ transform: `translateY(-10vh) translateX(0) rotate(0deg)` },
{ transform: `translateY(110vh) translateX(${Math.random() * 60 - 30}px) rotate(${spin}deg)` }
], {
duration: duration,
iterations: Infinity,
delay: delay * 1000,
easing: 'linear'
});
snowContainer.appendChild(flake);
}
});
</script>

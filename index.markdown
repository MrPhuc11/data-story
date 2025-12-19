---
layout: page
use_math: true
---

<section class="hero-section">
  <div class="hero-overlay">
    <div class="hero-content">
      <h1>Snowball Effect on Reddit</h1>
      <p class="hero-p2">"The more I live, the more I regret how little I know."</p>
      <p class="hero-author">- Claude Monet</p>
      <a href="#intro" class="hero-button">Discover the Research</a>
    </div>
  </div>
</section>

<div id="intro"></div>

<div class="content-wrapper">
   </div>

<div id="intro" style="margin-top: 0;"></div>

<div id="monet-bd-story"></div>

<div class="bd-transition-line"></div>

<section id="intro" class="research-container">

  <div class="story-lead">
    <h2>How far can a single event influence community behavior?</h2>
    <p>
    <div style="text-align: justify;">
      The snowball effect describes how a small action can grow into something much larger over time, like a snowball rolling downhill, picking up speed and mass as it goes.
      On Reddit, even a single interaction between two communities can set off a chain reaction. This project explores how positive or negative links between subreddits influence not only the communities involved, but also how others respond.
    
  </div>

<br>
Now let’s take a look at the dataset.

<h3>Dataset</h3>

<div style="text-align: justify;">
The dataset we are working with is a network of subreddit-to-subreddit hyperlinks, extracted from posts that create hyperlinks from one subreddit to another. A hyperlink originates from a post in the source community and links to a post in the target community. Each hyperlink is annotated with the timestamp of the post, the sentiment of the source community post towards the target community post (−1 for negative and +1 for neutral or positive), and the text property vector of the source post.
The hyperlink network covers the period from December 2013 to April 2017.
<br>
<br>
<b>The network is directed, signed, temporal, and attributed. </b>
<br>
<br>
As a complement, we will utilize subreddit embeddings, vector representations of each subreddit. They were created such that community embeddings will be close together if similar users post on them.

</div>

<h3>Clustering</h3>
<div style="text-align: justify;">
    To make sense of the huge network, we can start by clustering subreddits into larger topical communities.

Communities are defined as sets of tightly connected nodes. This can be confusing for our problem because a subreddit can also be called a "community", yet it represents only a single node in the Reddit graph.

<br>
<br>

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

<br>
<br>

</details>

  <details open> 
    <summary style = "font-size: 18px; cursor: pointer;"><b>Leiden Algorithm</b></summary>     
    To identify communities by maximizing modularity, we can use the Leiden algorithm which is an improvement of the Louvain algorithm. It guarantees well-connected communities, converging towards a partition in which all subsets of all communities are locally optimally assigned and it is much faster than Louvain.
    <br>
    <br>

   </details>
</div>
<br>
<br>
Here are the clusters we found.
<br>
<br>
<div class="flourish-embed flourish-hierarchy" data-src="visualisation/26907809">
  <script src="https://public.flourish.studio/resources/embed.js"></script>
  <noscript>
    <img src="https://public.flourish.studio/visualisation/26907809/thumbnail" width="50%" alt="hierarchy visualization" />
  </noscript>
</div>

<div style="border-left: 4px solid #A7C7E7; padding-left: 20px; font-size: 18px; background-color: #A7C7E7">
Now we can visualize these clusters in the embedding space using the subreddit embeddings dataset. This plot lets us see how different topical groups of subreddits are arranged relative to each other. The idea behind the embedding space is simple: subreddits with similar users end up close together, while communities with very different audiences are farther apart.
</div>

<div style="border-left: 4px solid #A7C7E7; padding-left: 20px; font-size: 18px; margin-top: 2;">
  <details open> 
    <summary style = "font-size: 18px; cursor: pointer;"><b>How to plot embeddings?</b></summary>    
  These vector embeddings are actually <b>300 dimensional</b>! To make a nice plot, we first need to reduce the dimensionality. This step keeps the most important structure in the data while projecting everything down to two dimensions.
  <br>
  <br>

  <details open> 
    <summary style = "font-size: 18px; cursor: pointer;"><b>PCA</b></summary>
    We start with <b>PCA</b> (Principal Component Analysis). PCA is a linear method that finds the directions in the data with the most variance and projects the embeddings onto those directions. Using PCA helps compress the embeddings and remove some noise, and it also makes later visualization steps faster and more stable.
    <br>
    <br>
   </details>
  <details open> 
    <summary style = "font-size: 18px; cursor: pointer;"><b>t-SNE</b></summary>  
    After PCA, we use t-SNE to create the final 2D visualization. t-SNE works by turning similarities between subreddits into probabilities and then trying to preserve those similarities in a lower-dimensional space. It does this by minimizing the Kullback–Leibler divergence between the original high-dimensional data and the 2D embedding. We apply PCA first because the original embeddings have a lot of features, and t-SNE doesn’t work well when the dimensionality is too high.
    <br>
    <br>
   </details>
  </details>
</div>
<br>

  <div class="image-container">
    <img src="{{ site.baseurl }}/Images/tsne_plot.png" >
    <p class="caption">
      t-SNE projection of subreddit embeddings. Each dot represents a community; clusters indicate shared topical interests and interaction patterns.
    </p>
  </div>

We observe that highly connected groups of subreddits are not necessarily close in embedding space. Some topical groups form clear clusters in embedding space, meaning their users are similar: Gaming, Pornography & Music are good examples of these. Other groups are much more spread out: Popular/memes, News, Politics & Conspiracies, Religion & Philosophy are good examples. This makes sense because although subreddits in these might link each other often (eg: r/capitalism and r/communism) this does not mean that their users will be similar, leading to a spread out group in embedding space.
<br>
<br>
We can also analyse which clusters communicate the most between each other.
<br>
<br>

<div class="flourish-embed flourish-sankey" data-src="visualisation/26700217">
  <script src="https://public.flourish.studio/resources/embed.js"></script>
  <noscript>
    <img src="https://public.flourish.studio/visualisation/26700217/thumbnail" width="80%" alt="sankey visualization" />
  </noscript>
</div>

</div>

<div style="text-align: justify;">
<h3>Sentiment analysis</h3>

What is the share of positive to negative hyperlinks and how can we define them?
The data is labeled with a link sentiment value which is either +1 if the post is neutral to positive or -1 if the post is negative.
<br>
<br>

<div class="fun-fact-card">
  <div class="fun-fact-tag">Fun fact</div>
  <p>The authors of the paper originally had three categories: positive, negative, and neutral but they had so few positives that they combined them with the neutral class.</p>
</div>
<br>
<br>
Let's look at the distribution of link sentiment in the dataset.
<br>
<br>

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
<br>

<div class="flourish-embed flourish-radar" data-src="visualisation/26785304">
  <script src="https://public.flourish.studio/resources/embed.js"></script>
  <noscript>
    <img src="https://public.flourish.studio/visualisation/26785304/thumbnail" width="100%" alt="radar visualization" />
  </noscript>
</div>

We can use them to define a continuous sentiment score between -1 and 1, which allows us to quantify sentiment type (negative or positive) as well as strength.
<br>
<br>
We combine the LIWC and VADER outputs into a single signed sentiment score using principal component analysis (PCA). PCA is applied directly to the LIWC and VADER features, and the first principal component, which captures the dominant shared variation across the lexicon-based measures, is used as a continuous sentiment axis. This signed score provides a compact measure of sentiment polarity and strength, enabling rapid assessment and comparison of sentiment intensity across posts.
<br>

<div class="image-container">
      <img src="{{ site.baseurl }}/Images/pca_sentiment.png" alt="PCA Sentiment Analysis Cluster">
      <p class="caption">The large spike near zero represents hyperlinks with neutral metrics, effectively identifying objective or non-emotive content.</p>
</div>

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

</div>

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

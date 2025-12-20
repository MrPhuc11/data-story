---
layout: page
permalink: /
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

<h3 id="dataset">Dataset</h3>
<div style="text-align: justify;">
The dataset we are working with is a network of subreddit-to-subreddit hyperlinks, extracted from posts that create hyperlinks from one subreddit to another. A hyperlink originates from a post in the source community and links to a post in the target community. Each hyperlink is annotated with the timestamp of the post, the sentiment of the source community post towards the target community post (−1 for negative and +1 for neutral or positive), and the text property vector of the source post.
The hyperlink network covers the period from December 2013 to April 2017.
<br>
<br>
<b>The network is directed, signed, temporal, and attributed. </b>
<br>
<br>
As a complement, we will utilize subreddit embeddings, vector representations of each subreddit. They were created such that community embeddings will be close together if similar users post on them.

<div class="dataset-box">
  <div class="dataset-cta">Check out the datasets here!</div>
  <div class="dataset-buttons">
    <a class="dataset-btn hot" href="https://snap.stanford.edu/data/soc-RedditHyperlinks.html" target="_blank" rel="noopener">
      Hyperlinks dataset ⛄
    </a>
    <a class="dataset-btn chill" href="https://snap.stanford.edu/data/web-RedditEmbeddings.html" target="_blank" rel="noopener">
      Embeddings dataset 🧊
    </a>
  </div>
</div>
<br>

</div>

<h3 id="clustering">Clustering</h3>
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

<div style="border-left: 4px solid #A7C7E7; font-size: 18px; background-color: #A7C7E7">
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

We observe that highly connected groups of subreddits are not necessarily close in embedding space. Some topical groups form clear clusters in embedding space, meaning their users are similar: Gaming, Pornography & Music are good examples of these. Other groups are much more spread out: Popular/memes, News, Politics & Conspiracies, Religion & Philosophy are good examples.
<br>
This makes sense because although subreddits in these might link each other often (eg: r/capitalism and r/communism) this does not mean that their users will be similar, leading to a spread out group in embedding space.
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

<div id="sentiment"></div>
<div style="text-align: justify;">
<h3 id="sentiment">Sentiment analysis</h3>

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

It looks like a large share of links are neutral to positive. We can also see how the share of positive/neural hyperlinks evolves over time for each cluster, to get a btter idea of the distribution.

<br>
<br>

<div class="flourish-embed flourish-chart" data-src="visualisation/26714353">
  <script src="https://public.flourish.studio/resources/embed.js"></script>
  <noscript>
    <img src="https://public.flourish.studio/visualisation/26714353/thumbnail" width="50%" alt="chart visualization" />
  </noscript>
</div>

The issue with this classification is that it <b>lacks precision</b>. We want to be able to distinguish strongly postive and negative posts from neutral ones. Luckily, we still have some tools we can use. Among the text proporties of each post, we have a couple of useful metrics:

<div class="metric-grid">
  <div class="metric-card">
    <div class="metric-title">VADER</div>
    <p class="metric-meta">Positive, Negative, Compound</p>
  </div>
  <div class="metric-card">
    <div class="metric-title">LIWC</div>
    <p class="metric-meta">Posemo, Negemo, Anx, Anger, Sad</p>
  </div>
</div>

LIWC and VADER are lexicon-based tools for measuring sentiment and affect in text. LIWC computes normalized frequencies of words associated with psychological and emotional categories, such as negative emotion or anger, while VADER produces a continuous sentiment polarity score by combining word-level valence with rules for negation, intensifiers, and punctuation, making it well suited for social media text.
<br>
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
<br>

<div class="image-container">
      <img src="{{ site.baseurl }}/Images/pca_sentiment.png" alt="PCA Sentiment Analysis Cluster">
      <p class="caption">The large spike near zero represents hyperlinks with neutral metrics, effectively identifying objective or non-emotive content.</p>
</div>
<br>
<br>
<div style="border-left: 4px solid #A7C7E7; padding-left: 20px; font-size: 18px; background-color: #A7C7E7">
<b>What parameters were most important?</b>
</div>

<div style="border-left: 4px solid #A7C7E7; padding-left: 20px; font-size: 18px; margin-top: 2;">
  <details open> 
    <summary style = "font-size: 18px; cursor: pointer;"><b>Loadings</b></summary>
    To answer this, we can look at the PCA loadings for the first principal component. A loading tells us how much each original feature contributes to that component. Features with larger absolute values matter more, because they have a bigger influence on the direction of the component.

    They show how strongly each feature lines up with the main axis of variation in the data.

<br>
<br>
<div class="image-container">
  <img src="{{ site.baseurl }}/Images/pca_weights.png" alt="PCA weights" style=" width: 70%;">
  <p class="caption">Most of the sentiment signal comes from overall positive and negative tone, with finer-grained emotions playing a much smaller role.</p>
</div>

</details>
</div>

<br>
<h3>So what happens after a negative interaction?</h3>
<br>
<div style="text-align: justify;">

Like most social media platforms, Reddit can be a hostile place, and negative interactions between communities are far from rare. Most of the time, these interactions fade into the background noise of daily activity and have little lasting impact. But occasionally, a negative link stands out, not because negativity is unusual, but because it is unusually strong compared to what a subreddit typically receives. This naturally raises the question of what comes next.

</div>
<br>

<div style="text-align: justify;">

Up to now, sentiment has mostly lived in the background of our analysis. We compressed language, emotion, and tone into a single continuous score, and for the most part, things looked fairly calm. Most hyperlinks sit close to neutral, with only a handful drifting toward more extreme values.

But those extremes are precisely where things get interesting.

Instead of asking how sentiment behaves on average, we shift our focus to moments where something clearly stands out: a day when a subreddit receives an incoming link that is much more negative than what it is used to. These moments feel different. They are not just part of the usual noise, they are potential disruptions.

We refer to these moments as <i>shock events</i>.

</div>

<div class="fun-fact-card">
  <div class="fun-fact-tag">Definition</div>
  <p>
    An event is defined relative to each subreddit’s own baseline. What counts as “extreme” depends on what a community is used to, not on a global sentiment threshold applied to all of Reddit.
  </p>
</div>

<br>

<div style="text-align: justify;">

So what does such an event actually look like in practice? To answer that, let’s zoom in on a single subbreddit.

In the figure below, we follow <i>r/clashofclans</i> over time and track, for each day, the most negative incoming interaction it receives. Rather than raw sentiment values, we express this signal as a standardized score, measuring how unusual each interaction is compared to the subreddit’s typical incoming tone.

<div style="border-left: 4px solid #A7C7E7; padding-left: 20px; margin-top: 20px;">
  <details open>
    <summary style="font-size: 18px; cursor: pointer;">
      <b>How is the standardized score computed?</b>
    </summary>

    <div style="text-align: justify; margin-top: 10px;">

    To quantify how unusual an incoming interaction is for a given subreddit, we standardize sentiment values relative to that subreddit’s typical behavior.

    <br><br>

    For a subreddit <i>s</i>, let $x_{s,t}$ denote the sentiment score of an incoming interaction observed on day $t$. We compute the standardized score as:

    $$
    z_{s,t} = \frac{x_{s,t} - \mu_s}{\sigma_s}
    $$

    where:
    <ul>
      <li>$\mu_s$ is the mean incoming sentiment for subreddit <i>s</i>,</li>
      <li>$\sigma_s$ is the corresponding standard deviation.</li>
    </ul>

    This transformation expresses sentiment in units of standard deviation, allowing us to compare how extreme an interaction is relative to what the subreddit usually receives. Strongly negative values of $z_{s,t}$ therefore indicate unusually hostile incoming interactions.

    </div>

  </details>
</div>

</div>

<br>

<!-- STATIC EXAMPLE PLOT -->
<div style="max-width: 1000px; margin: 40px auto;">
  <div class="image-container">
    <img src="{{ site.baseurl }}/Images/detective events.png" alt="Detected negative events in askreddit">
    <p class="caption">
      Detected negative events for <i>r/clashoflclans</i>. Orange points mark days where the negative deviation is strong enough to be classified as an event.
    </p>
  </div>
</div>

<div style="text-align: justify;">

<div style="text-align: justify;">

<div style="border-left: 4px solid #A7C7E7; padding-left: 20px; font-size: 18px; background-color: #A7C7E7">
Most interactions blend into the background. But every now and then, a strongly negative link stands out enough to make you stop and look. These are the moments we flag as potential snowball seeds: single hits that could ripple through a community afterward. Now that we have set up the detection of our events, we can now try and look for a potential snowball effect !
</div>
<div style="border-left: 4px solid #A7C7E7; padding-left: 20px; font-size: 18px; margin-top: 2;">
  <details open>
    <summary style="font-size: 18px; cursor: pointer;">
      <b>How do we test for a snowball effect?</b>
    </summary>

    <div style="text-align: justify; margin-top: 10px;">

    Once events have been detected, we test whether they are followed by a change in the subreddit’s outgoing behavior.

    For each event, defined by a subreddit <i>s</i> and an event day <i>t</i>, we proceed as follows:

    <ul>
      <li>
        We collect all outgoing links written by subreddit <i>s</i> in a short time window
        <b>before</b> and <b>after</b> the event day <i>t</i>.
      </li>
      <li>
        We compare the distributions of the continuous sentiment score
        (<code>score_sentiment_pca</code>) in the pre- and post-event windows.
      </li>
      <li>
        To account for unequal variances and sample sizes, we use
        <b>Welch’s t-test</b>, which yields a p-value quantifying whether the change is
        statistically significant.
      </li>
    </ul>

    In addition to the p-value, we compute a signed effect size:

    $$
    \Delta = \overline{\text{post}} - \overline{\text{pre}}
    $$

    A negative value of $\Delta$ indicates that the subreddit’s outgoing sentiment became
    more negative after the event, while a positive value corresponds to a shift toward
    more positive sentiment.

    </div>

  </details>
</div>
<br>

<!-- TEXT + WAFFLE SIDE BY SIDE -->
<div style="display: flex; gap: 40px; align-items: center; margin-top: 40px; flex-wrap: wrap;">

  <!-- Interpretation text -->
  <div style="flex: 1; min-width: 280px; text-align: justify;">

Rather than inspecting individual events one by one, we first step back and look at the overall pattern across all detected events. The visualization on the right summarizes, at a glance, how often negative hits are followed by measurable changes in outgoing sentiment, and in which direction those changes tend to go.

This aggregated view allows us to directly address our research question: whether incoming negativity systematically influences how communities interact with others over short time periods.

  </div>

  <!-- Waffle chart -->
  <div style="flex: 0 0 200px;">

    <div class="flourish-embed flourish-pictogram" data-src="visualisation/26909992">
      <script src="https://public.flourish.studio/resources/embed.js"></script>
      <noscript>
        <img src="https://public.flourish.studio/visualisation/26909992/thumbnail"
             width="100%"
             alt="pictogram visualization" />
      </noscript>
    </div>

  </div>

</div>

<p style="max-width: 900px; margin: 10px 0 0; font-size: 0.9em; color: #555; text-align: justify;">
<strong>Figure.</strong> Composition of sentiment shifts across all detected events. Each square represents 1% of events. Significant shifts (p &lt; 0.05) are highlighted, with negative shifts shown in red and positive shifts in green.
</p>

<div style="text-align: justify; margin-top: 20px;">

Most sentiment shock events do not lead to a measurable change in outgoing sentiment, suggesting that negative interactions are However, when a significant shift does occur, it is much more likely to be negative than positive. In other words, sentiment propagation is rare, but when it happens, it tends to amplify negativity rather than dampen it.

</div>
<br>

</div>

<div id="art-snow-bar">
<button onclick="toggleSnow()" id="btn-toggle">
<span class="icon">❄</span> Snow
</button>
<div class="vertical-line"></div>
<div class="slider-wrapper">
<span class="label-flake" style="font-size: 12px;">◌</span>
<input type="range" id="size-slider" min="10" max="80" value="16" oninput="updateSnowSize(this.value)">
<span class="label-flake" style="font-size: 18px;">❄</span>
</div>
</div>

<div id="snow"></div>

<style>
#art-snow-bar {
position: fixed;
bottom: 24px;
right: 24px;
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
document.documentElement.style.setProperty('--snow-size', '16px');

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

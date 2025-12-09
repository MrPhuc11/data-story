---
layout: page
title: Snowball Effect on Reddit
---

<div class="title-background">
    <img src="Images/monet_magpie.jpg" style="display: block; margin: 0 auto; width: 100%;"/>
</div>
&nbsp;

<!-- Snow effect container -->
<div class="snow-container">
    <div class="snow"></div>

    <!-- Centered quote -->
    <div class="quote">
        <p>“The more I live, the more I regret how little I know.”</p>
        <span class="author">— Claude Monet</span>
    </div>

</div>

<style>
/* ------------- QUOTE STYLING ------------- */
.quote {
    text-align: center;
    font-family: "Georgia", "Times New Roman", serif;
    font-size: 1.8rem;
    font-style: italic;
    font-weight: 300;
    color: white;
    margin-top: -200px; /* moves quote up over the image area */
    position: relative;
    z-index: 10;
    padding: 40px 20px;
    text-shadow: 0px 2px 6px rgba(0,0,0,0.6);
}

.quote .author {
    display: block;
    margin-top: 0.5rem;
    font-size: 1.2rem;
    font-style: normal;
    opacity: 0.8;
}

/* ------------- SNOW EFFECT (from CodePen) ------------- */

.snow-container {
    position: relative;
    width: 100%;
    height: 250px; /* adjust this if you want more/less snow height */
    overflow: hidden;
    pointer-events: none;
    background: transparent;
    margin-bottom: 50px;
}

.snow {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: 
        url("https://raw.githubusercontent.com/jasonhibbs/snowflakes/master/snowflake1.png"),
        url("https://raw.githubusercontent.com/jasonhibbs/snowflakes/master/snowflake2.png"),
        url("https://raw.githubusercontent.com/jasonhibbs/snowflakes/master/snowflake3.png");
    background-size: 200px; 
    animation: snow 15s linear infinite;
    opacity: 0.9;
}

@keyframes snow {
    0% { background-position: 0px 0px, 0px 0px, 0px 0px; }
    100% { background-position: 500px 1000px, 400px 600px, 300px 300px; }
}

</style>

The snowball effect is a metaphor for a situation where something small and insignificant grows in size over time, much like a snowball rolling down a hill gathers more snow.
In this project, we aim to investigate whether such an effect exists within Reddit’s social network. Specifically, we examine how positive or negative links received by a targeted subreddit influence both its own behavior and the broader network’s response. First, we explore whether the sentiment of incoming links affects the sentiment of the outgoing links that the targeted subreddit sends during that period (does receiving negative attention make it more likely to link negatively to others, or does positive attention lead to more supportive interactions?). Next, we study how other subreddits respond to these interactions. When one subreddit links negatively to another, does this make additional subreddits to also link negatively to the same target? Conversely, does a positive link between two subreddits also attract more positive attention from others? Overall, we aim to see whether that first link triggers a snowball effect, amplifying positive or negative sentiment across both related and distant communities on Reddit.

## 2. PLOT Visu of the data

## 3. PLOT Clustering plot

Here is a plot of the clusters in embedding space

![t-SNE clusters]({{ site.baseurl }}/Images/tsne_plot.png)

## 4. PLOT Interactions between clusters

This is a plot of the interactions between clusters

<div class="flourish-embed flourish-sankey" data-src="visualisation/26700217">
  <script src="https://public.flourish.studio/resources/embed.js"></script>
  <noscript>
    <img src="https://public.flourish.studio/visualisation/26700217/thumbnail" width="100%" alt="sankey visualization" />
  </noscript>
</div>

## 5. Defining positivity / Negativity score

PLOT: regression?

## 6. PLOT Most positive and negative clusters by time

This is a plot of the share of positive hyperlinks over time

<div class="flourish-embed flourish-chart" data-src="visualisation/26714353">
  <script src="https://public.flourish.studio/resources/embed.js"></script>
  <noscript>
    <img src="https://public.flourish.studio/visualisation/26714353/thumbnail" width="80%" alt="chart visualization" />
  </noscript>
</div>

## 7. Matching

1. within cluster

2. by activity level

3. by mean sentiment

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

---
layout: page
title: Does the Snowball Effect Exist on Reddit?
---

<div class="graph-hero">
  <canvas id="graph-hero-canvas"></canvas>
  <div class="graph-hero-text">
    <h1>Snowball Effect on Reddit</h1>
    <p>Visualizing how discussions snowball and spread across Reddit threads.</p>
  </div>
</div>

<script src="{{ site.baseurl }}/assets/js/graph-hero.js"></script>

The snowball effect is a metaphor for a situation where something small and insignificant grows in size over time, much like a snowball rolling down a hill gathers more snow.
In this project, we aim to investigate whether such an effect exists within Reddit’s social network. Specifically, we examine how positive or negative links received by a targeted subreddit influence both its own behavior and the broader network’s response. First, we explore whether the sentiment of incoming links affects the sentiment of the outgoing links that the targeted subreddit sends during that period (does receiving negative attention make it more likely to link negatively to others, or does positive attention lead to more supportive interactions?). Next, we study how other subreddits respond to these interactions. When one subreddit links negatively to another, does this make additional subreddits to also link negatively to the same target? Conversely, does a positive link between two subreddits also attract more positive attention from others? Overall, we aim to see whether that first link triggers a snowball effect, amplifying positive or negative sentiment across both related and distant communities on Reddit.

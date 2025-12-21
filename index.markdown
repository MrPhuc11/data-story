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
    <img src="https://public.flourish.studio/visualisation/26769169/thumbnail" width="30%" alt="chart visualization" />
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
<h3>What are Shock Events?</h3>
<br>

<ul>
      In our framework, we decided to define two particular cases of Shock events:
      <li><b>Sentiment Shock Event:</b> A sentiment shock event happens when a subreddit receives an incoming link with sentiment that is unusually extreme, either negative or positive, compared to what it normally receives. These moments stand out from everyday activity as spikes in emotional intensity.</li>
      <li><b>Repetitive Shock Event:</b> A repetitive shock event happens when a subreddit receives unusually large bursts of incoming links several times in a short period, compared to its normal past activity.</li>
    </ul>
<div class="image-container" style="width: 90%; margin: 0 auto; text-align: center;">
      <img src="{{ site.baseurl }}/Images/Rep_shock_event.png" alt="PCA Sentiment Analysis Cluster" style="width: 100%;">
</div>

<h3>So what happens after a sentiment shock event ?</h3>
<br>
<div id="monet-bd-story2"></div>

<div style="max-width: 1000px; margin: 40px auto;">
  <div class="image-container">
    <img src="{{ site.baseurl }}/Images/detective events.png" alt="Detected negative events in askreddit">
    <p class="caption">
      Detected negative events for <i>r/clashoflclans</i>. Orange points mark days where the negative deviation is strong enough to be classified as an event.
    </p>
  </div>
</div>
Here, we watch <i>r/clashofclans</i> over time and, each day, grab the single most negative link it gets. Instead of staring at raw scores, we turn that into a standardized “how different was this for them?” number so you can see when an interaction really stands out from their usual tone.

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
<br>

<div style="text-align: justify;">

<div style="border-left: 4px solid #A7C7E7; padding-left: 20px; font-size: 18px; background-color: #A7C7E7">
Now that we have set up the detection of our events, we can now try and look for a potential snowball effect !
</div>
<div style="border-left: 4px solid #A7C7E7; padding-left: 20px; font-size: 18px; margin-top: 2;">
  To verify that such effect exist, we need to be rigourous and do some statistics... 
  <div style="text-align: center; margin-top: 10px;">
    <div id="monet-stats"></div>
  </div>

<br>
<br>
</div>

<div style="border-left: 4px solid #A7C7E7; padding-left: 20px; font-size: 18px; margin-top: 2;">
  <details open>
    <summary style="font-size: 18px; cursor: pointer;">
      <b>So, how do we test for a snowball effect?</b>
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
    <details open>
      <summary style="font-size: 18px; cursor: pointer;">
        <b>Welch’s t-test</b>
      </summary>
      Welch’s t-test is used to determine whether the difference between the means of two groups is due to random variation or reflects a real difference between the populations, particularly when the variances of the groups are unequal. The test works by computing a t-value that relates the difference in sample means to the variability in the data.

      Welch’s t-test defines the statistic \( t \) by the following formula:

        \[
        t = \frac{\Delta \bar{X}}{s_{\Delta \bar{X}}}
        = \frac{\bar{X}_1 - \bar{X}_2}{\sqrt{s_{\bar{X}_1}^2 + s_{\bar{X}_2}^2}},
        \]

        with:

        \[
        s_{\bar{X}_i} = \frac{s_i}{\sqrt{N_i}}.
        \]

        Here, \(\bar{X}_i\) and \(s_{\bar{X}_i}\) denote the \(i\)-th sample mean and its standard error, respectively. The quantity \(s_i\) represents the corrected sample standard deviation, and \(N_i\) is the sample size. Unlike Student’s t-test, the denominator is not based on a pooled variance estimate.

        The degrees of freedom \(\nu\) associated with this variance estimate are approximated using the Welch–Satterthwaite equation:

        \[
        \nu \approx
        \frac{\left(\frac{s_1^2}{N_1} + \frac{s_2^2}{N_2}\right)^2}
        {\frac{s_1^4}{N_1^2 \nu_1} + \frac{s_2^4}{N_2^2 \nu_2}},
        \]

        where:

        \[
        \nu_i = N_i - 1.
        \]

    </details>

    <details open>
      <summary style="font-size: 18px; cursor: pointer;">
        <b>P-Value</b>
      </summary>
      A p-value is the probability of seeing a result at least this extreme if the null hypothesis were actually true. Smaller p-values mean the result is less likely to be just random variation.
      <br>
      <br>
      For our tests, we compare it to a threshold with value 0.05: below that, we call the result statistically significant and reject the null hypothesis.
    </details>

  </details>
</div>

<p style="text-align: justify;">
Let's see what results we get...
</p>

<!-- Dual waffle charts: negative vs positive shock events -->
<div style="display: flex; gap: 24px; flex-wrap: wrap; justify-content: center; margin: 40px 0 10px;">
  <div style="flex: 1 1 320px; min-width: 280px;">
    <div class="flourish-embed flourish-chart" data-src="visualisation/26916888"><script src="https://public.flourish.studio/resources/embed.js"></script><noscript><img src="https://public.flourish.studio/visualisation/26916888/thumbnail" width="80%" alt="chart visualization" /></noscript></div>
    <p style="text-align: center; font-size: 0.9em; color: #555; margin-top: 10px;">Positive shock events</p>
  </div>
  <div style="flex: 1 1 320px; min-width: 280px;">
    <!-- Replace data-src with the Flourish ID for positive shock events -->
    <div class="flourish-embed flourish-chart" data-src="visualisation/26919883"><script src="https://public.flourish.studio/resources/embed.js"></script><noscript><img src="https://public.flourish.studio/visualisation/26919883/thumbnail" width="80%" alt="chart visualization" /></noscript></div>
    <p style="text-align: center; font-size: 0.9em; color: #555; margin-top: 10px;">Negative shock events</p>
  </div>
</div>

<div style="display: flex; gap: 24px; flex-wrap: wrap; align-items: flex-start; margin: 20px 0 30px;">
  <div class="image-container" style="flex: 0 0 260px; max-width: 320px; margin: 0; border: 1px solid #A7C7E7; border-radius: 12px; padding: 16px; background: #f7fbff; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
    <img src="{{ site.baseurl }}/Images/monet_clueless.png" alt="Monet clueless" style="max-width: 100%; height: auto; display: block; margin: 0 auto 12px;">
    <p class="caption" style="margin: 0; text-align: center;">Even Monet looks unsure here.</p>
  </div>
  <div style="flex: 1 1 320px; text-align: justify;">
    <p style="margin-top: 0;">In these waffle plots we are hunting for a snowball effect: we try to see if after a subreddit takes a hit (or a praise), there would be a change in the sentiment of its outgoing links.</p>
    <p style="margin-bottom: 0;">Something is sure from these plots, we cannot claim a causal effect. The incoming tone barely registers in what a subreddit sends back, and any apparent link feels like random drift rather than cause and effect. When something does shift, it leans negative and hostile hits drag tone down, while positive ones mostly vanish. The rare positive bumps are small and mixed, which makes it feel like other factors are in charge. And without the full post text, we're missing the context that could reveal subtler influence.</p>
  </div>
</div>

<div style="border-left: 4px solid #A7C7E7; padding-left: 20px; font-size: 18px; background-color: #A7C7E7">
We also inspected whether a subreddit hyperlinks more or less than usual after one of those shock events.
</div>
<div style="border-left: 4px solid #A7C7E7; padding-left: 20px; margin-top: 2;">
  <details close>
    <summary style="font-size: 18px; cursor: pointer;"><b>Details</b></summary>
    <div style="display: flex; gap: 24px; flex-wrap: wrap; justify-content: center; align-items: stretch; margin: 24px 0 10px;">
      <div style="flex: 1 1 320px; min-width: 280px; display: flex; flex-direction: column; align-items: center; text-align: center;">
        <div class="flourish-embed flourish-chart" data-src="visualisation/26925175" style="width: 100%;"><script src="https://public.flourish.studio/resources/embed.js"></script><noscript><img src="https://public.flourish.studio/visualisation/26925175/thumbnail" width="80%" alt="chart visualization" /></noscript></div>
        <p style="font-size: 0.9em; color: #555; margin-top: 10px;">Outgoing count shifts after negative events</p>
      </div>
      <div style="flex: 1 1 320px; min-width: 280px; display: flex; flex-direction: column; align-items: center; text-align: center;">
        <div class="flourish-embed flourish-chart" data-src="visualisation/26925196" style="width: 100%;"><script src="https://public.flourish.studio/resources/embed.js"></script><noscript><img src="https://public.flourish.studio/visualisation/26925196/thumbnail" width="80%" alt="chart visualization" /></noscript></div>
        <p style="font-size: 0.9em; color: #555; margin-top: 10px;">Outgoing count shifts after positive events</p>
      </div>
    </div>
    Same reasoning as before, there is still not a snowball effect detectable here!
  </details>
</div>

<h3 id="event analysis">What can we tell about these events?</h3>

First, let's see how our detected events are distributed withing the different topical clusters. Is the reaction conditioned on the type of subreddit? Do some subreddits react more positively or more negatively? Let's take a look.
<br>
<br>

<div class="flourish-container">
  
  <div class="flourish-embed flourish-chart" data-src="visualisation/26918762"><script src="https://public.flourish.studio/resources/embed.js"></script><noscript><img src="https://public.flourish.studio/visualisation/26918762/thumbnail" width="100%" alt="chart visualization" /></noscript></div>

  <div class="flourish-embed flourish-chart" data-src="visualisation/26918828"><script src="https://public.flourish.studio/resources/embed.js"></script><noscript><img src="https://public.flourish.studio/visualisation/26918828/thumbnail" width="100%" alt="chart visualization" /></noscript></div>

</div>
Across topical clusters, reactions are broadly similar, with only modest differences in average direction and spread. News and politics-related subreddits tend to cluster slightly more on the negative side, while gaming and entertainment communities show somewhat more positive shifts.
<br>
<br>
What about the strength of the incoming link: does a larger sentiment score impact the reaction even within the events we already classified as strong?
<br>
<br>

<div class="flourish-container">
  
  <div class="flourish-embed flourish-chart" data-src="visualisation/26924832"><script src="https://public.flourish.studio/resources/embed.js"></script><noscript><img src="https://public.flourish.studio/visualisation/26924832/thumbnail" width="100%" alt="chart visualization" /></noscript></div>

  <div class="flourish-embed flourish-chart" data-src="visualisation/26919030"><script src="https://public.flourish.studio/resources/embed.js"></script><noscript><img src="https://public.flourish.studio/visualisation/26919030/thumbnail" width="100%" alt="chart visualization" /></noscript></div>

</div>

Even among events we classify as strong, higher sentiment z-scores do not translate into systematically stronger reactions. The distributions largely overlap, with no clear monotonic relationship between sentiment intensity and subsequent change. This suggests that emotional extremeness, by itself, is not a reliable driver of how communities respond.

<br>
<br>

<div class="callout-option accent-callout" style="border-left: none;">
  <strong style="display:block; margin-bottom: 4px;">Baseline matters!</strong>
  <span style="text-align: justify; display: block;">Visual comparisons are useful, but they can also be misleading: subreddits do not start from the same baseline. Some tend to be more positive or more negative to begin with, which strongly constrains how much they can change. To separate these baseline effects from topic- or sentiment-specific reactions, we turn to a simple regression analysis.</span>
</div>
<div style="border-left: 4px solid #A7C7E7; padding-left: 20px; font-size: 18px; background-color: #A7C7E7">
<b>Regression 101 </b>
</div>

<div style="border-left: 4px solid #A7C7E7; padding-left: 20px; font-size: 18px; margin-top: 2;">
  <details open>
    <summary style = "font-size: 18px; cursor: pointer;"><b>Ordinary Least Squares Regression (OLS) </b></summary>
    <div style="text-align: justify;">
      OLS regression is a statistical method for estimating the parameters of a linear relationship between a dependent variable and one or more independent variables. The method selects coefficient estimates that minimize the sum of squared residuals, where each residual represents the difference between an observed value and the value predicted by the linear model.
    </div>
    <details>
      <summary style = "font-size: 18px; cursor: pointer;"><b>Details </b></summary>
      <div class="image-container">
        <img src="{{ site.baseurl }}/Images/OLS.png" alt="OLS">
      </div>
    </details>
  </details>
</div>
<br>
<br>
Once we account for a subreddit’s prior sentiment level, most of the variation in how it reacts is explained by regression to the mean: subreddits that were already highly positive tend to cool off, while more negative ones tend to rebound. Topic still matters, but only at the margins. News, politics, and conspiracy-focused communities show systematically weaker reactions, while gaming-related subreddits tend to react slightly more positively on average. By contrast, the strength of the incoming sentiment signal (how extreme it is) adds little explanatory power once the baseline is known. In other words, where a community starts matters far more than how emotionally charged the triggering content is.

<h3>What about the repetitive shock events?</h3>
<br>
<div id="monet-bd-story3"></div>

<div style="text-align: justify;">

Subreddits frequently link to one another, sometimes repeatedly over short periods of time. But what happens when a community suddenly receives a surge of incoming links?
Does this external attention amplify certain narratives, shift sentiment, or trigger collective reactions?

<br>
<br>

<div style="border-left: 4px solid #A7C7E7; padding-left: 20px; font-size: 18px; background-color: #A7C7E7">
How do we define a shock event?
</div>
<div style="border-left: 4px solid #A7C7E7; padding-left: 20px; font-size: 18px; margin-top: 2;">
To detect shock events, we identify days when a subreddit receives far more incoming links than usual. Instead of relying on a single cutoff, we combine multiple criteria to make sure these spikes are rare, substantial, and meaningful.
<br>

In simple terms, a day is labeled as a shock event when a subreddit receives a surge of incoming links that is rare compared to its past, much larger than its usual activity, and large enough in absolute size to be meaningful.

<details open>
  <summary style="font-size: 18px; cursor: pointer;">
    <b>Formal Definition</b>
  </summary>

For each subreddit <i>s</i>, we define a threshold that determines when incoming links are unusually high:

\[
\text{threshold}_s = \max \left( \text{percentile}_{s,q},\ k_0 \right)
\]

A day is labeled as a <i>repetitive shock event</i> if the number of incoming links exceeds this threshold.

  <ul style="margin-top: 8px; margin-bottom: 8px; padding-left: 18px;">
    <li><b>percentileₛ,q:</b> captures rare events by focusing on the extreme tail of historical activity (we use q = 0.99).</li>
    <li><b>k₀:</b> avoids triggering events for very small subreddits due to noise (we use k₀ = 5 links).</li>
  </ul>

By taking the maximum of these two values, we ensure that detected bursts are unusual, clearly elevated, and substantial.

  <details open>
    <summary style="font-size: 18px; cursor: pointer;">
      <b>Formal Definition</b>
    </summary>
      For each subreddit s, we define a threshold that determines when incoming links are unusually high:
      \[
      \text{threshold}_s = \max \left( \text{percentile}_s,\ \alpha \cdot \text{median}_s,\ k_0 \right)
      \]

      A day is labeled as a <i>shock event</i> if the number of incoming links to the subreddit exceeds this threshold.

    What each term means:

    <ul style="margin-top: 8px; margin-bottom: 8px; padding-left: 18px;">
      <li><b>percentileₛ:</b> Captures rare events by requiring the spike to fall in the extreme upper tail of the subreddit’s historical linking activity (e.g., the top 1%).</li>
      <li><b>α · medianₛ:</b> Ensures the spike is large relative to normal behavior by requiring several times the typical daily number of incoming links.</li>
      <li><b>k₀:</b> Sets a minimum absolute number of links, preventing very small subreddits from triggering shock events by chance.</li>
    </ul>

By taking the **maximum** of these three values, we ensure that detected shock events are **unusual**, **clearly elevated**, and **substantial**.

  </details>
</div>

<h3>How About the Emotional Influence Analysis Between Related Subreddits</h3>

<div class="image-container">
  <img src="{{ site.baseurl }}/Images/Images/WhatsApp Image 2025-12-20 at 22.32.39.jpeg" style=" width: 70%;">
</div>

<div style="text-align: justify;">
<p>
At first glance, the picture looks familiar.
Most repetitive shock events are followed by <b>little to no measurable change</b> in outgoing sentiment. When shifts do occur, they remain small and inconsistent. Some subreddits become slightly more negative, others slightly more positive,
but the overall distribution is tightly centered around zero.
</p>

<p>
In other words, even sustained incoming attention rarely translates into a clear emotional reaction.
</p>
</div>

<!-- SLOT: OUTGOING LINK COUNT AFTER REPETITIVE EVENTS -->
<div style="max-width: 1000px; margin: 40px auto;">
  <div class="image-container">
    <!-- INSERT PLOT HERE -->
    <img src="{{ site.baseurl }}/Images/PLACEHOLDER_repetitive_volume.png" alt="Outgoing link volume after repetitive shock events">
    <p class="caption">
      Changes in outgoing hyperlink volume following repetitive shock events.
    </p>
  </div>
</div>

<div style="text-align: justify;">
<p>
We also inspected whether repeated incoming links trigger more activity.
If communities feel “under the spotlight”, they might respond by linking out more.
</p>

<p>
Again, the evidence is weak.
Outgoing activity shows no systematic increase or decrease after repetitive shock events.
Most subreddits quickly revert to their usual rhythm.
</p>
</div>

<div class="callout-option accent-callout" style="margin-top: 24px;">
  <strong style="display:block; margin-bottom: 6px;">Takeaway</strong>
  <span style="text-align: justify; display: block;">
  Repeated attention does not seem to amplify reactions.
  Even when a subreddit is hit by sustained incoming linking, its outgoing behavior remains remarkably stable.
  If a snowball effect exists, it is subtle, rare, and easily drowned out by baseline dynamics.
  </span>
</div>

<div style="text-align: justify; margin-top: 16px;">
<p>
This reinforces what we observed earlier:
communities are far more constrained by their usual tone and activity level
than by short-term external pressure. However, these analyses still focus on the <i>directly targeted</i> subreddit.
What remains unanswered is whether emotional signals might travel further through the network.
</p>
</div>

<h3>Emotional Influence Analysis Between Related Subreddits</h3>

This analysis investigates whether a highly negative emotional interaction between two subreddits affects not only those two communities, but also <b>other subreddits that are topically or structurally related</b> to them. In other words, we ask whether emotional signals propagate through the subreddit network beyond their point of origin.
<br>
<br>
We use our highlyemotional detected events as <b> seeds</b>, potential starting points of emotional diffusion.
<br>

<div style="border-left: 4px solid #A7C7E7; padding-left: 20px; font-size: 18px; margin-top: 2;">
  <details open>
    <summary style = "font-size: 18px; cursor: pointer;"><b>Network distance</b></summary>
        Network distance is a measure that quantifies the separation between two nodes in a network as the length of the shortest path connecting them, where length is defined as the minimum number of edges required to traverse from one node to the other.
    </details>
</div>
<br>
<br>

<div style="border-left: 4px solid #A7C7E7; padding-left: 20px; font-size: 18px; background-color: #A7C7E7">
From the detected cascades, we compute two key indicators of emotional diffusion:
</div>

<div style="border-left: 4px solid #A7C7E7; padding-left: 20px; font-size: 18px; margin-top: 2;">
  <details open>
    <summary style = "font-size: 18px; cursor: pointer;"><b>Metrics</b></summary>
    <div style="text-align: justify;">
      <ul style="margin: 0 0 0 18px; padding: 0; list-style: disc;">
        <li><b>Reach:</b> Number of subreddits that show an emotional shift after the seed event </li>
        <li><b>Radius:</b> Maximum network distance between the seed subreddit and affected subreddits</li>
      </ul>
    </div>

  </details>
</div>

### Building subreddit-level time series

We first aggregate **incoming interactions** by subreddit and by day:

- `count_incoming`: number of incoming interactions per day
- `mean_sentiment` and `median_sentiment`: average emotional tone of incoming content

This produces a daily **emotional time series** for each subreddit, which is the basis for event detection.

### Detecting high-emotion events (Seeds)

A **high-emotion event** is detected when the daily mean sentiment deviates strongly from the subreddit’s baseline, using a z-score threshold (`z_thresh = -2.0`) and a minimum activity constraint.

These events serve as **seeds**, i.e., potential starting points of emotional diffusion.

### Constructing the dynamic interaction network

We then reconstruct the daily interaction network between subreddits:

- Nodes are subreddits
- Directed edges represent interactions from `SOURCE_SUBREDDIT` to `TARGET_SUBREDDIT`

This network allows us to define **network distance**, measured as the number of hops between subreddits.



### Identifying emotional cascades

Starting from each seed event, the function `finding_cascades` searches for evidence of **emotional propagation** within a symmetric temporal window:

- `PRE_W = 3` days before the event
- `POST_W = 3` days after the event

A subreddit is included in the cascade if it shows:
- a sufficiently large emotional variation (`VAR_THRESH`)
- sufficient temporal similarity with the seed’s emotional trajectory (`rel_thresh`)

Each detected cascade consists of:
- `nodes`: subreddits affected by the emotional event
- `edges`: inferred paths of emotional influence

### Measuring emotional spread

From the detected cascades, we compute four key indicators of emotional diffusion:

- **Reach**  
  → Number of subreddits that show an emotional shift after the seed event  
  (`len(cascade["nodes"])`)

- **Radius**  
  → Maximum network distance between the seed subreddit and affected subreddits  
  (`cascade_radius(cascade)`)

The code then summarizes diffusion by reporting:
- the **maximum radius** observed across all cascades
- the **average radius**, representing typical emotional reach

### Interpretation

If cascades exhibit a radius greater than one and a non-trivial reach, this provides evidence that emotions do not remain localized to a single interaction, but instead spread to **related subreddits** through the interaction network.

This directly addresses the research question:

> *Do interactions between two subreddits influence other topically or structurally related subreddits?*

By quantifying **reach, distance, and persistence**, the code operationalizes emotional diffusion in the subreddit network.

<div style="max-width: 1000px; margin: 40px auto;">
  <div class="image-container">
    <img src="{{ site.baseurl }}/Images/plot_spread.png" alt="plot spread">
    <p class="caption">
      JSp ce que c'est
    </p>
  </div>
</div>

<h3>What have we learned?</h3>
<h3>So, what have we learned?</h3>

<div style="display: flex; gap: 20px; flex-wrap: wrap; align-items: center; margin: 12px 0 12px;">
  <div class="image-container" style="flex: 0 0 180px; max-width: 190px; margin: 0; border: 1px solid #A7C7E7; border-radius: 12px; padding: 8px; background: #f7fbff; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
    <img src="{{ site.baseurl }}/Images/monet_snowball.png" alt="Monet snowball" style="max-width: 100%; height: auto; display: block; margin: 0 auto;">
  </div>
  <div style="flex: 1 1 320px; text-align: justify;">
    After many distribution plots, t-tests, and statistical detours, we <b>find little evidence of a snowball effect in hyperlinks between subreddits</b>.
    <br>
    <br>
    Which might actually be good news!<span id="confetti-emoji" role="button" aria-label="celebrate" style="cursor: pointer;">🥳</span>
  </div>
</div>
<div style="text-align: justify; margin-bottom: 20px;">
  However, this does not mean that the snowball effect does not exist on Reddit. One important limitation is that hyperlinks capture only explicit references between subreddits, while many interactions happen without links and therefore remain invisible in this dataset. It could still appear in other forms, such as through comments, user activity, or coordinated behavior within and across subreddits. To push this analysis further and find out for sure, we would need richer data on post content and on users active in both the source and target communities.
</div>

<div class="callout-option accent-callout" style="margin-top: 20px;">
  <strong style="display:block; margin-bottom: 6px;">FIND OUT MORE 🤓</strong>
  <p style="margin: 0 0 10px 0; text-align: justify;">
    There are many ways in which users interact! If you are interested in the way negative hyperlinks can create mobilizations where users from a source subreddit and how users from that target react after an attack, check out the paper below.
  </p>
  <a href="https://cs.stanford.edu/~srijan/pubs/conflict-paper-www18.pdf" target="_blank" rel="noopener"
     style="display: inline-flex; align-items: center; gap: 8px; padding: 8px 12px; border: 1px solid #4e7aa9; border-radius: 999px; text-decoration: none; color: #1f2b3a; background: linear-gradient(135deg, #f9fbff, #eef3ff); font-weight: 600;">
    Read the paper <span aria-hidden="true">→</span>
  </a>
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

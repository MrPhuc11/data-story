---
layout: default
---

# ada-2025-project-canada

# Does the Snowball Effect Exist on Reddit? 

## 1. Abstract

The snowball effect is a metaphor for a situation where something small and insignificant grows in size over time, much like a snowball rolling down a hill gathers more snow. 
In this project, we aim to investigate whether such an effect exists within Reddit’s social network. Specifically, we examine how positive or negative links received by a targeted subreddit influence both its own behavior and the broader network’s response. First, we explore whether the sentiment of incoming links affects the sentiment of the outgoing links that the targeted subreddit sends during that period (does receiving negative attention make it more likely to link negatively to others, or does positive attention lead to more supportive interactions?). Next, we study how other subreddits respond to these interactions. When one subreddit links negatively to another, does this make additional subreddits to also link negatively to the same target? Conversely, does a positive link between two subreddits also attract more positive attention from others? Overall, we aim to see whether that first link triggers a snowball effect, amplifying positive or negative sentiment across both related and distant communities on Reddit.


## 2. Research questions

- Does the sentiment of incoming links influence the sentiment of outgoing links from the targeted subreddit over a short time period?
- Are other subreddits more likely to connect because of how often two subreddits interact, or because of how intense their links are (very positive or very negative)?
- After a subreddit receives positive or negative links, how does the sentiment of other subreddits toward it change over time? Do they continue linking with the same sentiment, or does the effect weaken over the long term?
- Does the interaction between two subreddits influence other subreddits that are topically related to them? In other words, do related subreddits also get affected by that link?
- Do highly polarized communities (strongly positive or negative) react differently to interactions compared to more neutral ones?

## 3. Proposed additional datasets

For our project, we add two embedding datasets: 118,381 user and 51,278 subreddit embeddings (300-dimensional). Distances between embedding-vectors, reflect audience overlap: subreddits are close if similar users post there; users are close if they post in similar subreddits. We restrict to subreddits present in the hyperlink data and use the embeddings for example to compare audience similarity with hyperlink connectivity or visualize clusters via 2-D t-SNE.


## 4. Methods

### Emotional Measure of Posts and Interactions

We define a post’s emotional identity as a vector of emotion-intensity scores across a predefined set of categories relevant to our study (e.g., joy/motivation, sadness, anger/aggression, anxiety, and praise/compliment). For each category, an emotion score is computed as a weighted combination of linguistic features that best capture its expression, such as specific LIWC properties or sentiment indicators. The resulting scores form an emotional vector for each post or interaction.
Depending on the analysis, posts can be represented as:
- **Unique-emotional:** the emotion with the highest score determines the post’s category.
- **Multi-emotional:** all emotions above a predefined threshold are retained.

To validate the classifier’s reliability, we test it on human-annotated texts and compare predicted labels with the expected emotional tone. At the subreddit level, emotional tone over a given period is measured as the average emotion vector of all outgoing posts (source→target links) created by that subreddit during the period.

### Impact of Strong and Frequent Emotional Links

We define the impact of emotion as the extent to which a target subreddit’s emotional tone shifts toward an emotion E after being exposed to a source subreddit that strongly expresses E (through a post or title tag). To measure this, we compare the average emotional tone of the target subreddit within time windows before and after exposure.
Because emotional tone may change naturally over time, we construct a matched control group of subreddits similar in size, activity, topic, and baseline emotion but not exposed to the emotional source. Comparing the tone of this control group and our target subreddit, we can contemplate conclusions about causality.
We extend this analysis to frequent emotional exposure, defined as repeated links from a source to a target within a short period, each expressing emotion E. This captures cumulative rather than single-event effects and allows direct comparison between strong and repeated interactions.

### Distance and Reach of Emotion

To study how far emotions propagate, we identify high-emotion events and track how surrounding subreddits’ emotional tones evolve before and after the event. Distance from the source can be defined by network distance (how many links connect two subreddits) or by thematic proximity (similarity in embedding space or topic).
By comparing emotional shifts in nearby versus distant subreddits, we describe the shape of emotional diffusion, whether the emotion remains local or spreads widely. To control for unrelated fluctuations, we again use matched controls and a difference-in-differences comparison.
We summarize spread using four intuitive indicators:

- **Reach:** number of subreddits showing an emotional increase after the event.
- **Radius:** how far, in network distance, the emotional influence extends.
- **Duration:** how long the elevated emotion persists in time.
- **Decay:** how quickly emotional intensity weakens with distance from the source.
  
## 5. Project Timeline and Organization within the team

| **Dates**          | **Task**                                                                                                          | **Responsible**      |
|---------------------|------------------------------------------------------------------------------------------------------------------|----------------------|
| **Nov 10 – Nov 16** | Define the structure of the data story and set up the website.                                                   | r/Aveen              |
|                     | Analyze yearly changes in the proportion of negative links for each subreddit cluster (and positive activity).   | r/Phuc               |
|                     | Group subreddits by the different sentiments they send (e.g., sadness, motivation).                              | r/Olatz, r/Charly    |
|                     | Analyze the sentiment of incoming/outgoing links of subreddits (short time window).                              | r/Manon              |
| **Nov 17 – Nov 23** | Analyze how one strong emotional hyperlink can cause other subreddits to react.                                  | r/Charly             |
|                     | Compute correlation between incoming and outgoing sentiment.                                                     | r/Manon, r/Aveen     |
|                     | Measure sentiment changes in topic-related subreddits following an initial interaction.                          | r/Olatz, r/Phuc      |
| **Nov 24 – Dec 7**  | Compare short-term vs. long-term influence of an initial interaction between two subreddits.                     | r/Phuc               |
|                     | Quantify interaction frequency between subreddit pairs.                                                          | r/Charly             |
|                     | Quantify interaction sentiment intensity between subreddit pairs.                                                | r/Manon              |
|                     | Start the website.                                                                                               | r/Aveen              |
|                     | Add more visualization (if needed).                                                                              | r/Olatz              |
| **Dec 8 – Dec 14**  | Draw conclusions about the snowball effect in Reddit.                                                            | r/Olatz              |
|                     | Finalize analysis.                                                                                               | r/Aveen, r/Charly    |
|                     | Complete data story.                                                                                             | r/Phuc, r/Manon      |
| **Dec 15 – Dec 17** | Final project review and submission.                                                                             | All members          |

## Quickstart

To get started with the project, download the datasets and extract them in the data/raw folder.

```bash
ADA-2025-PROJECT-CANADA/
├── data/
│   ├── clean/                            <- for future cleaned data structures
│   └── raw/                              <- where to store the raw data
│
├── src/
│   ├── data/
│   │   ├── Graph.py                      <- Builds and manages subreddit interaction graphs
│   │   ├── HyperlinkDataFrame.py         <- Class for the hyperlink dataset
│   │   └── EmbeddingDataFrame.py         <- Class for the embeddings dataset
│   │
│   ├── models/
│   │   └── model.py                      <- Models for further prediction
│   │
│   ├── scripts/
│   │   └── script.py                     <- Optional entry-point scripts
│   │
│   └── utils/
│       ├── constants.py                  <- Global variables
│       ├── general_utils.py              <- Helper functions
│       └── plots.py                      <- Visualization utilities
│
├── tests/                                <- exhaustive tests
│
├── results.ipynb                         <- Well-structured notebook showing the results
├── .gitignore                            <- List of files ignored by git
├── pip_requirements.txt                  <- File for installing Python dependencies
└── README.md                             <- Project overview and setup instructions


```
Then, clone the repository and install the required dependencies.

```bash
# Clone the project
git clone https://github.com/epfl-ada/ada-2025-project-canada.git
cd <project repo>

# Install requirements
pip install -r pip_requirements.txt



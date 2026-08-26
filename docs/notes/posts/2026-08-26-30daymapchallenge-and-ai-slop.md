---
date: 2026-08-26          # post date, controls ordering
slug: 30daymapchallenge-and-ai-slop
categories:
  - Announcement          # one of: Recap, Announcement, Community maps
draft: false              # set true to hide while editing
---

# #30DayMapChallenge and AI slop

Over the last year software development has gone through a total revolution. AI
tools have changed the way software is written, and the scale of it shows in the
numbers. GitHub's latest [Octoverse report](https://github.blog/news-insights/octoverse/octoverse-a-new-developer-joins-github-every-second-as-ai-leads-typescript-to-1/)
counted 43.2 million pull requests merged per month on average, up 23% year over
year, and [close to a billion commits pushed](https://github.blog/news-insights/octoverse/what-986-million-code-pushes-say-about-the-developer-workflow-in-2025/),
up 25.1%. The Copilot coding agent on its own authored more than a million pull
requests in five months. Design and the broader creative
domain have also experienced a shockwave through the rise of LLMs and generative
AI. Of course this has been happening for a few years already, but I feel like
the last year has been the most dramatic so far. This has made me think about
what the LLM revolution means for the #30DayMapChallenge, which sits somewhere
between design and tech. My biggest fear has been that the number of maps
created will dramatically increase but the quality will go down, and the whole
hashtag will become a synonym for low quality AI map slop. But let's take a deep
breath and an analytical approach to what this could mean for the challenge.

![A deliberately terrible AI-generated world map titled "Wrold Map (2026)", with
garbled labels including "New Yrok City", "Londun, Franc-many" printed twice,
"Sahara Rainforest", "Mt. Everestt Rainge (14ft)" and a scale bar reading
"7 killometers".](../../imgs/bad-ai-map.png)

*I made a bad AI map so you don't have to. Seeing my social media feed full of
maps like this is my biggest fear.*

<!-- more -->

## Don't start a fight which you'd lose

A conservative and purist approach could be to simply say that use of AI tools
is not allowed in the challenge. There are a few reasons why this doesn't make
sense.

Firstly, the challenge has always been open to all kinds of approaches. Our core
values, don't be an asshole and give credit to data sources and others where you
can, should mitigate pure slop approaches quite well on their own.

Secondly, LLMs are so deeply integrated into the everyday workflows of many of
us that pulling them out of the challenge would feel awkward and artificial.
Where would you even draw the line?

## Be true to yourself and others

Sure, you could just throw the 30-day prompt list at an LLM and ask it to create
30 maps for you, but who would benefit from that? You might get a few likes, but
that's about it. The challenge is about having fun and learning new things.

There is definitely a sweet spot where LLMs and generative AI can elevate the
challenge and mapmaking workflows. But I don't believe it's an end-to-end flow,
where you try one-shot approaches from prompt straight to a final map. In my
head, the creation of maps for the challenge has always comprised roughly the
following steps:

1. **Ideation.** What does the daily prompt mean for me? What approaches could I
   take for today's map? What data and tools could I use? I think the initial
   idea should come from you, but why not bounce it off AI and sharpen it from
   there.

2. **Data discovery and crunching.** Once you have an idea, you obviously need
   data. I have heard many people say over the years that they spend too long on
   this part, or simply can't find the right kind of data. This is where I think
   AI can bring the most value. For some people the challenge is mostly about
   having fun with data and polishing their data engineering skills, but for many
   cartographers this part is a necessary evil. LLMs are very good with GDAL
   scripts, Overpass API queries, and other geodata skills that can eat up a lot
   of time, especially for a beginner.

3. **Visualisation.** This is the part I am most skeptical about when it comes to
   the value of current generative AI. AI-generated maps tend to be inaccurate,
   and controlling data and visual output can be difficult. The
   [Bad AI Maps, Part 1](https://mapoftheweek.blogspot.com/2026/03/bad-ai-maps-part-1.html)
   post on the Map of the Week blog is a good collection of what that looks like
   in practice:

    [![An AI-generated map, from the "Bad AI Maps, Part 1" post on the Map of the Week blog](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh06tRmFR5LV5jPBvfrHjq9ygbsAMyuUWPntxPA_-y5R4OrJ10RIUit_vM6z3rGebZJVXX_VxC7H8x023WSulanrtWPbJ0ncBtks0tRU_B8JTjcm3Su4WsO3VnNQZcQK6IJXpa9GBFJ6NUMy-KxQLyUHlyahbr7JZBjUowL-uYOXcxpGyNBT-rJB-OdXrQ/s1076/sai1203.jpeg)](https://mapoftheweek.blogspot.com/2026/03/bad-ai-maps-part-1.html)

    *Image via [Bad AI Maps, Part 1](https://mapoftheweek.blogspot.com/2026/03/bad-ai-maps-part-1.html),
    Map of the Week.*

    There is also a bigger question underneath the accuracy one. Daniel
    Huffman's [On Sin](https://somethingaboutmaps.wordpress.com/2026/07/19/on-sin/)
    is a marvellous piece on the ethics of cartography, and I would highly
    recommend that everyone taking part in the challenge reads it.

4. **Polishing and publishing.** Ask for critical feedback on your final work. I
   also feel like AI will boost the creation of interactive maps, which have been
   a minority of the challenge outputs so far.

So be smart with your AI usage and think about where it adds the most value and
the least hallucination risk in your mapmaking workflow. I have personally gone
from skepticism to optimism when thinking about what it can do for the
challenge. These tools can genuinely boost productivity when used smartly.
Stupid usage leads to stupid results.

## How AI was used in the creation of this blog post

The web is now full of not only AI-generated images, but blog posts are
increasingly horrible to read too, full of AI tells: boilerplate text, bullet
point lists, and a lot of words with very little content. So I want to be
transparent about how I used AI when writing this. Maybe it can also serve as
inspiration for some of you when thinking about your own mapmaking workflows.

(The bullet lists in this post are mine, written by hand, not AI output. Given
the topic, that felt worth saying explicitly.)

1. I thought long and hard about this and wrote down some initial notes on my
   phone.
2. I didn't have many facts about the current state of generative AI in
   mapmaking, so I asked Claude to do deep research on it. Read the results and
   thought a bit more.
3. Wrote the blog post draft in a way that had the whole structure in place.
4. Asked Claude for feedback on the draft and to check the grammar. Told it my
   tone and core message shouldn't change. Iterated on that basis.
5. Published it.

So we'll see what happens in November. I'm excited to see. I'm also keen on
revisiting this post next year, when there will have been yet another revolution
or two.

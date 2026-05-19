# Map collections 🗺️

Every November the #30DayMapChallenge community creates tens of thousands of
maps. This page links to **map collections** — galleries, portfolios and
write-ups where mappers, teams and organisations have gathered their challenge
maps in one place.

!!! tip "Add your collection"
    Built a collection of challenge maps, or written up your month? We'd love to
    link it here. The easiest way is to add a few lines to
    [`galleries.yml`](https://github.com/tjukanovt/30DayMapChallenge/blob/main/galleries.yml)
    and open a pull request — see the
    [contributing guide](https://github.com/tjukanovt/30DayMapChallenge/blob/main/CONTRIBUTING.md).
    Not comfortable with pull requests? Open a
    [submission issue](https://github.com/tjukanovt/30DayMapChallenge/issues/new?template=gallery-submission.yml)
    instead and we'll add it for you.

{% for year in galleries | map(attribute='year') | unique | sort | reverse %}
## {{ year }}

{% for g in galleries | selectattr('year', 'equalto', year) | sort(attribute='creator') %}
- **[{{ g.creator }}]({{ g.link }})**{% if g.description %} — {{ g.description }}{% endif %}
{% endfor %}
{% endfor %}

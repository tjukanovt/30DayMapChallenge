# Map galleries 🗺️

Every November the #30DayMapChallenge community creates tens of thousands of
maps. This page collects **galleries** — places where mappers, teams and
organisations have gathered their challenge maps in one spot.

!!! tip "Add your gallery"
    Built a collection of challenge maps? We'd love to link it here. The easiest
    way is to add a few lines to
    [`galleries.yml`](https://github.com/tjukanovt/30DayMapChallenge/blob/main/galleries.yml)
    and open a pull request — see the
    [contributing guide](https://github.com/tjukanovt/30DayMapChallenge/blob/main/CONTRIBUTING.md).
    Not comfortable with pull requests? Open a
    [gallery submission issue](https://github.com/tjukanovt/30DayMapChallenge/issues/new?template=gallery-submission.yml)
    instead and we'll add it for you.

{% for year in galleries | map(attribute='year') | unique | sort | reverse %}
## {{ year }}

{% for g in galleries | selectattr('year', 'equalto', year) | sort(attribute='creator') %}
- **[{{ g.creator }}]({{ g.link }})**{% if g.description %} — {{ g.description }}{% endif %}
{% endfor %}
{% endfor %}

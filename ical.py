#!/usr/bin/env python3

"""
Update ical-file from markdown table in README.md
2020-2021 Sebastian M. Ernst <ernst@pleiszenburg.de>
"""

from datetime import datetime
from pytz import UTC
from random import randint

HEADER = """BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//tjukanovt//30DayMapChallenge//EN
ATTENDEE:MAILTO:do-not@send-email.xyz
X-WR-CALNAME:30DayMapChallenge"""

SUMMARY = """BEGIN:VEVENT
SUMMARY:{summary:s}
DTSTART;VALUE=DATE:{year:04d}{month:02d}{day:02d}
UID:{uid:s}@30DayMapChallenge
DESCRIPTION:{description:s}
LAST-MODIFIED;VALUE=DATE-TIME:{modified:s}
LOCATION:The Internet
ORGANIZER;CN="30DayMapChallenge":MAILTO:do-not@send-email.xyz
URL:https://github.com/tjukanovt/30DayMapChallenge
END:VEVENT"""

FOOTER = "END:VCALENDAR"

START = "<!-- TABLE START -->"

END = "<!-- TABLE END -->"

TODAY = datetime.now()

def _event(line: str, now: str) -> str:

    columns = [column.strip(" \t*`") for column in line.split('|')[1:-1]]
    assert len(columns) == 4

    number = int(columns[0])
    assert 1 <= number <= 30 # days in November
    date = datetime(*[int(fragment) for fragment in columns[1].split('-')[::-1]])
    summary = columns[2]
    assert len(summary) > 0
    description = columns[3]
    # assert len(description) > 0 # can be empty?

    return SUMMARY.format(
        summary = summary,
        year = date.year,
        month = date.month,
        day = date.day,
        uid = f'{randint(0, 2 ** 20):05x}', # HACK more or less unique
        description = description,
        modified = now,
    )

def _now() -> str:

    n = datetime.now(tz = UTC)

    return f'{n.year:04d}{n.month:02d}{n.day:02d}T{n.hour:02d}{n.minute:02d}{n.second:02d}Z'

def main():

    with open('README.md', mode = 'r', encoding = 'utf-8') as f:
        raw = f.read()
    assert raw.count(START) == 1 and raw.count(END) == 1 # just in case ...

    table = raw.split(START)[1].split(END)[0].strip().split('\n')[2:] # quick and dirty
    assert len(table) == 30 # days in November

    now = _now()

    out = "\n".join([HEADER, *[_event(day, now) for day in table], FOOTER])

    with open('themes.ical', mode = 'w', encoding = 'utf-8') as f:
        f.write(out)

if __name__ == '__main__':
    main()

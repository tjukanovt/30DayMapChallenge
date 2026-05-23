"""mkdocs-macros module: exposes the community map gallery data to the docs."""

from pathlib import Path

import yaml

_GALLERIES_FILE = Path(__file__).parent / "galleries.yml"


def define_env(env):
    entries = yaml.safe_load(_GALLERIES_FILE.read_text(encoding="utf-8")) or []
    env.variables["galleries"] = entries

    @env.filter
    def sort_creators(items):
        """Order gallery entries by their visible name, case-insensitively and
        ignoring a leading ``@`` so handles interleave with full names instead
        of clustering at the top."""
        return sorted(
            items,
            key=lambda g: str(g.get("creator", "")).lstrip("@").lower(),
        )

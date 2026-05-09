from __future__ import annotations

import sys
from pathlib import Path

parent_dir = Path(__file__).resolve().parent.parent
parent_dir_str = str(parent_dir)
if parent_dir_str not in sys.path:
    sys.path.insert(0, parent_dir_str)

"""Keep the existing producer-test command while discovering focused suites."""
from pathlib import Path
import unittest


if __name__ == '__main__':
    suite = unittest.defaultTestLoader.discover(
        str(Path(__file__).resolve().parent), pattern='test_*_contracts.py',
    )
    result = unittest.TextTestRunner().run(suite)
    raise SystemExit(0 if result.wasSuccessful() else 1)

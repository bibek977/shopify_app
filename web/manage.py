#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys
from dotenv import load_dotenv

load_dotenv()


from django.core.management.commands.runserver import Command as runserver

runserver.default_port = os.environ.get("BACKEND_PORT")  # type: ignore


def main():
    """Run administrative tasks."""
    if os.environ.get("DEBUG") == "True":
        os.environ.setdefault("DJANGO_SETTINGS_MODULE", "base.settings.dev")
    else:
        os.environ.setdefault("DJANGO_SETTINGS_MODULE", "base.settings.prod")
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)


if __name__ == "__main__":
    main()

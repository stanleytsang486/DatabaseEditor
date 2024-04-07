from commands.command import Command
from scripts.extractor import process_repack
from scripts.custom_calendar_23 import run_script as run_editCalendar

import json

class CalendarCommand(Command):
    def __init__(self, message, client):
        super().__init__(message, client)

    async def execute(self):
        run_editCalendar(self.message["calendarCodes"])
        process_repack("../result", Command.path)
        info = []
        info.insert(0, "Succesfully edited the calendar")
        info_json = json.dumps(info)
        await self.send_message_to_client(info_json)
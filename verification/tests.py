"""
TESTS is a dict with all of your tests.
Keys for this will be the categories' names.
Each test is a dict with
    "input" -- input data for a user function
    "answer" -- your right answer
    "explanation" -- not necessarily a key, it's used for an additional info in animation.
"""
from random import randint
import calendar
import datetime


def make_random_tests(num):
    random_tests = []
    f = datetime.date(1, 1, 1)
    for _ in range(num):
        tgt_date = f + datetime.timedelta(days=randint(0, 3652058))
        y, m, d, w = tgt_date.year, tgt_date.month, tgt_date.day, randint(0, 6)
        random_tests.append({
            "input": [y, m, d, w],
            "answer": [d.day for d in [week for week in calendar.Calendar(firstweekday=w).monthdatescalendar(y, m) if tgt_date in week].pop()]
        })
    return random_tests


TESTS = {
    "Randoms": make_random_tests(5),
    "Basics": [
        {
            "input": [2020, 1, 1, 0],
            "answer": [30, 31, 1, 2, 3, 4, 5],
        },
        {
            "input": [2020, 9, 20, 6],
            "answer": [20, 21, 22, 23, 24, 25, 26],
        },
        {
            "input": [2020, 9, 30, 0],
            "answer": [28, 29, 30, 1, 2, 3, 4],
        },
        {
            "input": [2020, 2, 29, 2],
            "answer": [26, 27, 28, 29, 1, 2, 3],
        },
    ],
}

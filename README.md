
# Automation - Calendar

Example config.json:

```
    "accessories": [
        {
            "accessory": "AutomationCalendar",
            "name": "Test",
            "latitude": 51.4825747,
            "longitude": -0.0251685
        }  
    ]

```

This accessory will create a fake sensor with some custom characteristics.
Use one or more characteristic to limit the automation to a specific period of time (e.g. only during the winter or only during the day).

## Configuration

* `latitude` your home latitude (used for astronomical calculations); e.g. *-33.8567844*
* `longitude` your home longitude (used for astronomical calculations); e.g. *151.2152967*

## Characteristics exposed

### Month of the year
The current month (1 is January, 2 is February, ..., 12 is December).

### Week of the year
The week of the year, according to the Node.js locale. See [moment.js documentation](https://momentjs.com/docs/#/get-set/week/) for more info.

### Season
The current astronomical season, based on the latitude/longitude provided.

| Season    | Enum Value |
| --------- | ---------- |
| Spring    | 1          |
| Summer    | 2          |
| Autumn    | 3          |
| Winter    | 4          |

### Season name
The label of the current season (it cannot be used for automation, use the **Season** characteristic instead).

### Time of the day
The time of the day, based on the latitude/longitude provided.

| Time of the day   | Enum Value |
| ----------------- | ---------- |
| Morning Twilight  | 1          |
| Sunrise           | 2          |
| Daytime           | 3          |
| Sunset            | 4          |
| Evening Twilight  | 5          |
| Nighttime         | 6          |

### Time of the day label
The label for the current type of the day (it cannot be used for automation, use the **Time of the day** characteristic instead).

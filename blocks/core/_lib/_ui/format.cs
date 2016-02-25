public static string NiceDate(DateTime t)
{
    if (t.Kind == DateTimeKind.Utc)
    {
        t = t.ToLocalTime();
    }
    TimeSpan span = DateTime.Now.Subtract(t);
    if (span.TotalMinutes < 1)
    {
        return "A few moments ago";
    }
    if (span.TotalHours < 1)
    {
        double min = Math.Round(span.TotalMinutes);
        return min + " minute" + (min == 1 ? "" : "s") + " ago";
    }
    if (span.TotalDays < 1 && (t.Date == DateTime.Now.Date))
    {
        double hrs = Math.Round(span.TotalHours);
        return hrs + " hour" + (hrs == 1 ? "" : "s") + " ago";
    }
    span = DateTime.Now.Date.Subtract(t);
    if (span.TotalDays < 1)
    {
        return "Yesterday at " + t.ToShortTimeString();
    }
    if (span.TotalDays < 6)
    {
        return t.DayOfWeek + " at " + t.ToShortTimeString();
    }
    return t.ToShortDateString() + " at " + t.ToShortTimeString();
}

public static string NiceDateFuzzy(DateTime t)
{
    return NiceDateFuzzy(t, false);
}

internal static string NiceDateFuzzy(DateTime t, DateTime today)
{
    return NiceDateFuzzy(t, false, today: today);
}

/// <summary>
/// Make a date readable
/// </summary>
/// <param name="t">Input date</param>
/// <param name="contextunknown">True if this is a date displayed randomly and we need to indicate if it is in the past or the future</param>
/// <returns></returns>
public static string NiceDateFuzzy(DateTime t, bool contextunknown)
{
    return NiceDateFuzzy(t: t, contextunknown: contextunknown, today: DateTime.Today);
}

internal static string NiceDateFuzzy(DateTime t, bool contextunknown, DateTime today)
{
    TimeSpan span = today.Subtract(t.Date);
    if (span.TotalDays == -7)
    {
        return "Next " + t.DayOfWeek + (contextunknown ? (" " + t.Day + GetDateSuffix(t)) : "");
    }
    if (span.TotalDays == -1)
    {
        return "Tomorrow";
    }
    else if (span.TotalDays == 0)
    {
        return "Today";
    }
    else if (span.TotalDays == 1)
    {
        return "Yesterday";
    }
    else if (span.TotalDays == 7)
    {
        return "Last " + t.DayOfWeek + (contextunknown ? (" " + t.Day + GetDateSuffix(t)) : "");
    }
    else if (span.TotalDays < 7 && span.TotalDays > -7)
    {
        return "" + t.DayOfWeek + (contextunknown ? (" " + t.Day + GetDateSuffix(t)) : "");
    }
    else
        return t.ToShortDateString();
}

public static string GetDateSuffix(DateTime dt)
{
    if (dt.Day == 1 || dt.Day == 21 || dt.Day == 31) return "st";
    if (dt.Day == 2 || dt.Day == 22) return "nd";
    if (dt.Day == 3 || dt.Day == 23) return "rd";
    return "th";
}

public static string NiceWeek(DateTime dt)
{

    int daytoday = (int)DateTime.Today.DayOfWeek; // first day of the week should be 1
    //if (daytoday == Config.startDayOfWeek) daytoday = 7;

    int weekStartDay = (int)Config.startDayOfWeek;

    DateTime weekStart;

    //Calculate the date of the start of today's week

    if (weekStartDay < daytoday)
        //subtract the difference between the enums of the days
        weekStart = DateTime.Today.Subtract(new TimeSpan(daytoday - weekStartDay, 0, 0, 0));
    else if (weekStartDay > daytoday)
        //Jump back into 'last week' in terms of a monday - sunday calendar
        weekStart = DateTime.Today.Subtract(new TimeSpan(daytoday + (7 - weekStartDay), 0, 0, 0));
    else
        weekStart = DateTime.Today;

    TimeSpan ts = weekStart.Subtract(dt);

    if (ts.TotalDays >= 14)
        return Math.Floor(ts.TotalDays / 7) + " Weeks Ago";
    if (ts.TotalDays >= 7)
        return "Last Week";
    if (ts.TotalDays >= 0)
        return "This Week";

    if (ts.TotalDays < -7)
        return Math.Ceiling(-ts.TotalDays / 7) + " Weeks Time";
    if (ts.TotalDays < 0)
        return "Next Week";

    // Should be impossible
    return "NiceWeek err";
}

/* ---------- Helpers ---------- */
    function googleCalendarUrl({title, details, location, start, end, allDay=false}) {
      const enc = encodeURIComponent;
      let dates;
      if (allDay) {
        const fmt = d => d.toISOString().slice(0,10).replace(/-/g,'');
        const next = new Date(start); next.setDate(next.getDate()+1);
        dates = `${fmt(start)}/${fmt(next)}`;
      } else {
        const fmt = d => d.toISOString().replace(/-|:|\.\d{3}/g,'');
        dates = `${fmt(start)}/${fmt(end)}`;
      }
      return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${enc(title)}&dates=${enc(dates)}&details=${enc(details||'')}&location=${enc(location||'')}&sf=true&output=xml`;
    }

    function outlookWebUrl({title, start, end, body, location}) {
      const q = new URLSearchParams({
        subject: title,
        startdt: start.toISOString(),
        enddt: end.toISOString(),
        body: body || '',
        location: location || ''
      });
      return `https://outlook.live.com/calendar/0/deeplink/compose?${q.toString()}`;
    }

    // --- ICS file generation ---
    function toICSDateUTC(date) {
      return date.toISOString().replace(/-|:|\.\d{3}/g, '');
    }
    function escapeICalText(txt) {
      return (txt||'').replace(/\\/g,'\\\\').replace(/;/g,'\\;').replace(/,/g,'\\,').replace(/\n/g,'\\n');
    }
    function makeICS({title, description, location, startDate, endDate, allDay=false}) {
      const uid = `${Date.now()}@example.com`;
      const dtstamp = toICSDateUTC(new Date());
      let dtstart, dtend;
      if (allDay) {
        const pad = d => d.toISOString().slice(0,10).replace(/-/g,'');
        const next = new Date(startDate); next.setDate(next.getDate()+1);
        dtstart = `DTSTART;VALUE=DATE:${pad(startDate)}`;
        dtend   = `DTEND;VALUE=DATE:${pad(next)}`;
      } else {
        dtstart = `DTSTART:${toICSDateUTC(startDate)}`;
        dtend   = `DTEND:${toICSDateUTC(endDate)}`;
      }
      return [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//YourApp//EN',
        'CALSCALE:GREGORIAN',
        'BEGIN:VEVENT',
        `UID:${uid}`,
        `DTSTAMP:${dtstamp}`,
        dtstart,
        dtend,
        `SUMMARY:${escapeICalText(title)}`,
        `DESCRIPTION:${escapeICalText(description||'')}`,
        `LOCATION:${escapeICalText(location||'')}`,
        'END:VEVENT',
        'END:VCALENDAR'
      ].join('\r\n');
    }
    function downloadICS(filename, content) {
      const blob = new Blob([content], {type:'text/calendar;charset=utf-8'});
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
    }

    /* ---------- Event data ---------- */
    const event = {
      title: "Zwelix trouwt",
      details: "http://zwelixtrouwt.be/",
      location: "Tombeek",
      start: new Date("2026-08-15T15:00:00"),
      end:   new Date("2026-08-15T16:00:00")
    };

    /* ---------- Button actions ---------- */
    document.getElementById('google').onclick = () => {
        window.open(googleCalendarUrl(event), "_blank");
        page = 0;
        updatePage();
    }

    // document.getElementById('outlook').onclick = () =>
    //   window.open(outlookWebUrl(event), "_blank");

    document.getElementById('ics').onclick = () => {
        const ics = makeICS({
            title: event.title,
            description: event.details,
            location: event.location,
            startDate: event.start,
            endDate: event.end
        });
        downloadICS('zwelix-trouwt.ics', ics);
        page = 0;
        updatePage();
    };
function getFixedHolidays(year) {
    return [
        { date: `${year}-01-01`, name: "New Year`s Day" },
        { date: `${year}-01-02`, name: "Day After New Year`s Day" },
        { date: `${year}-02-01`, name: "National Heroes` Day" },
        { date: `${year}-02-03`, name: "National Heroes` Day Observed" },
        { date: `${year}-03-30`, name: "Eid al-Fitr" },
        { date: `${year}-03-31`, name: "Eid al-Fitr Holiday" },
        { date: `${year}-04-07`, name: "Genocide Against the Tutsi Memorial Day" },
        { date: `${year}-04-18`, name: "Good Friday" },
        { date: `${year}-04-21`, name: "Easter Monday" },
        { date: `${year}-05-01`, name: "Labor Day" },
        { date: `${year}-06-06`, name: "Eid al-Adha" },
        { date: `${year}-07-01`, name: "Independence Day" },
        { date: `${year}-07-04`, name: "Liberation Day" },
        { date: `${year}-08-01`, name: "Umuganura Day" },
        { date: `${year}-08-15`, name: "Assumption of Mary" },
        { date: `${year}-12-25`, name: "Christmas Day" },
        { date: `${year}-12-26`, name: "Boxing Day" },
    ];
  }

export default getFixedHolidays
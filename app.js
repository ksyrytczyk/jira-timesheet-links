function getRaportURL(from, to, user) {
    return JIRA_URL + utils.serialize({
        startDate: from,
        endDate: to,
        targetUser: user,
        targetGroup: '',
        excludeTargetGroup: '',
        projectRoleId: '',
        projectid: '',
        filterid: '',
        priority: '',
        weekends: true,
        showDetails: true,
        sum: 'day',
        groupByField: '',
        moreFields: '',
        selectedProjectId: 22043,
        reportKey: 'jira-timesheet-plugin:report',
        Next: 'Next'
    });
}

function buildListItem(href, text) {
    let $li = dom.create('li');
    let $a = dom.create('a', { href });

    $a.innerText = (text || href);
    $li.appendChild($a);

    return $li;
}

function getDate(d) {
    let result = d;

    if (typeof result === 'string') {
        result = moment(d, DATE_FORMAT);
    }

    return result.clone();
}

function getDaysInSprint(weeks) {
    return Math.floor(weeks * 7) - 1;
}

function countAllSprints(daysInSprint) {
    let allDays = moment().diff(firstSprint, 'days');
    return Math.floor(allDays / daysInSprint);
}

function* SprintGenerator(firstSprint, daysInSprint) {
    let start = getDate(firstSprint);
    let end = getDate(start).add(daysInSprint, 'days');

    while (true) {
        let current = [
            start.format(DATE_FORMAT),
            end.format(DATE_FORMAT)
        ];

        start = getDate(end).add(1, 'days');
        end = getDate(start).add(daysInSprint, 'days');

        yield current;
    }
}

// =========================================
// =========================================
// =========================================

let user = 'ksyrytczyk';
let $links = dom.findByID('links');
let firstSprint = getDate(FIRST_SPRINT_DATE);
let daysInSprint = getDaysInSprint(SPRINT_DURATION);
let sequence = SprintGenerator(firstSprint, daysInSprint);
let count = countAllSprints(daysInSprint);

utils.times(count, (n) => {
    let [start, end] = sequence.next().value;
    let url = getRaportURL(start, end, user);
    let title = `Raport :: JSN Sprint ${n + 1}`;
    let $item = buildListItem(url, title);
    $item.title = `${start} - ${end}`;
    $links.appendChild($item);
});

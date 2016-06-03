const time = moment();

const ALONE = '-';
const SPRINT_DURATION = 15;
const PAIR_SIZE = 2;

$('#startsAt').val(time.format('YYYY-MM-DD'));
$('#endsAt').val(time.add(SPRINT_DURATION, 'days').format('YYYY-MM-DD'));

$('#submit').click(onSubmit);

function getPairs(remainingElements) {
  const teams = [];
  const newRemaining = [ ...remainingElements ];

  while(newRemaining.length > 0) {
    const team = [];

    for(var i = 0; i < PAIR_SIZE && newRemaining.length; ++i) {
      team.push(newRemaining.pop());
    }

    if(team.length) teams.push(team);
  }

  return teams;
}

function onSubmit() {
  const $distribution = $('#distribution');

  const names = getNames();
  const endsAt = moment($('#endsAt').val());
  const rotationTime = $('#rotationTime').val();
  let currentDate = moment($('#startsAt').val());

  $distribution.empty();

  do {
    const shuffledNames = _.shuffle([ ...names ]);
    const pairs = getPairs(shuffledNames);

    const column = $(
      `<div class="column">
        <div class="day">${currentDate.format('ddd D')}</div>
      </div>`
    );

    pairs.forEach(pair => {
      const member1 = pair[0];
      const member2 = pair[1] || ALONE;

      column.append($(
          `<div class="team">
            <div>${member1}</div>
            <div>${member2}</div>
          </div>`
        ));
    });

    $distribution.append(column);

    currentDate = addWeekdays(currentDate, rotationTime);
  } while(currentDate < endsAt);
}

function getNumberOfIterations() {
  const endsAt = moment($('#endsAt').val());
  const startsAt = moment($('#startsAt').val());
  const rotationTime = $('#rotationTime').val();

  const numberOfDays = endsAt.diff(startsAt, 'days');

  return Math.ceil(numberOfDays / rotationTime);
}

function getNames() {
  return $('#names')
    .prop('value')
    .split(',')
    .map(name => name.trim());
}

function addWeekdays(initialDay, days) {
  let date = moment(initialDay);

  while (days > 0) {
    date = date.add(1, 'days');
    if (date.isoWeekday() !== 6 && date.isoWeekday() !== 7) {
      days -= 1;
    }
  }

  return date;
}
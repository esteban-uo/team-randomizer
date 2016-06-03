const time = moment();

$('#startsAt').val(time.format('YYYY-MM-DD'));
$('#endsAt').val(time.add(15, 'days').format('YYYY-MM-DD'));

$('#submit').click(onSubmit);

function getPairs(remainingElements) {
  const teams = [];
  const newRemaining = [ ...remainingElements ];

  while(newRemaining.length > 0) {
    const team = [];

    for(var i = 0; i < 2 && newRemaining.length; ++i) {
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
  let currentDate = moment($('#startsAt').val());

  $distribution.empty();

  do {
    const shuffleElements = _.shuffle([ ...names ]);
    const pairs = getPairs(shuffleElements);
    const rotationTime = $('#rotationTime').val();

    const column = $(
      `<div class="column">
        <div class="day">${currentDate.format('ddd D')}</div>
      </div>`
    );

    pairs.forEach( (pair) => {
      const member1 = pair[0];
      const member2 = pair[1] || ':(';

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
  const numberOfDays = endsAt.diff(startsAt, 'days');
  const rotationTime = $('#rotationTime').val();

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
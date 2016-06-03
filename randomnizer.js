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

    if(team.length) {
      teams.push(team);
    }
  }

  return teams;
}

function onSubmit() {
  const $distribution = $('#distribution');

  const names = getNames();
  const iterations = getNumberOfIterations();
  const startingDate = moment($('#startsAt').val());

  $distribution.empty();

  const pairsPerDay = [];

  for(var iteration = 0; iteration < iterations; ++iteration) {
    const shuffleElements = _.shuffle([ ...names ]);
    const pairs = getPairs(shuffleElements);
    const rotationTime = $('#rotationTime').val();
    const date = moment(startingDate).add(iteration * rotationTime, 'days');
    pairsPerDay.push({ pairs, date });

    const column = $(
      `<div class="column">
        <div class="day">${date.format('dddd')}</div>
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
  }
}

function getNumberOfIterations() {
  const endsAt = moment($('#endsAt').val());
  const startsAt = moment($('#startsAt').val());
  const numberOfDays = endsAt.diff(startsAt, 'days');
  const rotationTime = $('#rotationTime').val();

  return Math.round(numberOfDays / rotationTime);
}

function getNames() {
  return $('#names')
    .prop('value')
    .split(',')
    .map(name => name.trim());
}
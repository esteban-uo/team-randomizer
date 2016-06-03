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
  const names = getNames();
  const iterations = getNumberOfIterations();

  for(var iteration = 0; iteration < iterations; ++iteration) {
    const shuffleElements = _.suffle([ ...names ]);
    const pairs = getPairs(shuffleElements);
    console.table(pairs)
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
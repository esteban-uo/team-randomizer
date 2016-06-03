
function onSubmit() {
  const names = $('#names')
                    .prop('value')
                    .split(',')
                    .map(name => name.trim());

  const iterations = getNumberOfIterations();

  for(var iteration = 0; iteration < iterations; ++iteration) {
    const shuffleElements = shuffleArray([ ...names ]);
    const pairs = getPairs(shuffleElements);
    console.log('Pairs: ');
    console.table(pairs)
  }
}

// setup

const time = moment();

$('#startsAt').val(time.format('YYYY-MM-DD'));
$('#endsAt').val(time.add(15, 'days').format('YYYY-MM-DD'));

$('#submit').click(onSubmit);

// Helper functions

function getNumberOfIterations() {
  // TODO: Use information provided by the user
  const numberOfDays = 15;
  const rotationTime = 2;

  return Math.round(numberOfDays / rotationTime);
}

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
  return array;
}

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
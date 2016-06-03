
function onSubmit() {
    const names = $('#names')
                      .prop('value')
                      .split(',')
                      .map(name => name.trim());

    console.log(names);
}

// setup

const time = moment();

$('#startsAt').val(time.format('YYYY-MM-DD'));
$('#endsAt').val(time.add(15, 'days').format('YYYY-MM-DD'));

$('#submit').click(onSubmit);

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}
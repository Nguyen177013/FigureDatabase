$(document).ready(function() {
    var array = []
    var heightWindow = $(window).height();
    var widthWindow = $(window).width()

    for (var i = 0; i < 40; i++) {
        array.push({
            top: Math.floor(Math.random() * heightWindow),
            left: Math.floor(Math.random() * widthWindow),
            id: i
        })
    }
    array.forEach(function(value) {
        var newEllipse = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
        newEllipse.setAttribute('class', 'ellipse');
        newEllipse.setAttribute('id', 'ellipse_' + value.id);
        newEllipse.setAttribute('cx', value.left)
        newEllipse.setAttribute('cy', value.top);
        newEllipse.setAttribute('rx', 5);
        newEllipse.setAttribute('ry', 5);
        //newEllipse.setAttribute('cy', value.top);


        $('#svg').append(newEllipse)
    })
    $(window).mousemove(function(event) {
        $('line').remove();
        //console.log(event.pageX, event.pageY);
        (array.filter(val => Math.abs(val.top - event.pageY) <= 350 && Math.abs(val.left - event.pageX) <= 350)).forEach(function(value) {
            var newLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            newLine.setAttribute('class', 'line');
            newLine.setAttribute('id', 'line_' + value.id);
            newLine.setAttribute('x1', value.left);
            newLine.setAttribute('y1', value.top);
            newLine.setAttribute('x2', event.pageX);
            newLine.setAttribute('y2', event.pageY);
            newLine.setAttribute('stroke', 'black');

            $('#svg').append(newLine)
        })

        //console.log(event.pageX, event.pageY);
    })
    $(window).mouseout(function(event) {
        $('line').remove();
    })
    setInterval(function() {
        array.forEach(function(value, key) {
                var top = Math.random() * ((value.top + 2) - (value.top - 2)) + (value.top - 2);
                var left = Math.random() * ((value.left + 2) - (value.left - 2)) + (value.left - 2);
                array[key].top = top;
                array[key].left = left;

                var $ellipse = $('#ellipse_' + value.id)
                $ellipse.animate({ dot: 0 }, {
                    step: () => { $ellipse.attr('cx', left), $ellipse.attr('cy', top) },
                    duration: 1
                })

                if ($('#line_' + value.id).lengh) {
                    var $line = $('#line_' + value.id);
                    $line.animate({ dot: 0 }, {
                        step: () => { $ellipse.attr('x1', left), $ellipse.attr('y1', top) },
                        duration: 1
                    })
                }
            })
            //Math random * () max -min) + min

    }, 500)

    console.log(array);
})
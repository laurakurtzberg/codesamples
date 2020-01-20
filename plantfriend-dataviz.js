function mapToDegrees (num, in_min, in_max) {
  return (num - in_min) * 180 / (in_max - in_min);
}

var mybool = true; /* toggle to activate the animation, otherwise greensock detects animation
                      as having already fired and does not update needle position on gauge */

// necessary gauge variables for the four gauge charts
//light sensor
lsarc = document.getElementById('ls-gauge-arc');
lsneedle = document.getElementById('ls-gauge-needle');
//moisture sensor
msarc = document.getElementById('ms-gauge-arc');
msneedle = document.getElementById('ms-gauge-needle');
//humidity sensor
hsarc = document.getElementById('hs-gauge-arc');
hsneedle = document.getElementById('hs-gauge-needle');
//temperature sensor
tsarc = document.getElementById('ts-gauge-arc');
tsneedle = document.getElementById('ts-gauge-needle');

function animateWithGreensock(value, sensor) { //passes in the sensor as a string like 'hs' in order to select correct chart
    var arc = document.getElementById(sensor + "-gauge-arc");
    var needle = document.getElementById(sensor + "-gauge-needle");

    if (mybool){
    TweenMax.to(needle, 0.1, {
      transformOrigin: '87% 52%',
      rotation: value,
    });
        mybool = false;
    } else {
      TweenMax.to(needle, 0.1, {
        transformOrigin: '87% 52%',
        rotation: value,
      });
      mybool = true;
    }
  };

  var container;
  var needle;
  var myvalue = 150;


  // polar to cartesian arc
  function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;

    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  }

function describeArc(x, y, radius, startAngle, endAngle){

    var start = polarToCartesian(x, y, radius, endAngle);
    var end = polarToCartesian(x, y, radius, startAngle);

    var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    var d = [
        "M", start.x, start.y,
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");

    return d;
}


lsarc.setAttribute("d", describeArc(150, 166, 75, 270, 90));
msarc.setAttribute("d", describeArc(150, 166, 75, 270, 90));
hsarc.setAttribute("d", describeArc(150, 166, 75, 270, 90));
tsarc.setAttribute("d", describeArc(150, 166, 75, 270, 90));

import '../style/style.less';

var sliders = document.getElementsByClassName('round-slider');

sliders[0].addEventListener('click', round_slider_tune, false);
sliders[0].addEventListener('mousedown', function(event) {
	sliders[0].onmousemove = function(event) {
		if (event.buttons == 1 || event.buttons == 3) {
			round_slider_tune(event);
		}
	};
});

window.onload = function() {
    round_slider_tune('auto');
  };


function removeClasslist(className, elements) {
	for (var i = 0; i < elements.length; i++) {
		elements[i].classList.remove(className);
	}
}

function round_slider_tune(event) {
    if (event === 'auto') {
        document.querySelector('.round-slider .selection .item').classList.add('auto-rotate');

        var number = 0,
        images = document.querySelectorAll('.product-figure img');
        setInterval(function(){
            removeClasslist('visible', images);
            number = number >= 10 ? 0 : number + 1;
            images[number].classList.add('visible');
            images[number].classList.add('visible');
        },2000)


    } else {
        let eventDoc = (event.target && event.target.ownerDocument) || document,
            doc = eventDoc.documentElement,
            body = eventDoc.getElementsByClassName('round-wrapper');
        let eventPageX =
            event.clientX +
            ((body && body.scrollLeft) || (body && body.scrollLeft) || 0) -
            ((body && body.clientLeft) || (body && body.clientLeft) || 0);
        let eventPageY =
            event.clientY +
            ((body && body.scrollTop) || (body && body.scrollTop) || 0) -
            ((body && body.clientTop) || (body && body.clientTop) || 0);
        let output = event.target.getElementsByClassName('selection')[0],
            images = doc.querySelectorAll('.product-figure img'),
            styleafter = document.head.appendChild(document.createElement('style')),
            elpos = event.target.getBoundingClientRect(),
            cX = elpos.width / 2,
            cY = elpos.height / 2,
            eX = eventPageX - elpos.left,
            eY = eventPageY - elpos.top,
            dX = 0,
            dY = 0,
            angle = Math.atan2(cX - eX, cY - eY) * (180 / Math.PI),
            value = 100;

        if (Math.abs(eX - cX) >= Math.abs(eY - cY)) {
            dX = 150 / 2 + (Math.sign(eX - cX) * 150) / 2;
            dY = 150 / 2 + (((eY - cY) / Math.abs(eX - cX)) * 150) / 2;
        } else {
            dX = 150 / 2 + (((eX - cX) / Math.abs(eY - cY)) * 150) / 2;
            dY = 150 / 2 + (Math.sign(eY - cY) * 150) / 2;
        }
        dX = Math.round((dX / 150) * 100);
        dY = Math.round((dY / 150) * 100);

        if (0 <= dX && dX < 50 && dY == 0) {
            output.style = 'clip-path: polygon(' + dX + '% ' + dY + '%, 50% 0%, 50% 50%);';
            value = Math.round(((50 - dX) / 50) * 12.5);
        } else if (dX == 0 && 0 <= dY && dY <= 100) {
            output.style = 'clip-path: polygon(' + dX + '% ' + dY + '%, 0% 0%, 50% 0%, 50% 50%);';
            value = Math.round(12.5 + (dY / 100) * 25);
        } else if (0 <= dX && dX <= 100 && dY == 100) {
            output.style = 'clip-path: polygon(' + dX + '% ' + dY + '%, 0% 100%, 0% 0%, 50% 0%, 50% 50%);';
            value = Math.round(37.5 + (dX / 100) * 25);
        } else if (dX == 100 && 0 <= dY && dY <= 100) {
            output.style = 'clip-path: polygon(' + dX + '% ' + dY + '%, 100% 100%, 0% 100%, 0% 0%, 50% 0%, 50% 50%);';
            value = Math.round(62.5 + ((100 - dY) / 100) * 25);
        } else if (50 <= dX && dX <= 100 && dY == 0) {
            output.style =
                'clip-path: polygon(' + dX + '% ' + dY + '%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, 50% 0%, 50% 50%);';
            value = Math.round(87.5 + ((100 - dX) / 50) * 12.5);
        }

        styleafter.innerHTML = '.round-slider .selection .item {transform: rotate(' + -angle + 'deg);}';
        let hue = Math.floor((value / 100) * 120),
            saturation = Math.abs(value - 50);

        removeClasslist('visible', images);
        removeClasslist('auto-rotate', document.querySelectorAll('.round-slider .selection .item'));
        images[Math.round((value / 10).toFixed(0))].classList.add('visible');
        images[Math.round((value / 10).toFixed(0))].classList.add('visible');
    }      
}

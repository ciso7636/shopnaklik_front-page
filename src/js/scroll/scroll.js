const controller = new ScrollMagic.Controller({ loglevel: 3 });
var bottomPositionDescription, bottomPositionDescription2, bottomPositionDescription3;

class Scroll {
    static scrollHeader() {
        window.addEventListener(
			'scroll',
			function(event) {
                if ($(window).scrollTop() !== 0) {
                    $('header').addClass('scroll');
                } else {
                    $('header').removeClass('scroll');
                }
			},
			false
		);
    }

	static scrollNavigate() {
		var designHeight = $(window).height() - 190;
		// build tween
		var tween = TweenMax.to('.menu__item:nth-child(2), .menu__item:nth-child(3)', 0.5, { opacity: '.1' });
		var tween2 = TweenMax.to('.menu__item:nth-child(2)', 0.5, { opacity: '1' });
		var tween3 = TweenMax.to('.menu__item:nth-child(1)', 0.5, { opacity: '.1' });
		var tween4 = TweenMax.to('.menu__item:nth-child(3)', 0.5, { opacity: '1' });
		var tween5 = TweenMax.to('.menu__item:nth-child(2)', 0.5, { opacity: '.1' });
		// build scene
		var scene = new ScrollMagic.Scene({
			triggerElement: '#trigger_navigation-design',
			duration: designHeight,
			triggerHook: 1,
		})
			.setTween(tween)
			.addIndicators({ name: 'Desgin - Navigate' }) // add indicators (requires plugin)
			.addTo(controller)
			.on('start end', function(e) {
				$('.content-navigation, .content-navigation_ghost').addClass(e.type == 'end' && 'fixed');
				$('.content-navigation, .content-navigation_ghost').removeClass(e.type == 'start' && 'fixed');
			})
			.on('enter leave', function(e) {
				$('.content-navigation, .content-navigation_ghost').addClass(e.type == 'leave' && 'outside');
				$('.content-navigation, .content-navigation_ghost').removeClass(e.type == 'enter' && 'outside');
			});

		var scene2 = new ScrollMagic.Scene({
			triggerElement: '#triger_build_monitorAndDescription',
			duration: 100,
			loglevel: 3,
			triggerHook: 0.5,
		})
			.setTween(tween2)
			.addIndicators({ name: 'Navigate - Build' }) // add indicators (requires plugin)
			.addTo(controller);

		var scene3 = new ScrollMagic.Scene({
			triggerElement: '#triger_build_monitorAndDescription',
			duration: 100,
			loglevel: 3,
			triggerHook: 0.5,
		})
			.setTween(tween3)
			.addIndicators({ name: 'Navigate - Build' }) // add indicators (requires plugin)
			.addTo(controller);

		var scene4 = new ScrollMagic.Scene({
			triggerElement: '#triger_launch_monitorAndDescription',
			duration: 100,
			loglevel: 3,
			triggerHook: 0.5,
		})
			.setTween(tween4)
			.addIndicators({ name: 'Navigate - Launch' }) // add indicators (requires plugin)
			.addTo(controller);

		var scene5 = new ScrollMagic.Scene({
			triggerElement: '#triger_launch_monitorAndDescription',
			duration: 100,
			loglevel: 3,
			triggerHook: 0.5,
		})
			.setTween(tween5)
			.addIndicators({ name: 'Navigate - Launch' }) // add indicators (requires plugin)
			.addTo(controller);
	}

	static scrollDesignMonitor() {
		var scene6 = new ScrollMagic.Scene({
			triggerElement: '#triger_design_monitorAndDescription',
			duration: '550%',
			triggerHook: 0,
		})
			.setPin('.monitor')
			.addIndicators({ name: 'Monitor - Design- - - - - - - - - - - - - - - - - - -' }) // add indicators (requires plugin)
			.addTo(controller)
			.on('enter leave', function(e) {
				if (e.type == 'enter') {
					$('.container').css('position', 'static');
					$('.content-description').css({
						position: 'fixed',
						top: '232px',
						bottom: bottomPositionDescription,
					});
				} else if (e.type == 'leave') {
					$('.container').css('position', 'static');
					$('.content-description').css({
						position: 'absolute',
						bottom: 'auto',
						top: $('.content-description').offset().top,
					});
				}
			});
	}

	static scrollDesignDescription() {
		var scene7 = new ScrollMagic.Scene({
			triggerElement: '#triger_design_monitorAndDescription',
			triggerHook: 1,
		})
			.addIndicators({ name: 'Design - Description' }) // add indicators (requires plugin)
			.addTo(controller)
			.on('start end', function(e) {
				$('.content-description').addClass(e.type == 'end' && 'fixed');
				$('.content-description').removeClass(e.type == 'start' && 'fixed');
			})
			.on('enter leave', function(e) {
				$('.content-description').addClass(e.type == 'leave' && 'outside');
				$('.content-description').removeClass(e.type == 'enter' && 'outside');

				bottomPositionDescription = $('.content-description').css('bottom');
			})
			.on('progress', function(e) {
				$('.content-description').css('top', ($('.monitor').offset().top + 12) + 'px');
			});
	}

	static scrollSliderDesignMonitor() {
		// define movement of panels
		var wipeAnimation = new TimelineMax()
			// animate to second panel
			.to('#slideContainer', 0.5, { z: -150 }) // move back in 3D space
			.to('#slideContainer', 1, { x: '-25%' }) // move in to first panel
			.to('#slideContainer', 0.5, { z: 0 }) // move back to origin in 3D space
			// animate to third panel
			.to('#slideContainer', 0.5, { z: -150, delay: 1 })
			.to('#slideContainer', 1, { x: '-50%' })
			.to('#slideContainer', 0.5, { z: 0 })
			// animate to forth panel
			.to('#slideContainer', 0.5, { z: -150, delay: 1 })
			.to('#slideContainer', 1, { x: '-75%' })
			.to('#slideContainer', 0.5, { z: 0 });
		// create scene to pin and link animation
		new ScrollMagic.Scene({
			triggerElement: '.monitor',
			triggerHook: 'onLeave',
			duration: '500%',
			triggerHook: 0,
		})
			.setTween(wipeAnimation)
			.addIndicators({ name: 'Monitor Content' }) // add indicators (requires plugin)
			.addTo(controller);
	}

	static scrollBuildMonitor() {
		var scene8 = new ScrollMagic.Scene({
			triggerElement: '#triger_build_monitorAndDescription',
			duration: '550%',
			triggerHook: 0,
		})
			.setPin('.monitor2')
			.addIndicators({ name: 'Build Monitor' }) // add indicators (requires plugin)
			.addTo(controller)
			.on('enter leave', function(e) {
				if (e.type == 'enter') {
					$('.container').css('position', 'static');
					$('.content2-description').css({
						position: 'fixed',
						top: '232px',
						bottom: bottomPositionDescription2,
					});
				} else if (e.type == 'leave') {
					$('.container').css('position', 'static');
					$('.content2-description').css({
						position: 'absolute',
						bottom: 'auto',
						top: $('.content2-description').offset().top,
					});
				}
			});
	}

	static scrollBuildDescription() {
		var scene9 = new ScrollMagic.Scene({
			triggerElement: '#triger_build_monitorAndDescription',
			triggerHook: 1,
		})
			.addIndicators({ name: 'Build Description' }) // add indicators (requires plugin)
			.addTo(controller)
			.on('start end', function(e) {
				$('.content2-description').addClass(e.type == 'end' && 'fixed');
				$('.content2-description').removeClass(e.type == 'start' && 'fixed');
			})
			.on('enter leave', function(e) {
				$('.content2-description').addClass(e.type == 'leave' && 'outside');
				$('.content2-description').removeClass(e.type == 'enter' && 'outside');

				bottomPositionDescription2 = $('.content2-description').css('bottom');
			})
			.on('progress', function(e) {
				$('.content2-description').css('top', ($('.monitor2').offset().top + 12) + 'px');
			});
	}

	static scrollSliderBuildMonitor() {
		// define movement of panels
		var wipeAnimation2 = new TimelineMax()
			// animate to second panel
			.to('.monitor2 #slideContainer', 0.5, { z: -150 }) // move back in 3D space
			.to('.monitor2 #slideContainer', 1, { x: '-25%' }) // move in to first panel
			.to('.monitor2 #slideContainer', 0.5, { z: 0 }) // move back to origin in 3D space
			// animate to third panel
			.to('.monitor2 #slideContainer', 0.5, { z: -150, delay: 1 })
			.to('.monitor2 #slideContainer', 1, { x: '-50%' })
			.to('.monitor2 #slideContainer', 0.5, { z: 0 })
			// animate to forth panel
			.to('.monitor2 #slideContainer', 0.5, { z: -150, delay: 1 })
			.to('.monitor2 #slideContainer', 1, { x: '-75%' })
			.to('.monitor2 #slideContainer', 0.5, { z: 0 });
		// create scene to pin and link animation
		new ScrollMagic.Scene({
			triggerElement: '.monitor2',
			triggerHook: 'onLeave',
			duration: '500%',
			triggerHook: 0,
		})
			.setTween(wipeAnimation2)
			.addIndicators({ name: 'Monitor Content' }) // add indicators (requires plugin)
			.addTo(controller);
	}

	static scrollLaunchMonitor() {
		var scene10 = new ScrollMagic.Scene({
			triggerElement: '#triger_launch_monitorAndDescription',
			duration: '550%',
			triggerHook: 0,
		})
			.setPin('.monitor3')
			.addIndicators({ name: 'Launch Monitor' }) // add indicators (requires plugin)
			.addTo(controller)
			.on('enter leave', function(e) {
				$('.monitor3').addClass(e.type == 'leave' && 'leave');
				$('.monitor4').addClass(e.type == 'leave' && 'leave');
				$('.monitor3').removeClass(e.type == 'enter' && 'leave');
				$('.monitor4').removeClass(e.type == 'enter' && 'leave');
			})
			.on('start end', function(e) {
				$('.monitor3').addClass(e.type == 'start' && 'start');
				$('.monitor4').addClass(e.type == 'start' && 'start');
				$('.monitor3').removeClass(e.type == 'end' && 'start');
				$('.monitor4').removeClass(e.type == 'end' && 'start');
			})
			.on('enter leave', function(e) {
				if (e.type == 'enter') {
					$('.container').css('position', 'static');
					$('.content3-description').css({
						position: 'fixed',
						top: '232px',
						bottom: bottomPositionDescription3,
					});
				} else if (e.type == 'leave') {
					$('.container').css('position', 'static');
					$('.content3-description').css({
						position: 'absolute',
						bottom: 'auto',
						top: $('.content3-description').offset().top,
					});
				}
			});
	}

	static scrollLaunchDescription() {
		var scene11 = new ScrollMagic.Scene({
			triggerElement: '#triger_launch_monitorAndDescription',
			triggerHook: 1,
		})
			.addIndicators({ name: 'Launch Description' }) // add indicators (requires plugin)
			.addTo(controller)
			.on('start end', function(e) {
				$('.content3-description').addClass(e.type == 'end' && 'fixed');
				$('.content3-description').removeClass(e.type == 'start' && 'fixed');
			})
			.on('enter leave', function(e) {
				$('.content3-description').addClass(e.type == 'leave' && 'outside');
				$('.content3-description').removeClass(e.type == 'enter' && 'outside');

				bottomPositionDescription3 = $('.content3-description').css('bottom');
			})
			.on('progress', function(e) {
				$('.content3-description').css('top', ($('.monitor3').offset().top + 12) + 'px');
			});
	}

	static scrollSliderLaunchMonitor() {
		// define movement of panels
		var wipeAnimation2 = new TimelineMax()
			// animate to second panel
			.to('.monitor3 #slideContainer', 0.5, { z: -150 }) // move back in 3D space
			.to('.monitor3 #slideContainer', 1, { x: '-25%' }) // move in to first panel
			.to('.monitor3 #slideContainer', 0.5, { z: 0 }) // move back to origin in 3D space
			// animate to third panel
			.to('.monitor3 #slideContainer', 0.5, { z: -150, delay: 1 })
			.to('.monitor3 #slideContainer', 1, { x: '-50%' })
			.to('.monitor3 #slideContainer', 0.5, { z: 0 })
			// animate to forth panel
			.to('.monitor3 #slideContainer', 0.5, { z: -150, delay: 1 })
			.to('.monitor3 #slideContainer', 1, { x: '-75%' })
			.to('.monitor3 #slideContainer', 0.5, { z: 0 });
		// create scene to pin and link animation
		new ScrollMagic.Scene({
			triggerElement: '.monitor3',
			triggerHook: 'onLeave',
			duration: '500%',
			triggerHook: 0,
		})
			.setTween(wipeAnimation2)
			.addIndicators({ name: 'Monitor Content' }) // add indicators (requires plugin)
			.addTo(controller)
			.on('start end', function(e) {
				if (e.type == 'end') {
					var topMonitor = document.querySelector('.monitor3').getBoundingClientRect().top;
					var leftMonitor = document.querySelector('.monitor3').getBoundingClientRect().left;
					var widthMonitor = document.querySelector('.monitor3').offsetWidth;

					$('.monitor4').css('top', topMonitor === 0 ? 220 : topMonitor + 'px');
				}
			});
	}

	static scrollContentFormAutoTop() {
		var isScrolling;

		// Listen for scroll events
		window.addEventListener(
			'scroll',
			function(event) {
				// Clear our timeout throughout the scroll
				window.clearTimeout(isScrolling);

				// Set a timeout to run after scrolling ends
				isScrolling = setTimeout(function() {
					scrollFunction();
				}, 66);
			},
			false
		);

		function scrollFunction() {
			var scrollTop = $('.content-form').offset().top - $(window).scrollTop();
			var percentScrollTopOfWindow = (scrollTop / $(window).height()) * 100;

			if (percentScrollTopOfWindow < 30 && scrollTop >= 0) {
				$('html, body').animate(
					{
						scrollTop: $('.content-form').offset().top,
					},
					100
				);
			} else if (scrollTop > -150 && scrollTop <= 0) {
				$('html, body').animate(
					{
						scrollTop: $('.content-form').offset().top,
					},
					100
				);
			}
		}
	}

	static scrollLaunchMonitorDuplicateSlideLeft() {
		var scene13 = new ScrollMagic.Scene({ triggerElement: '#triger_setHeight', triggerHook: 0.3 })
			.addTo(controller)
			.addIndicators({ name: 'monitor4' }) // add indicators (requires plugin)
			.on('enter leave', function(e) {
				$('.monitor4').addClass(e.type == 'enter' && 'left');
				$('.form').addClass(e.type == 'enter' && 'top');
				$('.monitor4').removeClass(e.type == 'leave' && 'left');
				$('.form').removeClass(e.type == 'leave' && 'top');

				if (e.type == 'enter') {
					$('.content-navigation__menu').css('opacity', 0);
					$('.content3-description').css('opacity', 0);
				} else if (e.type == 'leave') {
					$('.content-navigation__menu').css('opacity', 1);
					$('.content3-description').css('opacity', 1);
				}
			})

			.on('start end', function(e) {
				$('.monitor4').addClass(e.type == 'end' && 'fixed');
				$('.monitor4').removeClass(e.type == 'start' && 'fixed');
			});
	}
}

export default Scroll;

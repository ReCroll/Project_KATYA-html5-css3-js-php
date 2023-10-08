// ------------------------//
// FORM
// ------------------------//
"use strict"

// $('#submit').click(function() {
// 	popupOpen();
// })
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll(".lock-padding");
const lockMargin = document.querySelectorAll(".lock-margin");
const popup = document.getElementById('popup');
const popupTwo = document.getElementById('popupTwo');
const popupThree = document.getElementById('popupThree');
let unlock = true;
const timeout = 500;

const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
	for (let index = 0; index < popupCloseIcon.length; index++) {
		const el = popupCloseIcon[index];
		el.addEventListener('click', function (e) {
			popupClose(el.closest('.popup'));
			e.preventDefault();
		});
	}
}

function popupOpen(popup) {
	// $('.block-two').show({
	// 	duration: 300,
	// 	easing: 'linear'
	// });
	
	// if (popup && unlock) {
	// 	const popupActive = document.querySelectorAll('.popup.open');
	// 	if(popupActive) {
	// 		popupClose(popupActive, false);
	// 	// 	// alert('привіт1');
	// 	// 	alert('ghffj');
	// 		// bodyLock();
	// 	} 
	// 	else {
	// 		bodyLock();
	// 	// alert('привіт');
	// 	}
		popup.classList.add('open');
		bodyLock();
	
		popup.addEventListener("click", function (e) {
			if(!e.target.closest('.popup__content')) {
				popupClose(e.target.closest('.popup'));
			}
		});
	// }
}
// function popupTwoOpen(popupTwo) {
// 	// $('.block-two').show({
// 	// 	duration: 300,
// 	// 	easing: 'linear'
// 	// });
	
// 	// if (popup && unlock) {
// 	// 	const popupActive = document.querySelectorAll('.popup.open');
// 	// 	if(popupActive) {
// 	// 		popupClose(popupActive, false);
// 	// 	// 	// alert('привіт1');
// 	// 	// 	alert('ghffj');
// 	// 		// bodyLock();
// 	// 	} 
// 	// 	else {
// 	// 		bodyLock();
// 	// 	// alert('привіт');
// 	// 	}
// 		popupTwo.classList.add('open');
// 		bodyLock();
	
// 		popupTwo.addEventListener("click", function (e) {
// 			if(!e.target.closest('.popup__content')) {
// 				popupClose(e.target.closest('.popup'));
// 			}
// 		});
// 	// }
// }
// function popupThreeOpen(popupThree) {
// 	// $('.block-two').show({
// 	// 	duration: 300,
// 	// 	easing: 'linear'
// 	// });
	
// 	// if (popup && unlock) {
// 	// 	const popupActive = document.querySelectorAll('.popup.open');
// 	// 	if(popupActive) {
// 	// 		popupClose(popupActive, false);
// 	// 	// 	// alert('привіт1');
// 	// 	// 	alert('ghffj');
// 	// 		// bodyLock();
// 	// 	} 
// 	// 	else {
// 	// 		bodyLock();
// 	// 	// alert('привіт');
// 	// 	}
// 		popupThree.classList.add('open');
// 		bodyLock();
	
// 		popupThree.addEventListener("click", function (e) {
// 			if(!e.target.closest('.popup__content')) {
// 				popupClose(e.target.closest('.popup'));
// 			}
// 		});
// 	// }
// }

function popupClose(popupActive, doUnlock = true){
	if (unlock) {
		popupActive.classList.remove('open');
		if(doUnlock) {
			bodyUnlock();
		}
	}
}

function bodyLock() {
	const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
	// const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
	// const lockPadding = document.querySelectorAll(".lock-padding");

	for (let index = 0; index < lockPadding.length; index++) {
		const el = lockPadding[index];
		el.style.paddingRight = lockPaddingValue;
	}
	// for (let index = 0; index < lockMargin.length; index++) {
	// 	const elis = lockMargin[index];
	// 	elis.style.width = lockPaddingValue;
	// }
	body.style.paddingRight = lockPaddingValue;
	body.classList.add('lock');

	unlock = false;
	setTimeout(function (){
		unlock = true;

	}, timeout);
}

function bodyUnlock(){
	setTimeout(function () {
		for (let index = 0; index < lockPadding.length; index++) {
			const el = lockPadding[index];
			el.style.paddingRight = '0px';

		}
		// for (let index = 0; index < lockMargin.length; index++) {
		// 	const elis = lockMargin[index];
		// 	elis.style.width = 'calc(100% - 0px)';

		// }
		body.style.paddingRight = '0px';
		body.classList.remove('lock');

	}, timeout);

	unlock = false;
	setTimeout(function (){
		unlock = true;

	}, timeout);

}





document.addEventListener('DOMContentLoaded', function () {
	const form = document.getElementById('form');
	const label = document.getElementById('serviceValidation');
	const sending = document.getElementById('wrapper');
	const formOne = document.getElementById("formOne");
	form.addEventListener('submit', formSend);

	async function formSend(e) {
		e.preventDefault();

		let error = formValidate(form);

		let formData = new FormData(form);
		// formData.append('image', formImage.files[0]);

		if (error === 0) {
			sending.classList.add('sending');
            let response =  await fetch('sendmail.php', {
                method: 'POST',
                body: formData
            });
            if (response.ok){
                // let result = await response.json();
				// let arrThree = [];
				// let arrSuccess = ["success"];
				// arrThree = result.message;
				// swal.fire({
				// 	title: "Все круто",
				// 	text: "З вами скоро зв'яжуться",
				// 	icon: "success",
				// 	allowEnterKey: false,
				// 	customClass: 'border__success'
				// });
				popupOpen(popupThree);
                // swal(result.message);
                // formPreview.innerHTML = '';
                form.reset();
                sending.classList.remove('sending');
            } else {
				popupOpen(popupTwo);
				// swal.fire({
				// 	title: "Ой лишенько!",
				// 	text: "Сталася помилка з відправкою замовлення!",
				// 	icon: "error",
				// 	allowEnterKey: false,
				// 	customClass: 'border__error'
				// });
				// // bodyLock();
                sending.classList.remove('sending');
            }
		
		}  else {
			popupOpen(popup);
			sending.classList.remove('sending');
			// Swal.fire("Матінко рідна!", "Ви забули заповнити форму!", "warning");
				// swal.fire({
				// 	// '<i class="fa fa-thumbs-up"></i> Great!'
				// 	title: "Матінко рідна!",
				// 	text: "Ви забули заповнити форму!",
				// 	icon: "warning",
				// 	allowEnterKey: false,
				// 	showConfirmButton: true,
				// 	customClass: 'border__warning',
				// 	scrollbarPadding: false
					
					
				// });
				// bodyLock();
				
			}

	}

    function formValidate(form) {
        let error = 0;
        let formReq = document.querySelectorAll('.req');
		// var a = !!document.querySelector(".chekbox:checked");
		let arr = [];
		// let eyelashes = [];
		// let eyebrow = [];
		// let lamination = [];
		// eyelashes [0] = document.querySelectorAll('#eyelashes');
		
		// eyebrow [0] = document.querySelectorAll('#eyebrow');
		
		// lamination [0] = document.querySelectorAll('#lamination');
        for (let index = 0; index < formReq.length; index++){
            const input = formReq[index];
            formRemoveError(input); 
			formRemoveErrorLabel(label)
			
			if(input.classList.contains('email')) {
                if (emailTest(input)) {
                    formAddError(input);
                    error++;
                }
            }
			if (input.value === '') {
                    formAddError(input);
                    error++;
                } 

			if( arr=$('input:checkbox:checked').map(function() {return this.value;}).get()){
            	if (arr == 0) {
					// formAddErrorLabel(label);
					// alert('ви не обрали жодної послуги');
					formAddErrorLabel(label)
					error++;
				}
                
            }
                
        }
		
		return error;			
    }
        
    
		function formAddError(input) {
			formOne>input.parentElement.classList.add('error');
			formOne>input.classList.add('error');
		}
		function formRemoveError(input) {
			formOne>input.parentElement.classList.remove('error');
			formOne>input.classList.remove('error');
		}
		function formAddErrorLabel(label) {
			label.parentElement.classList.add('error');
			label.classList.add('error');
		}
		function formRemoveErrorLabel(label) {
			label.parentElement.classList.remove('error');
			label.classList.remove('error');
		}
		
		
});


// =======================================
// ФОРМА ВІДПРАВКИ ПОВІДОМЛННЯ
// =======================================

document.addEventListener('DOMContentLoaded', function () {
	const mailForm = document.getElementById('mailForm');
	// const label = document.getElementById('serviceValidation');
	const sendingTwo = document.getElementById('formTwoSending');
	const formTwo = document.getElementById('formTwo');
	mailForm.addEventListener('submit', mailFormSend);

	async function mailFormSend(e) {
		e.preventDefault();

		let errorTwo = mailFormValidate(mailForm);

		let formDataTwo = new FormData(mailForm);
		// formData.append('image', formImage.files[0]);

		if (errorTwo === 0) {
			sendingTwo.classList.add('sending');
            let response =  await fetch ('sendmail.php', {
                method: 'POST',
                body: formDataTwo
            });
            if (response.ok){
                // let result = await response.json();
				// let arrTwo = [];
				// let arrSuccess = ["success"];
				// arrTwo = result.message;
				// swal.fire({
				// 	title: "Все круто",
				// 	text: "Ваше повідомлення надіслано",
				// 	icon: "success",
				// 	allowEnterKey: false,
				// 	customClass: 'border__success'
				// });
				popupOpen(popupThree);
                // // swal("success", arrTwo);
                // // formPreview.innerHTML = '';
                mailForm.reset();
				// form.reset();
                sendingTwo.classList.remove('sending');
            } else {
				popupOpen(popupTwo);
				sendingTwo.classList.remove('sending');
    			// swal.fire({
				// 	title: "Ой лишенько!",
				// 	text: "Сталася помилка з відправкою замовлення!",
				// 	icon: "error",
				// 	allowEnterKey: false,
				// 	customClass: 'border__error'
				// });
				// popupOpen(popup);
                // sendingTwo.classList.remove('sending');
            }
		
		}  else {
			// function popupOpen (popup);
			// swal.fire({
			// 	title: "Матінко рідна!",
			// 	text: "Ви забули заповнити форму!",
			// 	icon: "warning",
			// 	allowEnterKey: false,
			// 	customClass: 'border__warning',
			// 	// scrollbarPadding: false
			// });
			// bodyLock();
			popupOpen(popup);
                sendingTwo.classList.remove('sending');
		}

	}

    function mailFormValidate() {
        let errorTwo = 0;
        let formReq = document.querySelectorAll('.req__two');
		// var a = !!document.querySelector(".chekbox:checked");
		// let arr = [];
		// let eyelashes = [];
		// let eyebrow = [];
		// let lamination = [];
		// eyelashes [0] = document.querySelectorAll('#eyelashes');
		
		// eyebrow [0] = document.querySelectorAll('#eyebrow');
		
		// lamination [0] = document.querySelectorAll('#lamination');
        for (let index = 0; index < formReq.length; index++){
            const input = formReq[index];
            mailFormRemoveError(input); 
			// formRemoveErrorLabel(label)
			
			if(input.classList.contains('email')) {
                if (emailTest(input)) {
                    mailFormAddError(input);
                    errorTwo++;
                }
            }
			if (input.value === '') {
                	mailFormAddError(input);
                    errorTwo++;
                } 

			// if( arr=$('input:checkbox:checked').map(function() {return this.value;}).get()){
            // 	if (arr == 0) {
			// 		// formAddErrorLabel(label);
			// 		// alert('ви не обрали жодної послуги');
			// 		formAddErrorLabel(label)
			// 		error++;
			// 	}
                
            // }
                
        }
		
		return errorTwo;			
    }
        
    
		function mailFormAddError(input) {
			formTwo>input.parentElement.classList.add('error');
			formTwo>input.classList.add('error');
		}
		function mailFormRemoveError(input) {
			formTwo>input.parentElement.classList.remove('error');
			formTwo>input.classList.remove('error');
		}
		function emailTest(input) {
			return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
		}
		// function formAddErrorLabel(label) {
		// 	label.parentElement.classList.add('error');
		// 	label.classList.add('error');
		// }
		// function formRemoveErrorLabel(label) {
		// 	label.parentElement.classList.remove('error');
		// 	label.classList.remove('error');
		// }
		
		
});


// =======================================

// -----------------------//
// BANNER
// -----------------------//


function theRotator() {
	// Устанавливаем прозрачность всех картинок в 0
	$('.rotator-slide').css({opacity: 0.0});
 
	// Берем первую картинку и показываем ее (по пути включаем полную видимость)
	$('div#rotator ul li:first').css({opacity: 1.0});
 
	// Вызываем функцию rotate для запуска слайдшоу, 5000 = смена картинок происходит раз в 5 секунд
	setInterval('rotate()',7000);
}
 
function rotate() {	
	// Берем первую картинку
	var current = ($('div#rotator ul li.show')?  $('div#rotator ul li.show') : $('div#rotator ul li:first'));
 
	// Берем следующую картинку, когда дойдем до последней начинаем с начала
	var next = ((current.next().length) ? ((current.next().hasClass('show')) ? $('div#rotator ul li:first') :current.next()) : $('div#rotator ul li:first'));	
 
	// Расскомментируйте, чтобы показвать картинки в случайном порядке
	// var sibs = current.siblings();
	// var rndNum = Math.floor(Math.random() * sibs.length );
	// var next = $( sibs[ rndNum ] );
 
	// Подключаем эффект растворения/затухания для показа картинок, css-класс show имеет больший z-index
	next.css({opacity: 0.0})
	.addClass('show')
	.animate({opacity: 1.0}, 3000);
 
	// Прячем текущую картинку
	current.animate({opacity: 0.0}, 1000)
	.removeClass('show');
};
 
$(document).ready(function() {		
	// Запускаем слайдшоу
	theRotator();
});


// -----------------------//
// REVEALATOR
// -----------------------//



var Revealator = typeof Revealator !== 'undefined' ? Revealator : {};

$(function () {
	Revealator = $.extend({}, {
		timer:           null,
		busy:            false,
		scroll_padding:  -350,
		effects_padding: -350,
		refresh:         function () {}
	}, typeof Revealator !== 'undefined' ? Revealator : {});

	Revealator.refresh = function () {
		var $window = $(window);
		var $document = $(document);
		var $body = $(document.body);
		var i = 0;
		var window_top = Revealator.effects_padding;
		var window_bottom = $window.height() - Revealator.effects_padding;
		var document_top = Revealator.scroll_padding;
		var document_bottom = $document.height() - Revealator.scroll_padding;
		
		if ($window.scrollTop() === 0) {
			if (!$body.hasClass('at-top')) {
				$body.addClass('at-top').removeClass('at-bottom').removeClass('near-top').removeClass('near-bottom');
			}
		} else if ($window.scrollTop() + $window.height() === $document.height()) {
			if (!$body.hasClass('at-bottom')) {
				$body.addClass('at-bottom').removeClass('at-top').removeClass('near-top').removeClass('near-bottom');
			}
		} else if ($window.scrollTop() <= document_top) {
			if (!$body.hasClass('near-top')) {
				$body.addClass('near-top').removeClass('near-bottom').removeClass('at-top').removeClass('at-bottom');
			}
		} else if ($window.scrollTop() + $window.height() >= document_bottom) {
			if (!$body.hasClass('near-bottom')) {
				$body.addClass('near-bottom').removeClass('near-top').removeClass('at-top').removeClass('at-bottom');
			}
		} else {
			if ($body.hasClass('at-top') || $body.hasClass('at-bottom') || $body.hasClass('near-top') || $body.hasClass('near-bottom')) {
				$body.removeClass('at-top').removeClass('at-bottom').removeClass('near-top').removeClass('near-bottom');
			}
		}
		
		$('*[class*="revealator"]').each(function () {
			i++;
			var element = this;
			var $element = $(element);
			var element_bounding = element.getBoundingClientRect();

			var position_class = undefined;
			if (element_bounding.top > window_bottom && element_bounding.bottom > window_bottom) {
				position_class = 'revealator-below';
			} else if (element_bounding.top < window_bottom && element_bounding.bottom > window_bottom) {
				position_class = 'revealator-partially-below'
			} else if (element_bounding.top < window_top && element_bounding.bottom > window_top) {
				position_class = 'revealator-partially-above'
			} else if (element_bounding.top < window_top && element_bounding.bottom < window_top) {
				position_class = 'revealator-above';
			} else {
				position_class = 'revealator-within';
			}

			if ($element.hasClass('revealator-load') && !$element.hasClass('revealator-within')) {
				$element.removeClass('revealator-below revealator-partially-below revealator-within revealator-partially-above revealator-above');
				$element.addClass('revealator-within');
			}

			if (!$element.hasClass(position_class) && !$element.hasClass('revealator-load')) {
				if ($element.hasClass('revealator-once')) {
					if (!$element.hasClass('revealator-within')) {
						$element.removeClass('revealator-below revealator-partially-below revealator-within revealator-partially-above revealator-above');
						$element.addClass(position_class);
					}
					if ($element.hasClass('revealator-partially-above') || $element.hasClass('revealator-above')) {
						$element.addClass('revealator-within');
					}
				} else {
					$element.removeClass('revealator-below revealator-partially-below revealator-within revealator-partially-above revealator-above');
					$element.addClass(position_class);
				}
			}
		});
	};

	$(window).bind('scroll resize load ready', function () {
		if (!Revealator.busy) {
			Revealator.busy = true;
			setTimeout(function () {
				Revealator.busy = false;
				Revealator.refresh();
			}, 150);
		}
	});
});





// -------------------- //
// GALLERY
// ---------------------//


// photo 1 start
$('.view-one').click(function() {
  $('.block-one').show({
    duration: 300,
    easing: 'linear'
  });
	$('.block-one').click(function() {
		$(this).hide({
			duration: 'fast',
			easing: 'linear'
		});
	});
});
// photo 1 end

// photo 2 start
$('.view-two').click(function() {
  $('.block-two').show({
    duration: 300,
    easing: 'linear'
  });
	$('.block-two').click(function() {
		$(this).hide({
			duration: 'fast',
			easing: 'linear'
		});
	});
});
// photo 2 end

// photo 3 start
$('.view-three').click(function() {
  $('.block-three').show({
    duration: 300,
    easing: 'linear'
  });
	$('.block-three').click(function() {
		$(this).hide({
			duration: 'fast',
			easing: 'linear'
		});
	});
});
// photo 3 end

// photo 4 start
$('.view-four').click(function() {
  $('.block-four').show({
    duration: 300,
    easing: 'linear'
  });
	$('.block-four').click(function() {
		$(this).hide({
			duration: 'fast',
			easing: 'linear'
		});
	});
});
// photo 4 end

// $(window).scroll(function() {
//   $(this).scrollTop()>=200
//     // длительность анимации - 'slow'
//     // тип анимации -  'linear'
//     $('.test-view').fadeOut('slow','linear');
// });



// -------------------- //
// MENU
// ---------------------//


// $('.navigation-block').click(function(e) {
//   e.preventDefault();
//   $(this).closest('.slide-menu').toggleClass('active');
// });

// $(".slide-list").click(function(e) { 
//   $(this).closest(".slide-menu").removeClass("active"); 
// });

// $(document).mouseup(function (e) {
//   var container = $('.slide-menu');
//   if (container.find('ul').has(e.target).length === 1 && 
//       $(e.target).closest('.slide-menu ul').length === 2){
//     container.removeClass('slow');
//   }
// });
$(document).ready(function(){
	$(".slide-menu").click(function() {
		$('.slide-menu, .navigation').toggleClass('activation');
		$('body').toggleClass('lock');
	});
});

$(document).ready(function(){
	$(".navigation-link.one").click(function() {
		$('.circle.one').toggleClass('activation');
		$('.circle.two, .circle.three, .circle.four, .circle.five').removeClass('activation');
		$('.slide-menu, .navigation').removeClass('activation');
		$('body').toggleClass('lock');
	});
});
$(document).ready(function(){
	$(".navigation-link.two").click(function() {
		$('.circle.two').toggleClass('activation');
		$('.circle.one, .circle.three, .circle.four, .circle.five').removeClass('activation');
		$('.slide-menu, .navigation').removeClass('activation');
		$('body').toggleClass('lock');
	});
});
$(document).ready(function(){
	$(".navigation-link.three").click(function() {
		$('.circle.three').toggleClass('activation');
		$('.circle.one, .circle.two, .circle.four, .circle.five').removeClass('activation');
		$('.slide-menu, .navigation').removeClass('activation');
		$('body').toggleClass('lock');
	});
});
$(document).ready(function(){
	$(".navigation-link.four").click(function() {
		$('.circle.four').toggleClass('activation');
		$('.circle.one, .circle.two, .circle.three, .circle.five').removeClass('activation');
		$('.slide-menu, .navigation').removeClass('activation');
		$('body').toggleClass('lock');
	});
});
$(document).ready(function(){
	$(".navigation-link.five").click(function() {
		$('.circle.five').toggleClass('activation');
		$('.circle.one, .circle.two, .circle.three, .circle.four').removeClass('activation');
		$('.slide-menu, .navigation').removeClass('activation');
		$('body').toggleClass('lock');
	});
});



// -------------------- //
// SCROLLING-TOP
// ---------------------//


$(document).ready(function(){
	$("#btn-home").on("click","a", function (event) {
			//отменяем стандартную обработку нажатия по ссылке
			event.preventDefault();

			//забираем идентификатор бока с атрибута href
			var id  = $(this).attr('href'),

			//узнаем высоту от начала страницы до блока на который ссылается якорь
					top = $(id).offset().top;
			
			//анимируем переход на расстояние - top за 400 мс
			$('body,html').animate({scrollTop: top}, 400);
	});
});

jQuery(function(f){
	var element = f('#btn-home');
	f(window).scroll(function(){
			element['fade'+ (f(this).scrollTop() > 230 ? 'In': 'Out')](0);           
	});
});




// // -------------------- //
// // SCROLLING
// // ---------------------//


$(document).ready(function(){
	$(".navigation").on("click","a", function (event) {
			//отменяем стандартную обработку нажатия по ссылке
			event.preventDefault();

			//забираем идентификатор бока с атрибута href
			var id  = $(this).attr('href'),

			//узнаем высоту от начала страницы до блока на который ссылается якорь
					top = $(id).offset().top;
			
			//анимируем переход на расстояние - top за 1500 мс
			$('body,html').animate({scrollTop: top}, 1500);
	});
});

// $(document).ready(function(){
// 	$(".slide-menu").on("click","a", function (event) {
// 			//отменяем стандартную обработку нажатия по ссылке
// 			event.preventDefault();

// 			//забираем идентификатор бока с атрибута href
// 			var id  = $(this).attr('href'),

// 			//узнаем высоту от начала страницы до блока на который ссылается якорь
// 					top = $(id).offset().top;
			
// 			//анимируем переход на расстояние - top за 1500 мс
// 			$('body,html').animate({scrollTop: top}, 1500);
// 	});
// });

// $(document).ready(function(){
// 	$(".header-logo").on("click","a", function (event) {
// 			//отменяем стандартную обработку нажатия по ссылке
// 			event.preventDefault();

// 			//забираем идентификатор бока с атрибута href
// 			var id  = $(this).attr('href'),

// 			//узнаем высоту от начала страницы до блока на который ссылается якорь
// 					top = $(id).offset().top;
			
// 			//анимируем переход на расстояние - top за 1500 мс
// 			$('body,html').animate({scrollTop: top}, 1500);
// 	});
// });

// $(document).ready(function(){
// 	$(".revealator-slideup").on("click","a", function (event) {
// 			//отменяем стандартную обработку нажатия по ссылке
// 			event.preventDefault();

// 			//забираем идентификатор бока с атрибута href
// 			var id  = $(this).attr('href'),

// 			//узнаем высоту от начала страницы до блока на который ссылается якорь
// 					top = $(id).offset().top;
			
// 			//анимируем переход на расстояние - top за 1500 мс
// 			$('body,html').animate({scrollTop: top}, 1500);
// 	});
// });




// -------------------- //
// CARUSEL
// ---------------------//


// $('#sl').slick({
// 	dots: true,
// 	arrows: false,
//   infinite: false,
//   speed: 800,
//   slidesToShow: 3,
// 	slidesToScroll: 3,
	

//   responsive: [
//     {
//       breakpoint: 1200,
//       settings: {
//         slidesToShow: 2,
//         slidesToScroll: 2,
//         infinite: true,
//         dots: true
//       }
// 		},
//     {
//       breakpoint: 580,
//       settings: {
//         slidesToShow: 1,
//         slidesToScroll: 1
//       }
//     },
//     {
//       breakpoint: 480,
//       settings: {
//         slidesToShow: 1,
//         slidesToScroll: 1
//       }
//     }
//     // You can unslick at a given breakpoint now by adding:
//     // settings: "unslick"
//     // instead of a settings object
//   ]
// });



// ------------------------//
// ORDER FORM
// ------------------------//

$('.order-btn').click(function() {
	$('.order-wrap').show({
    duration: 300,
    easing: 'linear'
	});
});
$('.order-btn').click(function() {
	$('.banner-block').fadeOut({
		duration: 'fast',
		easing: 'linear'
	});
});

$('.order-block').click(function() {
	$('.banner-block').fadeIn({
		duration: 600,
		easing: 'linear'
	});
}); 

$('.order-block').click(function() {
	$('.order-wrap').hide({
		duration: 300,
		easing: 'linear'
	});
});





//----------------------------//
//-------maska----------------//
//----------------------------//
// $(function() {

//   $("#phone").mask("999 999 9999");
  
  
// });

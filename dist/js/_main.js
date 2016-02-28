( function( $ ) {
    // Init Skrollr
    var s = skrollr.init({
        render: function(data) {
            //Debugging - Log the current scroll position.
            //console.log(data.curTop);
        }
    });
} )( jQuery );

$('a').click(function(){
    $('html, body').animate({
        scrollTop: $( $(this).attr('href') ).offset().top
    }, 1000);
    return false;
});

$('body').height(0);
$('.jumbotron .heading1').css('opacity', '0.0');
$('.jumbotron .heading2').css('opacity', '0.0');
$('.jumbotron .item1').css('opacity', '0.0');
$('.jumbotron .item2').css('opacity', '0.0');
$('.jumbotron .item3').css('opacity', '0.0');
$('.jumbotron .click_icon').css('opacity', '0.0');
$('.jumbotron .hiddenItem1').css('opacity', '0.0');
$('.jumbotron .hiddenItem2').css('opacity', '0.0');
$('.jumbotron .hiddenItem3').css('opacity', '0.0');
$('.jumbotron1 .thumbnails').hide();

window.setTimeout( function(){
	$('.jumbotron .heading1').css('opacity', '1.0');
    $('.jumbotron .heading1').addClass('animated fadeInDown');
}, 500);
window.setTimeout( function(){
	$('.jumbotron .heading2').css('opacity', '1.0');
    $('.jumbotron .heading2').addClass('animated fadeInDown');
}, 1000);
window.setTimeout( function(){
	$('.jumbotron .item1').css('opacity', '1.0');
    $('.jumbotron .item1').addClass('animated fadeInDown');
}, 1500);
window.setTimeout( function(){
	$('.jumbotron .item2').css('opacity', '1.0');
    $('.jumbotron .item2').addClass('animated fadeInDown');
}, 2000);
window.setTimeout( function(){
	$('.jumbotron .item3').css('opacity', '1.0');
    $('.jumbotron .item3').addClass('animated fadeInDown');
}, 2500);
window.setTimeout( function(){
	$('.jumbotron .click_icon').css('opacity', '1.0');
    $('.jumbotron .click_icon').addClass('animated fadeInLeft');
}, 3500);
window.setTimeout( function(){
    $('.jumbotron .click_icon').addClass('animated fadeOut');
	$('.jumbotron .click_icon').css('opacity', '0.0');
}, 4800);

function animationClick(element, animation){
    element = $(element);
    $('.jumbotron .item1').click(
        function() {
			element.css('opacity', '1.0');
            element.addClass('animated ' + animation);        
            //wait for animation to finish before removing classes
            window.setTimeout( function(){
                element.removeClass('animated ' + animation);
            }, 1000);         
  
        });
}
function animationClick2(element, animation){
    element = $(element);
    $('.jumbotron .item2').click(
        function() {
			element.css('opacity', '1.0');
            element.addClass('animated ' + animation);        
            //wait for animation to finish before removing classes
            window.setTimeout( function(){
                element.removeClass('animated ' + animation);
            }, 1000);         
  
        });
}
function animationClick3(element, animation){
    element = $(element);
    $('.jumbotron .item3').click(
        function() {
			element.css('opacity', '1.0');
            element.addClass('animated ' + animation);        
            //wait for animation to finish before removing classes
            window.setTimeout( function(){
                element.removeClass('animated ' + animation);
            }, 1000);         
  
        });
}

$(document).ready(function(){
    $('.jumbotron .hiddenItem1').each(function() {
        animationClick(this, 'animated fadeIn');
    });
});

$(document).ready(function(){
    $('.jumbotron .hiddenItem2').each(function() {
        animationClick2(this, 'animated fadeIn');
    });
});

$(document).ready(function(){
    $('.jumbotron .hiddenItem3').each(function() {
        animationClick3(this, 'animated fadeIn');
    });
});

function btnClick1(element, animation){
    element = $(element);
    element.click(
        function() {
			element.off('click');
            element.addClass('animated ' + animation);
            //wait for animation to finish before removing classes
            window.setTimeout( function(){
                element.removeClass('animated ' + animation);
				$('.jumbotron1 .thumbnails').show();
				$('.jumbotron1 .thumbnails').addClass('animated slideInRight');
				$('.jumbotron1 ').html($('.jumbotron1 .thumbnails'));
				element.removeClass('.jumbotron');
            }, 1000);         
  
        });
}
function btnClick2(element, animation){
    element = $(element);
    element.click(
        function() {
			element.off('click');
            element.addClass('animated ' + animation);        
            //wait for animation to finish before removing classes
            window.setTimeout( function(){
                element.removeClass('animated ' + animation);
				$('.jumbotron2 .jumbotron').html(
				"<h1 class=\"animated slideInRight\">Hi, I'm Eric.</h1>" + 
				"<p class=\"animated slideInRight\" class=\"lead\">Creativity. Interactivity. Functionality.</p>" +
				"<p class=\"animated slideInRight\" class=\"lead\">These are the three priorites that I focus on everytime I want to create something awesome.</p>" +
				"<p class=\"animated slideInRight\" class=\"lead\">The Rochester Institute of Technology helped me to develop these skills through the New Media Interactive Development Program.</p>" +
				"<p class=\"animated slideInRight\" class=\"lead\">Being born and raised in Rochester, New York along with my desire to be creative helped me choose RIT.</p>" +
				"<p class=\"animated slideInRight\" class=\"lead\">RIT has put me on a career path that allows me to be creative while creating something that is interactive and functional.</p>" +
				"<p class=\"animated slideInRight\" class=\"lead\">For that, I am grateful and cannot wait to see what the future holds for me.</p>"
				);
            }, 1000);         
  
        });
}
function btnClick3(element, animation){
    element = $(element);
    element.click(
        function() {
			element.off('click');
            element.addClass('animated ' + animation);        
            //wait for animation to finish before removing classes
            window.setTimeout( function(){
                element.removeClass('animated ' + animation);
				$('.jumbotron3 .jumbotron').html(
				"<h1 class=\"animated slideInRight\">Contact Info</h1>" + 
				"<p class=\"animated slideInRight\" class=\"lead\">585.402.6911</p>" +
				"<p class=\"animated slideInRight\" class=\"lead\">eth5881@rit.edu</p>" +
				"<p class=\"animated slideInRight\" class=\"lead\"><a href=\"https://www.facebook.com/eric.hunt.14\" target=blank><img id=\"sm\" src=\"http://2.bp.blogspot.com/-tvmgENfHanM/U-kriCleTNI/AAAAAAAABvs/Yb5VeHaIgPU/s1600/facebook+logo+vector.png \" /></a><a href=\"https://twitter.com/EricHunt564 \" target=blank><img id=\"sm\" src=\"http://www.redeemer.net/wp-content/uploads/2014/02/twitter.png \" /></a><a href=\"https://www.linkedin.com/in/eth5881 \" target=blank><img id=\"sm\" src=\"https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/768px-LinkedIn_logo_initials.png \" /></a></p>" +
				"<p class=\"animated slideInRight\" class=\"lead\">My Resume:</p>" +
				"<p class=\"animated slideInRight\" class=\"lead\"><a href=\"Eric Hunt Resume 2016.pdf\" target=blank id=\"resume\" class=\"btn btn-lg btn-success\" role=\"button\">View</a><a href=\"Eric Hunt Resume 2016.pdf\" download id=\"resume\" class=\"btn btn-lg btn-success\" role=\"button\">Download</a></p>"
				);
            }, 1000);         
  
        });
}

$(document).ready(function(){
    $('.jumbotron1 .jumbotron .button1').click(function() {
        btnClick1($('.jumbotron1'), 'animated slideOutLeft');
    });
});
$(document).ready(function(){
    $('.jumbotron2 .jumbotron .button2').click(function() {
        btnClick2($('.jumbotron2'), 'animated slideOutLeft');
    });
});
$(document).ready(function(){
    $('.jumbotron3 .jumbotron .button3').click(function() {
        btnClick3($('.jumbotron3'), 'animated slideOutLeft');
    });
});
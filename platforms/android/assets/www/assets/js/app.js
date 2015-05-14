$('.footer').on('click','.footer-item',function(){
	$('.footer-active').removeClass('footer-active')
	$(this).addClass('footer-active')
})

$(document).ready(function(){
	var buffer='#^!*FIN�'
	var charCode = ''
	for (var i=0; i < buffer.length; i++){
		charCode += buffer.charCodeAt(i).toString(16)
	}

	console.log(charCode)
})


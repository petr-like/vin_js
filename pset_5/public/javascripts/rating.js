// rating.js

function rating_star(int){
	var curent_id = !int ? 0 : int-1
	let main = $('.rating_star')[0]
	let star = '<a id = "0" class="active_rating" href="#"> <img src="../images/star_b.png"/> </a>'
	for(var i = 1; i <= 4; i++){
		if(i <= curent_id){
			star += `<a id="${i}" href="#"> <img src="../images/star_b.png"/> </a>`
		}else{
			star += `<a id="${i}" href="#"> <img src="../images/star_empty_b.png"/> </a>`
		}
		
		}
	main.innerHTML = star
	main.onclick = (event) => {
		var target = event.target;
		if(target.tagName != 'IMG') return
		var count = target.parentNode.id;
		curent_id = count
		$('select[name="rating"]').val(1+Number(count))
		set_star(count)
	}
	$('a img').hover(
		function(event){
			var target = event.target;
			if(target.tagName != 'IMG') return
			var count = target.parentNode.id;
			set_star(count)
		},
		function(event){
			set_star(curent_id)
		}
	)
	function set_star(count){
		for(i = 0; i <= 4 ; i++){
			if(i <= count){
				$('a#'+i)[0].children[0].src = '../images/star_b.png'
			}else{
				$('a#'+i)[0].children[0].src = '../images/star_empty_b.png'
			}
		}
	}
}

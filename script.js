$(function(){
	var canvas = $("canvas")[0],
			ctx = canvas.getContext("2d"),
			method,
			$color = $("input");

	var drawing_methods = {
		width: 30,
		circle: function(event) {
			var radius = this.width / 2,
					x = event.offsetX,
					y = event.offsetY;

			ctx.beginPath();
			ctx.arc(x, y, radius, 0, 2 * Math.PI);
			ctx.fill();
			ctx.closePath();
		},
		square: function(event) {
			var side = this.width,
					x = event.offsetX - side / 2,
					y = event.offsetY - side / 2;

			ctx.fillRect(x, y, side, side);
		},
		triangle: function(event) {
			var side = this.width,
					x = event.offsetX,
					y = event.offsetY - side / 2;

			ctx.beginPath();
			ctx.moveTo(x, y);
			ctx.lineTo(x + side / 2, y + side);
			ctx.lineTo(x - side / 2, y + side);
			ctx.fill();
		},
		clear: function(event) {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
		},
	};

	$(".drawing_method").on("click", function(event) {
		event.preventDefault();
		var $event = $(this),
				class_name = "active";

		$event.closest("ul").find("." + class_name).removeClass(class_name);
		$event.addClass(class_name);

		method = $event.attr("data-method");
	}).eq(0).click();;

	$("canvas").on("click", function(event) {
		var color = $color.val();

		ctx.fillStyle = color;
		drawing_methods[method](event);
	});

	$("#clear").on("click", function(event) {
		event.preventDefault();

		drawing_methods.clear();
	});

});
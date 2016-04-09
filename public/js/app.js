$(document).ready( function () {
// varbles globales
var categoryNow;
	console.log('ready')
	// show menu
	$('.show-menu').click( function (){
		$('.mobil-menu').toggleClass('show shadow')
	})

	// show sub_menu
	$('.item').click( function (eve){
		// limpia div
		$(".second-view").find(".items").empty("")
		// obtiene el ID de la categoria
		 var dbid = $(this).attr("data-dbid")
		 // consuta productos de categorya
		 $.ajax({
		 	url : "lib/products.php?category_id=" + dbid
		 }).done( function (data){
		 	console.log(data)
		 	var divisor = [];
		 	var sub_category = [];
		 	var product = data;
		 	// Recorrer data para obtener searadotes y subcategorias
		 	_.each(product, function (item) {
		 		console.log(item.gas)
		 		if (item.gas != "none") {
		 			divisor.push(item.gas)
		 		} 

		 		if (item.subcategory1_id != null) {
		 			sub_category.push(item.subcategory1_id)
		 		} 
		 	});
		 	// reducir categorias a alores unicos

		 	if (divisor.length != 0) {
		 		divisor = $.unique(divisor)
		 	} else {
		 		divisor = null
		 	}
		 	if (sub_category.length != 0) {
		 		sub_category = $.unique(sub_category)
		 	} else {
		 		sub_category = null
		 	}
		 	// console.log(divisor)
		 	// console.log(sub_category)
		 	// si no hay subcategorias o divisores
		 	if (divisor == null && sub_category == null) {
		 		allProductos(product)
		 	};

		 	// si hay diviciones (gas)
		 	if (divisor != null && sub_category == null ) {
		 		// console.log("divisor si tiene algo")
		 		sub_divisors(divisor)
		 	};

		 	if (sub_category != null) {
		 		categoryDivisor(sub_category)
		 	};

		 	// cuando no hay diviciones
		 	function allProductos(arr){
			 	//recorre categorias unicas
			 	$(".second-view").find(".items").append('<ul>');
				_.each(arr, function (items) {
					// console.log(items)
					$(".second-view").find('ul').append('<li data-producid="' + items.id +' ">' + items.title + '</li>')
						})
		 	}
		 	// cuando hay sub categorias
		 	function categoryDivisor(arr) {
		 		// imprime todos los productos
		 		//FILTRA los productos directos a la categoria
		 		var productsCategory = _.where(product, {subcategory1_id: null})
		 		// console.log(productsCategory)
		 		allProductos(productsCategory);

		 		_.each(sub_category, function (data) {
		 			var filtro = _.where(product, {subcategory1_id: data} );
		 			// console.log(filtro)
		 			var subCategory_name;
		 			$.ajax({
		 				url: "lib/categories.php?id=" + data
		 			}).done(function (name) {
		 				$(".second-view").find(".items").append("<span> "+ name.title +"</span>");
		 				$(".second-view").find(".items").append('<ul class="'+name.id+'">');
		 					
		 				_.each(filtro, function (items) {
		 					$(".second-view").find('.'+ name.id).append('<li data-producid="' + items.id +' ">' + items.title + '</li>')
		 				})

		 			})

		 			})

		 	}

		 	// si hay filtros (GAS)
		 	function sub_divisors(arr){
			 	//recorre categorias unicas
			 	_.each(divisor, function (data) {
			 		// consulta produtos de esa categoria
			 		var filtro = _.where(product, {gas: data} );
			 			$(".second-view").find(".items").append("<span> "+ data +"</span>");
			 			$(".second-view").find(".items").append('<ul class="'+data+'">');
						_.each(filtro, function (items) {
							// console.log(items)
							$(".second-view").find('.'+ data).append('<li data-producid="' + items.id +' ">' + items.title + '</li>')
						})
			 	})
		 	}

		 })



		// resolution menu view
		if ($('.mobil-menu').width() > 767) {
			// console.log("esta grande")
			$('.second-view').fadeIn();
		} else {
			$('.first-view').fadeOut("fast", function () {
				$('.second-view').fadeIn();
			})
		}

	})

	// Consultar producto seleccionado
		$(".items").on("click", "li", function (e){
			var idProduct = $(this).attr("data-producid")

			$.ajax({
				url: 'lib/products.php?id=' + idProduct
			}).done( function (data){
				localStorage.setItem("theProduct", JSON.stringify(data))
				// location.href="product_view.html"
				$('.mobil-menu').toggleClass('show shadow')
				$('.product-home').removeClass('hidden')
				$('.home-view').addClass('hidden')
				$('.banner').addClass('hidden')
				
				$('.banner-product').removeClass('hidden')

				$('.banner-product h1').html("Productos")
				draw_the_Product()
			})
		})

	// back
	$('.back').click( function () {
		$('.second-view').fadeOut("fast", function () {
			$('.first-view').fadeIn();
		})
	})

		$(".logo").click( function (e) {
			console.log("clickme")
		})
})
// fuera del ready

	function draw_the_Product(){
		var theProduct = localStorage.getItem("theProduct");
		$('.url').addClass('hidden')
		theProduct = JSON.parse(theProduct)
		console.log(theProduct)
		$('.the-product .titles h3').html(theProduct.title)
		$('.the-product .titles p').html(theProduct.subtitle)
		// 
		$('.producdescription').html(theProduct.description)
		$('.the-product .product_box .text .imagen').html('<img src=" '+theProduct.details+' "class="img-responsive">')
		// 
		$('.the-product .product_box .photo img').attr('src', theProduct.image)

		if ( theProduct.url1 != null) {
			$('.url').removeClass('hidden')
			$('.url1').attr('href', theProduct.url1).html('<img class="img-responsive" src="img/pdf.png">')
			if ( theProduct.url2 != null) {
				$('.url2').attr('href', theProduct.url2).html('<img class="img-responsive" src="img/pdf.png">')
			}
			if ( theProduct.url3 != null) {
				$('.url3').attr('href', theProduct.url3).html('<img class="img-responsive" src="img/pdf.png">')
			}

		};




	}













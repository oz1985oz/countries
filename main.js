$("button").click(function() {
	$("main").empty();
	$.get('https://restcountries.eu/rest/v2/all', function (json) {
		createAll(json);
	})
});

$(document).on('input', "input[name='name']", (e) => {
	e.preventDefault();
	$("main").empty();
	var name = $("input[name='name']").val();
	$.get('https://restcountries.eu/rest/v2/name/' + name, function (json) {
		createAll(json);
	})
});

$("input[value='Search']").click(function(e) {
	e.preventDefault();
	$("main").empty();
	var name = $("input[name='name']").val();
	$.get('https://restcountries.eu/rest/v2/name/' + name, function (json) {
		createAll(json);
	})
});

function createAll(json) {
	$.each(json, function( index, value ) {
		build(value);
	});
}

function build(one) {
	var card = $('<div>', {class: "card"}).appendTo('main');
	var country = $('<div>', {class: "country-info"}).appendTo(card);
	var img = $('<div>', {class: "img"}).appendTo(country);
	$('<img>', {src: one.flag}).appendTo(img);
	var text = $('<div>', {class: "right-text"}).appendTo(country);
	$('<p>', {text: "Name: " + one.name}).appendTo(text);
	$('<p>', {text: "Top Level Domain: " + one.topLevelDomain}).appendTo(text);
	$('<p>', {text: "Capital: " + one.capital}).appendTo(text);
	$('<h4>', {text: 'Currencies:'}).appendTo(text);
	$.each(one.currencies, function( index, value ) {
		var currencies = $('<div>', {
			class: "currencies"
		}).appendTo(text);
		$.each(value, function( index, value ) {
			$('<span>', {text: value + " | "}).appendTo(currencies);
		});
	});
}
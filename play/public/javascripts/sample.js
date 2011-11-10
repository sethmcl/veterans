var samples = {
	string: {
		source:  "Hello World!",
		context: {}
	},
	replace: {
		source:  "Hello {name}! You have {count} new messages and the div has been replaced.",
		context: { name: "Anand", count: 10 }
	},
	array: {
		source:  "{#names}{name}{/names}",
		context: { names: [
			{ name: "Moe" },
			{ name: "Larry" },
			{ name: "Curly" },
			{ name: "Shemp" }
			]
		}
	}
}

dustRender = function(id, name) {
	var sample = samples[name],
	ctx = sample.context;

	dust.loadSource(dust.compile(sample.source, name));
	dust.render(name, ctx, function(err, out) {
		$("#"+id).html("<b>Replaced with:</b> " + out);
	});
};

$(document).ready(function(){
	/*
	$("#button").click(function(){
		$("p").html("Paragraph replaced");
		$("#jqueryDiv").html("Div replaced by jQuery")
		var name1 = $("#commandinput").val()
		var name2 = $("#commandselect").val()
		dustRender("dustDiv", name1  || name2);
	});
	*/
});

var people = {
	name: 'Omid Monshizadeh',
	title: 'Web Developer'
}
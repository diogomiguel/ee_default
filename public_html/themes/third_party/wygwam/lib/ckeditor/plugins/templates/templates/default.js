var didyouknow = '<div class="did-you-know-container">' +
	'<div class="did-you-know block-content">' +
		'<div class="did-you-know-wrapper">' +
			'<h2>Did you Know</h2>' +
		'</div>' +
	'</div>' +

	'<img src="/images/website/dummies/inner-did-u-know.jpg" width="156" height="156" alt="Eat Healthy" class="block-image" />' +
	'<p>Lorem ipsum dolor sit amet, adipisicing elit, sed labore et dolore magna.</p>' +
	
	'<a class="btn-inner-extra" href="/">' +
		'<span>Be More Diet Aware</span>' +
	'</a>' +
'</div>',

	product = '<div class="rhs-product-container">' +
		'<img src="/images/website/dummies/rhs-hand.png" width="169" height="254" alt="Free FreeStyle Optium Neo" />' + 
		'<h3>FreeStyle Optium Neo</h3>' +
		'<p>Smart diabetes support at your finger tips*</p>' +
		'<p><a href="#">Learn more &gt;</a></p>' +
		'<a class="btn-inner-product-extra" href="/">' +
			'<span>Request a Free Meter <sup>&dagger;</sup></span>' +
		'</a>' +
	'</div>',
	
	didyouknow2 = '<div class="did-you-know-container">' +
		'<div class="did-you-know block-content">' +
			'<div class="did-you-know-wrapper">' +
				'<h2>FAQs</h2>' +
			'</div>' +
		'</div>' +

		'<img src="/images/website/dummies/inner-did-u-know.jpg" width="156" height="156" alt="Eat Healthy" class="block-image" />' +
		'<p><strong>Lorem ipsum dolor sit amet.</strong><br />Lorem ipsum dolor sit amet, adipisicing elit, sed labore et dolore magna.</p>' +

		'<a class="btn-inner-extra" href="/">' +
			'<span>Read More</span>' +
		'</a>' +
	'</div>',
	
	blockquote = '<blockquote>' +
		'<p>' +
			'When you treat your diabetes with insulin you try to match the action of the insulin you inject with the food you eat.' +
		'</p>' +
	'</blockquote>';
	
	
CKEDITOR.addTemplates("default", { 
																	 templates:[
																			{title:"RHS Did You Know",
																			description:"Right Hand Side Circular content, image and button",
																			html:didyouknow},

																			{title:"RHS Did You Know - FAQs",
																			description:"Right Hand Side Did You Know with FAQs Header and Extra Strapline",
																			html:didyouknow2},

																			{title:"RHS Product",
																			description:"Right Hand Site Product Highlight Example",
																			html:product},

																			{title:"Blockquote",
																			html:blockquote}
																		]
																	});
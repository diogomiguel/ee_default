//GLOBALS CACHED
var $html = $('html'),
		$win  = $(window),
		$doc  = $(document),
		ie7   = $html.hasClass('lt-ie8'),
		isWebkit = 'webkitRequestAnimationFrame' in window,
		controller = null,
		$body = $('body');



//UI OBJ => ALL INTERACTIONS
var ui = {
	
	
	initialize: function(page) {
		controller = $.superscrollorama({
			triggerAtCenter: false,
			playoutAnimations: true
		});
		ui.common();
		ui.navOverviewDocked = false;
		
		
		switch(page) {
			case 'index':
				ui.homeFuncs();
				break;
			case 'contact':
				ui.contactForm();
				
				theatreMap.initialize("contact-us-map", allTheatres);
				break;
			case 'show-map':
				if (typeof tLat == "undefined")
					break;
			
				var theatreMarker = [[tLat, tLong, tTitle, tDesc, "arts.png"]];
 				theatreMap.initialize("shows-about-map", theatreMarker);
				break;
			case 'theatre-show-map':
				if (typeof tLat == "undefined")
					break;

				var theatreMarker = [[tLat, tLong, tTitle, tDesc, "arts.png"]];
 				theatreMap.initialize("theatres-about-map", theatreMarker);
				break;
			case 'about-us':
				ui.aboutFuncs();
				theatreMap.initialize("about-us-find-map", allTheatres);
				break;
			case 'vacancies':
				new AccordionTabs({
				tabsClass: 'vacancies-jobs',
				headerClass: 'tab-header',
				contentClass: 'tab-content'
				});
				break;
			case 'faqs':
				
				ui.faqsAccordion = new AccordionTabs({
					tabsClass: 'faqs-categories',
					headerClass: 'tab-header',
					contentClass: 'tab-content'
				});
				
				new AccordionTabs({
					tabsClass: 'faqs-questions',
					headerClass: 'question-header',
					contentClass: 'question-content'
				});
				
				ui.faqsForm();
				
				break;	
			case 'theatre':
				var bookingpanel = new Carousel({
					slider: $('#booking-panel'),
					namespace: '#booking-panel',
					slides: 3,
					auto:true,
					autoLoop:true
				});
				doWebkitFix();
				break;
			case 'show':
				doWebkitFix();
				break;
				
			case 'merchandise':
				ui.merchandiseForm();
				break;
			
			case 'theatre-club':
				ui.theatreClubForm();
				break;
		}
	},
	
	//FUNCS FOR ALL WEBSITE
	common: function() {
		nav.initialize();
		
		//INNER VENUE HIRE
		new Carousel({
			slider: $('#venue-hire-slider'),
			namespace: '#venue-hire',
			slides: 3
		});
		
		//TIMELINES
		new Carousel({
			slider: $('#our-history-slider'),
			namespace: '#our-history',
			slides: 3
		});
		
		//GALLERIES
			//VH GALLERIES
			var $vhgalleries = $('.venuehire-room-slider');
			if ($vhgalleries.length) {
				$vhgalleries.each(function(){
					new Carousel({
						slider: $(this),
						namespace: '.venuehire-room',
						slides: 1
					});
				})
			}
			
			//SHOWS GALLERIES
			var $showgalleries = $('.show-gallery-slider');
			if ($showgalleries.length) {
				$showgalleries.each(function(){
					new Carousel({
						slider: $(this),
						namespace: '.show-gallery',
						slides: 1
					});
				})
			}
			
			//REFURBISHMENT GALLERY
			var $refurbgalleries = $('.refurbishment-gallery-slider');
			
			if ($refurbgalleries.length) {
				$refurbgalleries.each(function(){
					new Carousel({
						slider: $(this),
						namespace: '.refurbishment-gallery',
						slides: 1
					});
				})
			}
			
			//THEATRE GALLERY
			var $theatregalleries = $('.theatre-gallery-slider');
			
			if ($theatregalleries.length) {
				$theatregalleries.each(function(){
					new Carousel({
						slider: $(this),
						namespace: '.theatre-gallery',
						slides: 1
					});
				})
			}
			
		// ABOUT RHS IMAGES REPOS
		if ($('.theatre-about-element').length)
			ui.reposAboutImages($('.theatre-about-element'));
		
		if ($('.show-about-element').length)
			ui.reposAboutImages($('.show-about-element'));
		
		// NAV OVERVIEW
		ui.overviewNav();
		
		
		// OVERLAY DID U KNOWS
		ui.overlayDidUKnow();
		
		
		//TRIGGER SCROLL EVENTS
		$win.load(function(){
			$(this).trigger('scroll');
		});
		
		//ACCEPT COOKIES
		ui.cookieAcceptAjax();
	},
	
	homeFuncs: function() {
		//Initialize Nav Top
		//$('#performances-dropdown-link').trigger('click');
		
		
		//SIMULATES HOMEPAGE AUTO LOAD MENU
		nav.ajaxified = 1;
		nav._afterAjax($('#performances-dropdown-link'));
			
		
		
		//Main Carousel
		new Carousel({
			slider: $('#carousel'),
			namespace: '#carousel',
			slides: 1,
			auto: true,
			autoLoop: true
		});
		
		//Concerts and Events Slider
		new FadeCarousel({
			slider: $('#con-events-slider'),
			namespace: '#con-events',
			auto: true,
			autoLoop: true,
			speed:850,
			autoInterval:3500
		});
		
		//VH Slider
		new Carousel({
			slider: $('#venue-hire-slider'),
			namespace: '#venue-hire',
			slides: 3
		});
		
		//Board Panels
		/*
		new BoardGallery({
			//mandatory
			board: $('#hl-board-content'),
			namespace: '.hl-board-member',
			panels: 3,

			panelWidth: 320,
			panelHeight: 220,
			speed: 500,
			speedOverlay: 700
		});
		*/
		//Banners
		
		var $leaderboard = $('#leaderboard');
		
		// If has leaderboard and data-rel == SWF
		if ($leaderboard.length && $leaderboard.attr('data-rel')) {
			swfobject.embedSWF($leaderboard.attr('data-rel'), "leaderboard", "728", "90", "9.0.0");
		}
		
	},
	
	aboutFuncs: function() {
		//Board Panels
		new BoardGallery({
			//mandatory
			board: $('#hl-board-content'),
			namespace: '.hl-board-member',
			panels: 3,

			panelWidth: 285,
			panelHeight: 196,
			speed: 500,
			speedOverlay: 700
		});
	},	
	
	contactForm: function() {
		var that = this;
		ui.miscPlaceholderSupport();
		$.validate({
			borderColorOnError : null,
			onSuccess: function(form){
				
				//SUBMIT AJAX
				var options = { 
						beforeSubmit:  that.showContactFormLoader,
		        success:       that.showContactFormResponse  // post-submit callback 
		    };
				jQuery(form).ajaxSubmit(options);
				return false;
			}
		});
		$('#contact-us-form-message').restrictLength($('#message-maxlength'));
		console.log("Form Validate");
	},
	
	merchandiseForm: function() {
		var that = this;
		ui.miscPlaceholderSupport();
		$.validate({
			borderColorOnError : null,
			onSuccess: function(form){
				
				//SUBMIT AJAX
				var options = { 
						beforeSubmit:  that.showContactFormLoader,
		        success:       that.showMerchandiseFormResponse  // post-submit callback 
		    };
				jQuery(form).ajaxSubmit(options);
				return false;
			}
		});
	},
	
	theatreClubForm: function() {
		var that = this;
		ui.miscPlaceholderSupport();
		$.validate({
			borderColorOnError : null,
			onSuccess: function(form){
				
				//SUBMIT AJAX
				var options = { 
						beforeSubmit:  that.showContactFormLoader,
		        success:       that.showTheatreClubFormResponse  // post-submit callback 
		    };
				jQuery(form).ajaxSubmit(options);
				return false;
			}
		});
	},
	
	faqsForm: function() {
		$('#keywords').removeAttr('disabled');
		var that = this;
		ui.miscPlaceholderSupport();
		$.validate({
			borderColorOnError : null,
			onSuccess: function(form){
				
				//SUBMIT AJAX
				var options = { 
						beforeSubmit:  that.showFaqsFormLoader,
		        success:       that.showFaqsFormResponse  // post-submit callback 
		    };
				jQuery(form).ajaxSubmit(options);
				return false;
			}
		});
	},
	
	// BEFORE SUBMIT SHOW LOADER
	showContactFormLoader: function() {
		$('<img src="/images/website/ajax-loader-grey.gif" alt="loading" id="contact-us-loader" width="16" height="16" />').insertAfter('#contact-us-form-submit');
		$('#contact-us-form-submit').hide();
	},
	
	_freeFormResponses: function(formData, form_el, success, ga_value, p_success_ind) {
		if (success) {
			//SUCCESS HIDE FORM AND SHOW THANK YOU MESSAGE
			console.log(form_el);
			form_el.slideUp("slow", function(){
				$(this).remove();
			});
			$('#textual-content p.error').remove();
			$('#textual-content p').eq(p_success_ind).html('<strong>Thank you!<br />Your submission has been sent.</strong>');
			
			ga('send', 'event', 'Forms', 'Submission', ga_value);
		} else {
		
			$('#contact-us-form-submit').show();
			$('#textual-content p.error').remove();
			console.log(formData.errors[0]);
			$('<p class="error">' + formData.errors[0] + '</p>').insertAfter('#textual-content p:eq(0)')
		}
	},
	
	showContactFormResponse: function(formData, jqForm, options) {
		var success = (formData.search(/Thank you/i) !== -1);
		
		$('#contact-us-loader').remove();
		
		if (success) {
			//SUCCESS HIDE FORM AND SHOW THANK YOU MESSAGE
			
			var topic = $('#contact-us-form-topic').val(),
					show  = $('#contact-us-form-theatre_show').val();
					
			$('#contact-us-form').slideUp("slow", function(){
				$(this).remove();
			});
			$('#contact-us-content-main p.error').remove();
			$('#contact-us-content-main p').eq(1).html('<strong>Thank you!<br />Your submission has been sent.</strong>');

			ga('send', 'event', 'Contact Us Form', topic, show);
		} else {
		
			$('#contact-us-form-submit').show();
			$('#contact-us-content-main p.error').remove();
			$('<p class="error">You did not insert the word exactly as it appears on the image</p>').insertAfter('#contact-us-content-main p:eq(2)')
		}
	},
	
	showMerchandiseFormResponse: function(formData, jqForm, options) {
		var success = (formData.success);
		
		$('#contact-us-loader').remove();
		
		ui._freeFormResponses(formData, $('#merchandise-subscribe_form'), success, "Merchandising Pre Form", 0);
		
	},
	
	showTheatreClubFormResponse: function(formData, jqForm, options) {
		var success = (formData.success);
		
		$('#contact-us-loader').remove();
		
		ui._freeFormResponses(formData, $('#theatre_club-subscribe_form'), success, "Theatre Club Pre Form", 1);
	},
	
	showFaqsFormLoader: function() {
		$('#faqs-search-loading').css('visibility', 'visible');
		$('#keywords').attr('disabled', 'disabled');
	},
	
	showFaqsFormResponse: function(formData, jqForm, options) {
		var $faqsResultDiv = $('#faqs-search-results');
		
		$faqsResultDiv.html(formData);
		$('#faqs-search-loading').css('visibility', 'hidden');
		$('#keywords').removeAttr('disabled');
		$('#keywords').val('');
		ui.faqsSearchResultsAnchors();
	},
	
	// CLICK SEARCH RESULT => SCROLL TO FAQ TAB AND OPEN IT
	faqsSearchResultsAnchors: function() {
		$('ul#faqs-search-results a').bind('click', function(e){
			var $this = $(this),
					$relEl = $($this.attr('href'));
					
			if ($relEl.length) {
				
				// WORKAROUND CLOSE ALL TO CALC HEIGHT
				ui.faqsAccordion.closeAll();
				
				//SCROLLTO ELEMENT AND ACTIVATE TAB
				$win.scrollTo($relEl, { duration: 'slow', offset: -120, onAfter:function(){$relEl.find('.tab-header').trigger('click');} });
				
			}
			e.preventDefault();
		});
	},
	
	miscPlaceholderSupport: function () {
		if (! ("placeholder" in document.createElement("input"))) {
       $('*[placeholder]').each(function() {
           $this = $(this);
           var placeholder = $(this).attr('placeholder');
           if ($(this).val() === '') {
               $this.val(placeholder);
           }
           $this.bind('focus',
           function() {
               if ($(this).val() === placeholder) {
                   this.plchldr = placeholder;
                   $(this).val('');
               }
           });
           $this.bind('blur',
           function() {
               if ($(this).val() === '' && $(this).val() !== this.plchldr) {
                   $(this).val(this.plchldr);
               }
           });
       });
    }
	},
	
	// Bind Animation Open to Did U Know overlay Glass Icons (Timelines / Headers ...)
	overlayDidUKnow: function() {
		var $didUKnowOverlays = $('.diduknow-overlay');
		
		if ($didUKnowOverlays.length) {
			var $didUKnowIcons = $didUKnowOverlays.children('.diduknow-glasses'),
					$sectionWrapper = $didUKnowOverlays.parents('section');
			
			// if Parent is a section panel, show only when scroll reaches area
			if ($sectionWrapper.length){
				console.log($sectionWrapper);
				controller.addTween($sectionWrapper,
					TweenMax.from($sectionWrapper, 1, {
						onStart: function(){ 
							$didUKnowIcons.fadeTo(1000,1,function(){
								doFilterFix($(this));
							});
						},
						onReverseComplete: function(){
							$didUKnowIcons.fadeTo(1000,0);
						}
					}),
					1,-$win.height()
				);
			} else {
				$didUKnowIcons.fadeTo(1000,1,function(){
					doFilterFix($(this));
				});
			}
			
			//Complex hover logic with some necessary iterations to toggle overlay did u know and repos when inside overlay hidden elements 
			$didUKnowIcons.hover(function(){
				
				var $this = $(this),
						$didUKnowOverlay = $this.parent(),
						$didUKnow = $didUKnowOverlay.find('.diduknow'),
						$didUKnowMask = $didUKnowOverlay.find('.diduknow-masks');
						
				var reposAbsolute = $this.parents('.wrapper'),
						offset = $didUKnowOverlay.offset();
						
				//Save inner height
				if (!jQuery.data($didUKnow[0], 'innerHeight')) {
					$didUKnow.show().height('auto');
					jQuery.data($didUKnow[0], 'innerHeight', $didUKnow.innerHeight());
					$didUKnow.height('0').hide();
				}
				
					
				//Move to Top Level and Repos Absolute Overlays inside carousel wrappers
				if (reposAbsolute.length){
					if (!jQuery.data($didUKnowOverlay[0], 'parentSlider')) {
						jQuery.data($didUKnowOverlay[0], 'parentSlider', $didUKnowOverlay.parent());
						jQuery.data($didUKnowOverlay[0], 'wrappedPos', $didUKnowOverlay.position());
					}
					$didUKnowOverlay.appendTo("body");
					$didUKnowOverlay.css({top: offset.top, left: offset.left});
				}
				
				//Show Overlay
				var innerHeight = jQuery.data($didUKnow[0], 'innerHeight');
				
				$didUKnow.show()
				 .stop()
				 .animate({
						height:innerHeight
				 }, 1000, "easeOutBack");
				
				$didUKnowMask.stop().fadeTo(500,1);

			}, function(){
				var $this = $(this),
						$didUKnowOverlay = $this.parent(),
						$didUKnow = $didUKnowOverlay.find('.diduknow'),
						$didUKnowMask = $didUKnowOverlay.find('.diduknow-masks');
						
				var reposAbsolute = $this.parents('.wrapper');
				
				//CLose Overlay
				$didUKnowMask.stop().fadeTo(300,0);
				
				$didUKnow.stop().animate({
					height:0
				}, 500, "easeOutCubic", function(){
					$didUKnow.hide();
					
					//Move back to wrapper and Repos 
					if (!reposAbsolute.length){
						var $parentSlider = jQuery.data($didUKnowOverlay[0], 'parentSlider'),
								wrappedPos    = jQuery.data($didUKnowOverlay[0], 'wrappedPos');
						$didUKnowOverlay.appendTo($parentSlider);
						$didUKnowOverlay.css({top: wrappedPos.top, left: wrappedPos.left});
					}
				});
				
			});
		}
	},
	
	overviewNav: function() {
		ui.$navOverviewWrapper = $('#nav-overview-wrapper');
		
		if (ui.$navOverviewWrapper.length) {
			ui.$navOverview = ui.$navOverviewWrapper.children('nav');
			
			// NAV OVERVIEW OFFSET TOP + MENU BAR HEIGHT
			ui.navOffsetTopComp = 58;
			ui.navOverviewStarted = false;
			ui.navOverviewStartedOffset = 0;
			ui.navOverviewSavedMTop = 58;
			
			controller.addTween(ui.$navOverviewWrapper,
				TweenMax.to(ui.$navOverviewWrapper, 0.0001, {
					onStart: function(){ 
						//When Menu Show 
						if (!ui.navOverviewStarted) {
							console.log("START NAV");
							ui.navOverviewStarted = true;
							ui.$navOverview.addClass('fixed');
							ui.$navOverview.css('margin-top', ui.navOverviewSavedMTop);
						}
					},
					onReverseComplete: function(){
						if (ui.navOverviewStarted) {
							console.log("REVERSE NAV");
							ui.$navOverview.removeClass('fixed');
							ui.$navOverview.css('margin-top', '');
							ui.navOverviewStarted = false;
						}
						
					},
					immediateRender: false
				}), 
				0, -ui.navOffsetTopComp
			);
			
			
			
			
		}
		
	},
	
	//Called by nav class when menu state changes
	navOverviewRepos: function(state) {
		console.log("STATE : " + state);
		var newHeightHeader = nav.$wrapper.innerHeight();

		switch (state) {
			// STATIC MENU = change offseting to 58
			case 1:
			
			var animObject = controller.getAnimObjectByTarget(ui.$navOverviewWrapper);
			animObject.offset = -ui.navOffsetTopComp;
			controller.triggerCheckAnim(true);
			
			ui.navOverviewSavedMTop = 58;
			
			if (ui.navOverviewStarted)
				ui.$navOverview.css('margin-top', ui.navOverviewSavedMTop);
				
			ui.$navOverview.css('margin-top', '');
			break;
			case 2:
			case 3:
			// STATIC MENU = change offseting depending on Header Height
			
				
			var animObject = controller.getAnimObjectByTarget(ui.$navOverviewWrapper);
			animObject.offset = -(newHeightHeader + ui.navOffsetTopComp);
			controller.triggerCheckAnim(true);
			
			ui.navOverviewSavedMTop = nav.$wrapper.innerHeight() + ui.navOffsetTopComp;
			
			if (!ui.navOverviewStarted)
				break;
				
			ui.$navOverview.css('margin-top', ui.navOverviewSavedMTop);
			break;
		}
	},

	//About Images Repos
	reposAboutImages: function(aboutImgs) {
		
		aboutImgs.each(function(){
			var $this    = $(this),
					imgTop   = $this.position().top,
					$imgPar  = $this.parent(),
					imgParIH = $imgPar.innerHeight(),
					$rhsEl   = $this.prev('div'),
					rhsElIH  = $rhsEl.innerHeight() + $rhsEl.position().top;
			
			// If img won't fit naturally = resize
			if (imgTop < rhsElIH) {
				console.log(rhsElIH);
				$this.css({ bottom:0, top:rhsElIH });
			}
					
			
		});
		
	},
	//Accept Cookies == Hide Bar
	cookieAcceptAjax: function(){
		$('#cookie-bar-accept').bind('click', function(e){
			var acceptUrl  = $(this).attr('href');
			$.ajax({
				url:acceptUrl,
				success:ui.cookieAcceptSuccess
			});
			e.preventDefault();
		});
	},
	//Click Accept Cookie Btn
	cookieAcceptSuccess: function(){
		var $cookiebar = $('#cookie-bar');
		
		$cookiebar.fadeOut(1000,function(){
			$cookiebar.hide();
		});
	}
}

//Top Navs
var nav = {
	
	
	// SETUP AJAX UNLOADED 
	initialize: function() {
		//Cache Objects
		nav.$header        = $('#header'),
		nav.$wrapper       = $('#menu-wrapper'),
		nav.$dropdownWrapper  = $('#dropdown-wrapper');
		
		nav.$menubtn          = $('#menu-btn'),
		nav.$links         = nav.$wrapper.find('#main-nav li > a'),
		nav.$dropdownLinks = nav.$links.filter('.dropdown-link'),
		nav.$activeDropdown = null;
		
		
		//Conf Vars
		nav.ajaxified   = 0,
		nav.menuEnabled = 0,
		nav.menuOpen    = 0,
		nav.subnavOpen  = 0,
		nav.menuDocked  = 0;
		
		nav._preAjaxBindings();
		
	},
	
	// BINDS AJAX UNLOADED
	_preAjaxBindings: function() {
		// Dropdown Links Click => Show Section Dropdown
		nav.$dropdownLinks.bind('click', function(e){
			e.preventDefault();
			var $this     = $(this);
			if (!nav.ajaxified) {
				if (!nav.menuDocked) nav.$header.css('height', 'auto');
				nav.$dropdownWrapper.animate({
					height: 198
				}, 600, function(){
					nav._stateChanged(nav.menuEnabled ? 3 : 1);
					
				});
				
				setTimeout(function(){
					nav.$dropdownWrapper.load('/ajax/subnav',function(){
						nav._afterAjax($this);
						nav.ajaxified = 1;
					});
				}, 300);
				
				
					
				
			}
			
		});
		
		// Menu Button Click
		nav.$menubtn.bind('click', function(e){
			e.preventDefault();
			console.log(nav.menuEnabled);
			console.log(nav.menuOpen);
			
			// SOMETIMES ERROR = WORKAROUND
			if (parseInt(nav.$menubtn.css('opacity')) == 1)
				nav.menuEnabled = 1;
				
			if (nav.menuEnabled) {
				if (nav.menuOpen) {
					// Hide Nav
					nav.$menubtn.removeClass('disabled');
					
					nav.$wrapper.fadeTo(600,0, function(){
						nav.menuOpen = 0;
						nav._stateChanged(1);
						nav.$wrapper.removeClass('fixed');
					});
				} else {
					// Show Nav
					nav.$menubtn.addClass('disabled');
					nav.$wrapper.addClass('fixed');
					nav.$wrapper.fadeTo(0,0);
					nav.$wrapper.fadeTo(600,1, function(){
						nav._stateChanged(nav.subnavOpen ? 3 : 2);
					});
					nav.menuDocked = 1;
					nav.menuOpen = 1;
					
				}
			}
		});
		
		nav.toggleMenu();
	},
	
	// AJAX LOADED == REST BINDINGS + FINAL SETUP
	_afterAjax: function(triggerEl) {
		console.log('start');
		
		nav.$dropdownMask     = nav.$dropdownWrapper.children('.mask'),
		nav.$dropdowns        = nav.$dropdownWrapper.find('div.dropdown'),
		nav.$activeDropdown   = null,		
		nav.$subDropdownItems  = nav.$wrapper.find('.dropdown-nav > ul > li'),
		nav.$subDropdownThumbs = nav.$wrapper.find('.dropdown-thumbs > div');
		
		
		nav.$dropdownLinks.unbind('click');
		
		nav._bindings();
		
		//Hide non-first dropdowns - Show First Sub Dropdowns - Start Carousel for Sub Dropdown
		var $firstLinks = nav.$wrapper.find('.dropdown-nav > ul > li.dropdown-first');
		$firstLinks.addClass('active');
		
		nav.$subDropdownThumbs.addClass('hidden');
		
		// START CAROUSELS FIRST ITEM OF EACH SUB NAV SECTION
		$firstLinks.each(function(){
			var $subDropdown = $($(this).children('a').attr('data-rel'));
			
			$subDropdown.addClass('active');
			$subDropdown.removeClass('hidden');
			nav._startCarousel($subDropdown);
		});
		
		triggerEl.trigger('click');
	},
	
	_bindings : function() {
		// Dropdown Links Click => Show Section Dropdown
		nav.$dropdownLinks.bind('click', function(e){
			e.preventDefault();
			
			var $this     = $(this),
					$dropdown = $($this.attr('data-rel')),
					ind       = nav.$dropdowns.index($dropdown),
					finalL    = ind * -960;
			
			// Disable SubNav if link active :: Show if not
			if ($this.hasClass('active')) {
				nav._closeDropDown();
			} else {
				
				nav.$links.removeClass('active');
				$this.addClass('active');

				// If not submenu displayed show it
				if (!nav.subnavOpen) {
					nav._openDropDown(false);
					nav.$dropdownMask.css('left', finalL);
				} else {
				// If submenu displayed go to the right section
					nav.$dropdownMask.animate({
						'left': finalL
					}, 600, function(){
						nav._lazyLoadActive();
						nav._loopThumbnailsActive();
					});
				}

				// We will remember what section is this
				nav.$activeDropdown = $dropdown;
				nav.$activeSubDropdown = $dropdown.find('.dropdown-thumbs > div').eq(0);
			}
			

		});

		// Sub Sub Nav Click
		nav.$subDropdownItems.children('a').bind('click', function(e){
			e.preventDefault();			
			var $this  = $(this),
					$liPar = $this.parent('li');
			
			if ($this.hasClass('active'))
				return;
				
			$liPar.addClass('active');
			$liPar.siblings('li').removeClass('active');
			
			var $subDropdown = $($(this).attr('data-rel'));
			
			$subDropdown.siblings('div').removeClass('active').addClass('hidden');
			$subDropdown.addClass('active');
			$subDropdown.removeClass('hidden');
			
			nav.$activeSubDropdown = $subDropdown;
			
			nav._lazyLoadActive();
			nav._loopThumbnailsActive();
			// Only start carousel if not inialized
			if(!jQuery.data($subDropdown[0], "carousel"))
			nav._startCarousel($subDropdown);
		})
	},
	
	_openDropDown: function() {
		// FIX WHEN BACK TO TOP AND MENU HAS TO RE-OPEN
		if (!nav.menuDocked) nav.$header.css('height', 'auto');
		
		nav.$dropdownWrapper.animate({
			height: 198
		}, 600, function(){
			//nav._fixScrollPos();
			nav._lazyLoadActive();
			nav._loopThumbnailsActive();
			nav._stateChanged(nav.menuDocked ? 3 : 1);
			nav.subnavOpen = 1;
			nav.$header.css('height', nav.$wrapper.innerHeight());
		});
	},
	
	_closeDropDown: function() {
		if (!nav.menuDocked) nav.$header.css('height', 'auto');
		
		// FIX WHEN BACK TO TOP AND MENU HAS TO RE-OPEN
		nav.$dropdownWrapper.animate({
			height: 0
		}, 600, function(){
			//Fix Scrollback menu open
			nav.$dropdownLinks.removeClass('active');
			nav._stateChanged(nav.menuDocked ? 2 : 1);
			nav.subnavOpen = 0;
			nav.$header.css('height', nav.$wrapper.innerHeight());
		});
	},
	

	// After x scrolled
	toggleMenu: function() {
		
		
		// When 300 > Show menu Btn
		controller.addTween(300,
			TweenMax.to(nav.$menubtn, .5, {
				css: {opacity:1},
				onStart: function(){ 
					//When Menu Show 
					console.log('start');
					nav.menuEnabled = 1;
					
					
				},
				onUpdate: function(){
					// Make sure menu is displayed correcly when menu BTn mode is off
					if (nav.menuEnabled && $win.scrollTop() < 300) {
						console.log('reverse');
						nav.menuEnabled = 0;
						//Fix bug when menu btn is clicked when fixed to hide main nav
						nav.$wrapper.fadeTo(0,1);
						
					}
				}
			})
		);
		
		// Fix when someone scrolls up with fixed overlay menu open
		$win.scroll(function(){
			//Fix bug Chrome
			if ($win.scrollTop() < 0)
				return;
				
			if ($win.scrollTop() == 0) {
				// If all the way to top
				if (nav.menuDocked) {
					nav.$menubtn.removeClass('disabled');
					nav.menuDocked = 0;
					nav.menuOpen = 0;
					nav._stateChanged(1);
					nav.$wrapper.removeClass('fixed');
					nav.$wrapper.fadeTo(0,1);
					$body.css('margin-top',0);
				}
			}
			
			if (!nav.MenuEnabled){
				// Repos the margin top of the body => MARGIN TOP to compensate menu size changes!!!
				var headerContentMT = parseInt($body.css('margin-top'));
				
				// MARGIN TOP POSITIVE 
				if (headerContentMT > 0) {
					if($win.scrollTop() <= headerContentMT){
						$body.css('margin-top', $win.scrollTop());
					}
					
				// MARGIN TOP NEGATIVE
				} else {
					var abs = Math.abs(headerContentMT);
					if($win.scrollTop() <= abs){
						$body.css('margin-top', -$win.scrollTop());
					}
				}
			}
		});
		
		$win.trigger('scroll');
		
	},
	
	_startCarousel: function(dropdownObj) {
		// Set extra dummies if less than 6
		var numSlides = dropdownObj.find('figure.slide').length;
		console.log(numSlides);
		if (numSlides < 7) {
			var $dropdownMask = dropdownObj.find('.mask'),
					n = 7 - numSlides;
			
			
			while (n > 0){
				console.log("N EXECUTE" + n);
				if (n == 1)
					$dropdownMask.append('<div class="empty-figure last-item"></div>');
				else
					$dropdownMask.append('<div class="empty-figure"></div>');
				n--;
			}
		}
		
		// Carousel me
		var carousel = new Carousel({
			slider: dropdownObj,
			namespace: '.dropdown',
			slides: 7,
			slideWidth: 118,
			auto: false
		});
		
		jQuery.data(dropdownObj[0], "carousel", true);
	},
	
	//Fix Scroll when scroll top with overlay menu open
	_fixScrollPos: function() {
		/*
		if (nav.submenuShow && nav.menuOpen) {
			var inH = nav.$wrapper.innerHeight() - 0.5;
			nav.$header.css('height', inH);
		}*/
	},

	//DropDown Section Show == lazyload thumbs
	_lazyLoadActive: function(){
		
		//Lazy Loading
		if (!nav.$activeSubDropdown.hasClass('lazy-loaded')){
			nav.$activeSubDropdown.find('img').lazyload({
				event : 'menu'
			});
			
			nav.$activeSubDropdown.find('img').trigger('menu');
			
			nav.$activeSubDropdown.addClass('lazy-loaded');
			console.log('Lazy Loading');
		}
	},
	
	// Loop nested thumbnails in active dropdowns
	_loopThumbnailsActive: function(){
		if (!nav.$activeSubDropdown.hasClass('thumbnails-looping')){
			console.log('FadeIn');
			nav.$activeSubDropdown.addClass('thumbnails-looping');
			
			nav.$activeSubDropdown.find('div.images-loop').each(function(){
				
				// Loop set counter on cur object
				var $this  = $(this),
						zindexTotal = $this.children('a').length;
						zindex 			= zindexTotal; 
				
				if (zindexTotal < 2)
					return;
					
				console.log($this);
				jQuery.data($this[0], "count", 0);
				
				$this.children('a').each(function(){
					$(this).css('z-index', zindex);
					zindex--;
				})
				
				setInterval(function() {
					var count = jQuery.data($this[0], "count");
			    var newCount = ($this.children("a").eq(count).fadeOut().next().length == 0) ? 0 : count+1;
			    $this.children("a").eq(newCount).fadeIn();
					jQuery.data($this[0], "count", newCount);
				}, 2000);
			});
			
		}
	},
	
	/* 
	MENU STATE CHANGED
	state:
	1 - static 
	2 - fixed: main nav displayed
	3 - fixed: subnav displayed
	*/
	_stateChanged: function(state){
		console.log("STATE CHANGED:");
		if (state != 1) {
			var curHeaderHeight = nav.$header.height(),
			    newHeaderHeight = nav.$wrapper.innerHeight(),
				  ptopHeader = parseInt($body.css('margin-top')),
				  totalHeight = curHeaderHeight - newHeaderHeight + ptopHeader;
			

			nav.$header.height(newHeaderHeight);

			$body.css('margin-top',  totalHeight);
		}
		if (ui.$navOverviewWrapper.length)
			ui.navOverviewRepos(state);
	}
}

// CONTACT PAGE GMAPS
var theatreMap = {
	iconBase: 'https://maps.gstatic.com/mapfiles/ms2/micons/',
	
	
	markerInterator: 0,
	
	initialize: function(mapEl, markersConfig) {
		var that = this;
		this.mapEl = document.getElementById(mapEl);
		this.markersConfig = markersConfig;
		
		console.log(that.mapEl);
		google.maps.event.addDomListener(window, 'load', that.setup);
	},
	
	setup: function() {
		var that = theatreMap;
		var centerPos = that.markersConfig.length > 1 ? new google.maps.LatLng(51.512511, -0.128595) : new google.maps.LatLng(that.markersConfig[0][0], that.markersConfig[0][1]);
		var zoomVal = that.markersConfig.length > 1 ? 15 : 17;
		var mapOptions = {
      center: centerPos,
      zoom: zoomVal,
			mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    theatreMap.map = new google.maps.Map(that.mapEl, mapOptions);
		for (var i = 0; i < theatreMap.markersConfig.length; i++) {
			
			setTimeout(function(){
				theatreMap.dropMarker();
			}, 400 * i);
		}
	},
	
	dropMarker: function() {
		//Marker LatLng and Titles
		if (typeof theatreMap.markersConfig[theatreMap.markerInterator] === "undefined") {
			return;
		}
		var markerConfig = theatreMap.markersConfig[theatreMap.markerInterator],
		    icon = theatreMap.iconBase + markerConfig[4],
		    marker = new google.maps.Marker({
	      	position: new google.maps.LatLng(markerConfig[0], markerConfig[1]),
					title: markerConfig[2],
					icon: icon,
					animation: google.maps.Animation.DROP
				});
		
		var infowindow = new google.maps.InfoWindow({
			content: '<div class="infowindow">' + markerConfig[3] + '</div>',
			maxWidth: 226
		});
		
		
		console.log(marker);
		
		marker.setMap(theatreMap.map);
		google.maps.event.addListener(marker, 'click', function() {
			infowindow.open(theatreMap.map,marker);
		});
		
		theatreMap.markerInterator++;
	}
}
/*
Only accepts one slider per call =(

Use:
new Carousel(config);

config:
{
//mandatory
slider: $('.show-gallery-slider'),
namespace: '.show-gallery',
slides: 1,

//optional
slideWidth: 860,
slideHeight: 600,
speed: 1000,
easing: 'easeOutCubic',
auto: false,
autoInterval: 3000,
autoLoop: false
}

*/
var Carousel = Class.extend({
	
	initialize: function(config) {		
		if (!config.slider.length)
			return;
			
		// More than one ? Use only first
		if (config.slider.length > 2)
			config.slider = config.slider.eq(0);
		
		// Cache Main Elements
 		this.$slider     = config.slider,
		this.$wrapper    = this.$slider.children('.wrapper'),
		this.$mask       = this.$wrapper.children('.mask'),
		this.$slides     = this.$mask.children('.slide'),
		this.$pagination = this.$slider.children(config.namespace + '-pagination'),
		this.$arrowLeft  = this.$slider.children(config.namespace + '-arr-left'),
		this.$arrowRight = this.$slider.children(config.namespace + '-arr-right');
 		
		// Main Dimensions
    this.slideWidth  = (config.slideWidth ? config.slideWidth : this.$slides.eq(0).outerWidth()),
  	this.slideHeight = (config.slideHeight ? config.slideHeight : this.$slides.eq(0).height()),
	  this.numSlides   = config.slides, 
		this.totalPanels = Math.ceil(this.$slides.length / this.numSlides);
		
		// Animation Settings
		this.initialized  = false,
		this.speed  		  = (config.speed ? config.speed : 1000),
		this.easing			  = (config.easing ? config.easing : 'easeOutCubic'),
		this.auto  			  = (config.auto ? config.auto : false),
		this.autoInterval = (config.autoInterval ? config.autoInterval : 3000),
		this.autoLoop  	  = (config.autoLoop ? config.autoLoop : false);
		this.animating    = false;
		
		this._prepPagination();
		this._prepElements();
		
		this._bindings();
		
		this.initialized = true;
			
		console.log("Initalizing Gallery with:");
		console.log(this); 
		
	},
	
	// Bind Nav on Arrows and Indicators
	_bindings: function() {
		var that = this;
		
		// For more than 1 slide per panel. When get's to the last, only move what's necessary.
		var mod = this.$slides.length % this.numSlides;
		this.maxPos = 0;
		this.curIndex = 0;
		
		if (mod == 0) {
			this.maxPos = (this.totalPanels - 1) * this.numSlides * -this.slideWidth;
		} else {
			this.maxPos = ((this.totalPanels - 2) * this.numSlides + mod) * -this.slideWidth;
		}
				
		// Bind onClick Arrows
		this.$arrowLeft.bind('click', function(){
			
			var $this = $(this);
			
			if ($this.hasClass('disabled'))
				return;
			
			$this.addClass('disabled');
			
			if (that.carouselInterval)
				clearInterval(that.carouselInterval);
			
			if (that.animating) {
				return false;
			}
				
			that.curIndex--;
			that._gotoIndex();
		});
		
		this.$arrowRight.bind('click', function(){
			
			var $this = $(this);
			
			if ($this.hasClass('disabled'))
				return;
			
			if (that.carouselInterval)
				clearInterval(that.carouselInterval);
				
			$this.addClass('disabled');
			
			if (that.animating) {
				return false;
			}
			
			that.curIndex++;
			that._gotoIndex();
		});
		
		// Bind Pagination Clicks
		this.$pagination.children('li').bind('click', function(){

			var $this = $(this);
			
			if ($this.hasClass('active'))
				return;
			
			if (that.carouselInterval)
				clearInterval(that.carouselInterval);
			
			if (that.animating) {
				return false;
			}
				
			that.curIndex = $this.attr('data-pos');
			that._gotoIndex();
		});
		
		if (this.auto && this.totalPanels > 1) {
			this.automateDir = 'rht';
			this.autoMove();
		}
			
	},
	
	//IF Auto move set interval
	autoMove: function() {
		var that = this;
		
		//AUTO LOOP == INFINITE AUTO SCROLLING
		if (that.autoLoop) {
			this.carouselInterval = setInterval(function(){
				that._moveAutoDir.call(that)
				}, that.autoInterval);
		} else {
			setTimeout(function(){
				that._moveAutoDir.call(that)
			}, that.autoInterval);
		}
		
	},
	
	// Check Direction to move to and then auto move
	_moveAutoDir: function() {
		var that = this;
		
		/*
		Going back not used
		if (that.automateDir == 'rht' && that.curIndex == that.totalPanels - 1) 
			that.automateDir = 'lft';
		else if (that.automateDir == 'lft' && that.curIndex == 0)
			that.automateDir = 'rht'

		//AUTO MOVE
		if (that.automateDir == 'rht')
			that.curIndex++;
		else
			that.curIndex--;
		*/
		
		/*
		Go back to first
		*/
		if (that.curIndex == that.totalPanels - 1) {
			that.curIndex = 0;
		} else {
			that.curIndex++;
		}
		
		that._gotoIndex();
	},
	
	_gotoIndex: function() {
		
		this.animating = true;
		var	that = this,
				gotoPos = that.curIndex * -(this.slideWidth * this.numSlides);
				//speed = Math.abs(curIndex - index) * 1000;
		
		//? Max Reached
		gotoPos = Math.max(gotoPos, this.maxPos);
					
		this.$mask.animate({
			left: gotoPos
		}, this.speed, this.easing, function(){
			that._prepElements();
			
			// LazyLoading
			var $curSlide = that.$slides.eq(that.curIndex),
				  $curSlideImg = $curSlide.find('img.lazy-loading');

			if ($curSlideImg.length){
				$curSlideImg.lazyload();
				$curSlideImg.removeClass('lazy-loading');
			}
			
		});
		
		
	},
	
	// Get Cur Pos
	_getCurPos: function() {
		return (parseInt(this.$mask.css('left')) ? parseInt(this.$mask.css('left')) : 0);
	},
	
	// Get Slider Cur Active Index
	_getCurIndex: function() {
		return Math.ceil(-this._getCurPos() / (this.slideWidth * this.numSlides));
	},
	
	// Prepare Li Elements
	_prepPagination: function() {
		// Prepare Elems : 1 Prepare Pagination Indicators :: 2 Toggle Arrows
		this.$pagination.html('');
		
		// Only add pagination if more than 1
		if (this.totalPanels > 1) {
			for (var n = 1; n <= this.totalPanels; n++) {
				var $li = $("<li></li>");

				if (n == 1)
					$li.addClass('active');
				else if (n == this.totalPanels)
					$li.addClass('last-h-item');

				$li.attr('data-pos', n - 1);

				this.$pagination.append($li);
			}
		} else {
			this.$pagination.remove();
		}
	},
	
	// Prepare Bindable Elements (toggle visibility / make active)
	_prepElements: function() {
		
		
		var curIndex = this._getCurIndex();
		
		console.log('cur Index: ' + curIndex + ' / ' + (this.totalPanels - 1));
		
		if (curIndex == 0) {
			this.$arrowLeft.hide();
		} else {
			this.$arrowLeft.show();
			this.$arrowLeft.removeClass('disabled');
		}
		
		if (curIndex == this.totalPanels - 1) {
			this.$arrowRight.hide();
		} else {
			this.$arrowRight.show();
			this.$arrowRight.removeClass('disabled');
		}
			
		this.$pagination.children('li').removeClass('active');
		this.$pagination.children('li').eq(curIndex).addClass('active');
		
		this.animating = false;
	},
	// Destroy Carousel
	destroy: function() {
		if (!this.initialized)
			return;
			
		this.$pagination.html('');
		this.$arrowLeft.unbind('click');
		this.$arrowRight.unbind('click');
		this.$pagination.children('li').unbind('click');
	}
});


/*
New Carousel for C&E

Use:
new FadeCarousel(config);

config:
{
//mandatory
slider: $('.show-gallery-slider'),
namespace: '.show-gallery',

//optional
speed: 2000,
easing: 'easeOutCubic',
auto: false,
autoInterval: 3000,
autoLoop: false
}
*/
var FadeCarousel = Carousel.extend({
	initialize: function(config) {		
		if (!config.slider.length)
			return;
			
		// More than one ? Use only first
		if (config.slider.length > 2)
			config.slider = config.slider.eq(0);
		
		// Cache Main Elements
 		this.$slider     = config.slider,
		this.$wrapper    = this.$slider.children('.wrapper'),
		this.$slideGroup = this.$wrapper.children('.slide-group'),
		this.$slides     = this.$slideGroup.children('.slide'),
		this.$pagination = this.$slider.children(config.namespace + '-pagination'),
		this.$arrowLeft  = this.$slider.children(config.namespace + '-arr-left'),
		this.$arrowRight = this.$slider.children(config.namespace + '-arr-right');
 		
		// Main Dimensions
		this.totalPanels = this.$slideGroup.length;
		
		// Animation Settings
		this.initialized  = false,
		this.speed  		  = (config.speed ? config.speed : 1000),
		this.easing			  = (config.easing ? config.easing : 'easeOutCubic'),
		this.auto  			  = (config.auto ? config.auto : false),
		this.autoInterval = (config.autoInterval ? config.autoInterval : 3000),
		this.autoRefresh  = false,
		this.autoLoop  	  = (config.autoLoop ? config.autoLoop : false);
		this.animating    = false;
		
		this._prepPagination();
		this._prepElements();
		this._adjustZindex();
		this.$slideGroup.not('.active').children('.slide').fadeTo(0,0);
		this._bindings();
		
		this.initialized = true;
			
		console.log("Initalizing Fade Carousel with:");
		console.log(this); 
		
	},
	
	// Bind Nav on Arrows and Indicators
	_bindings: function() {
		var that = this;
		this.curIndex = 0;
				
		// Bind onClick Arrows
		this.$arrowLeft.bind('click', function(){
			
			var $this = $(this);
			
			if ($this.hasClass('disabled'))
				return;
			
			$this.addClass('disabled');
			
			if (that.carouselInterval)
				clearInterval(that.carouselInterval);
			
			if (that.animating) {
				return false;
			}
				
			that.curIndex--;
			that._gotoIndex();
		});
		
		this.$arrowRight.bind('click', function(){
			
			var $this = $(this);
			
			if ($this.hasClass('disabled'))
				return;
			
			if (that.carouselInterval)
				clearInterval(that.carouselInterval);
				
			$this.addClass('disabled');
			
			if (that.animating) {
				return false;
			}
			
			that.curIndex++;
			that._gotoIndex();
		});
		
		// Bind Pagination Clicks
		this.$pagination.children('li').bind('click', function(){
			
			var $this = $(this);
			
			if ($this.hasClass('active'))
				return;
			
			if (that.carouselInterval)
				clearInterval(that.carouselInterval);
			
			if (that.animating) {
				return false;
			}
				
			that.curIndex = $this.attr('data-pos');
			that._gotoIndex();
		});
		
		if (this.auto && this.totalPanels > 1) {
			this.autoMove();
		}
			
	},
	

	_moveAutoDir: function() {
		this._super();

		
	},
	
	_gotoIndex: function() {
		
		this.animating = true;
		var	that = this;
				//speed = Math.abs(curIndex - index) * 1000;
		
		//? Max Reached
		var gotoPos = Math.min(this.curIndex, this.totalPanels - 1);
					
		//Animate Slidegroup
		var $curSlideGroup    = this.$slideGroup.eq(gotoPos),
				$oldSlideGroup    = this.$slideGroup.filter('.active');
				
		console.log("GOTO");
		console.log($curSlideGroup);
		console.log($oldSlideGroup);
		
		
		// Fade Out Old Active
		$oldSlideGroup.children('div').each(function(ix, obj){
			var $this = $(this),
					delay = ix * that.speed / 2;
			
			
			$this.stop().delay(delay).fadeTo(that.speed / 1.5, 0, that.easing, function(){
				if (ix + 1 == $oldSlideGroup.children('div').length) {
					$oldSlideGroup.removeClass('active');
					
				}
			});
		});
		
		
		
		//Fade In Current
		$curSlideGroup.children('div').each(function(ix, obj){
			var $this = $(this),
					delay = ix * that.speed / 2 + that.speed / 4;
			
			// Make Images pop
			var $img = $this.find('a img');

			$img.css({ width:'70%', left:'15%', top:'10%' });
			$img.stop().delay(delay).animate({
				width:'100%',
				left:'0',
				top:'0'
			}, that.speed, that.easing);
					
			$this.stop().delay(delay).fadeTo(that.speed, 1, that.easing, function(){
					if (ix + 1 == $curSlideGroup.children('div').length) {
						$curSlideGroup.addClass('active');
						that._prepElements();
					}
					if (ix === 0) {
						that._adjustZindex();
						$curSlideGroup.css('z-index', that.totalPanels + 1);
						
					}
			});
		});
		
		
	},
	
	// Always the first
	_getCurIndex: function() {
		return (this.curIndex || 0); 
	},
	
	//Adjust Z-index for each slide group
	_adjustZindex: function() {
		var that = this,
				n = 0;
		this.$slideGroup.each(function(){
			var $this = $(this);
			
			$this.css('z-index', that.totalPanels - n);
			n++;
		});
	}
});

/*
Only accepts one board per call =(

Use:
new BoardGallery(config);

config:
{
//mandatory
board: $('#hl-board-content'),
namespace: '.hl-board-member',
panels: 3,

//optional
panelWidth: 320,
panelHeight: 220,
speed: 500,
easing: 'easeOutCubic',
speedOverlay: 700,
easingOverlay: 'easeOutExpo'
}

*/
var BoardGallery = Class.extend({
	
	initialize: function(config) {
		// More than one ? Use only first
		if (config.board.length > 2)
			config.board = config.board.eq(0);
			
		// Cache Main Elements
		this.$board = config.board,
		this.$panels = this.$board.children(config.namespace);
		
		// Prepare other configs
		this.overlayClass      = config.namespace + '-overlay',
		this.panelImgNamespace = config.namespace + '-img';
		
		// Main Dimensions
    this.panelWidth  = (config.panelWidth ? config.panelWidth : this.$panels.eq(0).width()),
  	this.panelHeight = (config.panelHeight ? config.panelHeight : this.$panels.eq(0).height()),
	  this.panelsRow   = config.panels, 
		this.totalRows = Math.ceil(this.$panels.length / this.panelsRow);
		
		// Animation Settings
		this.speed  = (config.speed ? config.speed : 500),
		this.easing = (config.easing ? config.easing : 'easeOutQuad'),
		this.speedOverlay  = (config.speedOverlay ? config.speedOverlay : 700),
		this.easingOverlay = (config.easingOverlay ? config.easingOverlay : 'easeOutExpo');
		
		this._prepPanel();
		console.log("Initalizing Board with:");
		console.log(this); 
		this._bindings();
	},
	
	_bindings: function() {
		var that = this;
		//Callbacks anonymously to get both context instances
		//this.$panels.hoverIntent( function(){that._showImgOn.call(this, that)}, function(){that._showImgOff.call(this, that)} );
		this.$panels.children(that.panelImgNamespace + 's').hover(function() { that._showImgOn.call(this, that) }, function() { that._showImgOff.call(this, that) });
	},
	
	_showImgOn: function(that) {
		//this == hovered element
		console.log(this);
		var $this = $(this),
		    $imgOn = $this.children(that.panelImgNamespace + '-on'),
				$imgOff = $this.children(that.panelImgNamespace + '-off');
		
		//Make img always top the overlay
		$this.parent().css('z-index', that.$panels.length);
		$this.css('z-index', that.$panels.length);
		//Scale img
		var factor = 1.1;		
		
    $imgOn.stop().animate({
        top: '-=' + Math.floor(that.panelHeight * 0.05),
        left: '-=' + Math.floor(that.panelWidth * 0.05),
        width: Math.floor(that.panelWidth * factor),
				height: Math.floor(that.panelHeight * factor),
				opacity: 1
    }, that.speed, that.easing);

		
		
		setTimeout(function(){
			that._showOverlay.call($this, that);
		}, that.speed / 2);

	},
	
	_showImgOff: function(that) {
		//this == hovered element
		var $this = $(this),
		    $imgOn = $this.children(that.panelImgNamespace + '-on'),
				$imgOff = $this.children(that.panelImgNamespace + '-off');
		
		
		//Make img always top the overlay
		$this.parent().css('z-index', 0);
		$this.css('z-index', 0);
				
    $imgOn.stop().animate({
        top: 0,
        left: 0,
        width: that.panelWidth,
				height: that.panelHeight,
				opacity: 0
    }, that.speed);
		
		setTimeout(function(){
			that._hideOverlay.call($this, that);
		}, that.speed / 2);
	},
	
	_showOverlay: function(that) {
		//this == hovered element
		var $this    = $(this),
				$overlay = $(this).siblings(that.overlayClass),
				curInd   = that.$panels.index($this.parent()) + 1;
				
		
		
		if (curInd % that.panelsRow == 0) {
			// Animate Right to Left
			$overlay.stop()
			.animate({
				width: that.panelWidth,
				left: -that.panelWidth
			}, that.speedOverlay, that.easingOverlay);
		} else {
			// Animate Left to Right
			$overlay.stop()
			.animate({
				width: that.panelWidth
			}, that.speedOverlay, that.easingOverlay);
		}
		
		$overlay.children('.wrapper').stop().fadeTo(0, 0)
		setTimeout(function(){
			$overlay.children('.wrapper').fadeTo(that.speedOverlay, 1, that.easing);
		}, that.speed / 2);
		
	},
	
	_hideOverlay: function(that) {
		//this == hovered element
			var $this    = $(this),
					$overlay = $(this).siblings(that.overlayClass),
					curInd   = that.$panels.index($this.parent()) + 1;
			
			
			
			if (curInd % that.panelsRow == 0) {
				// Animate Right to Left
				$overlay.stop()
				.animate({
					width: 0,
					left: 0
				}, that.speedOverlay / 2);
			} else {
				// Animate Left to Right
				$overlay.stop()
				.animate({
					width: 0
				}, that.speedOverlay / 2);
			}
			$overlay.children('.wrapper').stop()
			.fadeTo(0, 0);
					
	},
	
	_prepPanel: function() {
		var that = this;
		this.$panels.each(function(){
			var $this = $(this),
					curInd = that.$panels.index($this) + 1,
					$overlay = $this.children(that.overlayClass);
			
			if (curInd % that.panelsRow == 0) {
				$overlay.css({ left: 0 });
			} else {
				$overlay.css({ left: that.panelWidth });
			}
		})
	}
}); 



/*

Use:
new AccordionTabs(config);

config:
{
//mandatory
tabsClass: 'vacancies-jobs',
headerClass: 'tab-header',
contentClass: 'tab-content',

//optional
speed: 1000,
easing: 'easeOutCubic',
autoClose: true
}

*/
var AccordionTabs = Class.extend({
	initialize: function(config) {
		
		
		//Other Vars
		this.tabsClass    = '.' + config.tabsClass,
		this.headerClass  = '.' + config.headerClass,
		this.contentClass = '.' + config.contentClass,
		this.speed  		  = (config.speed ? config.speed : 1000),
		this.easing			  = (config.easing ? config.easing : 'easeOutCubic'),
		//Close siblings auto
		this.autoClose    = (config.easing ? config.autoClose : true);
		
		//All Tabs
		this.$tabs = $(this.tabsClass);
		
		var that = this,
				$allContentDivs = this.$tabs.find(this.contentClass);
		// Set Content Divs Original Height and the Hide them
		$allContentDivs.css('height', 0);
		
		
		this._bindings();
	},
	
	_bindings: function() {
		var that = this;
		this.$tabs.find(this.headerClass).bind('click', function(){
			var $this        = $(this),
					$contentDiv  = $(this).siblings(that.contentClass);
			
			
			if ($this.hasClass('active')){
				//Close
				$contentDiv.animate({
					height: 0
				}, that.speed, that.easing);
				
				$this.removeClass('active');
				
			} else {
				// Dynamic calc Height
				$contentDiv.css('height', 'auto');
				var contentOrigHeight = $contentDiv.innerHeight();
				$contentDiv.css('height', 0);
				
				//Auto close sibling tabs
				if (that.autoClose) {
					var $parentTabs = $this.parents(that.tabsClass).find(that.headerClass).filter('.active');
					
					$parentTabs.trigger('click');
				}
				
				// Open
				$contentDiv.animate({
					height: contentOrigHeight
				}, that.speed, that.easing, function(){
					$contentDiv.height('auto');
				});
				
				$this.addClass('active');
			}
		});
	},
	
	//TEMPORARILY CLOSE ALL TABS TO CALCULATE HEIGHTS FOR EXTERNAL PLUGINS
	closeAll: function() {
		var $allContentDivs = this.$tabs.find(this.contentClass);
		$allContentDivs.css('height', 0);
	}
});

function doFilterFix(elem) {

   // if filter property is just spaces
   // or an opacity filter, then remove the filter style
   elem.css('filter', "alpha(enabled='false')");

}

function doWebkitFix() {
	// WORKAROUND IMAGE UNLOAD IN SAFARI
	if (isWebkit) {
		$win.load(function(){
			$win.scrollTop(1);
		});
	}
}
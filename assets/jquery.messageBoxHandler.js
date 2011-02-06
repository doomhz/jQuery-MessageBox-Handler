/**
* jQuery MessageBox Handler
*
* A simple handler for textareas to show a counter and default text on empty.
*
* What it does:
*
* 1. Adds a default text to a textarea when it's empty
* 2. Counts the number of chars that can be written in the textarea (Twitter style)
* 3. Disables the submit button if the box is empty or the number of chars reached the limit.
*
* @author Dumitru Glavan
* @link http://dumitruglavan.com
* @version 1.0
* @requires jQuery v1.3.2 or later
*
* Examples and documentation at: http://dumitruglavan.com/jquery-messagebox-handler-plugin/
* Official jQuery plugin page: http://plugins.jquery.com/project/messagebox-handler-plugin
* Find source on GitHub: https://github.com/doomhz/jQuery-MessageBox-Handler
*
* Dual licensed under the MIT and GPL licenses:
*   http://www.opensource.org/licenses/mit-license.php
*   http://www.gnu.org/licenses/gpl.html
*
*/
;(function ($) {
	$.fn.messageBoxHandler = function (options) {
		this.config = {maxUpdateChars:'140',
					   messageBody:null,
					   submitBtn:null,
					   leftCharsCounterClass:null,
					   counterErrorClass:'counter-error-length',
					   disabledClass:'disabled',
					   emptyMessageText:''
					  };

		$.extend(this.config, options);

		this.counter = (this.config.leftCharsCounterClass && $(this.config.leftCharsCounterClass, this)) || $('span:first', this);
		this.submitBtn = (this.config.submitBtn && $(this.config.submitBtn)) || $('button[type="submit"]:first', this);
		this.messageBody = (this.config.messageBody && $(this.config.messageBody)) || $('textarea:first', this);
		this.defaultEmptyMessage = this.messageBody.attr('title') || this.config.emptyMessageText;

		var self = this;

		if (this.messageBody.length) {
			//Handle focus/blur/keyup message form events
			//count left chars and disable button
			this.messageBody.focus(function(){
				if(self.messageBody.val() == self.defaultEmptyMessage){
					self.messageBody.val('');
				}
			}).blur(function(){
				if(self.messageBody.val() == self.defaultEmptyMessage || self.messageBody.val() == ''){
					self.messageBody.val(self.defaultEmptyMessage);
				}
			}).keyup(function () {
				var messageLenght = self.messageBody.val().length;
				var leftChars = self.config.maxUpdateChars - self.messageBody.val().length;

				$(self.counter).text(leftChars);
				if((messageLenght > 0) && (leftChars >= 0)){
					self.submitBtn.attr('disabled', '').removeClass(self.config.disabledClass);
				} else {
					self.submitBtn.attr('disabled', 'disabled').addClass(self.config.disabledClass);
				}
				if (leftChars < 0) {
					self.counter.addClass(self.config.counterErrorClass);
				} else {
					self.counter.removeClass(self.config.counterErrorClass);
				}
			});

			//Disable Update Button by default
			self.submitBtn.attr('disabled', 'disabled').addClass(self.config.disabledClass);
		}
	}
})(jQuery)
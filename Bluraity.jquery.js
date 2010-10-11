/*
The MIT License

Copyright (c) 2010 Zohaib Sibt-e-Hassan(MaXPert)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

var BlurCom = {
	coords: function(elm){
		var ret = {};
		$.extend(ret, $(elm).offset());
		$.extend(ret, {width: $(elm).width()});
		$.extend(ret, {height: $(elm).height()});
		return ret;
	},
	duplicate: function(elm, recursive){
		return $(elm).clone();
	},
	setStyles: function(elm, style){
		$(elm).css(style);
	},
	getStyle: function(elm, style){
		return $(elm).css(style);
	},
	ext: function(ob1, ob2){
		var ret = {};
		$.extend(ret, ob1);
		$.extend(ret, ob2);
		return ret;
	},
	append: function(tar, chld){
		$(chld).prependTo($(tar));
	},
	destroy: function(chld){
		$(chld).remove();
	}
};

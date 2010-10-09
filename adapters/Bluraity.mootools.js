var BlurCom = {
	coords: function(elm){
		return $(elm).getCoordinates();
	},
	duplicate: function(elm, recursive){
		return $(elm).clone(recursive, true);
	},
	setStyles: function(elm, style){
		$(elm).setStyles(style);
	},
	getStyle: function(elm, style){
		return $(elm).getStyle(style);
	},
	ext: function(ob1, ob2){
		var ret = {};
		$extend(ret, ob1);
		$extend(ret, ob2);
		return ret;
	},
	append: function(tar, chld){
		$(chld).inject($(tar), 'top');
	},
	destroy: function(chld){
		$(chld).dispose();
	}
};

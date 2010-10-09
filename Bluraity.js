var Bluraity = (function(){
	
	//Positions of onion layers on top of parent
	var onionLayer = [{
            x: -1,
            y: 0},
        {
            x: -1,
            y: -1},
        {
            x: 0,
            y: -1
        },
        {
            x: 1,
            y: -1
        },{
            x: 1,
            y: 0
        },{
            x: 1,
            y: 1
        },{
            x: 0,
            y: 1
        },{
            x: -1,
            y: 1
        }];

	var animateAlpha = function(elements, start, end, dur, opts){
		var delta = end - start,
			conf = opts || {},
			delayStep = conf.timeout || 20,
			stTm = (new Date).getTime(),
			edTm = stTm+dur,
			fader = function() {
				var cTm = (new Date).getTime();
				if (cTm > edTm) {
					for(var i=0;i<elements.length;i++){
						BlurCom.setStyles(elements[i], {'opacity': end});
					}
					if(conf.complete){ conf.complete(); }
					return;
				}
				var pos = (cTm - stTm)/dur;
				for(var i=0;i<elements.length;i++){
					BlurCom.setStyles(elements[i], {'opacity': start + pos*delta});
				}
				window.setTimeout(fader, delayStep);
			};
		
		window.setTimeout(fader, delayStep);
	};
        
    var generateClones = function(elm, amount, offset){
		var clones = [],
			amnt = amount * 8,
			pos = BlurCom.coords(elm),
			radius = offset || 7;
		
		for (var i = 0; i < amnt; i++) {
			clones[i] = BlurCom.duplicate(elm, true);

			BlurCom.setStyles(clones[i], {
				position: "absolute",
				top: pos.top + onionLayer[i%8].y*(radius+i>>3),
				left: pos.left + onionLayer[i%8].x*(radius+i>>3),
				width: pos.width,
				height: pos.height,
				opacity: 0
			});
		}
		
		return clones;
	};
	
	var Bluraity = function(targ, options){
		this.target = targ;
		this.conf = BlurCom.ext(options, {amount: 1, offset: 6, duration: 1000, interval: 20});
		
	};

	Bluraity.prototype = {
		blur: function(){
			if( this.clones ){ return false; }
			this.clones = generateClones(this.target, this.conf.amount, this.conf.offset);
			for(var i=0;i<this.clones.length;i++){
				BlurCom.append(document.body, this.clones[i]);
			}
			animateAlpha(this.clones, 
					0, 
					1/this.clones.length, 
					this.conf.duration, 
					{
						timeout: this.conf.interval,
						complete: this.conf.outComplete
					});
			this.oldOpacity = BlurCom.getStyle(this.target, 'opacity');
			
			if(this.oldOpcaity === null || this.oldOpcaity === undefined){
				this.oldOpcaity = 1;
			}
			
			animateAlpha([this.target],
						this.oldOpacity,
						1/this.clones.length,
						this.conf.duration, 
						{
							timeout: this.conf.interval
						});
			return true;
		},
		
		unblur: function(){
			if( !this.clones ){ return false; }
			var me = this;
			
			animateAlpha(this.clones, 
					1/this.clones.length, 
					0, 
					this.conf.duration, 
					{
						timeout: this.conf.interval,
						complete: function(){
							for(var i=0; i<me.clones.length; i++){
								BlurCom.destroy(me.clones[i]);
							}
							me.conf.inComplete && me.conf.inComplete();
							
							delete me.clones;
						}
					});
			
			animateAlpha([this.target],
						1/this.clones.length,
						this.oldOpacity,
						this.conf.duration, 
						{
							timeout: this.conf.interval
						});
		},
		
		isBlurred:  function(){
		}
	};

	return Bluraity;

})();

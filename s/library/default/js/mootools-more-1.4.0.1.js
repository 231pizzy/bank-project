// MooTools: the javascript framework.
// Load this file's selection again by visiting: https://mootools.net/more/f3602a6491514a1ca90ea32b9802db49 
// Or build this file again with packager using: packager build More/Number.Format More/String.Extras More/String.QueryString More/Element.Measure More/Fx.Scroll More/Fx.Slide More/Drag More/Drag.Move More/Slider More/Tips
/*
---
copyrights:
  - [MooTools](https://mootools.net)

licenses:
  - [MIT License](https://mootools.net/license.txt)
...
*/
MooTools.More={version:"1.4.0.1",build:"a4244edf2aa97ac8a196fc96082dd35af1abab87"};(function(){var b=function(c){return c!=null;};var a=Object.prototype.hasOwnProperty;
Object.extend({getFromPath:function(e,f){if(typeof f=="string"){f=f.split(".");}for(var d=0,c=f.length;d<c;d++){if(a.call(e,f[d])){e=e[f[d]];}else{return null;
}}return e;},cleanValues:function(c,e){e=e||b;for(var d in c){if(!e(c[d])){delete c[d];}}return c;},erase:function(c,d){if(a.call(c,d)){delete c[d];}return c;
},run:function(d){var c=Array.slice(arguments,1);for(var e in d){if(d[e].apply){d[e].apply(d,c);}}return d;}});})();(function(){var b=null,a={},d={};var c=function(f){if(instanceOf(f,e.Set)){return f;
}else{return a[f];}};var e=this.Locale={define:function(f,j,h,i){var g;if(instanceOf(f,e.Set)){g=f.name;if(g){a[g]=f;}}else{g=f;if(!a[g]){a[g]=new e.Set(g);
}f=a[g];}if(j){f.define(j,h,i);}if(!b){b=f;}return f;},use:function(f){f=c(f);if(f){b=f;this.fireEvent("change",f);}return this;},getCurrent:function(){return b;
},get:function(g,f){return(b)?b.get(g,f):"";},inherit:function(f,g,h){f=c(f);if(f){f.inherit(g,h);}return this;},list:function(){return Object.keys(a);
}};Object.append(e,new Events);e.Set=new Class({sets:{},inherits:{locales:[],sets:{}},initialize:function(f){this.name=f||"";},define:function(i,g,h){var f=this.sets[i];
if(!f){f={};}if(g){if(typeOf(g)=="object"){f=Object.merge(f,g);}else{f[g]=h;}}this.sets[i]=f;return this;},get:function(r,j,q){var p=Object.getFromPath(this.sets,r);
if(p!=null){var m=typeOf(p);if(m=="function"){p=p.apply(null,Array.from(j));}else{if(m=="object"){p=Object.clone(p);}}return p;}var h=r.indexOf("."),o=h<0?r:r.substr(0,h),k=(this.inherits.sets[o]||[]).combine(this.inherits.locales).include("en-US");
if(!q){q=[];}for(var g=0,f=k.length;g<f;g++){if(q.contains(k[g])){continue;}q.include(k[g]);var n=a[k[g]];if(!n){continue;}p=n.get(r,j,q);if(p!=null){return p;
}}return"";},inherit:function(g,h){g=Array.from(g);if(h&&!this.inherits.sets[h]){this.inherits.sets[h]=[];}var f=g.length;while(f--){(h?this.inherits.sets[h]:this.inherits.locales).unshift(g[f]);
}return this;}});})();Locale.define("en-US","Number",{decimal:".",group:",",currency:{prefix:"$ "}});Number.implement({format:function(q){var n=this;q=q?Object.clone(q):{};
var a=function(i){if(q[i]!=null){return q[i];}return Locale.get("Number."+i);};var f=n<0,h=a("decimal"),k=a("precision"),o=a("group"),c=a("decimals");if(f){var e=a("negative")||{};
if(e.prefix==null&&e.suffix==null){e.prefix="-";}["prefix","suffix"].each(function(i){if(e[i]){q[i]=a(i)+e[i];}});n=-n;}var l=a("prefix"),p=a("suffix");
if(c!==""&&c>=0&&c<=20){n=n.toFixed(c);}if(k>=1&&k<=21){n=(+n).toPrecision(k);}n+="";var m;if(a("scientific")===false&&n.indexOf("e")>-1){var j=n.split("e"),b=+j[1];
n=j[0].replace(".","");if(b<0){b=-b-1;m=j[0].indexOf(".");if(m>-1){b-=m-1;}while(b--){n="0"+n;}n="0."+n;}else{m=j[0].lastIndexOf(".");if(m>-1){b-=j[0].length-m-1;
}while(b--){n+="0";}}}if(h!="."){n=n.replace(".",h);}if(o){m=n.lastIndexOf(h);m=(m>-1)?m:n.length;var d=n.substring(m),g=m;while(g--){if((m-g-1)%3==0&&g!=(m-1)){d=o+d;
}d=n.charAt(g)+d;}n=d;}if(l){n=l+n;}if(p){n+=p;}return n;},formatCurrency:function(b){var a=Locale.get("Number.currency")||{};if(a.scientific==null){a.scientific=false;
}a.decimals=b!=null?b:(a.decimals==null?2:a.decimals);return this.format(a);},formatPercentage:function(b){var a=Locale.get("Number.percentage")||{};if(a.suffix==null){a.suffix="%";
}a.decimals=b!=null?b:(a.decimals==null?2:a.decimals);return this.format(a);}});(function(){var c={a:/[àáâãäåăą]/g,A:/[ÀÁÂÃÄÅĂĄ]/g,c:/[ćčç]/g,C:/[ĆČÇ]/g,d:/[ďđ]/g,D:/[ĎÐ]/g,e:/[èéêëěę]/g,E:/[ÈÉÊËĚĘ]/g,g:/[ğ]/g,G:/[Ğ]/g,i:/[ìíîï]/g,I:/[ÌÍÎÏ]/g,l:/[ĺľł]/g,L:/[ĹĽŁ]/g,n:/[ñňń]/g,N:/[ÑŇŃ]/g,o:/[òóôõöøő]/g,O:/[ÒÓÔÕÖØ]/g,r:/[řŕ]/g,R:/[ŘŔ]/g,s:/[ššş]/g,S:/[ŠŞŚ]/g,t:/[ťţ]/g,T:/[ŤŢ]/g,ue:/[ü]/g,UE:/[Ü]/g,u:/[ùúûůµ]/g,U:/[ÙÚÛŮ]/g,y:/[ÿý]/g,Y:/[ŸÝ]/g,z:/[žźż]/g,Z:/[ŽŹŻ]/g,th:/[þ]/g,TH:/[Þ]/g,dh:/[ð]/g,DH:/[Ð]/g,ss:/[ß]/g,oe:/[œ]/g,OE:/[Œ]/g,ae:/[æ]/g,AE:/[Æ]/g},b={" ":/[\xa0\u2002\u2003\u2009]/g,"*":/[\xb7]/g,"'":/[\u2018\u2019]/g,'"':/[\u201c\u201d]/g,"...":/[\u2026]/g,"-":/[\u2013]/g,"&raquo;":/[\uFFFD]/g};
var a=function(f,h){var e=f,g;for(g in h){e=e.replace(h[g],g);}return e;};var d=function(e,g){e=e||"";var h=g?"<"+e+"(?!\\w)[^>]*>([\\s\\S]*?)</"+e+"(?!\\w)>":"</?"+e+"([^>]+)?>",f=new RegExp(h,"gi");
return f;};String.implement({standardize:function(){return a(this,c);},repeat:function(e){return new Array(e+1).join(this);},pad:function(e,h,g){if(this.length>=e){return this;
}var f=(h==null?" ":""+h).repeat(e-this.length).substr(0,e-this.length);if(!g||g=="right"){return this+f;}if(g=="left"){return f+this;}return f.substr(0,(f.length/2).floor())+this+f.substr(0,(f.length/2).ceil());
},getTags:function(e,f){return this.match(d(e,f))||[];},stripTags:function(e,f){return this.replace(d(e,f),"");},tidy:function(){return a(this,b);},truncate:function(e,f,i){var h=this;
if(f==null&&arguments.length==1){f="…";}if(h.length>e){h=h.substring(0,e);if(i){var g=h.lastIndexOf(i);if(g!=-1){h=h.substr(0,g);}}if(f){h+=f;}}return h;
}});})();String.implement({parseQueryString:function(d,a){if(d==null){d=true;}if(a==null){a=true;}var c=this.split(/[&;]/),b={};if(!c.length){return b;
}c.each(function(i){var e=i.indexOf("=")+1,g=e?i.substr(e):"",f=e?i.substr(0,e-1).match(/([^\]\[]+|(\B)(?=\]))/g):[i],h=b;if(!f){return;}if(a){g=decodeURIComponent(g);
}f.each(function(k,j){if(d){k=decodeURIComponent(k);}var l=h[k];if(j<f.length-1){h=h[k]=l||{};}else{if(typeOf(l)=="array"){l.push(g);}else{h[k]=l!=null?[l,g]:g;
}}});});return b;},cleanQueryString:function(a){return this.split("&").filter(function(e){var b=e.indexOf("="),c=b<0?"":e.substr(0,b),d=e.substr(b+1);return a?a.call(null,c,d):(d||d===0);
}).join("&");}});(function(){var b=function(e,d){var f=[];Object.each(d,function(g){Object.each(g,function(h){e.each(function(i){f.push(i+"-"+h+(i=="border"?"-width":""));
});});});return f;};var c=function(f,e){var d=0;Object.each(e,function(h,g){if(g.test(f)){d=d+h.toInt();}});return d;};var a=function(d){return !!(!d||d.offsetHeight||d.offsetWidth);
};Element.implement({measure:function(h){if(a(this)){return h.call(this);}var g=this.getParent(),e=[];while(!a(g)&&g!=document.body){e.push(g.expose());
g=g.getParent();}var f=this.expose(),d=h.call(this);f();e.each(function(i){i();});return d;},expose:function(){if(this.getStyle("display")!="none"){return function(){};
}var d=this.style.cssText;this.setStyles({display:"block",position:"absolute",visibility:"hidden"});return function(){this.style.cssText=d;}.bind(this);
},getDimensions:function(d){d=Object.merge({computeSize:false},d);var i={x:0,y:0};var h=function(j,e){return(e.computeSize)?j.getComputedSize(e):j.getSize();
};var f=this.getParent("body");if(f&&this.getStyle("display")=="none"){i=this.measure(function(){return h(this,d);});}else{if(f){try{i=h(this,d);}catch(g){}}}return Object.append(i,(i.x||i.x===0)?{width:i.x,height:i.y}:{x:i.width,y:i.height});
},getComputedSize:function(d){d=Object.merge({styles:["padding","border"],planes:{height:["top","bottom"],width:["left","right"]},mode:"both"},d);var g={},e={width:0,height:0},f;
if(d.mode=="vertical"){delete e.width;delete d.planes.width;}else{if(d.mode=="horizontal"){delete e.height;delete d.planes.height;}}b(d.styles,d.planes).each(function(h){g[h]=this.getStyle(h).toInt();
},this);Object.each(d.planes,function(i,h){var k=h.capitalize(),j=this.getStyle(h);if(j=="auto"&&!f){f=this.getDimensions();}j=g[h]=(j=="auto")?f[h]:j.toInt();
e["total"+k]=j;i.each(function(m){var l=c(m,g);e["computed"+m.capitalize()]=l;e["total"+k]+=l;});},this);return Object.append(e,g);}});})();(function(){Fx.Scroll=new Class({Extends:Fx,options:{offset:{x:0,y:0},wheelStops:true},initialize:function(c,b){this.element=this.subject=document.id(c);
this.parent(b);if(typeOf(this.element)!="element"){this.element=document.id(this.element.getDocument().body);}if(this.options.wheelStops){var d=this.element,e=this.cancel.pass(false,this);
this.addEvent("start",function(){d.addEvent("mousewheel",e);},true);this.addEvent("complete",function(){d.removeEvent("mousewheel",e);},true);}},set:function(){var b=Array.flatten(arguments);
if(Browser.firefox){b=[Math.round(b[0]),Math.round(b[1])];}this.element.scrollTo(b[0],b[1]);return this;},compute:function(d,c,b){return[0,1].map(function(e){return Fx.compute(d[e],c[e],b);
});},start:function(c,d){if(!this.check(c,d)){return this;}var b=this.element.getScroll();return this.parent([b.x,b.y],[c,d]);},calculateScroll:function(g,f){var d=this.element,b=d.getScrollSize(),h=d.getScroll(),j=d.getSize(),c=this.options.offset,i={x:g,y:f};
for(var e in i){if(!i[e]&&i[e]!==0){i[e]=h[e];}if(typeOf(i[e])!="number"){i[e]=b[e]-j[e];}i[e]+=c[e];}return[i.x,i.y];},toTop:function(){return this.start.apply(this,this.calculateScroll(false,0));
},toLeft:function(){return this.start.apply(this,this.calculateScroll(0,false));},toRight:function(){return this.start.apply(this,this.calculateScroll("right",false));
},toBottom:function(){return this.start.apply(this,this.calculateScroll(false,"bottom"));},toElement:function(d,e){e=e?Array.from(e):["x","y"];var c=a(this.element)?{x:0,y:0}:this.element.getScroll();
var b=Object.map(document.id(d).getPosition(this.element),function(g,f){return e.contains(f)?g+c[f]:false;});return this.start.apply(this,this.calculateScroll(b.x,b.y));
},toElementEdge:function(d,g,e){g=g?Array.from(g):["x","y"];d=document.id(d);var i={},f=d.getPosition(this.element),j=d.getSize(),h=this.element.getScroll(),b=this.element.getSize(),c={x:f.x+j.x,y:f.y+j.y};
["x","y"].each(function(k){if(g.contains(k)){if(c[k]>h[k]+b[k]){i[k]=c[k]-b[k];}if(f[k]<h[k]){i[k]=f[k];}}if(i[k]==null){i[k]=h[k];}if(e&&e[k]){i[k]=i[k]+e[k];
}},this);if(i.x!=h.x||i.y!=h.y){this.start(i.x,i.y);}return this;},toElementCenter:function(e,f,h){f=f?Array.from(f):["x","y"];e=document.id(e);var i={},c=e.getPosition(this.element),d=e.getSize(),b=this.element.getScroll(),g=this.element.getSize();
["x","y"].each(function(j){if(f.contains(j)){i[j]=c[j]-(g[j]-d[j])/2;}if(i[j]==null){i[j]=b[j];}if(h&&h[j]){i[j]=i[j]+h[j];}},this);if(i.x!=b.x||i.y!=b.y){this.start(i.x,i.y);
}return this;}});function a(b){return(/^(?:body|html)$/i).test(b.tagName);}})();Fx.Slide=new Class({Extends:Fx,options:{mode:"vertical",wrapper:false,hideOverflow:true,resetHeight:false},initialize:function(b,a){b=this.element=this.subject=document.id(b);
this.parent(a);a=this.options;var d=b.retrieve("wrapper"),c=b.getStyles("margin","position","overflow");if(a.hideOverflow){c=Object.append(c,{overflow:"hidden"});
}if(a.wrapper){d=document.id(a.wrapper).setStyles(c);}if(!d){d=new Element("div",{styles:c}).wraps(b);}b.store("wrapper",d).setStyle("margin",0);if(b.getStyle("overflow")=="visible"){b.setStyle("overflow","hidden");
}this.now=[];this.open=true;this.wrapper=d;this.addEvent("complete",function(){this.open=(d["offset"+this.layout.capitalize()]!=0);if(this.open&&this.options.resetHeight){d.setStyle("height","");
}},true);},vertical:function(){this.margin="margin-top";this.layout="height";this.offset=this.element.offsetHeight;},horizontal:function(){this.margin="margin-left";
this.layout="width";this.offset=this.element.offsetWidth;},set:function(a){this.element.setStyle(this.margin,a[0]);this.wrapper.setStyle(this.layout,a[1]);
return this;},compute:function(c,b,a){return[0,1].map(function(d){return Fx.compute(c[d],b[d],a);});},start:function(b,e){if(!this.check(b,e)){return this;
}this[e||this.options.mode]();var d=this.element.getStyle(this.margin).toInt(),c=this.wrapper.getStyle(this.layout).toInt(),a=[[d,c],[0,this.offset]],g=[[d,c],[-this.offset,0]],f;
switch(b){case"in":f=a;break;case"out":f=g;break;case"toggle":f=(c==0)?a:g;}return this.parent(f[0],f[1]);},slideIn:function(a){return this.start("in",a);
},slideOut:function(a){return this.start("out",a);},hide:function(a){this[a||this.options.mode]();this.open=false;return this.set([-this.offset,0]);},show:function(a){this[a||this.options.mode]();
this.open=true;return this.set([0,this.offset]);},toggle:function(a){return this.start("toggle",a);}});Element.Properties.slide={set:function(a){this.get("slide").cancel().setOptions(a);
return this;},get:function(){var a=this.retrieve("slide");if(!a){a=new Fx.Slide(this,{link:"cancel"});this.store("slide",a);}return a;}};Element.implement({slide:function(d,e){d=d||"toggle";
var b=this.get("slide"),a;switch(d){case"hide":b.hide(e);break;case"show":b.show(e);break;case"toggle":var c=this.retrieve("slide:flag",b.open);b[c?"slideOut":"slideIn"](e);
this.store("slide:flag",!c);a=true;break;default:b.start(d,e);}if(!a){this.eliminate("slide:flag");}return this;}});var Drag=new Class({Implements:[Events,Options],options:{snap:6,unit:"px",grid:false,style:true,limit:false,handle:false,invert:false,preventDefault:false,stopPropagation:false,modifiers:{x:"left",y:"top"}},initialize:function(){var b=Array.link(arguments,{options:Type.isObject,element:function(c){return c!=null;
}});this.element=document.id(b.element);this.document=this.element.getDocument();this.setOptions(b.options||{});var a=typeOf(this.options.handle);this.handles=((a=="array"||a=="collection")?$$(this.options.handle):document.id(this.options.handle))||this.element;
this.mouse={now:{},pos:{}};this.value={start:{},now:{}};this.selection=(Browser.ie)?"selectstart":"mousedown";if(Browser.ie&&!Drag.ondragstartFixed){document.ondragstart=Function.from(false);
Drag.ondragstartFixed=true;}this.bound={start:this.start.bind(this),check:this.check.bind(this),drag:this.drag.bind(this),stop:this.stop.bind(this),cancel:this.cancel.bind(this),eventStop:Function.from(false)};
this.attach();},attach:function(){this.handles.addEvent("mousedown",this.bound.start);return this;},detach:function(){this.handles.removeEvent("mousedown",this.bound.start);
return this;},start:function(a){var j=this.options;if(a.rightClick){return;}if(j.preventDefault){a.preventDefault();}if(j.stopPropagation){a.stopPropagation();
}this.mouse.start=a.page;this.fireEvent("beforeStart",this.element);var c=j.limit;this.limit={x:[],y:[]};var e,g;for(e in j.modifiers){if(!j.modifiers[e]){continue;
}var b=this.element.getStyle(j.modifiers[e]);if(b&&!b.match(/px$/)){if(!g){g=this.element.getCoordinates(this.element.getOffsetParent());}b=g[j.modifiers[e]];
}if(j.style){this.value.now[e]=(b||0).toInt();}else{this.value.now[e]=this.element[j.modifiers[e]];}if(j.invert){this.value.now[e]*=-1;}this.mouse.pos[e]=a.page[e]-this.value.now[e];
if(c&&c[e]){var d=2;while(d--){var f=c[e][d];if(f||f===0){this.limit[e][d]=(typeof f=="function")?f():f;}}}}if(typeOf(this.options.grid)=="number"){this.options.grid={x:this.options.grid,y:this.options.grid};
}var h={mousemove:this.bound.check,mouseup:this.bound.cancel};h[this.selection]=this.bound.eventStop;this.document.addEvents(h);},check:function(a){if(this.options.preventDefault){a.preventDefault();
}var b=Math.round(Math.sqrt(Math.pow(a.page.x-this.mouse.start.x,2)+Math.pow(a.page.y-this.mouse.start.y,2)));if(b>this.options.snap){this.cancel();this.document.addEvents({mousemove:this.bound.drag,mouseup:this.bound.stop});
this.fireEvent("start",[this.element,a]).fireEvent("snap",this.element);}},drag:function(b){var a=this.options;if(a.preventDefault){b.preventDefault();
}this.mouse.now=b.page;for(var c in a.modifiers){if(!a.modifiers[c]){continue;}this.value.now[c]=this.mouse.now[c]-this.mouse.pos[c];if(a.invert){this.value.now[c]*=-1;
}if(a.limit&&this.limit[c]){if((this.limit[c][1]||this.limit[c][1]===0)&&(this.value.now[c]>this.limit[c][1])){this.value.now[c]=this.limit[c][1];}else{if((this.limit[c][0]||this.limit[c][0]===0)&&(this.value.now[c]<this.limit[c][0])){this.value.now[c]=this.limit[c][0];
}}}if(a.grid[c]){this.value.now[c]-=((this.value.now[c]-(this.limit[c][0]||0))%a.grid[c]);}if(a.style){this.element.setStyle(a.modifiers[c],this.value.now[c]+a.unit);
}else{this.element[a.modifiers[c]]=this.value.now[c];}}this.fireEvent("drag",[this.element,b]);},cancel:function(a){this.document.removeEvents({mousemove:this.bound.check,mouseup:this.bound.cancel});
if(a){this.document.removeEvent(this.selection,this.bound.eventStop);this.fireEvent("cancel",this.element);}},stop:function(b){var a={mousemove:this.bound.drag,mouseup:this.bound.stop};
a[this.selection]=this.bound.eventStop;this.document.removeEvents(a);if(b){this.fireEvent("complete",[this.element,b]);}}});Element.implement({makeResizable:function(a){var b=new Drag(this,Object.merge({modifiers:{x:"width",y:"height"}},a));
this.store("resizer",b);return b.addEvent("drag",function(){this.fireEvent("resize",b);}.bind(this));}});Drag.Move=new Class({Extends:Drag,options:{droppables:[],container:false,precalculate:false,includeMargins:true,checkDroppables:true},initialize:function(b,a){this.parent(b,a);
b=this.element;this.droppables=$$(this.options.droppables);this.container=document.id(this.options.container);if(this.container&&typeOf(this.container)!="element"){this.container=document.id(this.container.getDocument().body);
}if(this.options.style){if(this.options.modifiers.x=="left"&&this.options.modifiers.y=="top"){var c=b.getOffsetParent(),d=b.getStyles("left","top");if(c&&(d.left=="auto"||d.top=="auto")){b.setPosition(b.getPosition(c));
}}if(b.getStyle("position")=="static"){b.setStyle("position","absolute");}}this.addEvent("start",this.checkDroppables,true);this.overed=null;},start:function(a){if(this.container){this.options.limit=this.calculateLimit();
}if(this.options.precalculate){this.positions=this.droppables.map(function(b){return b.getCoordinates();});}this.parent(a);},calculateLimit:function(){var j=this.element,e=this.container,d=document.id(j.getOffsetParent())||document.body,h=e.getCoordinates(d),c={},b={},k={},g={},m={};
["top","right","bottom","left"].each(function(q){c[q]=j.getStyle("margin-"+q).toInt();b[q]=j.getStyle("border-"+q).toInt();k[q]=e.getStyle("margin-"+q).toInt();
g[q]=e.getStyle("border-"+q).toInt();m[q]=d.getStyle("padding-"+q).toInt();},this);var f=j.offsetWidth+c.left+c.right,p=j.offsetHeight+c.top+c.bottom,i=0,l=0,o=h.right-g.right-f,a=h.bottom-g.bottom-p;
if(this.options.includeMargins){i+=c.left;l+=c.top;}else{o+=c.right;a+=c.bottom;}if(j.getStyle("position")=="relative"){var n=j.getCoordinates(d);n.left-=j.getStyle("left").toInt();
n.top-=j.getStyle("top").toInt();i-=n.left;l-=n.top;if(e.getStyle("position")!="relative"){i+=g.left;l+=g.top;}o+=c.left-n.left;a+=c.top-n.top;if(e!=d){i+=k.left+m.left;
l+=((Browser.ie6||Browser.ie7)?0:k.top)+m.top;}}else{i-=c.left;l-=c.top;if(e!=d){i+=h.left+g.left;l+=h.top+g.top;}}return{x:[i,o],y:[l,a]};},getDroppableCoordinates:function(c){var b=c.getCoordinates();
if(c.getStyle("position")=="fixed"){var a=window.getScroll();b.left+=a.x;b.right+=a.x;b.top+=a.y;b.bottom+=a.y;}return b;},checkDroppables:function(){var a=this.droppables.filter(function(d,c){d=this.positions?this.positions[c]:this.getDroppableCoordinates(d);
var b=this.mouse.now;return(b.x>d.left&&b.x<d.right&&b.y<d.bottom&&b.y>d.top);},this).getLast();if(this.overed!=a){if(this.overed){this.fireEvent("leave",[this.element,this.overed]);
}if(a){this.fireEvent("enter",[this.element,a]);}this.overed=a;}},drag:function(a){this.parent(a);if(this.options.checkDroppables&&this.droppables.length){this.checkDroppables();
}},stop:function(a){this.checkDroppables();this.fireEvent("drop",[this.element,this.overed,a]);this.overed=null;return this.parent(a);}});Element.implement({makeDraggable:function(a){var b=new Drag.Move(this,a);
this.store("dragger",b);return b;}});Class.Mutators.Binds=function(a){if(!this.prototype.initialize){this.implement("initialize",function(){});}return Array.from(a).concat(this.prototype.Binds||[]);
};Class.Mutators.initialize=function(a){return function(){Array.from(this.Binds).each(function(b){var c=this[b];if(c){this[b]=c.bind(this);}},this);return a.apply(this,arguments);
};};var Slider=new Class({Implements:[Events,Options],Binds:["clickedElement","draggedKnob","scrolledElement"],options:{onTick:function(a){this.setKnobPosition(a);
},initialStep:0,snap:false,offset:0,range:false,wheel:false,steps:100,mode:"horizontal"},initialize:function(f,a,e){this.setOptions(e);e=this.options;this.element=document.id(f);
a=this.knob=document.id(a);this.previousChange=this.previousEnd=this.step=-1;var b={},d={x:false,y:false};switch(e.mode){case"vertical":this.axis="y";this.property="top";
this.offset="offsetHeight";break;case"horizontal":this.axis="x";this.property="left";this.offset="offsetWidth";}this.setSliderDimensions();this.setRange(e.range);
if(a.getStyle("position")=="static"){a.setStyle("position","relative");}a.setStyle(this.property,-e.offset);d[this.axis]=this.property;b[this.axis]=[-e.offset,this.full-e.offset];
var c={snap:0,limit:b,modifiers:d,onDrag:this.draggedKnob,onStart:this.draggedKnob,onBeforeStart:(function(){this.isDragging=true;}).bind(this),onCancel:function(){this.isDragging=false;
}.bind(this),onComplete:function(){this.isDragging=false;this.draggedKnob();this.end();}.bind(this)};if(e.snap){this.setSnap(c);}this.drag=new Drag(a,c);
this.attach();if(e.initialStep!=null){this.set(e.initialStep);}},attach:function(){this.element.addEvent("mousedown",this.clickedElement);if(this.options.wheel){this.element.addEvent("mousewheel",this.scrolledElement);
}this.drag.attach();return this;},detach:function(){this.element.removeEvent("mousedown",this.clickedElement).removeEvent("mousewheel",this.scrolledElement);
this.drag.detach();return this;},autosize:function(){this.setSliderDimensions().setKnobPosition(this.toPosition(this.step));this.drag.options.limit[this.axis]=[-this.options.offset,this.full-this.options.offset];
if(this.options.snap){this.setSnap();}return this;},setSnap:function(a){if(!a){a=this.drag.options;}a.grid=Math.ceil(this.stepWidth);a.limit[this.axis][1]=this.full;
return this;},setKnobPosition:function(a){if(this.options.snap){a=this.toPosition(this.step);}this.knob.setStyle(this.property,a);return this;},setSliderDimensions:function(){this.full=this.element.measure(function(){this.half=this.knob[this.offset]/2;
return this.element[this.offset]-this.knob[this.offset]+(this.options.offset*2);}.bind(this));return this;},set:function(a){if(!((this.range>0)^(a<this.min))){a=this.min;
}if(!((this.range>0)^(a>this.max))){a=this.max;}this.step=Math.round(a);return this.checkStep().fireEvent("tick",this.toPosition(this.step)).end();},setRange:function(a,b){this.min=Array.pick([a[0],0]);
this.max=Array.pick([a[1],this.options.steps]);this.range=this.max-this.min;this.steps=this.options.steps||this.full;this.stepSize=Math.abs(this.range)/this.steps;
this.stepWidth=this.stepSize*this.full/Math.abs(this.range);if(a){this.set(Array.pick([b,this.step]).floor(this.min).max(this.max));}return this;},clickedElement:function(c){if(this.isDragging||c.target==this.knob){return;
}var b=this.range<0?-1:1,a=c.page[this.axis]-this.element.getPosition()[this.axis]-this.half;a=a.limit(-this.options.offset,this.full-this.options.offset);
this.step=Math.round(this.min+b*this.toStep(a));this.checkStep().fireEvent("tick",a).end();},scrolledElement:function(a){var b=(this.options.mode=="horizontal")?(a.wheel<0):(a.wheel>0);
this.set(this.step+(b?-1:1)*this.stepSize);a.stop();},draggedKnob:function(){var b=this.range<0?-1:1,a=this.drag.value.now[this.axis];a=a.limit(-this.options.offset,this.full-this.options.offset);
this.step=Math.round(this.min+b*this.toStep(a));this.checkStep();},checkStep:function(){var a=this.step;if(this.previousChange!=a){this.previousChange=a;
this.fireEvent("change",a);}return this;},end:function(){var a=this.step;if(this.previousEnd!==a){this.previousEnd=a;this.fireEvent("complete",a+"");}return this;
},toStep:function(a){var b=(a+this.options.offset)*this.stepSize/this.full*this.steps;return this.options.steps?Math.round(b-=b%this.stepSize):b;},toPosition:function(a){return(this.full*Math.abs(this.min-a))/(this.steps*this.stepSize)-this.options.offset;
}});(function(){var a=function(c,b){return(c)?(typeOf(c)=="function"?c(b):b.get(c)):"";};this.Tips=new Class({Implements:[Events,Options],options:{onShow:function(){this.tip.setStyle("display","block");
},onHide:function(){this.tip.setStyle("display","none");},title:"title",text:function(b){return b.get("rel")||b.get("href");},showDelay:100,hideDelay:100,className:"tip-wrap",offset:{x:16,y:16},windowPadding:{x:0,y:0},fixed:false,waiAria:true},initialize:function(){var b=Array.link(arguments,{options:Type.isObject,elements:function(c){return c!=null;
}});this.setOptions(b.options);if(b.elements){this.attach(b.elements);}this.container=new Element("div",{"class":"tip"});if(this.options.id){this.container.set("id",this.options.id);
if(this.options.waiAria){this.attachWaiAria();}}},toElement:function(){if(this.tip){return this.tip;}this.tip=new Element("div",{"class":this.options.className,styles:{position:"absolute",top:0,left:0}}).adopt(new Element("div",{"class":"tip-top"}),this.container,new Element("div",{"class":"tip-bottom"}));
return this.tip;},attachWaiAria:function(){var b=this.options.id;this.container.set("role","tooltip");if(!this.waiAria){this.waiAria={show:function(c){if(b){c.set("aria-describedby",b);
}this.container.set("aria-hidden","false");},hide:function(c){if(b){c.erase("aria-describedby");}this.container.set("aria-hidden","true");}};}this.addEvents(this.waiAria);
},detachWaiAria:function(){if(this.waiAria){this.container.erase("role");this.container.erase("aria-hidden");this.removeEvents(this.waiAria);}},attach:function(b){$$(b).each(function(d){var f=a(this.options.title,d),e=a(this.options.text,d);
d.set("title","").store("tip:native",f).retrieve("tip:title",f);d.retrieve("tip:text",e);this.fireEvent("attach",[d]);var c=["enter","leave"];if(!this.options.fixed){c.push("move");
}c.each(function(h){var g=d.retrieve("tip:"+h);if(!g){g=function(i){this["element"+h.capitalize()].apply(this,[i,d]);}.bind(this);}d.store("tip:"+h,g).addEvent("mouse"+h,g);
},this);},this);return this;},detach:function(b){$$(b).each(function(d){["enter","leave","move"].each(function(e){d.removeEvent("mouse"+e,d.retrieve("tip:"+e)).eliminate("tip:"+e);
});this.fireEvent("detach",[d]);if(this.options.title=="title"){var c=d.retrieve("tip:native");if(c){d.set("title",c);}}},this);return this;},elementEnter:function(c,b){clearTimeout(this.timer);
this.timer=(function(){this.container.empty();["title","text"].each(function(e){var d=b.retrieve("tip:"+e);var f=this["_"+e+"Element"]=new Element("div",{"class":"tip-"+e}).inject(this.container);
if(d){this.fill(f,d);}},this);this.show(b);this.position((this.options.fixed)?{page:b.getPosition()}:c);}).delay(this.options.showDelay,this);},elementLeave:function(c,b){clearTimeout(this.timer);
this.timer=this.hide.delay(this.options.hideDelay,this,b);this.fireForParent(c,b);},setTitle:function(b){if(this._titleElement){this._titleElement.empty();
this.fill(this._titleElement,b);}return this;},setText:function(b){if(this._textElement){this._textElement.empty();this.fill(this._textElement,b);}return this;
},fireForParent:function(c,b){b=b.getParent();if(!b||b==document.body){return;}if(b.retrieve("tip:enter")){b.fireEvent("mouseenter",c);}else{this.fireForParent(c,b);
}},elementMove:function(c,b){this.position(c);},position:function(f){if(!this.tip){document.id(this);}var c=window.getSize(),b=window.getScroll(),g={x:this.tip.offsetWidth,y:this.tip.offsetHeight},d={x:"left",y:"top"},e={y:false,x2:false,y2:false,x:false},h={};
for(var i in d){h[d[i]]=f.page[i]+this.options.offset[i];if(h[d[i]]<0){e[i]=true;}if((h[d[i]]+g[i]-b[i])>c[i]-this.options.windowPadding[i]){h[d[i]]=f.page[i]-this.options.offset[i]-g[i];
e[i+"2"]=true;}}this.fireEvent("bound",e);this.tip.setStyles(h);},fill:function(b,c){if(typeof c=="string"){b.set("html",c);}else{b.adopt(c);}},show:function(b){if(!this.tip){document.id(this);
}if(!this.tip.getParent()){this.tip.inject(document.body);}this.fireEvent("show",[this.tip,b]);},hide:function(b){if(!this.tip){document.id(this);}this.fireEvent("hide",[this.tip,b]);
}});})();
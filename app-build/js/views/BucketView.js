define(function(a){var b="BucketView",c=a("text!templates/BucketView.dust"),d=a("util/channel"),e=a("util/log");return dust.loadSource(dust.compile(c,b)),Backbone.View.extend({tagName:"li",events:{},initialize:function(){_.bindAll(this,"render","unrender","update","toggleBucket"),this.context={}},render:function(){var a=this,c=$(this.el);return dust.render(b,this.context,function(b,d){c.html(d),$("a",c).click(a.toggleBucket)}),this},unrender:function(){return $(this.el).remove(),this},update:function(a){var b=$(".label",this.el),c=$(".count",this.el),d=$(".graph",this.el),e={},f,g;if(!a){$(this.el).removeClass("active");return}e={add:!a.selected,facetCode:a.facetCode,code:a.code,name:a.name},$(this.el).toggleClass("selected",a.selected),d[0]&&(d[0].style.width=Math.min(a.percentage*100,85)+"%"),b.closest("a").attr("data-bucket",JSON.stringify(e)),b.html(a.name),c.html(a.count),$(this.el).addClass("active")},toggleBucket:function(a){e("facet bucket clicked");var b=$(a.target),c=b.closest("a").attr("data-bucket"),f;try{f=JSON.parse(c)}catch(a){e(a)}if(!f)return;f.add?d.pub("search","add-bucket",{data:f}):d.pub("search","remove-bucket",{data:f})}})})
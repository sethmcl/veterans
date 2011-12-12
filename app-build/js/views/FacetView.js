define(function(a){var b="FacetView",c=a("text!templates/FacetView.dust"),d=a("util/channel"),e=a("views/BucketView"),f=a("util/log"),g=a("models/peopleSearchInput");return dust.loadSource(dust.compile(c,b)),Backbone.View.extend({tagName:"li",events:{"click li a":"toggleBucket"},initialize:function(){_.bindAll(this,"render","unrender","update","toggleBucket","onAddBucket","onRemoveBucket"),this.context={},this.bucketViews=[],d.sub("search","add-bucket",this.onAddBucket),d.sub("search","remove-bucket",this.onRemoveBucket);for(var a=0;a<10;a++)this.bucketViews.push(new e)},render:function(){var a=$(this.el),c,d=this.bucketViews;return dust.render(b,this.context,function(b,e){a.html(e),c=$("ul",a),_.each(d,function(a){c.append(a.render().el)}),$("a",self.el).click(self.toggleBucket)}),this},unrender:function(){return $(this.el).remove(),this},update:function(a){var b,c,d,e=0,f={location:"Where they live...",industry:"What they do...",network:"Related to you...",language:"Languages they speak...","current-company":"Where they work...","past-company":"Where they used to work...",school:"Where they went to school..."},g=["us:0"];a&&a.buckets&&a.buckets.values?b=a.buckets.values:b=[],$(".name",this.el).html(f[a.code.toLowerCase()]),d=_.max(b,function(a){return a&&a.count&&g.indexOf(a.code)===-1?a.count:0}),d&&d.count?d=d.count:d=0,_.each(this.bucketViews,function(f,h){c=b[h],c&&g.indexOf(c.code)===-1&&e<9&&(c.facetCode=a.code,c.percentage=c.count/d,f.update(c),e++)})},toggleBucket:function(a){f("facet bucket clicked");var b=$(a.target),c=b.closest("a").attr("data-bucket"),e;try{e=JSON.parse(c)}catch(a){f(a)}if(!e)return;e.add?d.pub("search","add-bucket",{data:e}):d.pub("search","remove-bucket",{data:e})},onAddBucket:function(a){},onRemoveBucket:function(a){}})})
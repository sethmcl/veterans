define(function(a){var b=Backbone.Model.extend({defaults:{facets:[],people:[],peopleCount:0,hasMore:!1,start:0,count:0,total:0},setFacets:function(a){var b={facets:a};this.set(b),this.trigger("change")},setPeople:function(a){var b={people:a};this.set(b),this.trigger("change")},appendPeople:function(a){var b=this.get("people"),c={people:[]};b=b.concat(a),c.people=b,this.set(c),this.trigger("change")}});return new b})
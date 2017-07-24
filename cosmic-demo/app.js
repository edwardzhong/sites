const config = {
  bucket: {
    slug: 'jeff-demo',
    read_key: 'IE6IDxh7UtAaewEgKish2JBxOVR9oVSGfLEPdtzjL41KhQqkCF',
    write_key: 'xKFHl4MLqjEPpdB1LgArCUW2zt1C8Z2vOxrA9a5S4gN2OyTToa'
  }
};

var store= new Vuex.Store({
	state:{
		list:[]
	},
	mutations:{
		init:function(state,list){
			state.list=list;
		},
		add:function(state,item){
			state.list.unshift(item);
		},
		delete:function(state,id){
			for(var i=0;i<state.list.length;i++){
				if(state.list[i]._id==id){
					state.list.splice(i--,1);
				}
			}
		}
	},
	getters: {
		list: state => state.list
	}
});


Vue.component('add-component', {
	template: '#addTpl',
	props: {
		title:'title',
		comment:'comment'
	},
	methods:{
		add:function(){
			if(!this.title||!this.comment)return;
			var self=this;
			var	params={
				"write_key": config.bucket.write_key,
				"title": this.title,
				"content":"test content",
				"type_slug": "msgs",
				"metafields": [{
					"key": "comment",
					"type": "text",
					"value": this.comment
				}]
			};
			Cosmic.addObject(config, params, (error, response) => {
				console.log(response);
				self.$store.commit('add',response.object);
			});
		}
	},
	created:function(){
		var self=this;
		window.addEventListener('keypress',function(evt){
			if(evt.keyCode==13){
				self.add();
			}
		},false);
	}
});

Vue.component('list-component',{
	template:'#listTpl',
	computed:{
		list:function(){
			return this.$store.getters.list;
		}
	},
	methods:{
		handleDelete:function(event){
			var target=event.target,self=this;
			if(target.nodeName==='A'){
				var id=target.id;
				const params = {
					write_key: config.bucket.write_key,
					_id: id
				};
				Cosmic.deleteObject(config, params, (error, response) => {
				  console.log(response);
				  self.$store.commit('delete',id);
				});
				
			}
		}
	}
});

// entry
var app = new Vue({
	el:'#app',
	store:store,
	created:function(){
		Cosmic.getObjectType(config,{
			"type_slug": "msgs",
			limit: 10,
			skip: 0
		}, (error, response) => {
			console.log(response);
			if(response.objects&&response.total){
				store.commit('init',response.objects.all);
			}
		});
	}
});

define(['jquery', 'underscore', 'backbone', 'resthub', 'hbs!template/user-sidebar', 'view/base-view', 'view/login-view', 'model/user-about', 'event/channel', 'cookie'],
	function($, _, Backbone, Resthub, UserSidebarTmpl, BaseView, LoginView, UserAboutModel, channel, Cookie) {
		var UserSidebarView = BaseView.extend({
			el: ".side",
			events: {
				'click .remove-friend': 'removeFriend',
				'click .add-friend': 'addFriend',
			},
			initialize: function(data) {
				_.bindAll(this);
				this.template = UserSidebarTmpl;
				this.username = data.username
				//this.dynamicStylesheet(" ")
				this.model = new UserAboutModel(this.username)

				this.model.fetch({
					success: this.loaded
				});

			},
			loaded: function(response, sidebar) {
				this.render()
				console.log('usersidebar model=', this.model.attributes)
			},
			addFriend: function(e) {
				e.preventDefault()
				e.stopPropagation()
				this.$('.add-friend').removeClass('active').hide()
				this.$('.remove-friend').addClass('active').show()

				var params = {
					name: this.model.get('name'),
					//api_type: 'json',
					type: 'friend',
					container: this.model.get('name'),
					uh: $.cookie('modhash'),
				};

				console.log(params)

				this.api("api/friend", 'POST', params, function(data) {
					console.log("add friend done", data)
				});
			},

			//"return toggle(this, 
			//unfriend('Ryno3639', 't2_3x80r', 'friend'), 
			//friend('Ryno3639', 't2_3x80r', 'friend'))"

			removeFriend: function(e) {
				e.preventDefault()
				e.stopPropagation()
				this.$('.add-friend').addClass('active').show()
				this.$('.remove-friend').removeClass('active').hide()

				var params = {
					name: this.model.get('name'),
					//api_type: 'json',
					//container: 't2_' + this.model.get('id'),
					container: this.model.get('name'),
					type: 'friend',
					uh: $.cookie('modhash'),
				};

				console.log(params)

				this.api("api/unfriend", 'POST', params, function(data) {
					console.log("remove friend done", data)
				});
			}

		});
		return UserSidebarView;
	});
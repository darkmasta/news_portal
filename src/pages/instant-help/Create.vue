<template>
  <div>
        <h4 class="font-weight-bold py-3 mb-4">
      Kanban board
    </h4>

          
    <div class="row" style="margin-bottom: 50px;">
      <div class="col-md-6">
               <b-card no-body class="price">
                 <div class="row" style="margin: 20px;">
                    <label class="field field_v1">
                      <input class="field__input" placeholder="Order Id" v-model="orderId">
                      <span class="field__label-wrap">
                        <span class="field__label">Order Id</span>
                      </span>
                    </label>
                 </div>
              

                  <div class="row" style="margin: 20px;">
                    <label class="field field_v1">
                      <input class="field__input" placeholder="Topic" v-model="topic">
                      <span class="field__label-wrap">
                        <span class="field__label">Topic</span>
                      </span>
                    </label>
                  </div>
                  <div class="row" style="margin: 20px;">
                    <label class="field field_v1">
                      <input class="field__input" placeholder="Message" v-model="message">
                      <span class="field__label-wrap">
                        <span class="field__label">Message</span>
                      </span>
                    </label>
                  </div>

                  <div class="row" style="margin: 20px;">
                    <label class="field field_v1">
                      <input class="field__input" placeholder="Tags" v-model="tag">
                      <span class="field__label-wrap">
                        <span class="field__label">Tags</span>
                      </span>
                    </label>
                  </div>

                  <div class="row" style="margin: 20px;">
                   <div class="col-md-4">
                      <b-btn @click="submitTicket()">Submit Ticket</b-btn>
                   </div>
                   </div>
            </b-card>
            </div>
            </div>

    <div class="form-row">
      <div class="col-md">

        <b-card no-body class="mb-3">
          <b-card-header header-tag="h6" class="text-center">New</b-card-header>

          <draggable v-model="newTasks" v-bind="draggableOptions" class="kanban-box px-2 pt-2">
            <div v-for="task in newTasks" :key="task.text" class="ui-bordered p-2 mb-2">
              <b-dropdown variant="default btn-xs rounded-pill icon-btn borderless md-btn-flat hide-arrow" class="kanban-board-actions float-right ml-2" :right="!isRtlMode">
                <template slot="button-content"><i class="ion ion-ios-more"></i></template>
                <b-dropdown-item href="javascript:void(0)">Edit</b-dropdown-item>
                <b-dropdown-item @click="deleteTicket(task)">Remove</b-dropdown-item>
              </b-dropdown>
              {{task.text}}
              <span v-if="task.tags && task.tags.length">
                <span v-for="tag in task.tags" :key="tag" :class="`badge-${tags[tag].color}`" class="badge ml-1">{{tags[tag].title}}</span>
              </span>
            </div>
          </draggable>

          <b-card-footer class="text-center py-2">
            <a href="javascript:void(0)"><i class="ion ion-md-add"></i>&nbsp; Add task</a>
          </b-card-footer>
        </b-card>

      </div>
      <div class="col-md">

        <b-card no-body border-variant="info" class="mb-3">
          <b-card-header header-tag="h6" header-text-variant="info" class="text-center">In progress</b-card-header>

          <draggable v-model="inProgressTasks" v-bind="draggableOptions" class="kanban-box px-2 pt-2">
            <div v-for="task in inProgressTasks" :key="task.text" class="ui-bordered p-2 mb-2">
              <b-dropdown variant="default btn-xs rounded-pill icon-btn borderless md-btn-flat hide-arrow" class="kanban-board-actions float-right ml-2" :right="!isRtlMode">
                <template slot="button-content"><i class="ion ion-ios-more"></i></template>
                <b-dropdown-item href="javascript:void(0)">Edit</b-dropdown-item>
                <b-dropdown-item href="javascript:void(0)">Remove</b-dropdown-item>
              </b-dropdown>
              {{task.text}}
              <span v-if="task.tags && task.tags.length">
                <span v-for="tag in task.tags" :key="tag" :class="`badge-${tags[tag].color}`" class="badge ml-1">{{tags[tag].title}}</span>
              </span>
            </div>
          </draggable>
        </b-card>

      </div>
      <div class="col-md">

        <b-card no-body border-variant="warning" class="mb-3">
          <b-card-header header-tag="h6" header-text-variant="warning" class="text-center">Test</b-card-header>

          <draggable v-model="testTasks" v-bind="draggableOptions" class="kanban-box px-2 pt-2">
            <div v-for="task in testTasks" :key="task.text" class="ui-bordered p-2 mb-2">
              <b-dropdown variant="default btn-xs rounded-pill icon-btn borderless md-btn-flat hide-arrow" class="kanban-board-actions float-right ml-2" :right="!isRtlMode">
                <template slot="button-content"><i class="ion ion-ios-more"></i></template>
                <b-dropdown-item href="javascript:void(0)">Edit</b-dropdown-item>
                <b-dropdown-item href="javascript:void(0)">Remove</b-dropdown-item>
              </b-dropdown>
              {{task.text}}
              <span v-if="task.tags && task.tags.length">
                <span v-for="tag in task.tags" :key="tag" :class="`badge-${tags[tag].color}`" class="badge ml-1">{{tags[tag].title}}</span>
              </span>
            </div>
          </draggable>
        </b-card>

      </div>
      <div class="col-md">

        <b-card no-body border-variant="success" class="mb-3">
          <b-card-header header-tag="h6" header-text-variant="success" class="text-center">Done</b-card-header>

          <draggable v-model="doneTasks" v-bind="draggableOptions" class="kanban-box px-2 pt-2">
            <div v-for="task in doneTasks" :key="task.text" class="ui-bordered p-2 mb-2">
              <b-dropdown variant="default btn-xs rounded-pill icon-btn borderless md-btn-flat hide-arrow" class="kanban-board-actions float-right ml-2" :right="!isRtlMode">
                <template slot="button-content"><i class="ion ion-ios-more"></i></template>
                <b-dropdown-item href="javascript:void(0)">Edit</b-dropdown-item>
                <b-dropdown-item href="javascript:void(0)">Remove</b-dropdown-item>
              </b-dropdown>
              {{task.text}}
              <span v-if="task.tags && task.tags.length">
                <span v-for="tag in task.tags" :key="tag" :class="`badge-${tags[tag].color}`" class="badge ml-1">{{tags[tag].title}}</span>
              </span>
            </div>
          </draggable>

          <b-card-footer class="text-center py-2">
            <a href="javascript:void(0)"><i class="ion ion-md-close"></i>&nbsp; Clear completed tasks</a>
          </b-card-footer>
        </b-card>

      </div>
    </div> 
  </div>
</template>
<script>
export default {
  name: "instant-help-create",
  metaInfo: {
    title: "Instant Help Create",
  },
   created() {
      var vm = this
      /*
       axios.post(process.env.VUE_APP_SERVER_URL + '/get_tickets/')
                .then(response => { 
                    var data = response.data
                    console.log(data)
                    var tickets = data
                    _.each(data, function(ticket, index) { 
                      var tmp_ticket = {
                        text: ticket.message,
                        id: ticket._id
                      }
                      console.log(tmp_ticket)
                      vm.newTasks.push(tmp_ticket)
                    })
              })
              */
    },
  methods: {
    submitTicket: function() {
      var vm = this
      var data = {}
      data.orderId = vm.orderId;
      data.topic = vm.topic;
      data.message = vm.message;
      data.tag = vm.tag;
      var task = { text: data.message}
      this.newTasks.push(task)
      axios.post(process.env.VUE_APP_SERVER_URL + '/create_ticket/', {data}).then(response => {
                      console.log(response.data)
                      data = response.data
                    },
                    response => {
                    })
            
    },
    deleteTicket: function(task) {
      var vm = this
      var data = {}
      data.id = task.id
      console.log(data)
      axios.post(process.env.VUE_APP_SERVER_URL + '/delete_ticket/', {data}).then(response => {
                      console.log(response)
                      var res = response.data
                      if (res.ok) {
                        var tmp_task = vm.newTasks.filter( task => task.id == data.id)
                        vm.newTasks = tmp_task
                        vm.$nextTick()
                      }
                    },
                    response => {
                    })
    }
    
  },
};
</script>
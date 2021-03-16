<template>
  <div>
     <b-row> 
     <b-col cols="6">
       <b-row>
         <b-col cols="3" class="info-box">
            <div class="info-box-text info-text-color-1">Total Tickets</div>
            <div class="info-box-number info-text-color-1">200</div>
         </b-col>
         <b-col cols="3" class="info-box box2">
            
            <div class="info-box-text info-text-color-2">Active Tickets</div>
            <div class="info-box-number info-text-color-2">200</div>
         </b-col>
         <b-col cols="3" class="info-box box3">
            
            <div class="info-box-text info-text-color-2">Resolved Ticket</div>
            <div class="info-box-number info-text-color-2">200</div>
         </b-col>
       </b-row>

       <div class="ticket-wrapper2">
          <b-row>
            <b-col cols="6">
                <div class="ticket-topic">
                    {{ticket.topic}}
                    </div>
            </b-col>
            <b-col cols="6">
                <div class="ticket-owner">
                  <span>Ticket Owner:</span>  {{ticket.ownerEmail}}
                </div>
            </b-col>
          </b-row>
            
          <b-row>
            <b-col cols="3">
                 <b-form-group class="topic-select-wrapper2">
                    <b-dropdown id="dropdown-1" v-model="status" :text="status" class="m-md-2 topic-select">
                    <b-dropdown-item @click="status = 'Close'">Close</b-dropdown-item>
                    <b-dropdown-item @click="status = 'Delete';">Delete</b-dropdown-item>
                    <b-dropdown-item @click="status = 'Messaage';">Message</b-dropdown-item>
                    </b-dropdown>
                </b-form-group>
            </b-col>
            <b-col cols="3">
              <span>Order Info: </span>
            </b-col>
            <b-col cols="3">
              <span>Quote Info: </span>
            </b-col>
          </b-row>
           
          
       </div>



    </b-col> 


    <b-col cols="4" class="messages-wrapper">
        <div class="messages-header">
            <h1>Messages</h1>
        </div>
        <b-row class="chat-message">
            <span class="">Created: {{ticket.date}}</span>
        </b-row>
        <b-row v-for="message in messages" :key="message._id">
        <div class="message-box"> 
            <b-row class="other-messages"> 
              <b-row>
                <b-col class="message-text" cols="12">
                  <span>{{message.text}}</span>
                </b-col>
              </b-row>
              <b-row class="message-date">
                  <span class="msg">{{message.date}}</span>
              </b-row>
              <b-row class="message-user">
                  <span class="msg-owner">{{message.owner}}</span>
              </b-row>
            </b-row>
        </div>
        </b-row>

        
        <div class="text-area-button">
            <b-row>
                <b-textarea v-model="message" placeholder="Please write your message here!..." rows="12" class="text-area message"></b-textarea>
            </b-row>
            <b-row>
                <b-btn class="create-ticket-btn" @click="sendMessage()">Post Message</b-btn>
            </b-row>
        </div>
       
    </b-col>

        

   </b-row>
  </div>
</template>
<script>
import draggable from 'vuedraggable/src/vuedraggable'
import Vue from 'vue';
import axios from 'axios'
import AxiosPlugin from 'vue-axios-cors';
import _ from 'underscore'
import moment from "moment"



Vue.use(axios)

axios.defaults.withCredentials = true 
Vue.use(AxiosPlugin)

export default {
  name: "instant-helps",
  metaInfo: {
    title: "Instant Helps",
  },
  components: {
    draggable
  },
  data: () => ({
    topic: 'Update Topic',
    orderId: '',
    topic: '',
    message: '',
    messages: [],
    owner: {},
    ticket: {},
    status: ''
  }),
    created() {
      var vm = this
      vm.status = "Update Topic"
      var data = {}
      data.id = vm.$route.params.id

       axios.post(process.env.VUE_APP_SERVER_URL + '/get_ticket/', {data})
                .then(response => { 
                    vm.ticket = response.data;
                    vm.ticket.date = moment(vm.ticket.date).fromNow()

                    response.data.messages.forEach( msg => {
                        var data = {}
                        data.id = msg.owner
                        axios.post(process.env.VUE_APP_SERVER_URL + '/user_by_id', {data}).then(response => {
                            var user = response.data
                            vm.owner = user
                            msg.owner = user.firstName + " " + user.lastName
                            msg.date = moment(msg.date).fromNow()
                            vm.messages.push(msg)
                        })
                    })
                    console.log(vm.messages)
                })
  },
  methods: {
    sendMessage: function() {
      var vm = this
      var data = {}
      data.id = vm.$route.params.id
      data.message = vm.message;
      console.log(data)
      axios.post(process.env.VUE_APP_SERVER_URL + '/add_message/', {data}).then(response => {
                      var data = console.log(response.data)                                                        
                          var tmp_msg = {}
                          tmp_msg.owner = vm.owner.fistName + " " + vm.owner.lastName
                          tmp_msg.text = vm.message
                          tmp_msg.date = moment().fromNow()                            
                          vm.messages.push(tmp_msg)
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
    },
    rowSelected(items) {
      this.selectedOrders = items
      console.log(items)
    },
    clickRows(which) {
      let myTable = this.$refs.myTable.$el,
          tableBody = myTable.getElementsByTagName('tbody')[0],
          tableRows = tableBody.getElementsByTagName('tr')
      which.forEach(idx => {
        tableRows[idx].click()
      })
      console.log("items")
    },
    
  },
};
</script>
<style>

.body {
  background-color: #E5E5E5;
}

.info-box {
  background: #282F65;
  border: 1px solid #FCFCFD;
  box-sizing: border-box;
  border-radius: 15px;
  height: 100px;
  margin-right: 25px;
}

.info-box-text {
  position: absolute;
  left: 22.38%;
  right: 72.07%;
  top: 20.95%;
  bottom: 77.44%;
  width: 100%;

  font-family: Manrope;
  font-style: normal;
  font-weight: bold;
  font-size: 15px;
  line-height: 16px;
  letter-spacing: 0.02em;
}

.info-box-number {
  position: absolute;
  left: 22.38%;
  right: 72.07%;
  top: 40%;
  bottom: 73.11%;

  font-family: Manrope;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 33px;
  letter-spacing: 0.02em;
  color: #FFFFFF;
}

.info-text-color-1 {
  color: #FFFFFF;
}

.info-text-color-2 {
  color: #000;
}

.box2 {
  background: #F6FFE3;
}

.box3 {
  background: #EBF6FF;
  margin-right: 10px;
}

.ticket-wrapper {
  margin-top: 20px;
  height: 750px;
  background: #e7f0f9;
  border: 1px solid #FCFCFD;
  box-sizing: border-box;
  border-radius: 23px;
}

.avatar-wrapper {
  height: 250px;
}

.search-box {
  margin: 10px auto;
  padding: 10px;
  width: 100%;
}

.topic-select {
  width: 90%;
  padding: 5px;
  margin-right: 30px;
}


.topic-select-wrapper {
  width: 100%;
  margin: 0 10px;
  background: #282F65;
  box-shadow: 10px 12px 23px rgba(40, 47, 101, 0.25);
  border-radius: 13px;
}

.text-area {
  font-family: Manrope;
  margin-top: 10px;
  padding-left: 20px !important;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 106%;
  /* or 13px */

  letter-spacing: 0.02em;

  color: #9097A3;
  background-color: #fbf0f0;
  border-bottom: none;
}

#__BVID__58:focus {
  background-color: white;
}


.create-ticket-btn {
  width: 96%;
  height: 65px;
  margin: 10px auto;
  background: #282F65;
  box-shadow: 10px 12px 23px rgba(40, 47, 101, 0.25);
  border-radius: 13px;
}

.create-ticket-btn:hover {
  color: #aff;
  background-color: #282f65;
}

#dropdown-1__BV_toggle_ {
  margin: 0 auto;
  background: #282f65;
  box-shadow: 10px 12px 23px rgba(40, 47, 101, 0.25);
  border-radius: 13px;
}

#dropdown-1__BV_toggle_:hover {
  color: #aff;
  margin: 0 auto;
  background: #282f65;
  box-shadow: 10px 12px 23px rgba(40, 47, 101, 0.25);
  border-radius: 13px;
}

ul[role=menu] {
  margin: 0 auto;
  background: #282f65;
  left: 10px !important;
  width: 100%;
  box-shadow: 10px 12px 23px rgba(40, 47, 101, 0.25);
  border-radius: 13px;
}

li[role=presentation] {
  width: 40%;
  margin: 0 13px;
  display: inline-block;
}

a[role=menuitem] {
  color: #fff;
}
a[role=menuitem]:hover {
  color: #aff;
}

table[role=table] {
  margin-top: 10px;
  background-color: transparent;

}

.table-wrapper {
  background-color: transparent;
}

table > tbody > .table-active > td {
    background-color: #FFD950!important;
    box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.07), 0px 4px 5px 0px rgba(0, 0, 0, 0.05), 0px 1px 10px 0px rgba(0, 0, 0, 0.03);
    color: #665720;
}

.ticket-topic {
  margin: 20px;
  padding: 20px;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 33px;
  letter-spacing: 0.02em;
  color: #666;
}

.ticket-wrapper2 {
  background: #e7f0f9;
  border: 1px solid #FCFCFD;
  margin-top: 25px;
  padding: 15px;
  box-sizing: border-box;
  border-radius: 23px;
}

.ticket-message {
  margin: 20px;
  padding: 20px;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  letter-spacing: 0.02em;
  color: #666;
}

.ticket-owner {
  margin: 30px 20px 20px 20px;
  padding: 20px;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  letter-spacing: 0.02em;
  color: #666;
}

.ticket-date {
    margin-top: 20px;
    position: relative;
    top: 10%;
    right: 57%;
}

.messages-header {
    position: relative;
    top: 5%;
    left: 5%;
}

.messages-wrapper {
    background-color: #f1f1f1;
    overflow-x: hidden; 
    margin-left: 20px;
}

.message {
    margin-top: 15%;
}

.chat-message {
    margin-top: 80px;
    margin-left: 15px;
}

.other-messages {
    width: 90%;
    background-color: turquoise;
    height: 100px;
    margin: 10px auto;
    padding: 10px;
    border: 1px solid red;
    border-radius: 5px;
}

.text-area-button {
    position: relative;
    bottom: -255px;
    left: 0;
}


.message-text {
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  letter-spacing: 0.02em;
  color: #666;
  padding: 10px;
}

.message-user {
  position: relative;
  top: 80%;
  left: 45%;
}

.message-date {
  position: relative;
  top: 80%;
  left: -5%;
}


.message-box{
  width: 100%;
}


.topic-select-wrapper2 {
  height: 30px;
}

.message-info {
  flex-direction: row;
}

.msg {

}

.msg-owner {
}

</style>
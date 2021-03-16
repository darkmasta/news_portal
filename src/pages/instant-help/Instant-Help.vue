<template>
  <div>
   <b-row> 
     <b-col cols="8">
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

      <b-row>
        <b-col>
            <div class="table-wrapper">
                  <b-table
                    selectable
                    :striped="striped"
                    :bordered="bordered"
                    :borderless="borderless"
                    :outlined="outlined"
                    :small="small"
                    :hover="hover"
                    :dark="dark"
                    :fixed="fixed"
                    :foot-clone="footClone"
                    :no-border-collapse="noCollapse"
                    :items="ticketsTableData"
                    :fields="fields"
                    :head-variant="headVariant"
                    :table-variant="tableVariant"
                    @row-selected="rowSelected" ref="myTable" 
                  >
                  </b-table>


                  <b-btn class="p-3 px-5 mt-4" size="lg" variant="warning" 
                            style="float: right; margin-left: 25px;"
                            v-if="selectedTickets.length == 1"
                            @click="goToTicket()">Edit Selected Ticket!</b-btn>
             
            </div>
      </b-col>
    </b-row>

 </b-col>
     <b-col cols="4" class="ticket-wrapper">
        <b-row>
         <div class="avatar-wrapper">


         </div>
        </b-row>
        <b-row>
         <div class="search-box">
            <b-input placeholder="Search"></b-input>
         </div>
       </b-row>
       <b-row>
         <b-form-group class="topic-select-wrapper">
                <b-dropdown id="dropdown-1" v-model="topic" :text="topic" class="m-md-2 topic-select">
                  <b-dropdown-item @click="topic = 'Pricing'; topic = 'Pricing'">Pricing</b-dropdown-item>
                  <b-dropdown-item @click="topic = 'Invoices'; topic = 'Invoices'">Invoices</b-dropdown-item>
                  <b-dropdown-item @click="topic = 'Support'; topic = 'Support'">Support</b-dropdown-item>
                  <b-dropdown-item @click="topic = 'Insurance'; topic = 'Insurance' ">Insurance</b-dropdown-item>
                  <b-dropdown-item @click="topic = 'Delays'; topic = 'Delays' ">Delays</b-dropdown-item>
                  <b-dropdown-item @click="topic = 'General'; topic = 'General' ">General</b-dropdown-item>
                </b-dropdown>
        </b-form-group>
       </b-row>
       <b-row>
         <b-textarea v-model="message" placeholder="Please write your message here!..." rows="12" class="text-area"></b-textarea>
       </b-row>
       <b-row>
         <b-btn class="create-ticket-btn" @click="submitTicket()">Create Ticket</b-btn>
       </b-row>
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
     fields: [{ key: 'Id', sortable: true}, { key: 'Date', sortable: true} , { key: 'Vehicle',sortable: true} , 
                 { key: 'Origin_Destination', sortable: true},  { key: 'Status', sortable: true}],
      ticketsTableData: [], 
      originalTicketsTableData: [], 
      selectedTickets: [],
      tickets: [],
    topic: 'Select Topic',
    orderId: '',
    topic: '',
    message: '',
    tag: '',
    striped: false,
      bordered: false,
      borderless: true,
      outlined: true,
      small: false,
      hover: true,
      dark: false,
      fixed: false,
      footClone: false,
      headVariant: 'light',
      tableVariant: '',
      noCollapse: false,
  }),
    created() {
      var vm = this
      vm.topic = "Select Topic"
      //  axios.post(process.env.VUE_APP_SERVER_URL + '/get_tickets/')
      //           .then(response => { 
      //               var data = response.data
      //               console.log(data)
      //               var tickets = data
      //               _.each(data, function(ticket, index) { 
      //                 var tmp_ticket = {
      //                   Id: ticket._id.slice(-4),
      //                   Date: moment(ticket.date).fromNow(),
      //                   Status: ticket.state
      //                 }
      //                 vm.ticketsTableData.push(tmp_ticket)
      //               })
      //               vm.tickets = tickets
      //         })
  },
  methods: {
  },
};
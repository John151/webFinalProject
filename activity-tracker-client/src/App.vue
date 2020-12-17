<template>
  <div id="app">

      <AddRecords v-on:record-added="newRecordAdded"
      v-bind:isEditingRecord="isEditingRecord"
      v-bind:recordToEdit="recordToEdit"
      v-on:edit-record-submit="editRecordSubmit"
      ></AddRecords>
      <RecordsTable v-bind:records="records"
        v-on:delete-record="deleteRecord"
        v-on:edit-record="editRecordRequest"></RecordsTable>
        <ArtChart v-bind:chartData="chartData"/>
        <LineChart v-bind:chartData="chart2Data"/>
  </div>

</template>

<script>
import AddRecords from './components/AddRecords.vue'
import RecordsTable from "@/components/RecordsTable";
import ArtChart from "@/components/ArtChart";
import LineChart from "@/components/LineChart";
import {options} from "colorette";

export default {
    name: 'App',
    components: {
        ArtChart,
        AddRecords,
        LineChart,
        RecordsTable,
    },
    mounted() {
        this.updateRecords()
    },
    data() {
        return {
            records: [],
            typeDataDict: {
                type: {
                    painting: 0,
                    drawing: 0,
                    sketching: 0,
                },
                media: {
                    digital: 0,
                    traditional: 0
                }
            },
            isEditingRecord: false,
            recordToEdit: {}
        }
    },
    methods: {
        newRecordAdded(record) {
            this.$record_api.addRecord(record).then(record => {
                this.updateRecords()
            }).catch(err => { //makes sure the user sees a message, knows why the entry wasn't added
                let msg = err.response.data.join(', ')
                alert('Error adding record.\n' + msg)
            })
        },
        deleteRecord(record) {
            this.$record_api.deleteRecord(record.id).then(() => {
                this.updateRecords()
            })
        },
        editRecordRequest(record) { //the idea here is to repopulate the form with the information
            //in our record, then delete the record. some of the elements weren't working
            //i'm investigating why still
            
            this.isEditingRecord = true 
            this.recordToEdit = record 
            alert("Values of entry have been transferred for form, please make changes and re-submit")
          
        },
        editRecordSubmit(newRecord) {

            console.log('The updated record data is ', newRecord)
  
            // create this function, call it, reset the form back to adding record state
           // this.$record_api.editRecord(newRecord).then( () => {
                this.isEditingRecord = false 
                this.recordToEdit = {} 
            //}) 
        },

        updateRecords() {
            this.$record_api.getAllRecords().then(records => {
                this.records = records
                this.updateChartData()
            })
            
        },
        updateChartData() {
            this.typeDataDict.type.painting = 0
            this.typeDataDict.type.sketching = 0
            this.typeDataDict.type.drawing = 0
            this.typeDataDict.media.traditional = 0
            this.typeDataDict.media.digital = 0
            this.records.forEach(record => {
                if (record.type === "painting") {
                    this.typeDataDict.type.painting += record.hours
                }
                if (record.type === "sketching") {
                    this.typeDataDict.type.sketching += record.hours
                }
                if (record.type === "drawing") {
                    this.typeDataDict.type.drawing += record.hours
                }
                if (record.medium === "Digital") {
                    this.typeDataDict.media.digital += record.hours
                }
                if (record.medium === "Traditional") {
                    this.typeDataDict.media.traditional += record.hours
                }
            })
        }
    },
        computed: {
            chartData() {
                let labels = ["Painting", "Drawing", "Sketching"]
                return {
                    labels: labels,
                    datasets: [
                        {
                            label: 'hours practiced',
                            data: [this.typeDataDict.type.painting, this.typeDataDict.type.drawing, this.typeDataDict.type.sketching],
                            backgroundColor: ["#0074D9", "#FF4136", "#2ECC40"]
                        }
                    ]
                }
            },
            chart2Data() {
                let labels = ['Digital', 'Traditional']
                return {
                    labels: labels,
                    datasets: [
                        {
                            label: 'Digital or Traditional',
                            data: [this.typeDataDict.media.digital, this.typeDataDict.media.traditional],
                            backgroundColor: ["#c4d5e5", "#cf716e"]
                        }
                    ],
                }
            }
        }

}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

<template>
    <div>

        <div class="card">
            <h2 class="card-header">Activity Records</h2>

            <div class="card-body">

                <h3> {{totalRecords}}</h3>

                <input id="edit-table" type="checkbox" class="form-check-input" v-model="editTable">
                <label for="edit-table" class="form-check-label">Edit table?</label>
                <div id="records-table">
                    <table class="table table-hover">
                        <tr>
                            <th>Date</th>
                            <th>How many hours?</th>
                            <th>Type</th>
                            <th>Media</th>
                            <th>Completed?</th>
                            <th>Notes</th>
                            <th v-show="editTable">Edit</th>
                            <th v-show="editTable">Delete</th>
                        </tr>

                        <record-row
                            v-for="record in records" v-bind:key="record.id"
                            v-bind:record="record"
                            v-bind:edit="editTable"
                            v-on:delete-record="deleteRecord"
                            v-on:edit-record="editRecord">
                        </record-row>

                    </table>
                </div>
            </div>
        </div>

        <div class="card">
            <h2 class="card-header">Summary</h2>

            <div class="card-body">

                <p>You have practiced a total of {{totalHours | hoursTwoDecimal }} hours</p>


            </div>
        </div>

    </div>
</template>

<script>
//this tells the recordstable.vue component about its child, recordrow.vue
import RecordRow from "@/components/RecordRow";

export default {
    name: "RecordTable",
    components: { RecordRow },
    props: {
        records: Array
    },
    data() {
        return {
            editTable: false
        }
    },
    methods: {
        deleteRecord(record){
            this.$emit('delete-record', record)
        },
        editRecord(record){
            this.$emit('edit-record', record)
        }
    },
    filters: {

        hoursTwoDecimal(totalHours) {
            return totalHours.toFixed(2)
        }
    },
    computed: {
        totalRecords() {
            if (this.records.length == 1) {
                return '1 record'
            } else {
                return this.records.length + ' records'
            }
        },
        totalHours() {
            let total = 0
            this.records.forEach( record =>{
                total += record.hours
            })
            return total
        }
    }

}
</script>

<style scoped>

</style>
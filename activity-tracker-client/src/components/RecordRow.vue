<template>
    <tr v-bind:class="record.type">
        <td>{{record.date || shortDate}}</td>
        <td>{{record.hours | hoursTwoDecimal}}</td>
        <td>{{record.type}}</td>
        <td>{{record.medium}}</td>
        <td>{{record.completed |informativeBool}}</td>
        <td>{{record.notes | shortNote}}</td>
        <td v-show="edit"> <img v-on:click="editRecord" src="@/assets/edit.png"></td>
        <td v-show="edit"> <img v-on:click="deleteRecord" src="@/assets/delete.png"></td>
    </tr>
</template>

<script>
export default {
    name: "RecordRow",
    props: {
        record: Object,
        edit: Boolean
    },
    methods: {
        deleteRecord() {
            this.$emit('delete-record', this.record)
        },
        editRecord() {
            this.$emit('edit-record', this.record)
        }
    },
    filters: {
        shortDate(date) {
            let tempDate = new Intl.DateTimeFormat('en-US', {timeZone: 'UTC'}).format(date)
            return tempDate.substr(0, 10)
        },
        shortNote(notes) {
            return notes.substring(0, 40)
        },
        informativeBool(completed) {
            if (completed) {
                return 'completed'
            } else {
                return 'in progress'
            }
        },
        hoursTwoDecimal(totalHours) {
            return totalHours.toFixed(2)
        }
}}
</script>

<style scoped>

</style>
<template>
  <div> <!--this form manages asking the user for input. it displays drop downs, date pickers, etc
  and tells its parent component what the user chose-->

      <h1 class="text-center">{{activity}} Time Tracker</h1>

    <!-- some type of style to indicate to the user they are editing, not adding a new record -->
      <div id="add-hours" class="card" v-bind:class="{ edit: isEditingRecord }">

          <h2 v-if="isEditingRecord" class="card-header edit">Edit Record</h2>
          <h2 v-else class="card-header">Add Records</h2>


          <div class="card-body">

              <div class="alert alert-danger" v-show="errors.length > 0">
                  <li v-for="error in errors">{{error}}</li>
              </div>

              <div class="form-group">
                  <label class="form-label" for="date">What date did you {{activity | lowerCase}}? </label>

                  <input id="date" class="form-control" type="date" v-model="dateString">
                  <small id="date-help" class="form-text text-muted">
                      Date must be today or in the past.
                  </small>
              </div>

              <div class="form-group">
                  <label class="form-label" for="hours">How many hours did you practice for?</label>
                  <input id="hours" class="form-control" type="number" min="0" max="24" v-model.number="hours">
                  <small id="hours-help" class="form-text text-muted">
                      Enter a number of hours, more than 0, up to a maximum of 24
                  </small>
              </div>

              <div class="form-group">
                  <label class="form-label" for="type">What type?</label>
                  <select class="form-control" id="type" v-model="type">
                      <option v-for="type in types">{{type}}</option>
                  </select>
              </div>

              <div class="form-label pb-2">
                  What media?
              </div>

              <div class="form-check-inline">
                  <input id="media1" class="form-check-input" type="radio" v-bind:value="media.traditional" v-model="medium">
                  <label class="form-check-label" for="media1"> {{media.traditional}}  </label>
              </div>

              <div class="form-check-inline">
                  <input id="media2" class="form-check-input" type="radio" v-bind:value="media.digital" v-model="medium">
                  <label class="form-check-label" for="media2">  {{media.digital}}  </label>
              </div>

              <div class="form-group form-check">
                  <input class="form-check-input" type="checkbox" id="comp" v-model="completed">
                  <label class="form-check-label" for="comp">Completed?</label>
              </div>

              <div class="form-group">
                  <label for="textArea">Notes</label>
                  <textarea class="form-control" id="textArea" rows="3" v-model="notes"></textarea>
              </div>

              <div>
                  <button v-if="isEditingRecord" class="btn btn-secondary mt-2" type="button" v-on:click="submitEdit">Edit record</button>
                  <button v-else class="btn btn-primary mt-2" type="button" v-on:click="submitAdd">Add record</button>
              </div>

          </div>
      </div>

  </div>
</template>

<script>
export default {
    //create component here
    name: 'AddRecords',
    props: {
        recordToEdit: Object,
        isEditingRecord: Boolean  // as opposed to adding new data
    },
    data() {
        return {
            uniqueKey: Number,
            activity: 'Practice Art',
            errors: [],
            dateString: '',
            hours: 1,
            type: '',
            medium: '',
            completed: false,
            notes: '',

            types: ['sketching', 'drawing', 'painting'],
            media: {
                traditional: 'Traditional',
                digital: 'Digital'
            },
        }
    },
    filters: {
        lowerCase(text) {
            return text.toLowerCase()
        }
    },
    watch: {
        isEditingRecord() {  // this function runs id the editing prop changes 
            if (this.isEditingRecord) {
                this.errors = []
                this.hours = this.recordToEdit.hours
                this.dateString = this.recordToEdit.dateString  // todo fix this one to actually show dat
                this.type = this.recordToEdit.type 
                this.medium = this.recordToEdit.medium
                this.completed = this.recordToEdit.completed
                this.notes = this.recordToEdit.notes
            } else {
                // not editing, clear form (?) or whatever action would be suitable for the not-editing state
                this.errors = []
                this.hours = 1
                this.dateString = ''
                this.type = ''
                this.medium = ''
                this.completed = false
                this.notes = ''
            }
        }
    },
    methods: {
        submitAdd() {
            this.errors = []

            //let date = new Date(this.dateString)
            let uniqueKey = Date.now()
            let shortDate = this.dateString.substr(0,10)
            //the following checks to make sure the data is valid, only then
            //will it emit an array, "record" to its parent component, app.vue
            if (!this.dateString || this.dateString == 'Invalid Date' || date > new Date()) {
                this.errors.push('Select a valid date, today or in the past.')
            }
            if (this.hours <= 0 || this.hours > 24) {
                this.errors.push('The number of hours must be between 0 and 24.')
            }
            if (!this.type) {
                this.errors.push('Select a type.')
            }
            if (!this.medium) {
                this.errors.push('Please select a media type.')
            }
            if (this.errors.length === 0) {

                let record = {
                    uniqueKey: uniqueKey,
                    date: shortDate,
                    hours: this.hours,
                    type: this.type,
                    medium: this.medium,
                    completed: this.completed,
                    notes: this.notes
                }

                    //this emits message to parent with new record
                this.$emit('record-added', record)
            }
        },
        submitEdit() {

            //todo validate
            let record = {
                // todo include date, uniqueKey
                hours: this.hours,
                type: this.type,
                medium: this.medium,
                completed: this.completed,
                notes: this.notes
            }

            this.$emit('edit-record-submit', record)
        }
    },

}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.edit {
    background-color: violet;  /* or some other style/visual feedback so user can differentiate between edit and add */
}
</style>

<template>
  <div> <!--this form manages asking the user for input. it displays drop downs, date pickers, etc
  and tells its parent component what the user chose-->

      <h1 class="text-center">{{activity}} Time Tracker</h1>

      <div id="add-hours" class="card">

          <h2 class="card-header">Add Records</h2>
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
                  <button class="btn btn-primary mt-2" type="button" v-on:click="submit">Add record</button>
              </div>

          </div>
      </div>

  </div>
</template>

<script>
export default {
    //create component here
    name: 'AddRecords',
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
    methods: {
        submit() {
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
</style>

<template>
  <v-col>
    <v-row align="center" justify="center">
      <v-progress-circular
        color="primary"
        size="250"
        width="10"
        :value="progress"
      >
        <v-col>
          <v-row justify="center" align="center">
            <h1 v-text="timeShown" />
          </v-row>

          <v-row justify="center" align="center">
            <v-btn
              v-if="started"
              class="mx-2"
              color="error"
              elevation="2"
              rounded
              id="stop"
              @click="stopTimer()"
            >
              Stop
            </v-btn>
            <v-btn
              v-else
              class="mx-2"
              color="green accent-3"
              elevation="2"
              rounded
              id="work"
              @click="startTimer()"
            >
              Start
            </v-btn>
          </v-row>
        </v-col>
      </v-progress-circular>
    </v-row>

    <v-row id="timerButtons" justify="center" class="py-6 d-flex justify-center mb-6 flex-wrap">
        <v-btn
          class="mx-2 py-2"
          color="primary"
          elevation="2"
          rounded
          id="work"
          @click="setWork()"
        >
          Work
        </v-btn>
        <v-btn
          class="mx-2 py-2"
          elevation="2"
          rounded
          id="shortBreak"
          @click="setShortBreak()"
        >
          Short Break
        </v-btn>
        <v-btn
          class="mx-2 py-2"
          color="secondary"
          elevation="2"
          rounded
          id="longBreak"
          @click="setLongBreak()"
        >
          Long Break
        </v-btn>
    </v-row>
  </v-col>
</template>

<script>
export default {
    name: 'Timer',
    mounted: function () {
        this.interval = setInterval(this.intervalCallback, 1000)
    },
    data: function () {
        return {
            minutes: 25,
            seconds: 0,
            interval: null,
            started: false,
            progress: 0,
            progressIncrement: 0
        }
    },
    methods: {
        resetVariables: function (mins, secs, started) {
            this.minutes = mins
            this.seconds = secs
            this.started = started
            this.progress = 0
            this.progressIncrement = 100 / (this.minutes * 60)
        },
        setWork: function () {
            this.resetVariables(25, 0)
        },
        setShortBreak: function () {
            this.resetVariables(5, 0)
        },
        setLongBreak: function () {
            this.resetVariables(15, 0)
        },
        startTimer: function () {
            this.started = true
        },
        stopTimer: function () {
            this.resetVariables(25, 0, false)
        },
        intervalCallback: function () {
            if (!this.started) return false
            if (this.seconds === 0) {
                if (this.minutes === 0) {
                    this.timerComplete()
                    return
                }
                this.seconds = 59
                this.minutes--
            } else {
                this.seconds--
            }
            this.progress = this.progressIncrement + this.progress
        },
        timerComplete: function () {
            this.started = false
            this.fillerHeight = 0
        }
    },
    computed: {
        timeShown: function () {
            return `${this.minutesShown}:${this.secondsShown}`
        },
        secondsShown: function () {
            if (this.seconds < 10) {
                return '0' + parseInt(this.seconds, 10)
            }
            return this.seconds
        },
        minutesShown: function () {
            if (this.minutes < 10) {
                return '0' + parseInt(this.minutes, 10)
            }
            return this.minutes
        }
    }
}
</script>

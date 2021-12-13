<template>
  <v-col>
    <v-row align="center" justify="center py-4">
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

    <v-container justify="center" class="d-flex justify-center flex-wrap">
        <v-btn
          class="mx-2 my-2"
          color="primary"
          elevation="2"
          rounded
          id="work"
          @click="setWork()"
        >
          Praca
        </v-btn>
        <v-btn
          class="mx-2 my-2"
          elevation="2"
          rounded
          id="shortBreak"
          @click="setShortBreak()"
        >
          Krótka przerwa
        </v-btn>
        <v-btn
          class="mx-2 my-2"
          color="secondary"
          elevation="2"
          rounded
          id="longBreak"
          @click="setLongBreak()"
        >
          Długa przerwa
        </v-btn>
    </v-container>
    <v-container id="customTime" justify="center"  class="fluid d-flex justify-center">
        <v-text-field
          v-model="customTime"
          prefix="Inny czas:"
          required
        >

        </v-text-field>
        <v-btn
          class="mx-2 my-2"
          color="secondary"
          elevation="2"
          rounded
          id="customTime"
          @click="setCustomTime()"
        >
          Ustaw
        </v-btn>
    </v-container>
  </v-col>
</template>

<script>
function notify (body) {
    return new Notification('Pomidor4U', { body })
}

export default {
    name: 'Timer',
    mounted: async function () {
        if (Notification.permission !== 'granted') {
            Notification.requestPermission()
        }

        this.interval = setInterval(this.intervalCallback, 1000)
    },
    data: function () {
        return {
            audio: new Audio('https://onlineclock.net/audio/options/default.mp3'),
            customTime: '15:00',
            interval: null,
            limit: 0,
            minutes: 25,
            progress: 0,
            progressIncrement: 0,
            seconds: 0,
            started: false
        }
    },
    methods: {
        resetVariables: function (mins, secs, started) {
            this.minutes = mins
            this.seconds = secs
            this.started = started
            this.limit = mins * 60 + secs
            this.progress = 0
            this.progressIncrement = 100 / this.limit
        },
        setCustomTime: function () {
            const regex = /(\d\d|\d):(\d\d)/

            if (regex.test(this.customTime)) {
                const results = regex.exec(this.customTime)

                this.resetVariables(parseInt(results[1]), parseInt(results[2]))
            }
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
            this.started = false
        },
        intervalCallback: function () {
            if (!this.started) return false
            if (this.seconds === 0) {
                if (this.progress === 100) {
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
            if (Notification.permission === 'granted') {
                notify('Timer has reached the end of time.')

                this.audio.play()
            }
            this.started = false
            this.progress = 0
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

<style scoped>
  #customTime {
    max-width: 250px;
  }
</style>

Vue.component('workouttypes', {
    props: {
        workouts: Array,
        required: true,
    },
    template: `
    <div>
        <div v-for="(workout, index1) in workouts" class="training">
            <div v-if="workout.image != ''" class="training-image">
                <a v-bind:href="workout.imgLink" target="_blank">
                    <img :class="{ 'margin-top-0': workout.topZero }" v-bind:src="workout.image"></img>
                </a>
            </div>
            
            <div v-show="workout.suggestions.length > 0" class="training-suggestions">
                <ul>
                    <li v-for="(suggested, index2) in workout.suggestions" :key="suggested.key">
                        <a v-bind:href="suggested.value" target="_blank">{{suggested.key}}</a>
                    </li>
                </ul>
            </div>

            <div class="training-info">
                <h3>{{ computeExerciseTitle(index1) }}</h3>
                <h5>Days Per Week: {{ workout.daysPerWeek }}</h5>
                <div class="color-box"
                    :style="{ backgroundColor: workout.color }"
                    @mouseover="consoleOutInfo(workout.trainingType, workout.level)"
                ></div>
                <div>{{ workout.desciption }}</div>
                <button v-on:click="hideShowTemplates(workout.id)">{{ workout.showTemplate ? 'Hide' : 'Show' }} Pricing Info</button>
            </div>
            <div class="training-template" v-show="workout.showTemplate">
                {{ pricingInfo }}
            </div>
        </div>
    </div>
    `,
    data() {
        return {
            
        }
    },
    methods: {
        hideShowTemplates(itemId) {
            for(var i = 0; i < this.workouts.length; i++) {
                if(this.workouts[i].id === itemId) {
                    this.workouts[i].showTemplate = !this.workouts[i].showTemplate;
                } else {
                    this.workouts[i].showTemplate = false;
                }
            }
        },
        consoleOutInfo(type, level) {
            console.log(type + ' is for ' + level);
        },
        computeExerciseTitle(index1) {
            return this.workouts[index1].trainingType + " - " + this.workouts[index1].level;
        }
    },
    computed: {
        pricingInfo() {
            for(let i = 0; i < this.workouts.length; i++) {
                if(this.workouts[i].imgLink.toLowerCase().indexOf("bodybuilding.com") > -1 && this.workouts[i].showTemplate) {
                    return "Please consult the link for pricing.";
                }
            }
            return "Follow the link for free instructions on how to plan a workout."
        }
    }
})

var app = new Vue({
    el: "#app",
    data: {
        workouts: [ {
                id: 1,
                trainingType: "Full Body",
                topZero: true,
                image: './assets/full-body-workout.jpg',
                suggestions: [],
                showTemplate: true,
                imgLink: "https://www.bodybuilding.com/workout-plans/about/transformed-12-weeks-to-your-best-self",
                color: 'green',
                level: "Beginner",
                daysPerWeek: "3-4",
                desciption: "Full body workouts are designed to help individuals beginning their fitness journey or those looking to revisit the basics of strength training. It typically consists of 6-8 compound movements that hit muscle groups all over the body."
            },
            {
                id: 2,
                trainingType: "Upper Lower",
                topZero: false,
                image: '',
                suggestions: [
                    {key: 'PHUL', value: 'https://www.muscleandstrength.com/workouts/phul-workout'},
                    {key: 'PHAT', value: 'http://webcache.googleusercontent.com/search?q=cache:8BQJtKZBPlYJ:www.simplyshredded.com/mega-feature-layne-norton-training-series-full-powerhypertrophy-routine-updated-2011.html+&cd=1&hl=en&ct=clnk&gl=us'}
                ],
                showTemplate: false,
                imgLink: "",
                color: 'yellow',
                level: "Intermeddiate",
                daysPerWeek: "4-5",
                desciption: "Upper Lower workouts split your workouts to upper body muscles and lower body muscles. Two popular forms of Upper Lower include PHUL (Power Hypertrophy Upper Lower) and PHAT (Power Hypertrophy Adaptive Training) which focus on two days of power focused rep ranges and two to three days of hypertrophy lifts - or rep ranges that increase muscle size."
            },
            {
                id: 3,
                trainingType: "PPL",
                imgLink: "https://www.bodybuilding.com/workout-plans/about/transformed-12-weeks-to-your-best-self",
                topZero: false,
                image: './assets/ppl-original.jpg',
                suggestions: [],
                showTemplate: false,
                imgLink: "https://www.reddit.com/r/Fitness/comments/37ylk5/a_linear_progression_based_ppl_program_for/",
                color: 'red',
                level: "Advanced",
                daysPerWeek: "3-6",
                desciption: "PPL - Push, Pull, Legs - is a strength training program that focuses on training your muscle groups in three different groups based on the movements and muscle locations. Each workout has 6-8 workouts focused on each group."
            }
        ]
    }
})
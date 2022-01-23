<script>
import FormLayout from '@layouts/form-layout';
export default {
    name: 'Home',
    components: { 
        FormLayout,
    },
    data() {
        return {
            questions: [],
            currentQuestion: 0,
            startQuestionnaire: false,
            answer: null,
        }
    },
    async created() {
        this.questions = await this.$http.get('question');
        const answers = this.$store.getters['answer/getAnswers'];
        if (answers && answers.length > 0) {
            this.startQuestionnaire = true;
            this.currentQuestion = Math.max(...answers.map(x=> x.questionStep));
            this.routeToNext(answers.find(x => x.questionStep === this.currentQuestion).answer);
        }
    },
    methods: {
        saveStep() {
            try {
                if(this.answer && Array.isArray(this.answer) && this.answer.length > 0) {
                    this.answer = this.answer.map(x => x.value);
                }
                this.$store.dispatch('answer/addAnswers', {questionId: this.questions[this.currentQuestion]._id, answer: this.answer, questionStep: this.currentQuestion});
                this.routeToNext(this.answer && Array.isArray(this.answer) && this.answer.length > 0 ? this.answer[0]: this.answer);
            } catch (err) {
                this.$message.error(err.message);
            }
        },
        async routeToNext(answer) {
            if(this.answer) {
                this.answer = null;
            }
            const options = this.questions[this.currentQuestion].options;

                if(options && options.length > 0) {
                    const route = options.find(x => x.value ===  answer).route_to;
                    this.currentQuestion = this.questions.findIndex(x => x._id === route);
                    if (this.questions[this.currentQuestion].can_skip) {
                        this.questions[this.currentQuestion].can_skip_to.forEach(element => {
                            if(element.answer_for) {
                                const answers = this.$store.getters['answer/getAnswers'];
                                if (answers && answers.length > 0) {
                                    const ans = answers.find(x => x.questionId === element.answer_for);
                                    if(ans && ans.answer === element.for_value) {
                                        this.currentQuestion = this.questions.findIndex(x => x._id === element.skip_to);
                                    }
                                }
                            }
                        });
                    }
                } else {
                    const answers = this.$store.getters['answer/getAnswers'];
                    await this.$http.post('answer', {answers});
                    this.$store.dispatch('answer/deleteAnswers');   
                    this.startQuestionnaire = false;
                    this.currentQuestion = 0;
                    this.answer = null;
                    this.$message.success('Your answers are submitted');
                }
        }
    }
}
</script>

<template lang="pug">
    div
        button.btn.custom-button(v-if="!startQuestionnaire", type='button', @click="startQuestionnaire = true")
            i.fa.fa-search
            | Start
        form-layout(v-if="startQuestionnaire")
            template(slot='title') {{questions[currentQuestion].label}}
            template(slot='body')
                form(@submit.prevent='saveStep()')
                    .form-group
                        form-field-input(
                            v-model="answer",
                            :attribute="questions[currentQuestion].label",
                            :input-type="questions[currentQuestion].type",
                            :placeholder="questions[currentQuestion].placeholder",
                            :required="true",
                            label="label",
                            :items="questions[currentQuestion].options"
                        )
                    .form-group.no-margin.login-section
                        button.btn.btn-primary.btn-block.login-btn  Submit


</template>

<style lang="scss">
</style>

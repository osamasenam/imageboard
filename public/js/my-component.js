const component = {
    data() {
        return {
            heading: "I am a component and I am glad to be here.",
        };
    },
    mounted() {
        console.log(
            "my component mounted and it's id prop is " + this.id
        );
    },
    methods: {
        changeHeadingAndRequestNameChange() {
            this.heading = "I am getting tired of being here now.";
            // this.$emit("namechange", Date.now());
        },
    },
    props: ["id", "title","url","description","username","created_at"],
    template: `
            <div class="modal">
                <h2>{{title}}</h2>
                <img :src="url">
                <h3>{{description}}</h3>
                <h3>created at {{created_at}}</h3>
                <h3>created by {{username}}</h3>
            </div>
            `,
};

export { component as myComponent };
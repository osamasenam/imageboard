import { componentComments } from "./component-comments.js";

const componentModal = {
    data() {
        return {
            modal_title: "",
            modal_url: "",
            modal_description: "",
            modal_username: "",
            modal_created_at: "",
        };
    },
    mounted() {
        console.log("modal component mounted img_id", this.img_id);
        fetch(`/openImage/${this.img_id}`)
            .then((response) => response.json())
            .then((data) => {
                console.log("clicked image:", data[0]);
                this.modal_title = data[0].title ;
                this.modal_url = data[0].url ;
                this.modal_description = data[0].description ;
                this.modal_username = data[0].username ;
                this.modal_created_at = data[0].created_at ;
            })
            .catch(console.log);
        
    },
    methods: {
        closeModal() {
            this.$emit('close');
        }
        
    },
    components: {
        "component-comments": componentComments,
    },
    props: ["img_id"],
    template: `
            <div class="overlay" @click="closeModal">
            </div>

            <div class="modal">
                <h2>{{modal_title}}</h2>
                <img :src="modal_url">
                <h3>{{modal_description}}</h3>
                <h3>created at {{modal_created_at}} by {{modal_username}}</h3>
                <component-comments :img_id="img_id"></component-comments>
            </div>
            `,
    
};

export { componentModal };
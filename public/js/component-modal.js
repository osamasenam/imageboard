import { componentComments } from "./component-comments.js";
import { componentTags } from "./component-tags.js";

const componentModal = {
    data() {
        return {
            modal_title: "",
            modal_url: "",
            modal_description: "",
            modal_username: "",
            modal_created_at: "",
            modal_next_id: null,
            modal_previous_id: null,
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
                this.modal_next_id = data[0].next_id ;
                this.modal_previous_id = data[0].previous_id ;
            })
            .catch((err) => {
                console.log("no image found", err);
                history.pushState({}, '', `/`);
                this.$emit('close');
            });
        
    },
    methods: {
        closeModal() {
            this.$emit('close');
        },
        nextModal() {
            this.$emit('next', this.modal_next_id);
        },
        previousModal() {
            this.$emit('previous', this.modal_previous_id);
        },
        showTaggedImages(arg1) {
            console.log("tagged test Modal", arg1);
            this.$emit('tagged2', arg1);
            
        },
    },
    components: {
        "component-comments": componentComments,
        "component-tags": componentTags,
    },
    props: ["img_id"],
    watch: {
        img_id: function() {
            console.log("watcher handled", this.img_id);
            fetch(`/openImage/${this.img_id}`)
                .then((response) => response.json())
                .then((data) => {
                    console.log("clicked image:", data[0]);
                    this.modal_title = data[0].title ;
                    this.modal_url = data[0].url ;
                    this.modal_description = data[0].description ;
                    this.modal_username = data[0].username ;
                    this.modal_created_at = data[0].created_at ;
                    this.modal_next_id = data[0].next_id ;
                    this.modal_previous_id = data[0].previous_id ;
                })
                .catch((err) => {
                    console.log("no image found", err);
                    history.pushState({}, '', `/`);
                    this.$emit('close');
                });
        }
    },
    template: `
            <div class="overlay" @click="closeModal">
            </div>

            <div class="modal">
                
                
                <component-tags :img_id="img_id" @showTaggedImages="showTaggedImages"></component-tags>
                <button class="previousBtn" @click="previousModal">▲</button>
                <img :src="modal_url">
                <button class="nextBtn" @click="nextModal">▼</button>
                <h3>{{modal_description}}</h3>
                <h3>created at {{modal_created_at}} by {{modal_username}}</h3>
                <component-comments :img_id="img_id"></component-comments>
            </div>
            `,
    
};

export { componentModal };
import * as Vue from './vue.js';
import { myComponent } from "./my-component.js";


Vue.createApp({
    data() {
        return {
            images: [],
            title: '',
            description: '',
            username: '',
            file: null,
            img_id: '',
            img_title: '',
            img_url: '',
            img_description: '',
            img_username: '',
            img_created_at: '',
            modal_visibility: 'hidden',
        };
    },
   
    mounted() {
        console.log("MOUNTED");
        fetch("/imageboard")
            .then((response) => response.json())
            .then((data) => {
                console.log("images:", data);
                this.images = data;
            })
            .catch(console.log);
    },
    
    methods: {
        clickHandler() {
            console.log(this);
            // uploading the file logic here
            const fd = new FormData();
            fd.append('title', this.title);
            fd.append('description', this.description);
            fd.append('username', this.username);
            fd.append('file', this.file);

            fetch('/upload', {
                method: 'POST',
                body: fd
            })
            .then(response => response.json())
            .then(result => {
                console.log(result); 
                console.log("updated images:", result);
                this.images = result;
            })
            .catch(err => console.log(err))
        },
        fileSelectHandler(e) {
            console.log(e.target.files[0]);
            this.file = e.target.files[0];
        },
        openModal(e) {
            console.log("clicked image", e.target.id);
            const imgId = e.target.id;
            fetch(`/openImage/${imgId}`)
            .then((response) => response.json())
            .then((data) => {
                console.log("clicked image:", data[0]);
                this.img_id = data[0].id ;
                this.img_title = data[0].title ;
                this.img_url = data[0].url ;
                this.img_description = data[0].description ;
                this.img_username = data[0].username ;
                this.img_created_at = data[0].created_at ;
                this.modal_visibility = "visible"
            })
            .catch(console.log);
            
        },
        closeModal() {
            console.log("closing modal");
            this.modal_visibility = "hidden"   
        }
    },

    components: {
        "my-component": myComponent,
    }
}).mount("#main");
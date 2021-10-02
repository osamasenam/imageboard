import * as Vue from './vue.js';
import { componentModal } from "./component-modal.js";

Vue.createApp({
    data() {
        return {
            images: [],
            title: '',
            description: '',
            username: '',
            file: null,
            img_id: '',
            showMoreFlag: true,

        };
    },
   
    mounted() {
        console.log("vue app MOUNTED");
        fetch("/imageboard")
            .then((response) => response.json())
            .then((data) => {
                console.log("images:", data);
                this.images = data;
            })
            .catch(console.log);
    },
    
    methods: {
        submitBtnHandler() {
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
                console.log("Last added image id",result[0].id); 
                this.images.unshift(result[0]);
            })
            .catch(err => console.log(err))
        },
        fileSelectHandler(e) {
            console.log(e.target.files[0]);
            this.file = e.target.files[0];
        },
        openModal(e) {
            this.img_id  = e.target.id;
            console.log("clicked image", e.target.id);
            this.modal_visibility = "visible"
            
        },
        closeModal() {
            console.log("closing modal");
            this.img_id = null;
        },
        showMoreImages() {
            console.log("showing more images");
            // we need to grab more photos past this last id already shown at the end of our page
            const lastId = this.images[this.images.length -1].id;
            fetch(`/showMoreImages/${lastId}`)
            .then((response) => response.json())
            .then((data) => {
                // save the last image id to know if all images are shown already or not yet
                const firstIdInMore = data[data.length-1].id; 
                this.images = this.images.concat(data);
                // get the id of the first image in db to know when more Btn should disappear
                fetch(`/getFirstId`)
                .then((response) => response.json())
                .then((firstId) => {
                    this.showMoreFlag = (firstId[0].id == firstIdInMore) ? false : true;
                    console.log("this.showMoreFlag", this.showMoreFlag);
                })
                .catch(console.log);
            })
            .catch(console.log);
        },
    },

    components: {
        "component-modal": componentModal,
    }
}).mount("#main");
import * as Vue from './vue.js';

Vue.createApp({
    data() {
        return {
            images: [],
            title: '',
            description: '',
            username: '',
            file: null,
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
                console.log("updated images:", data);
                this.images = result;
            })
            .catch(err => console.log(err))
        },
        fileSelectHandler(e) {
            console.log(e.target.files[0]);
            this.file = e.target.files[0];
        }
    },
}).mount("#main");
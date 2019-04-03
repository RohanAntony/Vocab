var wordEntry = new Vue({
  el:"#word-entry",
  data:{
    word:'',
    def:'',
    example:'',
    type:'Add',
    executing: false
  },
  methods:{
    addWord: function(){
      doc = {
        word: this.word,
        def: this.def,
        example: this.example
      }
      axios.post(document.URL + '/add', doc)
      .then((response) => {
        console.log(response)
        if(response.data.status == "Success"){
          console.log('Added successfully!')
          this.word = '';
          this.def = '';
          this.example = '';
          wordList.fetchWords();
        }else {
          console.log('Error while adding word')
        }
      })
      .catch((error) => {
        console.log('Error while adding word')
      })
    },
    deleteWord: function(word){
      axios.post(document.URL + '/delete', {
        word: word
      }).then((response) => {
        if(response.data.status == 'Success'){
          this.word = ''
          this.def = ''
          this.example = ''
          wordList.fetchWords();
        }else{
          
        }
      }).catch((error) => {
        console.log('Error while deleting the word')
      })
    }
  }
})



var wordList = new Vue({
  el:"#word-list",
  data:{
    searchWord: '',
    listOfWords: [],
    executing: false
  },
  methods:{
    updateWordEntry: function(word, def, example, type){
      wordEntry.word = word;
      wordEntry.def = def;
      wordEntry.example = example;
      wordEntry.type = type ? type : "Update";
    },
    fetchWords: function(){
      if(this.executing == false){
        executing = true;
        axios.post( document.URL + '/list', {
          word: this.searchWord
        })
        .then((response) => {
          this.listOfWords = response.data.splice(0, response.data.length);
          this.listOfWords.sort();
          console.log(this.listOfWords)
          executing = false;
        })
        .catch((error) => {
          this.listOfWords = []
          console.log(error);
          executing = false;
        })
      }
    }
  }
})

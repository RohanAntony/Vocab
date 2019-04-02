var wordEntry = new Vue({
  el:"#word-entry",
  data:{
    word:'',
    def:'',
    example:'',
    type:'Add'
  },
  methods:{

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
        //call get method with content set to this.searchWord
        //update this.listOfWords with definitions
        //set executing to true inside callback after setting listOfWords
      }
    }
  }
})

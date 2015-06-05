Abacus={

  keyCodes: {
    27: 'AC',
    42: '*',
    47: '/',
    48: '0',
    49: '1',
    50: '2',
    51: '3',
    52: '4',
    53: '5',
    54: '6',
    55: '7',
    56: '8',
    57: '9',
    13: '=',
    8: 'DEL',
    43: '+',
    45: '-',
    46: '.'
  },

  lastKeyWasOp : false,
  lastKeyWasDot : false,


  clearPreview : function(key){
   $('#preview').text("");
   $('#result').html("0");
 },

 deleteChar : function(key){
  var preview=$('#preview').text();
  $('#preview').text(preview.slice(0,preview.length-1));
},

showResult : function(key){
  var preview=$('#preview').text();
  $('#result').text(eval(preview));
},

keyClick : function(key){
  switch (key){

    case 'AC':
    Abacus.clearPreview();
    break;

    case 'DEL':
    Abacus.deleteChar();
    break;

    case '=':
    Abacus.showResult();
    break;

    default:

    if (key == '.' && Abacus.lastKeyWasDot) {
          // Do Nothing
        } else{
          if (['+','-','*','/'].indexOf(key) != -1 && Abacus.lastKeyWasOp) {
            Abacus.deleteChar();
          }

          var preview=$('#preview').text();
          $('#preview').text(
            preview + key
            );
        }
      }

      if (key == '.') {
        Abacus.lastKeyWasDot = true;
      } else {
        Abacus.lastKeyWasDot = false;
      }

      if (['+', '-', '*', '/'].indexOf(key) == -1) {
        Abacus.lastKeyWasOp = false;
      } else {
        Abacus.lastKeyWasOp = true;
      }
    },

    keyPress: function(){
      $(document).unbind('keydown keypress').bind('keydown keypress', function(event) {
        var keycode = event.keyCode || event.which;
        console.log(keycode);
        if (Abacus.keyCodes[keycode]) {
          Abacus.keyClick(Abacus.keyCodes[keycode]);
          // event.preventDefault();
        }
      });
    }
  };

  $(document).ready(function(){
    $('.key').click(function(event){
      Abacus.keyClick($(this).text());
    });
    Abacus.keyPress();
  });
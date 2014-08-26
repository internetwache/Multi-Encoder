$(document).ready(function() {
  $('textarea').each(function(i, area) {
    $(area).on('change keyup paste blur focus', function() {
      var enc = $(area).attr("data-id");
      var decode = $("#" + enc + "_decode").is(':checked');
      var data = $(area).val();

      doEncoding(data, enc, decode, function(ret) {
        $("#"+enc+"_output").text(ret);
      });
    })
  });

});



function doEncoding(data, encType, decode, callback) {
  var ret = "Error";

  //URL-encoding
  if(encType === "url") {
    ret = "";
    if(decode) {
      ret = data.replace(/%(\d{2})/g,function(match) { return String.fromCharCode(parseInt(match.slice(1),16))});
    } else {
      for(i=0; i < data.length; i++)
      {
        ret += "%" + data[i].charCodeAt(0).toString(16);
      }
    }
  }

  if(encType === "html") {
    ret = "";
    if(decode) {
      ret = data.replace(/&#x(\d{2});/g,function(match) { return String.fromCharCode(parseInt(match.slice(3).replace(";",""),16))});
    } else {
      for(i=0; i < data.length; i++)
      {
        ret += "&#x" + data[i].charCodeAt(0).toString(16) + ";";
      }      
    }
  }

  if(encType === "aschex") {
    ret = "";
    if(decode) {
      ret = data.replace(/([0-9a-fA-F]{2})/g,function(match) { return String.fromCharCode(parseInt(match,16))});
    } else {
      for(i=0; i < data.length; i++)
      {
        ret += data[i].charCodeAt(0).toString(16);
      }     
    }
  }

  if(encType === "jshex") {
    ret = "";
    if(decode) {
      ret = data.replace(/(\\x[0-9a-fA-F]{2})/g,function(match) { return String.fromCharCode(parseInt(match.slice(2),16))});
    } else {
      for(i=0; i < data.length; i++)
      {
        ret += "\\x" + data[i].charCodeAt(0).toString(16);
      }     
    }
  }

  if(encType === "inthex") {
    ret = "";
    if(decode) {
      ret = parseInt(data.toUpperCase().replace(/[^a-f0-9A-F]/gi,""),16);
    } else {
      ret = parseInt(data).toString(16).toUpperCase();
    }
  }

  if(encType === "ascbin") {
    ret = "";
    if(decode) {
      ret = data.replace(/([0-1]{16})/g,function(match) { return String.fromCharCode(parseInt(match,2))});
    } else {
      for(i=0; i < data.length; i++)
      {
        binchar = data[i].charCodeAt(0).toString(2);
        for(j = 16 - binchar.length; j > 0; j--) {
          binchar = "0" + binchar;
        }

        ret += binchar ;
      }     
    }
  }

  if(encType === "intbin") {
    ret = "";
    if(decode) {
      ret = parseInt(data.replace(/[^0-1]/gi,""),2);
    } else {
      ret = parseInt(data).toString(2);
    }
  }

  if(encType === "ascoct") {
    ret = "";
    if(decode) {
      ret = data.replace(/([0-8]{3})/g,function(match) { return String.fromCharCode(parseInt(match,8))});
    } else {
      for(i=0; i < data.length; i++)
      {
        binchar = data[i].charCodeAt(0).toString(8);
        for(j = 3 - binchar.length; j > 0; j--) {
          binchar = "0" + binchar;
        }

        ret += binchar ;
      }     
    }
  }

  if(encType === "intoct") {
    ret = "";
    if(decode) {
      ret = parseInt(data.replace(/[^0-8]/gi,""),8);
    } else {
      ret = parseInt(data).toString(8);
    }
  }

  if(encType === "b64") {
    ret = "";
    if(decode) {
      ret = $.base64.decode(data);
    } else {
      ret = $.base64.encode(data);
    }
  }


  console.log(ret);
  callback(ret);
}